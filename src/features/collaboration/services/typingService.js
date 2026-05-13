const TYPING_PREFIX =
  "syncwrite_typing_";

export function saveTypingState(user) {
  localStorage.setItem(
    `${TYPING_PREFIX}${user.id}`,
    JSON.stringify(user)
  );
}

export function removeTypingState(userId) {
  localStorage.removeItem(
    `${TYPING_PREFIX}${userId}`
  );
}

export function loadTypingUsers() {
  const typingUsers = [];

  Object.keys(localStorage).forEach((key) => {
    if (!key.startsWith(TYPING_PREFIX)) {
      return;
    }

    try {
      const user = JSON.parse(
        localStorage.getItem(key)
      );

      typingUsers.push(user);
    } catch (error) {
      console.error(
        "Failed to parse typing user"
      );
    }
  });

  return typingUsers;
}