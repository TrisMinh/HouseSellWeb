# FE Regression Checklist - Plan 002

## Scope

- This checklist keeps full FE regression items.
- Task `T020` only requires 6 mandatory end-to-end flows listed in section `T020 Mandatory Smoke`.

## A. Auth Flow

- [ ] Register new account (`POST /api/auth/register/`).
- [ ] Login (`POST /api/auth/login/`) returns `access` + `refresh`.
- [ ] Refresh token flow works when access token expires.
- [ ] Profile (`GET /api/auth/users/me/`) works after login.
- [ ] Logout clears local tokens and protected calls are blocked.

## B. Property Flow

- [ ] Property list (`GET /api/properties/`) loads.
- [ ] Filters/query params do not break response.
- [ ] Property detail (`GET /api/properties/{id}/`) has expected fields.
- [ ] Toggle favorite returns correct `is_favorited`.
- [ ] Owner can upload image.
- [ ] Non-owner cannot edit/delete property.

## C. News Flow

- [ ] `GET /api/news/` shows published list.
- [ ] `GET /api/news/{id}/` shows detail.
- [ ] Normal user cannot create news.
- [ ] Staff can create news.

## D. Appointment Flow

- [ ] User can create appointment.
- [ ] Owner sees appointment in owner list.
- [ ] Owner can update appointment status.
- [ ] Unauthorized actions are blocked.

## E. Prediction Flow

- [ ] `POST /api/prediction/` with valid payload returns expected output.
- [ ] Invalid payload returns `400`.
- [ ] FE shows clear error state when prediction fails.

## F. Security/Contract Checks

- [ ] FE does not log access token.
- [ ] No FE crash due to BE/FE field mismatch.
- [ ] Mutating endpoints require valid auth.
- [ ] FE handles API error fallback consistently.

## T020 Mandatory Smoke (2026-04-07)

| Flow | Result | Evidence |
|---|---|---|
| 1. register/login | PASS | `flow_1_auth.pass=true` |
| 2. list properties | PASS | `flow_2_list_properties.pass=true` |
| 3. property detail | PASS | `flow_3_property_detail.pass=true` |
| 4. news list | PASS | `flow_4_news_list.pass=true` |
| 5. create appointment | PASS | `flow_5_create_appointment.pass=true` |
| 6. prediction | PASS | `flow_6_prediction.pass=true` |

- Evidence file: `tasks-manager/task/plan-002/evidence/plan002-e2e-smoke-report.json`
