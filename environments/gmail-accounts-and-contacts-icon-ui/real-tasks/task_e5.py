# Task: Unlink YouTube.


def verify(state: dict) -> tuple[bool, str]:
    services = state.get("linkedServices", [])
    for svc in services:
        if svc.get("name") == "YouTube":
            if svc.get("isLinked") is False:
                return True, "YouTube is now unlinked."
            else:
                return False, f"YouTube isLinked is {svc.get('isLinked')}, expected false."

    return False, "Linked service 'YouTube' not found in state."
