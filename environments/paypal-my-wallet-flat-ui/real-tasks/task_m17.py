def verify(state: dict) -> tuple[bool, str]:
    paypal_credit = state.get("paypalCredit")
    if paypal_credit is None:
        return False, "No paypalCredit found in state."

    autopay_amount = paypal_credit.get("autopayAmount")
    if autopay_amount != "statement":
        return False, (
            f"paypalCredit.autopayAmount is '{autopay_amount}', expected 'statement'."
        )

    return True, "PayPal Credit autopay has been successfully switched to statement balance."
