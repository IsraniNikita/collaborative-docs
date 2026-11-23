import {
  LEGACY_STORAGE_KEYS,
  STORAGE_KEYS,
} from "../constants/storageKeys";

export function migrateLegacyStorageKey(
  storage,
  legacyKey,
  currentKey
) {
  const legacyValue = storage.getItem(legacyKey);

  if (legacyValue === null) {
    return;
  }

  if (storage.getItem(currentKey) === null) {
    storage.setItem(currentKey, legacyValue);
  }

  storage.removeItem(legacyKey);
}

export function migrateLegacyStoragePrefix(
  storage,
  legacyPrefix,
  currentPrefix
) {
  Object.keys(storage).forEach((key) => {
    if (!key.startsWith(legacyPrefix)) {
      return;
    }

    migrateLegacyStorageKey(
      storage,
      key,
      `${currentPrefix}${key.slice(legacyPrefix.length)}`
    );
  });
}

export function migrateLegacyStorage() {
  migrateLegacyStorageKey(
    localStorage,
    LEGACY_STORAGE_KEYS.DOCUMENT,
    STORAGE_KEYS.DOCUMENT
  );
  migrateLegacyStorageKey(
    localStorage,
    LEGACY_STORAGE_KEYS.COLLABORATORS,
    STORAGE_KEYS.COLLABORATORS
  );
  migrateLegacyStorageKey(
    localStorage,
    LEGACY_STORAGE_KEYS.TYPING_USERS,
    STORAGE_KEYS.TYPING_USERS
  );
  migrateLegacyStorageKey(
    sessionStorage,
    LEGACY_STORAGE_KEYS.SESSION,
    STORAGE_KEYS.SESSION
  );
  migrateLegacyStoragePrefix(
    localStorage,
    LEGACY_STORAGE_KEYS.COLLABORATOR_PREFIX,
    STORAGE_KEYS.COLLABORATOR_PREFIX
  );
  migrateLegacyStoragePrefix(
    localStorage,
    LEGACY_STORAGE_KEYS.TYPING_PREFIX,
    STORAGE_KEYS.TYPING_PREFIX
  );
}
