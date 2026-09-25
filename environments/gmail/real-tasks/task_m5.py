"""
Task M5: Remove the Action Required label from the contract review email by James O'Brien.
Find email id=11, check 'label_17' NOT in labels.
"""



def verify(state: dict) -> tuple[bool, str]:
    emails = state.get("emails", [])

    target_email = None
    for email in emails:
        if email.get("id") == 11:
            target_email = email
            break

    if target_email is None:
        return False, "Email id=11 (Contract Review: Vendor Agreement) not found."

    labels = target_email.get("labels", [])
    if "label_17" in labels:
        return False, f"Email 11 still has the Action Required label (label_17). Current labels: {labels}"

    return True, "Email 11 no longer has the Action Required label (label_17)."
