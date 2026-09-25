# Disconnect the GitLab account

def verify(state: dict) -> tuple[bool, str]:
    accounts = state.get("connectedAccounts", [])
    providers = [a.get("provider") for a in accounts]
    if "GitLab" in providers:
        return False, "GitLab account is still connected"
    return True, "GitLab account has been disconnected"
