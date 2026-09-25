def verify(state: dict) -> tuple[bool, str]:
    settings = state.get("invoiceSettings", {})

    if settings.get("showItemCode") is not False:
        return False, f"Expected showItemCode to be False, got {settings.get('showItemCode')}."

    return True, "Item code column has been hidden successfully."
