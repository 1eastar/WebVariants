"""
Task: Remove the Meta ML Engineer Intern from saved jobs.
Verify: job_07 is NOT in currentUser.savedJobIds.
"""



def verify(state: dict) -> tuple[bool, str]:
    current_user = state.get("currentUser", {})
    saved_jobs = current_user.get("savedJobIds", [])

    if "job_07" in saved_jobs:
        return False, (
            f"Meta ML Engineer Intern (job_07) is still in currentUser.savedJobIds. "
            f"The job has not been unsaved. Currently saved jobs: {saved_jobs}"
        )

    return True, "Meta ML Engineer Intern (job_07) has been removed from saved jobs."
