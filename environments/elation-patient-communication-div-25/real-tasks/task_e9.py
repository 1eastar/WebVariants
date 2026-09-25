def verify(state: dict) -> tuple[bool, str]:
    """Verify that Dr. Chen's unread letter alert timeframe is changed to 72 hours."""
    providers = state.get("providers", [])
    provider = None
    for prov in providers:
        if prov.get("firstName") == "Sarah" and prov.get("lastName") == "Chen":
            provider = prov
            break

    if provider is None:
        return False, "Provider Dr. Sarah Chen not found"

    timeframe = provider.get("notificationTimeframe")
    if timeframe != "72_hours":
        return False, f"Dr. Chen's notificationTimeframe is '{timeframe}', expected '72_hours'"

    return True, "Dr. Chen's unread letter alert timeframe is set to 72 hours"
