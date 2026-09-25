def verify(state: dict) -> tuple[bool, str]:
    """Verify pat_32 (MRI brain patient) has sharing level 3 and High Risk tag."""
    pat_32 = None
    for p in state.get("patients", []):
        if p.get("id") == "pat_32":
            pat_32 = p
            break

    if not pat_32:
        return False, "Patient pat_32 (Priya Sharma) not found"

    errors = []

    level = pat_32.get("passportSharingLevel")
    if level != 3:
        errors.append(f"Sharing level is {level}, expected 3")

    tags = pat_32.get("tags", [])
    if "High Risk" not in tags:
        errors.append(f"Missing 'High Risk' tag. Tags: {tags}")

    if errors:
        return False, "; ".join(errors)
    return True, "pat_32 (Priya Sharma) updated: sharing level 3 and High Risk tag added"
