"""Add the Projects label to the office renovation email from Daniel Thompson."""



def verify(state: dict) -> tuple[bool, str]:
    emails = state.get("emails", [])
    target = next((e for e in emails if e.get("id") == 17), None)
    if target is None:
        return False, "Email with id=17 (Office Renovation Plans) not found."

    labels = target.get("labels", [])
    if "label_9" in labels:
        return True, "Email 17 (Office Renovation Plans) has the Projects label (label_9)."
    return False, f"Expected 'label_9' (Projects) in labels, got {labels!r}."
