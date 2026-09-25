def verify(state: dict) -> tuple[bool, str]:
    patients = state.get("patients", [])
    patient = None
    for p in patients:
        if p.get("lastName") == "Washington":
            patient = p
            break

    if patient is None:
        return False, "Could not find patient with lastName='Washington'."

    tags = patient.get("tags", [])
    if "Immunizations-Due" in tags:
        return False, f"Patient Aaliyah Washington still has the 'Immunizations-Due' tag. Current tags: {tags}"

    return True, "Successfully verified that 'Immunizations-Due' tag has been removed from Aaliyah Washington."
