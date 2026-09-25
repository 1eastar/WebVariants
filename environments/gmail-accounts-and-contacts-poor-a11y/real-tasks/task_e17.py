# Task: Turn off linked service notifications.


def verify(state: dict) -> tuple[bool, str]:
    notifications = state.get("accountSettings", {}).get("notificationSettings", {})
    linked_updates = notifications.get("linkedServiceUpdates")

    if linked_updates is False:
        return True, "Linked service update notifications are now disabled."
    else:
        return False, f"linkedServiceUpdates is {linked_updates}, expected false."
