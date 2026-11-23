import {
  LEGACY_STORAGE_KEYS,
  STORAGE_KEYS,
} from "../constants/storageKeys";
import { migrateLegacyStoragePrefix } from "./legacyStorageMigration";

export function saveCollaborator(user) {
  localStorage.setItem(
    `${STORAGE_KEYS.COLLABORATOR_PREFIX}${user.id}`,
    JSON.stringify(user)
  );
}

export function removeCollaborator(userId) {
  localStorage.removeItem(
    `${STORAGE_KEYS.COLLABORATOR_PREFIX}${userId}`
  );
  localStorage.removeItem(
    `${LEGACY_STORAGE_KEYS.COLLABORATOR_PREFIX}${userId}`
  );
}

export function loadCollaborators() {
  migrateLegacyStoragePrefix(
    localStorage,
    LEGACY_STORAGE_KEYS.COLLABORATOR_PREFIX,
    STORAGE_KEYS.COLLABORATOR_PREFIX
  );

  const collaborators = [];

  Object.keys(localStorage).forEach((key) => {
    if (
      !key.startsWith(
        STORAGE_KEYS.COLLABORATOR_PREFIX
      )
    ) {
      return;
    }

    try {
      const collaborator = JSON.parse(
        localStorage.getItem(key)
      );

      collaborators.push(collaborator);
    } catch (error) {
      console.error(
        "Failed to parse collaborator"
      );
    }
  });

  return collaborators;
}