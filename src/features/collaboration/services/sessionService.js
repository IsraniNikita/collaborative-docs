import {
  LEGACY_STORAGE_KEYS,
  STORAGE_KEYS,
} from "../constants/storageKeys";

import {
  generateSessionId,
  generateUsername,
} from "../utils/session";

export function getOrCreateSession() {
  let existingSession =
    sessionStorage.getItem(
      STORAGE_KEYS.SESSION
    );

  if (!existingSession) {
    existingSession = sessionStorage.getItem(
      LEGACY_STORAGE_KEYS.SESSION
    );

    if (existingSession) {
      sessionStorage.setItem(
        STORAGE_KEYS.SESSION,
        existingSession
      );
      sessionStorage.removeItem(
        LEGACY_STORAGE_KEYS.SESSION
      );
    }
  }

  if (existingSession) {
    return JSON.parse(existingSession);
  }

  const session = {
    id: generateSessionId(),
    username: generateUsername(),
  };

  sessionStorage.setItem(
    STORAGE_KEYS.SESSION,
    JSON.stringify(session)
  );

  return session;
}