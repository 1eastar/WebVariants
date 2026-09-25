# Task: Turn off email notifications for status changes but turn on notifications for comments.

def verify(state: dict) -> tuple[bool, str]:
    email_notifs = state.get("notificationSettings", {}).get("email", {})
    status_changed = email_notifs.get("issueStatusChanged")
    commented = email_notifs.get("issueCommented")
    errors = []
    if status_changed is not False:
        errors.append(f"Expected issueStatusChanged == False, got {status_changed}")
    if commented is not True:
        errors.append(f"Expected issueCommented == True, got {commented}")
    if errors:
        return False, "; ".join(errors)
    return True, "Email notification settings updated correctly."
