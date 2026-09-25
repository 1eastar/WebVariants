def verify(state: dict) -> tuple[bool, str]:
    invoices = state.get("invoices", [])

    # INV-0061: Greenfield February invoice, should be fully paid
    inv_061 = next((i for i in invoices if i.get("number") == "INV-0061"), None)
    if inv_061 is None:
        return False, "Invoice INV-0061 not found."
    if inv_061.get("status") != "paid":
        return False, f"Expected INV-0061 status 'paid', got '{inv_061.get('status')}'."
    if abs(inv_061.get("amountDue", 9999)) > 0.01:
        return False, f"Expected INV-0061 amountDue=0, got {inv_061.get('amountDue')}."

    # INV-0044: Greenfield January invoice (paid), should now be voided
    inv_044 = next((i for i in invoices if i.get("number") == "INV-0044"), None)
    if inv_044 is None:
        return False, "Invoice INV-0044 not found."
    if inv_044.get("status") != "voided":
        return False, f"Expected INV-0044 status 'voided', got '{inv_044.get('status')}'."

    return True, "INV-0061 (Feb) fully paid; INV-0044 (Jan) voided."
