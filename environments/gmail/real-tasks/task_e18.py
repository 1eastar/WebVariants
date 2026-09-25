"""
Task: Turn off keyboard shortcuts.
Verify: state["settings"]["keyboardShortcutsEnabled"] == False.
"""



def verify(state: dict) -> tuple[bool, str]:
    settings = state.get("settings", {})

    shortcuts_enabled = settings.get("keyboardShortcutsEnabled")
    if shortcuts_enabled is not False:
        return False, (
            f"Keyboard shortcuts are not disabled. "
            f"keyboardShortcutsEnabled={shortcuts_enabled}"
        )

    return True, "Keyboard shortcuts are disabled (keyboardShortcutsEnabled=False)."
