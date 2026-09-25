def verify(state: dict) -> tuple[bool, str]:
    reminders = state.get("invoiceReminders", [])
    for r in reminders:
        if r.get("timing") == "after" and r.get("days") == 14:
            return False, "14-day overdue reminder still exists."

    return True, "14-day overdue reminder has been deleted."
