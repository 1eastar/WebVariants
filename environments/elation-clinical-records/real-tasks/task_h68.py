def verify(state: dict) -> tuple[bool, str]:
    """All appointment types using Complete H&P changed to H&P Single Column. Others unchanged."""
    # Expected formats after the change
    # Original complete_hp types → hp_single
    # Others stay as-is
    expected = {
        "Office Visit": "hp_single",       # was complete_hp
        "Annual Exam": "hp_single",         # was complete_hp
        "Telehealth Visit": "hp_single",    # was already hp_single
        "Flu Shot": "simple",               # unchanged
        "COVID Vaccine": "simple",          # unchanged
        "Follow-Up": "hp_single",           # was complete_hp
        "Procedure": "hp_single",           # was complete_hp
        "Urgent Same-Day": "hp_single",     # was complete_hp
        "Well Child Check": "hp_single",    # was complete_hp
        "Pre-Op Clearance": "pre_op",       # unchanged
    }

    errors = []
    for apt in state.get("appointmentTypes", []):
        name = apt.get("name", "")
        fmt = apt.get("noteFormat", "")
        if name in expected and fmt != expected[name]:
            errors.append(f"'{name}' format should be '{expected[name]}', got '{fmt}'.")

    if errors:
        return False, " ".join(errors)
    return True, "All appointment types with Complete H&P changed to H&P Single Column."
