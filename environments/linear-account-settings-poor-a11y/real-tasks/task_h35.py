# Task: Disconnect account with different email domain, set home view to Favorited Views.

def verify(state: dict) -> tuple[bool, str]:
    failures = []

    # Google uses gmail.com (different from acmecorp.io)
    accounts = state.get("connectedAccounts", [])
    providers = [a.get("provider") for a in accounts]
    if "Google" in providers:
        failures.append("Google account still connected (uses different email domain)")

    home_view = state.get("preferences", {}).get("defaultHomeView")
    if home_view != "Favorited Views":
        failures.append(f"Expected home view 'Favorited Views', got '{home_view}'")

    if failures:
        return False, "; ".join(failures)
    return True, "Account with different domain disconnected and home view set to Favorited Views."
