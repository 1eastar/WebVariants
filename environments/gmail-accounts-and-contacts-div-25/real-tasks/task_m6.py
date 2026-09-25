# Task: Turn off all four notification types.


def verify(state: dict) -> tuple[bool, str]:
    errors = []

    notif = state.get("accountSettings", {}).get("notificationSettings", {})
    for key in ["delegateActivity", "contactChanges", "securityAlerts", "linkedServiceUpdates"]:
        val = notif.get(key)
        if val is not False:
            errors.append(f"Expected notificationSettings.{key} to be false, got {val}")

    if errors:
        return False, "; ".join(errors)
    return True, "All four notification types turned off."
