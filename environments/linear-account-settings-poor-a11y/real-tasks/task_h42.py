# Task: Create API key named after app with most permissions, then revoke that app.

def verify(state: dict) -> tuple[bool, str]:
    failures = []

    # Zapier has the most permissions (5). Create API key "Zapier", revoke Zapier.
    api_keys = state.get("apiKeys", [])
    key_labels = [k.get("label") for k in api_keys]
    if "Zapier" not in key_labels:
        failures.append("Expected an API key labeled 'Zapier'")

    apps = state.get("authorizedApps", [])
    app_names = [a.get("name") for a in apps]
    if "Zapier" in app_names:
        failures.append("Zapier OAuth app should have been revoked")

    if failures:
        return False, "; ".join(failures)
    return True, "API key 'Zapier' created and Zapier OAuth app revoked."
