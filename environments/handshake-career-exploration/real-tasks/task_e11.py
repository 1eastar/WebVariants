def verify(state: dict) -> tuple[bool, str]:
    # Find event evt_04 (Google Tech Talk on building scalable ML systems)
    events = state.get("events", [])
    evt_04 = None
    for event in events:
        if event.get("id") == "evt_04":
            evt_04 = event
            break

    if evt_04 is None:
        return False, "Event evt_04 (Google Tech Talk) not found in state."

    if not evt_04.get("rsvped"):
        return False, f"Event evt_04 rsvped is {evt_04.get('rsvped')}, expected True."

    rsvp_count = evt_04.get("rsvpCount", 0)
    if rsvp_count <= 156:
        return False, f"Event evt_04 rsvpCount is {rsvp_count}, expected > 156."

    return True, "Successfully registered for the Google Tech Talk. rsvped=True and rsvpCount > 156."
