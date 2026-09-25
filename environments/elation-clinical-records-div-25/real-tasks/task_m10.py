def verify(state: dict) -> tuple[bool, str]:
    appointment_types = state.get("appointmentTypes", [])
    target_apt = None
    for apt in appointment_types:
        if apt.get("name") == "Follow-Up":
            target_apt = apt
            break

    if target_apt is None:
        apt_names = [a.get("name") for a in appointment_types]
        return False, f"Could not find appointment type named 'Follow-Up'. Current types: {apt_names}"

    note_template = target_apt.get("noteTemplate", "")
    if note_template != "tmpl_007":
        return False, f"Follow-Up appointment noteTemplate is '{note_template}', expected 'tmpl_007' (Hypertension Follow-Up)."

    return True, "Successfully verified that Follow-Up appointment type now uses the Hypertension Follow-Up template."
