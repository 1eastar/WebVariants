# Task: The Engineering Manager at TechCorp is a delegate. Remove her delegation and unstar her contact.


def verify(state: dict) -> tuple[bool, str]:
    errors = []

    delegates = state.get("delegates", [])
    contacts = state.get("contacts", [])

    # Maya Patel is the Engineering Manager at TechCorp
    # She should be removed from delegates
    for d in delegates:
        if d.get("email") == "maya.patel@techcorp.io":
            errors.append("Maya Patel (maya.patel@techcorp.io) still exists as a delegate")

    # Her contact should be unstarred
    for c in contacts:
        if c.get("firstName") == "Maya" and c.get("lastName") == "Patel":
            if c.get("isStarred"):
                errors.append("Maya Patel's contact is still starred")
            break
    else:
        errors.append("Maya Patel contact not found")

    if errors:
        return False, "; ".join(errors)
    return True, "Maya Patel's delegate access removed and contact unstarred."
