def verify(state: dict) -> tuple[bool, str]:
    templates = state.get("visitNoteTemplates", [])
    for t in templates:
        if t.get("name") == "Injectable Administration":
            return False, "Template 'Injectable Administration' still exists in visitNoteTemplates."

    return True, "Successfully verified that 'Injectable Administration' template has been deleted."
