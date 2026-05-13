import { memo } from "react";

import { useCollaborationContext } from "../context/CollaborationContext";

function TypingIndicatorComponent() {
  const { state, session } =
    useCollaborationContext();

  const otherTypingUsers =
    state.typingUsers.filter(
      (user) =>
        user.id !== session.id
    );

  if (
    otherTypingUsers.length === 0
  ) {
    return null;
  }

  return (
    <div className="typing-indicator">
      {otherTypingUsers.map((user) => (
        <p key={user.id}>
          {user.username} is typing...
        </p>
      ))}
    </div>
  );
}

export const TypingIndicator =
  memo(TypingIndicatorComponent);