def verify(state: dict) -> tuple[bool, str]:
    paypal_debit = state.get("paypalDebitCard")
    if paypal_debit is None:
        return False, "paypalDebitCard not found in state."

    direct_deposit = paypal_debit.get("directDeposit")
    if direct_deposit is None:
        return False, "directDeposit not found in paypalDebitCard."

    if direct_deposit.get("enabled") is not False:
        return False, f"Direct deposit is still enabled (enabled={direct_deposit.get('enabled')})."

    return True, "Direct deposit on debit card has been disabled."
