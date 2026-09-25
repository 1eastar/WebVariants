def verify(state: dict) -> tuple[bool, str]:
    settings = state.get("invoiceSettings", {})
    prefix = settings.get("creditNotePrefix", "")
    if prefix != "CR-":
        return False, f"Credit note prefix is '{prefix}', expected 'CR-'."

    return True, "Credit note prefix changed to 'CR-'."
