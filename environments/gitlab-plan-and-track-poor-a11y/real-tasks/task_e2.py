def verify(state: dict) -> tuple[bool, str]:
    epics = state.get("epics", [])

    target_title = "Analytics Dashboard"
    epic = next((e for e in epics if e.get("title") == target_title), None)

    if epic is None:
        return False, f"Could not find epic with title '{target_title}'."

    if epic.get("status") != "open":
        return False, f"Epic '{target_title}' status is '{epic.get('status')}', expected 'open'."

    return True, f"Epic '{target_title}' is open."
