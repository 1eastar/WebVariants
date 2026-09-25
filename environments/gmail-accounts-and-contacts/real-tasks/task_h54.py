# Task: Find CFO financial advisor, update secondary email, add Emergency label.


def verify(state: dict) -> tuple[bool, str]:
    errors = []

    contacts = state.get("contacts", [])

    # David Kim is the CFO / financial advisor
    david = None
    for c in contacts:
        if c.get("firstName") == "David" and c.get("lastName") == "Kim":
            david = c
            break

    if david is None:
        errors.append("David Kim not found")
    else:
        if david.get("secondaryEmail") != "david.kim@financeplus.com":
            errors.append(
                f"David Kim secondary email is '{david.get('secondaryEmail')}' "
                "instead of 'david.kim@financeplus.com'"
            )
        if "clabel_10" not in david.get("labels", []):
            errors.append("David Kim should have the Emergency label")

    if errors:
        return False, "; ".join(errors)
    return True, "David Kim (CFO) secondary email updated and Emergency label added."
