def verify(state: dict) -> tuple[bool, str]:
    paypal_credit = state.get("paypalCredit")
    if paypal_credit is None:
        return False, "paypalCredit not found in state."

    if paypal_credit.get("autopayEnabled") is not False:
        return False, f"Autopay is still enabled (autopayEnabled={paypal_credit.get('autopayEnabled')})."

    return True, "Autopay on PayPal Credit has been turned off."
