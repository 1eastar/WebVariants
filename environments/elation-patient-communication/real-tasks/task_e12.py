def verify(state: dict) -> tuple[bool, str]:
    """Verify that East Bay Clinic has been removed from practice locations."""
    practice_settings = state.get("practiceSettings", {})
    locations = practice_settings.get("practiceLocations", [])

    for loc in locations:
        if loc.get("name") == "East Bay Clinic":
            return False, "East Bay Clinic still exists in practiceSettings.practiceLocations"

    return True, "East Bay Clinic has been removed from practice locations"
