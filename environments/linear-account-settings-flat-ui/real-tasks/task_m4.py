# Task: Create a new API key labeled 'Staging Environment'.

def verify(state: dict) -> tuple[bool, str]:
    api_keys = state.get("apiKeys", [])
    for key in api_keys:
        if key.get("label") == "Staging Environment":
            return True, "API key 'Staging Environment' found."
    return False, f"No API key with label 'Staging Environment' found. Keys: {[k.get('label') for k in api_keys]}"
