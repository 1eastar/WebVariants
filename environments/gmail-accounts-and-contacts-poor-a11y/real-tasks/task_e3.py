# Task: Remove the expired delegate.


def verify(state: dict) -> tuple[bool, str]:
    delegates = state.get("delegates", [])
    expired = [d for d in delegates if d.get("status") == "expired"]

    if len(expired) == 0:
        return True, "No expired delegates remain."
    else:
        names = [d.get("name", d.get("email", "unknown")) for d in expired]
        return False, f"Found {len(expired)} expired delegate(s): {', '.join(names)}."
