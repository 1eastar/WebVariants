def verify(state: dict) -> tuple[bool, str]:
    offers = state.get("offers")
    if offers is None:
        return False, "offers not found in state."

    nike_offer = None
    for offer in offers:
        name = offer.get("merchantName", "")
        if "Nike" == name:
            nike_offer = offer
            break

    if nike_offer is None:
        return False, "Nike offer not found in offers list."

    if nike_offer.get("status") != "saved":
        return False, f"Nike offer status is '{nike_offer.get('status')}', expected 'saved'."

    return True, "Nike cashback offer has been saved."
