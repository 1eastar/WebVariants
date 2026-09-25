def verify(state: dict) -> tuple[bool, str]:
    inv = next((i for i in state.get("invoices", []) if i.get("number") == "INV-0045"), None)
    if inv is None:
        return False, "Invoice INV-0045 not found."

    # Check payments removed
    if len(inv.get("payments", [])) > 0:
        return False, f"Expected no payments on INV-0045, found {len(inv['payments'])}."

    # Check voided
    if inv.get("status") != "voided":
        return False, f"Expected INV-0045 status 'voided', got '{inv.get('status')}'."

    return True, "INV-0045: partial payment removed and invoice voided."
