import json
import os
import sys
import uuid
from pathlib import Path


def find_repo_root() -> Path:
    current = Path(__file__).resolve()
    for parent in [current] + list(current.parents):
        if (parent / "Be" / "manage.py").exists():
            return parent
    raise RuntimeError("Could not locate repository root")


repo_root = find_repo_root()
be_root = repo_root / "Be"
sys.path.insert(0, str(be_root))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
os.environ["HSW_DB_ENGINE"] = "django.db.backends.sqlite3"
os.environ["HSW_DB_NAME"] = str(be_root / "db.sqlite3")
os.environ["DJANGO_ALLOWED_HOSTS"] = "localhost,127.0.0.1,testserver"

import django  # noqa: E402

django.setup()

from django.contrib.auth.models import User  # noqa: E402
from django.core.files.uploadedfile import SimpleUploadedFile  # noqa: E402
from django.test import override_settings  # noqa: E402
from rest_framework.test import APIClient  # noqa: E402

from properties.models import PropertyImage  # noqa: E402
from utils.factories import TestDataFactory  # noqa: E402


def gif_file(name: str = "test.gif", content: bytes | None = None, content_type: str = "image/gif"):
    return SimpleUploadedFile(
        name,
        content
        or (
            b"GIF87a\x01\x00\x01\x00\x80\x00\x00\x00\x00\x00"
            b"\xff\xff\xff!\xf9\x04\x01\x00\x00\x00\x00,\x00"
            b"\x00\x00\x00\x01\x00\x01\x00\x00\x02\x02D\x01\x00;"
        ),
        content_type=content_type,
    )


def create_user(password: str = "Pass123!") -> User:
    suffix = uuid.uuid4().hex[:10]
    return User.objects.create_user(
        username=f"v8_user_{suffix}",
        email=f"v8_user_{suffix}@example.com",
        password=password,
        first_name="V8",
        last_name="User",
    )


def static_file_has(path: Path, needles: list[str]) -> bool:
    if not path.exists():
        return False
    content = path.read_text(encoding="utf-8")
    return all(needle in content for needle in needles)


def run() -> None:
    report: dict[str, dict | bool | int] = {}

    owner = create_user()
    other = create_user()
    property_obj = TestDataFactory.create_property(owner=owner)

    owner_client = APIClient()
    owner_client.force_authenticate(user=owner)

    other_client = APIClient()
    other_client.force_authenticate(user=other)

    upload_url = f"/api/properties/{property_obj.id}/images/"

    # C01
    c01 = owner_client.post(
        upload_url,
        {"images": [gif_file(name="c01.gif")], "is_primary": "true", "caption": "front"},
        format="multipart",
    )
    image_id_1 = c01.data[0]["id"] if c01.status_code == 201 else None
    report["C01_owner_upload_valid"] = {
        "status": c01.status_code,
        "has_image_id": bool(image_id_1),
        "pass": c01.status_code == 201 and bool(image_id_1),
    }

    # C02
    c02 = other_client.post(upload_url, {"images": [gif_file(name="c02.gif")]}, format="multipart")
    report["C02_non_owner_upload"] = {
        "status": c02.status_code,
        "pass": c02.status_code in (403, 404),
    }

    # C03
    c03 = owner_client.post(
        upload_url,
        {"images": [gif_file(name="bad.txt", content=b"hello", content_type="text/plain")]},
        format="multipart",
    )
    report["C03_invalid_type"] = {
        "status": c03.status_code,
        "has_images_error": hasattr(c03, "data") and "images" in c03.data,
        "pass": c03.status_code == 400 and hasattr(c03, "data") and "images" in c03.data,
    }

    # C04
    with override_settings(PROPERTY_IMAGE_MAX_UPLOAD_BYTES=20):
        c04 = owner_client.post(
            upload_url,
            {"images": [gif_file(name="big.gif", content=b"GIF87a" + b"x" * 200)]},
            format="multipart",
        )
    report["C04_oversize"] = {
        "status": c04.status_code,
        "pass": c04.status_code == 400,
    }

    # C05
    with override_settings(PROPERTY_IMAGE_MAX_FILES_PER_UPLOAD=1):
        c05 = owner_client.post(
            upload_url,
            {"images": [gif_file(name="a.gif"), gif_file(name="b.gif")]},
            format="multipart",
        )
    report["C05_too_many_per_upload"] = {
        "status": c05.status_code,
        "pass": c05.status_code == 400,
    }

    # C06
    with override_settings(PROPERTY_IMAGE_MAX_FILES_PER_PROPERTY=1):
        # property currently has 1 image from C01
        c06 = owner_client.post(upload_url, {"images": [gif_file(name="extra.gif")]}, format="multipart")
    report["C06_too_many_per_property"] = {
        "status": c06.status_code,
        "pass": c06.status_code == 400,
    }

    # C07 - upload second image then delete primary
    c07_upload = owner_client.post(
        upload_url,
        {"images": [gif_file(name="second.gif")], "order": 1, "is_primary": "false"},
        format="multipart",
    )
    second_id = c07_upload.data[0]["id"] if c07_upload.status_code == 201 else None
    delete_url = f"/api/properties/images/{image_id_1}/"
    c07_delete = owner_client.delete(delete_url)
    remaining = PropertyImage.objects.filter(property=property_obj).order_by("order", "id")
    remaining_primary_ids = [item.id for item in remaining if item.is_primary]
    report["C07_delete_primary_promote_next"] = {
        "upload_status": c07_upload.status_code,
        "delete_status": c07_delete.status_code,
        "remaining_count": remaining.count(),
        "remaining_primary_ids": remaining_primary_ids,
        "pass": c07_upload.status_code == 201
        and c07_delete.status_code == 200
        and second_id is not None
        and remaining.count() == 1
        and remaining_primary_ids == [second_id],
    }

    # C08-C10 static checks in FE
    fe_root = repo_root / "FE" / "src" / "pages"
    c08 = static_file_has(fe_root / "AddProperty.tsx", ["createProperty(", "uploadPropertyImages("])
    c09 = static_file_has(fe_root / "ManageProperty.tsx", ["getProperty(", "uploadPropertyImages(", "deletePropertyImage("])
    c10 = static_file_has(fe_root / "Listings.tsx", ["getImageUrl("])
    report["C08_fe_add_property_sync"] = {"pass": c08}
    report["C09_fe_manage_property_sync"] = {"pass": c09}
    report["C10_fe_listings_image_url"] = {"pass": c10}

    case_keys = [key for key in report.keys() if key.startswith("C")]
    report["summary"] = {
        "all_pass": all(bool(report[key].get("pass")) for key in case_keys),
        "total_cases": len(case_keys),
    }

    out_path = repo_root / "tasks-manager" / "task" / "plan-008" / "evidence" / "plan008-media-smoke-report.json"
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")
    print(json.dumps(report, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    run()
