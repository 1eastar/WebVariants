def verify(state: dict) -> tuple[bool, str]:
    career_community = (
        state.get("currentUser", {})
        .get("careerInterests", {})
        .get("careerCommunity", "")
    )

    if career_community == "Science & Research":
        return True, f"Career community successfully changed to '{career_community}'."
    return False, (
        f"Career community is '{career_community}', expected 'Science & Research'."
    )
