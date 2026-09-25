def verify(state: dict) -> tuple[bool, str]:
    invoices = state.get("invoices", [])
    inv = None
    for i in invoices:
        if i.get("number") == "INV-0056":
            inv = i
            break

    if inv is None:
        return False, "Invoice INV-0056 not found."

    title = inv.get("title", "")
    if title != "Q1 Digital Campaign Work":
        return False, f"Invoice INV-0056 title is '{title}', expected 'Q1 Digital Campaign Work'."

    return True, "Invoice INV-0056 title set to 'Q1 Digital Campaign Work'."
