"""
Task: Check your profile visibility. If it's 'Community', change it to
'Employers'. Then find the employer whose testimonial mentions 'AI safety'
and save both their active jobs.

Discovery: 'AI safety' → Anthropic (emp_15), Chris Wu's testimonial.
Active jobs: job_12, job_29.
Profile visibility: seed = 'Community' → change to 'Employers'.

Verify:
(1) profileVisibility == 'Employers'
(2) job_12 in savedJobIds
(3) job_29 in savedJobIds
"""



def verify(state: dict) -> tuple[bool, str]:
    errors = []
    user = state.get("currentUser", {})

    vis = user.get("profileVisibility")
    if vis != "Employers":
        errors.append(f"profileVisibility is '{vis}', expected 'Employers'.")

    saved = user.get("savedJobIds", [])
    for jid in ["job_12", "job_29"]:
        if jid not in saved:
            errors.append(f"{jid} not in savedJobIds.")

    if errors:
        return False, " | ".join(errors)
    return True, (
        "Profile visibility changed to Employers. "
        "Anthropic identified via 'AI safety' testimonial. Both jobs saved."
    )
