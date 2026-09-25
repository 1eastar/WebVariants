# Task: Switch 2FA to security key and turn off remember password.


def verify(state: dict) -> tuple[bool, str]:
    errors = []

    login_settings = state.get("accountSettings", {}).get("loginSettings", {})

    two_factor_method = login_settings.get("twoFactorMethod")
    if two_factor_method != "security_key":
        errors.append(f"Expected twoFactorMethod to be 'security_key', got '{two_factor_method}'")

    remember_password = login_settings.get("rememberPassword")
    if remember_password is not False:
        errors.append(f"Expected rememberPassword to be false, got {remember_password}")

    if errors:
        return False, "; ".join(errors)
    return True, "2FA switched to security key and remember password turned off."
