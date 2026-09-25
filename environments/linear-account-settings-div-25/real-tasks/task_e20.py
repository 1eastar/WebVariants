# Task: Stop showing full names and use usernames instead.

def verify(state: dict) -> tuple[bool, str]:
    val = state.get("preferences", {}).get("displayFullNames")
    if val is False:
        return True, "Display full names is disabled"
    return False, f"displayFullNames is {val}, expected False"
