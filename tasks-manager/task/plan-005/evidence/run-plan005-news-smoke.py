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
from rest_framework.test import APIClient  # noqa: E402

from news.models import News  # noqa: E402
from utils.factories import TestDataFactory  # noqa: E402


def create_unique_user(*, is_staff: bool = False, password: str = "Pass123!") -> User:
    suffix = uuid.uuid4().hex[:10]
    return User.objects.create_user(
        username=f"news_user_{suffix}",
        email=f"news_user_{suffix}@example.com",
        password=password,
        first_name="News",
        last_name="User",
        is_staff=is_staff,
    )


def parse_list_payload(data):
    if isinstance(data, list):
        return data
    if isinstance(data, dict):
        return data.get("results", [])
    return []


def run():
    report = {}

    user_a = create_unique_user()
    user_b = create_unique_user()
    staff_a = create_unique_user(is_staff=True)
    admin = User.objects.create_superuser(
        username=f"admin_news_{uuid.uuid4().hex[:10]}",
        email=f"admin_news_{uuid.uuid4().hex[:10]}@example.com",
        password="Pass123!",
    )

    published_other = TestDataFactory.create_news(author=staff_a, title="Published Other", is_published=True)
    own_draft = TestDataFactory.create_news(author=user_a, title="Own Draft", is_published=False)
    other_draft = TestDataFactory.create_news(author=user_b, title="Other Draft", is_published=False)
    author_post = TestDataFactory.create_news(author=user_a, title="Author Post", is_published=True)

    endpoint = "/api/news/"

    anon = APIClient()
    a_client = APIClient()
    a_client.force_authenticate(user=user_a)
    b_client = APIClient()
    b_client.force_authenticate(user=user_b)
    staff_client = APIClient()
    staff_client.force_authenticate(user=staff_a)
    admin_client = APIClient()
    admin_client.force_authenticate(user=admin)

    # C01
    r = anon.get(endpoint)
    ids = [item["id"] for item in parse_list_payload(r.data)]
    report["C01"] = {"status": r.status_code, "pass": r.status_code == 200 and own_draft.id not in ids and other_draft.id not in ids}

    # C02
    r = anon.get(f"{endpoint}{published_other.id}/")
    report["C02"] = {
        "status": r.status_code,
        "pass": r.status_code == 200 and all(k in r.data for k in ["title", "content", "author_name", "views_count"]),
    }

    # C03
    r = anon.get(f"{endpoint}{own_draft.id}/")
    report["C03"] = {"status": r.status_code, "pass": r.status_code in (403, 404)}

    # C04
    r = a_client.get(endpoint)
    ids = [item["id"] for item in parse_list_payload(r.data)]
    report["C04"] = {
        "status": r.status_code,
        "pass": r.status_code == 200 and published_other.id in ids and own_draft.id in ids and other_draft.id not in ids,
    }

    # C05
    r = a_client.get(f"{endpoint}{own_draft.id}/")
    report["C05"] = {"status": r.status_code, "pass": r.status_code == 200}

    # C06
    r = a_client.get(f"{endpoint}{other_draft.id}/")
    report["C06"] = {"status": r.status_code, "pass": r.status_code in (403, 404)}

    # C07
    r = a_client.post(endpoint, {"title": "No Staff", "content": "Should fail", "is_published": True}, format="json")
    report["C07"] = {"status": r.status_code, "pass": r.status_code == 403}

    # C08
    r = staff_client.post(endpoint, {"title": "Staff News", "content": "Created by staff", "is_published": True}, format="json")
    staff_created_id = r.data.get("id") if hasattr(r, "data") else None
    report["C08"] = {"status": r.status_code, "pass": r.status_code == 201 and r.data.get("author") == staff_a.id}

    # C09
    r = staff_client.post(endpoint, {"title": " ", "content": " "}, format="json")
    report["C09"] = {"status": r.status_code, "pass": r.status_code == 400}

    # C10
    r = a_client.patch(f"{endpoint}{author_post.id}/", {"title": "Author Updated"}, format="json")
    report["C10"] = {"status": r.status_code, "pass": r.status_code == 200 and r.data.get("title") == "Author Updated"}

    # C11
    r = b_client.patch(f"{endpoint}{author_post.id}/", {"title": "Hacked"}, format="json")
    report["C11"] = {"status": r.status_code, "pass": r.status_code in (403, 404)}

    # C12
    patch_resp = admin_client.patch(f"{endpoint}{author_post.id}/", {"title": "Admin Updated"}, format="json")
    delete_resp = admin_client.delete(f"{endpoint}{staff_created_id}/")
    report["C12"] = {"patch_status": patch_resp.status_code, "delete_status": delete_resp.status_code, "pass": patch_resp.status_code == 200 and delete_resp.status_code == 200}

    # C13
    r = b_client.delete(f"{endpoint}{author_post.id}/")
    report["C13"] = {"status": r.status_code, "pass": r.status_code in (403, 404)}

    # C14
    target = News.objects.get(id=published_other.id)
    before = target.views_count
    anon.get(f"{endpoint}{target.id}/")
    anon.get(f"{endpoint}{target.id}/")
    target.refresh_from_db(fields=["views_count"])
    report["C14"] = {"before": before, "after": target.views_count, "pass": target.views_count == before + 2}

    # C15
    target2 = News.objects.get(id=other_draft.id)
    before2 = target2.views_count
    a_client.get(f"{endpoint}{target2.id}/")
    target2.refresh_from_db(fields=["views_count"])
    report["C15"] = {"before": before2, "after": target2.views_count, "pass": target2.views_count == before2}

    report["summary"] = {
        "all_pass_api": all(v.get("pass", False) for k, v in report.items() if k.startswith("C") and int(k[1:]) <= 15),
        "total_api_cases": 15,
    }

    out_path = repo_root / "tasks-manager" / "task" / "plan-005" / "evidence" / "plan005-news-api-smoke-report.json"
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")
    print(json.dumps(report, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    run()
