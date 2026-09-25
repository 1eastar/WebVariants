def verify(state: dict) -> tuple[bool, str]:
    issues = state.get("issues", [])
    labels = state.get("labels", [])

    target_title = "Build real-time collaborative editing for issue descriptions"
    issue = next((i for i in issues if i.get("title") == target_title), None)

    if issue is None:
        return False, f"Could not find issue with title '{target_title}'."

    label = next((l for l in labels if l.get("title") == "needs-discussion"), None)

    if label is None:
        # Label doesn't exist at all, so it's definitely not on the issue
        return True, f"Label 'needs-discussion' does not exist and is not on issue '{target_title}'."

    label_id = label.get("id")
    issue_labels = issue.get("labels", [])

    if label_id in issue_labels:
        return False, f"Label 'needs-discussion' is still on issue '{target_title}'."

    return True, f"Label 'needs-discussion' has been removed from issue '{target_title}'."
