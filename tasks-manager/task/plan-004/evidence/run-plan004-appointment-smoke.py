import json
import os
import sys
import uuid
from datetime import timedelta
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
from django.utils import timezone  # noqa: E402
from rest_framework.test import APIClient  # noqa: E402

from appointments.models import Appointment, AppointmentStatus  # noqa: E402
from utils.factories import TestDataFactory  # noqa: E402


def create_unique_user(*, is_staff: bool = False, password: str = "Pass123!") -> User:
    suffix = uuid.uuid4().hex[:10]
    return User.objects.create_user(
        username=f"appt_user_{suffix}",
        email=f"appt_user_{suffix}@example.com",
        password=password,
        first_name="Appt",
        last_name="User",
        is_staff=is_staff,
    )


def iso_date(days: int) -> str:
    return (timezone.localdate() + timedelta(days=days)).isoformat()


def run():
    report = {}

    buyer = create_unique_user()
    owner = create_unique_user()
    admin = User.objects.create_superuser(
        username=f"admin_{uuid.uuid4().hex[:10]}",
        email=f"admin_{uuid.uuid4().hex[:10]}@example.com",
        password="Pass123!",
    )
    other_user = create_unique_user()

    property_obj = TestDataFactory.create_property(owner=owner)
    endpoint_base = "/api/appointments/"

    buyer_client = APIClient()
    buyer_client.force_authenticate(user=buyer)

    owner_client = APIClient()
    owner_client.force_authenticate(user=owner)

    admin_client = APIClient()
    admin_client.force_authenticate(user=admin)

    other_client = APIClient()
    other_client.force_authenticate(user=other_user)

    create_payload = {
        "property": property_obj.id,
        "date": iso_date(2),
        "time": "10:30",
        "name": "Buyer A",
        "phone": "0900000000",
        "message": "Smoke create appointment",
    }

    # C01 - Buyer creates valid appointment
    r = buyer_client.post(endpoint_base, create_payload, format="json")
    appt_id = r.data.get("id") if hasattr(r, "data") else None
    report["C01"] = {"status": r.status_code, "pass": r.status_code == 201 and r.data.get("status") == "pending"}

    # C02 - Owner cannot book own property
    owner_payload = dict(create_payload)
    owner_payload["name"] = "Owner self-book"
    r = owner_client.post(endpoint_base, owner_payload, format="json")
    report["C02"] = {"status": r.status_code, "pass": r.status_code == 400}

    # C03 - Past date blocked
    past_payload = dict(create_payload)
    past_payload["date"] = iso_date(-1)
    r = buyer_client.post(endpoint_base, past_payload, format="json")
    report["C03"] = {"status": r.status_code, "pass": r.status_code == 400}

    # C04 - Owner list contains appointment
    r = owner_client.get(f"{endpoint_base}owner/")
    owner_list_ids = [item["id"] for item in r.data] if isinstance(r.data, list) else []
    report["C04"] = {"status": r.status_code, "pass": r.status_code == 200 and appt_id in owner_list_ids}

    # C05 - Owner confirms pending appointment
    r = owner_client.patch(f"{endpoint_base}{appt_id}/status/", {"status": "confirmed"}, format="json")
    report["C05"] = {"status": r.status_code, "pass": r.status_code == 200 and r.data.get("data", {}).get("status") == "confirmed"}

    # C06 - Owner cannot complete directly from pending
    pending_appt = TestDataFactory.create_appointment(user=buyer, property_obj=property_obj, status=AppointmentStatus.PENDING)
    r = owner_client.patch(
        f"{endpoint_base}{pending_appt.id}/status/",
        {"status": "completed"},
        format="json",
    )
    report["C06"] = {"status": r.status_code, "pass": r.status_code == 400}

    # C07 - Buyer cannot confirm own appointment; cannot update others
    r1 = buyer_client.patch(f"{endpoint_base}{pending_appt.id}/status/", {"status": "confirmed"}, format="json")
    other_appt = TestDataFactory.create_appointment(user=other_user, property_obj=property_obj)
    r2 = buyer_client.patch(f"{endpoint_base}{other_appt.id}/status/", {"status": "cancelled"}, format="json")
    report["C07"] = {"status_own": r1.status_code, "status_other": r2.status_code, "pass": r1.status_code == 403 and r2.status_code in (403, 404)}

    # C08 - Buyer cancel confirmed appointment
    r = buyer_client.delete(f"{endpoint_base}{appt_id}/")
    report["C08"] = {"status": r.status_code, "pass": r.status_code == 200}

    # C09 - Buyer cannot cancel completed/rejected
    completed_appt = TestDataFactory.create_appointment(user=buyer, property_obj=property_obj, status=AppointmentStatus.PENDING)
    owner_client.patch(f"{endpoint_base}{completed_appt.id}/status/", {"status": "confirmed"}, format="json")
    owner_client.patch(f"{endpoint_base}{completed_appt.id}/status/", {"status": "completed"}, format="json")
    r = buyer_client.delete(f"{endpoint_base}{completed_appt.id}/")
    report["C09"] = {"status": r.status_code, "pass": r.status_code == 400}

    # C10 - Unrelated user cannot see detail
    r = other_client.get(f"{endpoint_base}{pending_appt.id}/")
    report["C10"] = {"status": r.status_code, "pass": r.status_code == 404}

    # C11 - Admin can confirm pending appointment
    admin_target = TestDataFactory.create_appointment(user=buyer, property_obj=property_obj, status=AppointmentStatus.PENDING)
    r = admin_client.patch(f"{endpoint_base}{admin_target.id}/status/", {"status": "confirmed"}, format="json")
    report["C11"] = {"status": r.status_code, "pass": r.status_code == 200}

    report["summary"] = {
        "all_pass": all(v.get("pass", False) for k, v in report.items() if k.startswith("C")),
        "total_cases": len([k for k in report if k.startswith("C")]),
    }

    out_path = repo_root / "tasks-manager" / "task" / "plan-004" / "evidence" / "plan004-appointment-smoke-report.json"
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")
    print(json.dumps(report, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    run()
