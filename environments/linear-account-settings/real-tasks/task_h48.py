# Task: Disconnect fewest-scopes account, revoke least-accessed OAuth, create API key named after disconnected provider.

def verify(state: dict) -> tuple[bool, str]:
    failures = []

    # Fewest scopes: Figma (1 scope: file_read). Disconnect Figma.
    accounts = state.get("connectedAccounts", [])
    providers = [a.get("provider") for a in accounts]
    if "Figma" in providers:
        failures.append("Figma should have been disconnected (fewest scopes)")

    # Least recently accessed OAuth: Linear Exporter (2026-02-15). Revoke it.
    apps = state.get("authorizedApps", [])
    app_names = [a.get("name") for a in apps]
    if "Linear Exporter" in app_names:
        failures.append("Linear Exporter should have been revoked (least recently accessed)")

    # API key labeled 'Figma'
    api_keys = state.get("apiKeys", [])
    key_labels = [k.get("label") for k in api_keys]
    if "Figma" not in key_labels:
        failures.append("Expected an API key labeled 'Figma'")

    if failures:
        return False, "; ".join(failures)
    return True, "Figma disconnected, Linear Exporter revoked, API key 'Figma' created."
