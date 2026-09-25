"""
Task: Switch to compact display density.
Verify: state["settings"]["density"] == "compact".
"""



def verify(state: dict) -> tuple[bool, str]:
    settings = state.get("settings", {})

    density = settings.get("density")
    if density != "compact":
        return False, (
            f"Display density is not 'compact'. "
            f"density='{density}'"
        )

    return True, "Display density is set to 'compact'."
