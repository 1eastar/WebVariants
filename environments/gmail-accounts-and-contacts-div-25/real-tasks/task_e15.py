# Task: Phone visibility to everyone.


def verify(state: dict) -> tuple[bool, str]:
    privacy = state.get("accountSettings", {}).get("privacySettings", {})
    show_phone = privacy.get("showPhone")

    if show_phone == "everyone":
        return True, "Phone visibility is now set to everyone."
    else:
        return False, f"showPhone is '{show_phone}', expected 'everyone'."
