def verify(state: dict) -> tuple[bool, str]:
    patients = state.get("patients", [])
    patient = None
    for p in patients:
        if p.get("lastName") == "Zhao":
            patient = p
            break

    if patient is None:
        return False, "Could not find patient with lastName='Zhao'."

    tags = patient.get("tags", [])
    if "Fall-Risk" not in tags:
        return False, f"Patient Helen Zhao does not have the 'Fall-Risk' tag. Current tags: {tags}"

    return True, "Successfully verified that 'Fall-Risk' tag has been added to Helen Zhao's chart."
