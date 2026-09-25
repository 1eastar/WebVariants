def verify(state: dict) -> tuple[bool, str]:
    settings = state.get("invoiceSettings", {})

    prefix = settings.get("invoicePrefix")
    if prefix != "TAX-":
        return False, f"Expected invoicePrefix to be 'TAX-', got '{prefix}'."

    return True, "Invoice prefix has been changed to 'TAX-' successfully."
