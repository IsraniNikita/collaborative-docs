import {
  LEGACY_STORAGE_KEYS,
  STORAGE_KEYS,
} from "../constants/storageKeys";
import { migrateLegacyStoragePrefix } from "./legacyStorageMigration";

export function saveTypingState(user) {
  localStorage.setItem(
    `${STORAGE_KEYS.TYPING_PREFIX}${user.id}`,
    JSON.stringify(user)
  );
}

export function removeTypingState(userId) {
  localStorage.removeItem(
    `${STORAGE_KEYS.TYPING_PREFIX}${userId}`
  );
  localStorage.removeItem(
    `${LEGACY_STORAGE_KEYS.TYPING_PREFIX}${userId}`
  );
}

export function loadTypingUsers() {
  migrateLegacyStoragePrefix(
    localStorage,
    LEGACY_STORAGE_KEYS.TYPING_PREFIX,
    STORAGE_KEYS.TYPING_PREFIX
  );

  const typingUsers = [];

  Object.keys(localStorage).forEach((key) => {
    if (!key.startsWith(STORAGE_KEYS.TYPING_PREFIX)) {
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