def verify(state: dict) -> tuple[bool, str]:
    appointments = state.get("appointments", [])

    for appt in appointments:
        category = appt.get("category", "")
        appt_type = appt.get("type", "")
        date = appt.get("date", "")
        time = appt.get("time", "")
        medium = appt.get("medium", "")
        status = appt.get("status", "")

        category_match = category in ("Resume & Cover Letter", "Resume and Cover Letter")
        type_match = appt_type == "Resume Review"
        date_match = date == "2026-03-12"
        time_match = time == "11:00 AM"
        medium_match = medium == "In Person"
        status_match = status == "requested"

        if type_match and date_match and time_match and medium_match and status_match:
            if not category_match:
                return False, (
                    f"Found matching appointment but category is '{category}' "
                    f"instead of 'Resume & Cover Letter'."
                )
            return True, (
                f"Found resume review appointment: date={date}, time={time}, "
                f"medium={medium}, status={status}, category={category}"
            )

    return False, (
        f"No appointment found with type='Resume Review', date='2026-03-12', "
        f"time='11:00 AM', medium='In Person', status='requested'. "
        f"Current appointments: {appointments}"
    )
