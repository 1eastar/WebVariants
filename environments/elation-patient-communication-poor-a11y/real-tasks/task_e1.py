def verify(state: dict) -> tuple[bool, str]:
    """Verify that Janet Okonkwo's message about her blood sugar is marked as read."""
    letters = state.get("patientLetters", [])
    letter = None
    for ltr in letters:
        if ltr.get("id") == "ltr_20":
            letter = ltr
            break

    if letter is None:
        return False, "Letter ltr_20 (Janet Okonkwo's blood sugar message) not found in patientLetters"

    if not letter.get("isRead"):
        return False, f"Letter ltr_20 isRead is {letter.get('isRead')}, expected True"

    if letter.get("readAt") is None:
        return False, "Letter ltr_20 readAt is None, expected a timestamp"

    return True, "Janet Okonkwo's blood sugar message (ltr_20) is marked as read"
