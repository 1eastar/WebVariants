def verify(state: dict) -> tuple[bool, str]:
    errors = []

    # Wells Fargo (5518) is the only checking account with pending_confirmation.
    # It should be removed. Other banks should remain.
    banks = state.get("bankAccounts", [])
    for b in banks:
        if b.get("lastFour") == "5518":
            errors.append("Wells Fargo (5518) still present — should have been removed.")
            break

    # Ensure other bank accounts are still present
    remaining_last_fours = {b.get("lastFour") for b in banks}
    for expected in ["6742", "3891", "1104", "7823"]:
        if expected not in remaining_last_fours:
            errors.append(f"Bank account ending in {expected} is missing — should not have been removed.")

    if errors:
        return False, " ".join(errors)
    return True, "Removed the unconfirmed checking account (Wells Fargo 5518)."
