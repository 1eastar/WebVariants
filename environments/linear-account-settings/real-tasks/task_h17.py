# Task: Enable all notification types for desktop notifications, including cycle updates.

def verify(state: dict) -> tuple[bool, str]:
    desktop = state.get("notificationSettings", {}).get("desktop", {})

    fields = [
        "enabled", "issueAssigned", "issueStatusChanged",
        "issueCommented", "issueMentioned", "projectUpdated", "cycleUpdated",
    ]

    failures = []
    for field in fields:
        val = desktop.get(field)
        if val != True:
            failures.append(f"desktop.{field}: expected True, got {val}")

    if failures:
        return False, "; ".join(failures)
    return True, "All desktop notification types enabled."
