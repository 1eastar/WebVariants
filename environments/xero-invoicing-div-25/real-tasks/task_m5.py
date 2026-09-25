def verify(state: dict) -> tuple[bool, str]:
    repeating = state.get("repeatingInvoices", [])
    rep = None
    for r in repeating:
        if r.get("id") == "rep_002":
            rep = r
            break

    if rep is None:
        return False, "Repeating invoice rep_002 (CloudNine Analytics) not found."

    frequency = rep.get("frequency", "")
    if frequency != "quarterly":
        return False, f"Repeating invoice rep_002 frequency is '{frequency}', expected 'quarterly'."

    return True, "CloudNine Analytics repeating invoice frequency changed to quarterly."
