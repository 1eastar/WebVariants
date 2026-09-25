def verify(state: dict) -> tuple[bool, str]:
    """Verify that Stephanie Rivera's Passport account has been disabled."""
    patients = state.get("patients", [])
    patient = None
    for pat in patients:
        if pat.get("firstName") == "Stephanie" and pat.get("lastName") == "Rivera":
            patient = pat
            break

    if patient is None:
        return False, "Patient Stephanie Rivera not found"

    disabled = patient.get("passportAccountDisabled")
    if disabled is not True:
        return False, f"Stephanie Rivera passportAccountDisabled is {disabled}, expected True"

    passport_status = patient.get("passportStatus")
    if passport_status != "not_invited":
        return False, (
            f"Stephanie Rivera passportStatus is '{passport_status}', expected 'not_invited' "
            f"after disabling the account"
        )

    return True, "Stephanie Rivera's Passport account has been disabled"
