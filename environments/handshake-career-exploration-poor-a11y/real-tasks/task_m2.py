def verify(state: dict) -> tuple[bool, str]:
    roles = state.get("currentUser", {}).get("careerInterests", {}).get("roles", [])

    if "Machine Learning Engineer" in roles:
        return True, f"'Machine Learning Engineer' found in preferred roles: {roles}"
    return False, f"'Machine Learning Engineer' not found in preferred roles. Current roles: {roles}"
