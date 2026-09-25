# Task: Set the default home view to My Issues.

def verify(state: dict) -> tuple[bool, str]:
    view = state.get("preferences", {}).get("defaultHomeView")
    if view == "My Issues":
        return True, "Default home view is 'My Issues'."
    return False, f"Expected defaultHomeView 'My Issues', got '{view}'."
