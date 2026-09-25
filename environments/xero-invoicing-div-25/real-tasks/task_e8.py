def verify(state: dict) -> tuple[bool, str]:
    credit_note = next((cn for cn in state.get("creditNotes", []) if cn.get("number") == "CN-0011"), None)
    if credit_note is None:
        return False, "Credit note CN-0011 not found."

    if credit_note.get("status") != "awaiting_payment":
        return False, f"Expected credit note CN-0011 status to be 'awaiting_payment', got '{credit_note.get('status')}'."

    return True, "Credit note CN-0011 (Pacific Freight Lines) has been approved successfully."
