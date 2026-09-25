# Task: Change the email to 'alex.morgan@newcompany.com'.

def verify(state: dict) -> tuple[bool, str]:
    email = state.get("currentUser", {}).get("email", "")
    if email != "alex.morgan@newcompany.com":
        return False, f"Expected email 'alex.morgan@newcompany.com', got '{email}'"
    return True, "Email updated correctly."
