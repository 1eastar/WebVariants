"""Change button labels to show text instead of icons."""



def verify(state: dict) -> tuple[bool, str]:
    button_labels = state.get("settings", {}).get("buttonLabels")
    if button_labels == "text":
        return True, "Button labels are set to 'text'."
    return False, f"Expected buttonLabels to be 'text', got {button_labels!r}."
