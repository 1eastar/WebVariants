"""Set auto-advance to go to the previous (older) conversation."""



def verify(state: dict) -> tuple[bool, str]:
    auto_advance = state.get("settings", {}).get("autoAdvance")
    if auto_advance == "older":
        return True, "Auto-advance is set to 'older'."
    return False, f"Expected autoAdvance to be 'older', got {auto_advance!r}."
