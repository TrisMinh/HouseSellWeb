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

from django.conf import settings  # noqa: E402
from django.contrib.auth.models import User  # noqa: E402
from django.utils import timezone  # noqa: E402
from rest_framework.test import APIClient  # noqa: E402

from utils.factories import TestDataFactory  # noqa: E402


def create_unique_user(*, is_staff: bool = False, password: str = "Pass123!") -> User:
    suffix = uuid.uuid4().hex[:10]
    return User.objects.create_user(
        username=f"v7_user_{suffix}",
        email=f"v7_user_{suffix}@example.com",
        password=password,
        first_name="V7",
        last_name="User",
        is_staff=is_staff,
    )


def run() -> None:
    report = {}

    owner = create_unique_user()
    property_obj = TestDataFactory.create_property(owner=owner)
    staff = create_unique_user(is_staff=True)
    TestDataFactory.create_news(author=staff, title="V7 Published News", is_published=True)

    report["contract_snapshot"] = {
        "cors_has_8080_localhost": "http://localhost:8080" in settings.CORS_ALLOWED_ORIGINS,
        "cors_has_8080_loopback": "http://127.0.0.1:8080" in settings.CORS_ALLOWED_ORIGINS,
        "csrf_has_8080_loopback": "http://127.0.0.1:8080" in getattr(settings, "CSRF_TRUSTED_ORIGINS", []),
    }

    anon_client = APIClient()

    # C01 + C02: register/login
    suffix = int(time.time())
    username = f"v7_smoke_{suffix}"
    password = "Pass123!"

    reg = anon_client.post(
        "/api/auth/register/",
        {
            "username": username,
            "email": f"{username}@example.com",
            "first_name": "Smoke",
            "last_name": "V7",
            "password": password,
            "password_confirm": password,
        },
        format="json",
    )
    login = anon_client.post("/api/auth/login/", {"username": username, "password": password}, format="json")
    token = login.data.get("access") if hasattr(login, "data") else None
    report["C01_C02_auth"] = {
        "register_status": reg.status_code,
        "login_status": login.status_code,
        "has_access_token": bool(token),
        "pass": reg.status_code == 201 and login.status_code == 200 and bool(token),
    }

    auth_client = APIClient()
    if token:
        auth_client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

    # C03: properties list
    list_res = anon_client.get("/api/properties/")
    properties = list_res.data.get("results", []) if isinstance(list_res.data, dict) else list_res.data
    report["C03_properties_list"] = {
        "status": list_res.status_code,
        "count": len(properties) if isinstance(properties, list) else 0,
        "pass": list_res.status_code == 200 and isinstance(properties, list) and len(properties) > 0,
    }

    # C04: property detail
    detail_res = anon_client.get(f"/api/properties/{property_obj.id}/")
    report["C04_property_detail"] = {
        "status": detail_res.status_code,
        "has_title": hasattr(detail_res, "data") and "title" in detail_res.data,
        "pass": detail_res.status_code == 200 and hasattr(detail_res, "data") and "title" in detail_res.data,
    }

    # C05: news list
    news_res = anon_client.get("/api/news/")
    news_items = news_res.data.get("results", []) if isinstance(news_res.data, dict) else news_res.data
    report["C05_news_list"] = {
        "status": news_res.status_code,
        "count": len(news_items) if isinstance(news_items, list) else 0,
        "pass": news_res.status_code == 200 and isinstance(news_items, list),
    }

    # C06: create appointment (authenticated mutate)
    appt_res = auth_client.post(
        "/api/appointments/",
        {
            "property": property_obj.id,
            "date": (timezone.localdate() + timedelta(days=3)).isoformat(),
            "time": "10:00",
            "name": "V7 Booker",
            "phone": "0900000000",
            "message": "V7 connectivity smoke",
        },
        format="json",
    )
    report["C06_create_appointment"] = {
        "status": appt_res.status_code,
        "pass": appt_res.status_code == 201,
    }

    # C07: prediction
    pred_res = anon_client.post(
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
    report["C07_prediction"] = {
        "status": pred_res.status_code,
        "has_estimated_price": hasattr(pred_res, "data") and "estimated_price" in pred_res.data,
        "pass": pred_res.status_code == 200 and hasattr(pred_res, "data") and "estimated_price" in pred_res.data,
    }

    report["summary"] = {
        "all_pass": all(
            value.get("pass", False)
            for key, value in report.items()
            if key.startswith("C")
        ),
        "total_cases": len([key for key in report if key.startswith("C")]),
    }

    out_path = repo_root / "tasks-manager" / "task" / "plan-007" / "evidence" / "plan007-connectivity-smoke-report.json"
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")
    print(json.dumps(report, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    run()
