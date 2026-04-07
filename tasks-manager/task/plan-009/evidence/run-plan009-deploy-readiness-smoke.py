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
os.environ["DJANGO_DEBUG"] = "true"
os.environ["DJANGO_SECRET_KEY"] = "local-test-secret"
os.environ["DJANGO_ALLOWED_HOSTS"] = "localhost,127.0.0.1,testserver"
os.environ["SWAGGER_PUBLIC"] = "true"

import django  # noqa: E402

django.setup()

from django.conf import settings  # noqa: E402
from django.contrib.admin.sites import site  # noqa: E402
from django.contrib.auth.models import User  # noqa: E402
from django.test import Client  # noqa: E402

from accounts.models import UserProfile  # noqa: E402
from appointments.models import Appointment  # noqa: E402
from news.models import News  # noqa: E402
from properties.models import Favorite, Property, PropertyImage  # noqa: E402


def file_contains(path: Path, needles: list[str]) -> bool:
    if not path.exists():
        return False
    content = path.read_text(encoding="utf-8")
    return all(needle in content for needle in needles)


def run() -> None:
    report: dict[str, dict] = {}
    anon_client = Client()
    auth_client = Client()

    # C01 - admin registry coverage
    expected_models = [UserProfile, Property, PropertyImage, Favorite, Appointment, News]
    missing = [model.__name__ for model in expected_models if model not in site._registry]
    report["C01_admin_registry_coverage"] = {
        "missing": missing,
        "pass": len(missing) == 0,
    }

    # C02 - admin login page
    c02 = anon_client.get("/admin/login/")
    report["C02_admin_login_page"] = {
        "status": c02.status_code,
        "pass": c02.status_code == 200,
    }

    # C03 - admin index when authenticated
    suffix = uuid.uuid4().hex[:8]
    username = f"v9_admin_{suffix}"
    password = "StrongPass123!"
    User.objects.filter(username=username).delete()
    User.objects.create_superuser(username=username, email=f"{username}@example.com", password=password)
    login_ok = auth_client.login(username=username, password=password)
    c03 = auth_client.get("/admin/") if login_ok else None
    report["C03_admin_index_authenticated"] = {
        "login_ok": login_ok,
        "status": c03.status_code if c03 is not None else None,
        "pass": bool(login_ok and c03 is not None and c03.status_code == 200),
    }

    # C04 - swagger UI policy
    swagger_ui_anon = anon_client.get("/swagger/")
    if settings.SWAGGER_PUBLIC:
        pass_c04 = swagger_ui_anon.status_code == 200
        auth_status = None
    else:
        pass_c04 = swagger_ui_anon.status_code in (302, 403)
        swagger_ui_auth = auth_client.get("/swagger/")
        auth_status = swagger_ui_auth.status_code
        pass_c04 = pass_c04 and auth_status == 200

    report["C04_swagger_ui_policy"] = {
        "swagger_public": settings.SWAGGER_PUBLIC,
        "anon_status": swagger_ui_anon.status_code,
        "auth_status": auth_status,
        "pass": pass_c04,
    }

    # C05 - swagger json paths
    swagger_json_resp = (
        anon_client.get("/swagger.json", HTTP_ACCEPT="application/json")
        if settings.SWAGGER_PUBLIC
        else auth_client.get("/swagger.json", HTTP_ACCEPT="application/json")
    )
    if swagger_json_resp.status_code == 200:
        schema = json.loads(swagger_json_resp.content.decode("utf-8"))
        paths = schema.get("paths", {})
        expected_suffixes = [
            "/auth/login/",
            "/properties/",
            "/appointments/",
            "/news/",
            "/prediction/",
        ]
        missing_paths = [
            suffix
            for suffix in expected_suffixes
            if suffix not in paths and f"/api{suffix}" not in paths
        ]
        pass_c05 = len(missing_paths) == 0
    else:
        missing_paths = ["schema-unavailable"]
        pass_c05 = False

    report["C05_swagger_json_core_paths"] = {
        "status": swagger_json_resp.status_code,
        "missing_paths": missing_paths,
        "pass": pass_c05,
    }

    # C06 - settings deploy guards
    settings_path = be_root / "core" / "settings.py"
    c06_needles = [
        "DJANGO_SECRET_KEY must be set when DJANGO_DEBUG=False.",
        "DJANGO_ALLOWED_HOSTS must be set when DJANGO_DEBUG=False.",
        "SWAGGER_PUBLIC",
    ]
    c06_pass = file_contains(settings_path, c06_needles)
    report["C06_settings_deploy_guards"] = {
        "pass": c06_pass,
    }

    # C07 - env template readiness
    env_example_path = be_root / ".env.example"
    c07_needles = [
        "DJANGO_DEBUG=",
        "DJANGO_SECRET_KEY=",
        "DJANGO_ALLOWED_HOSTS=",
        "CORS_ALLOWED_ORIGINS=",
        "SWAGGER_PUBLIC=",
    ]
    c07_pass = file_contains(env_example_path, c07_needles)
    report["C07_backend_env_template"] = {
        "exists": env_example_path.exists(),
        "pass": c07_pass,
    }

    # C08 - superuser runbook
    runbook_path = repo_root / "tasks-manager" / "task" / "plan-009" / "superuser-runbook.md"
    c08_pass = file_contains(runbook_path, ["createsuperuser", "--noinput"])
    report["C08_superuser_runbook"] = {
        "exists": runbook_path.exists(),
        "pass": c08_pass,
    }

    case_keys = [key for key in report if key.startswith("C")]
    report["summary"] = {
        "all_pass": all(bool(report[key].get("pass")) for key in case_keys),
        "total_cases": len(case_keys),
    }

    out_path = repo_root / "tasks-manager" / "task" / "plan-009" / "evidence" / "plan009-deploy-readiness-report.json"
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")
    print(json.dumps(report, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    run()
