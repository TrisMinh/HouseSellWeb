import json
import os
import sys
import time
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

from django.utils import timezone  # noqa: E402
from django.contrib.auth.models import User  # noqa: E402
from rest_framework.test import APIClient  # noqa: E402

from utils.factories import TestDataFactory  # noqa: E402


def create_unique_user(*, is_staff: bool = False, password: str = "Pass123!") -> User:
    suffix = uuid.uuid4().hex[:10]
    return User.objects.create_user(
        username=f"smoke_user_{suffix}",
        email=f"smoke_user_{suffix}@example.com",
        password=password,
        first_name="Smoke",
        last_name="User",
        is_staff=is_staff,
    )


def run():
    report = {}

    owner = create_unique_user()
    property_obj = TestDataFactory.create_property(owner=owner)
    staff = create_unique_user(is_staff=True)
    TestDataFactory.create_news(author=staff, title="Smoke News Published", is_published=True)

    anon_client = APIClient()

    # Flow 1: register + login
    suffix = int(time.time())
    username = f"smoke_user_{suffix}"
    password = "Pass123!"
    register_payload = {
        "username": username,
        "email": f"{username}@example.com",
        "first_name": "Smoke",
        "last_name": "User",
        "password": password,
        "password_confirm": password,
    }
    reg = anon_client.post("/api/auth/register/", register_payload, format="json")
    login = anon_client.post("/api/auth/login/", {"username": username, "password": password}, format="json")
    token = login.data.get("access") if hasattr(login, "data") else None
    report["flow_1_auth"] = {
        "register_status": reg.status_code,
        "login_status": login.status_code,
        "has_access_token": bool(token),
        "pass": reg.status_code == 201 and login.status_code == 200 and bool(token),
    }

    auth_client = APIClient()
    if token:
        auth_client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

    # Flow 2: list properties
    r = auth_client.get("/api/properties/")
    if isinstance(r.data, dict):
        props = r.data.get("results", [])
    else:
        props = r.data
    report["flow_2_list_properties"] = {
        "status": r.status_code,
        "count": len(props) if isinstance(props, list) else 0,
        "pass": r.status_code == 200 and isinstance(props, list) and len(props) > 0,
    }

    # Flow 3: property detail
    detail = auth_client.get(f"/api/properties/{property_obj.id}/")
    report["flow_3_property_detail"] = {
        "status": detail.status_code,
        "has_title": bool(getattr(detail, "data", {}).get("title")) if hasattr(detail, "data") else False,
        "pass": detail.status_code == 200 and hasattr(detail, "data") and "title" in detail.data,
    }

    # Flow 4: news list
    news = auth_client.get("/api/news/")
    news_items = news.data.get("results", []) if isinstance(news.data, dict) else news.data
    report["flow_4_news_list"] = {
        "status": news.status_code,
        "count": len(news_items) if isinstance(news_items, list) else 0,
        "pass": news.status_code == 200 and isinstance(news_items, list) and len(news_items) > 0,
    }

    # Flow 5: create appointment
    appointment_payload = {
        "property": property_obj.id,
        "date": (timezone.localdate() + timedelta(days=2)).isoformat(),
        "time": "10:00",
        "name": "Smoke Booker",
        "phone": "0900000000",
        "message": "Plan002 smoke",
    }
    appt = auth_client.post("/api/appointments/", appointment_payload, format="json")
    report["flow_5_create_appointment"] = {
        "status": appt.status_code,
        "appointment_id": appt.data.get("id") if hasattr(appt, "data") else None,
        "pass": appt.status_code == 201,
    }

    # Flow 6: prediction
    pred = auth_client.post(
        "/api/prediction/",
        {
            "province_name": "Ha Noi",
            "district_name": "Cau Giay",
            "ward_name": "Dich Vong",
            "property_type_name": "Nhà",
            "area": 80,
            "floor_count": 4,
            "bedroom_count": 3,
            "bathroom_count": 3,
        },
        format="json",
    )
    report["flow_6_prediction"] = {
        "status": pred.status_code,
        "keys_ok": hasattr(pred, "data")
        and all(
            key in pred.data
            for key in ["estimated_price", "price_min", "price_max", "confidence", "price_per_m2"]
        ),
        "pass": pred.status_code == 200,
    }

    report["summary"] = {
        "all_pass": all(v.get("pass", False) for k, v in report.items() if k.startswith("flow_")),
        "total_flows": len([k for k in report if k.startswith("flow_")]),
    }

    out_path = repo_root / "tasks-manager" / "task" / "plan-002" / "evidence" / "plan002-e2e-smoke-report.json"
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")
    print(json.dumps(report, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    run()
