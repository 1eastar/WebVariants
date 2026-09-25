"""
Task: Turn off conversation view.
Verify: state["settings"]["conversationView"] == False.
"""



def verify(state: dict) -> tuple[bool, str]:
    settings = state.get("settings", {})

    conversation_view = settings.get("conversationView")
    if conversation_view is not False:
        return False, (
            f"Conversation view is not turned off. "
            f"conversationView={conversation_view} (expected False)"
        )

    return True, "Conversation view is turned off (conversationView=False)."
