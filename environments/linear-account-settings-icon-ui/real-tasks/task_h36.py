# Task: Revoke all API keys except most recently used, revoke read-only OAuth apps.

def verify(state: dict) -> tuple[bool, str]:
    failures = []

    # Most recently used API key: CI/CD Pipeline (2026-03-06T07:15:00Z) — keep
    api_keys = state.get("apiKeys", [])
    labels = {k.get("label") for k in api_keys}
    if "CI/CD Pipeline" not in labels:
        failures.append("'CI/CD Pipeline' should be kept (most recently used)")
    revoked_should_be = {"Slack Bot Integration", "Data Export Script",
                         "Mobile App Testing", "Monitoring Dashboard"}
    still_present = labels & revoked_should_be
    if still_present:
        failures.append(f"API keys that should be revoked: {still_present}")

    # Read-only OAuth apps (no write permissions): Notion, Linear Exporter, Screenful
    apps = state.get("authorizedApps", [])
    app_names = {a.get("name") for a in apps}
    read_only_remaining = app_names & {"Notion Integration", "Linear Exporter", "Screenful"}
    if read_only_remaining:
        failures.append(f"Read-only OAuth apps still present: {read_only_remaining}")

    # Apps with write permissions should remain
    write_apps = {"Raycast", "Zapier", "Marker.io"}
    missing_write = write_apps - app_names
    if missing_write:
        failures.append(f"Write-permission apps incorrectly revoked: {missing_write}")

    if failures:
        return False, "; ".join(failures)
    return True, "Only most recently used API key kept; read-only OAuth apps revoked."
