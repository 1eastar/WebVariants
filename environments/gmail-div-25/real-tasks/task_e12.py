"""
Task: Turn off hover actions.
Verify: state["settings"]["hoverActions"] == False.
"""



def verify(state: dict) -> tuple[bool, str]:
    settings = state.get("settings", {})

    hover_actions = settings.get("hoverActions")
    if hover_actions is not False:
        return False, (
            f"Hover actions are not disabled. "
            f"hoverActions={hover_actions}"
        )

    return True, "Hover actions are disabled (hoverActions=False)."
