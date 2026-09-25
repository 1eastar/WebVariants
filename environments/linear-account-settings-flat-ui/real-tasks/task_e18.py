# Task: Turn off the open in desktop app setting.

def verify(state: dict) -> tuple[bool, str]:
    val = state.get("preferences", {}).get("openInDesktopApp")
    if val is False:
        return True, "Open in desktop app is disabled"
    return False, f"openInDesktopApp is {val}, expected False"
