def verify(state: dict) -> tuple[bool, str]:
    """Add 'Active-Plan' tag to every patient with at least one active care plan."""
    # Find patients with active care plans
    patients_with_active_plan = set()
    for cp in state.get("carePlans", []):
        if cp.get("status", "").lower() == "active":
            patients_with_active_plan.add(cp.get("patientId"))

    errors = []
    tagged_names = []
    for patient in state.get("patients", []):
        pid = patient.get("id", "")
        last_name = patient.get("lastName", "?")
        tags = patient.get("tags", [])

        if pid in patients_with_active_plan:
            if "Active-Plan" not in tags:
                errors.append(f"{last_name} has an active care plan but missing 'Active-Plan' tag.")
            else:
                tagged_names.append(last_name)

    if errors:
        return False, " ".join(errors)
    return True, (
        f"All {len(patients_with_active_plan)} patients with active care plans "
        f"({', '.join(tagged_names)}) have 'Active-Plan' tag."
    )
