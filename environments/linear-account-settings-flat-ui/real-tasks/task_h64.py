# Task: Revoke session with lowest browser version, create API key with that city.

def verify(state: dict) -> tuple[bool, str]:
    failures = []

    # Lowest version: Linear Desktop 2.5 (sess_03), city = San Francisco
    sessions = state.get("sessions", [])
    session_names = [s.get("deviceName") for s in sessions]
    if "Linear Desktop on macOS" in session_names:
        failures.append("Session 'Linear Desktop on macOS' should have been revoked (browser version 2.5 is lowest)")

    api_keys = state.get("apiKeys", [])
    key_labels = [k.get("label") for k in api_keys]
    if "San Francisco" not in key_labels:
        failures.append("Expected an API key labeled 'San Francisco'")

    if failures:
        return False, "; ".join(failures)
    return True, "Revoked Linear Desktop session and created 'San Francisco' API key."
