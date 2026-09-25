# Task: Increase the font size to Large.

def verify(state: dict) -> tuple[bool, str]:
    size = state.get("preferences", {}).get("fontSize")
    if size == "Large":
        return True, "Font size is set to Large."
    return False, f"Expected fontSize 'Large', got '{size}'."
