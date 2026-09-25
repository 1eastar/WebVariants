# Task: Create contact Jordan Wells with email jordan.wells@wellsfargo.com and company Wells Fargo.


def verify(state: dict) -> tuple[bool, str]:
    errors = []

    contacts = state.get("contacts", [])
    match = [
        c for c in contacts
        if c.get("firstName") == "Jordan"
        and c.get("lastName") == "Wells"
        and c.get("email") == "jordan.wells@wellsfargo.com"
        and c.get("company") == "Wells Fargo"
    ]

    if not match:
        errors.append(
            "No contact found with firstName='Jordan', lastName='Wells', "
            "email='jordan.wells@wellsfargo.com', company='Wells Fargo'"
        )

    if errors:
        return False, "; ".join(errors)
    return True, "Contact Jordan Wells created with correct email and company."
