import { useEffect } from "react";

import {
  loadTypingUsers,
} from "../services/typingService";

import { setTypingUsers } from "../context/actions";
import {
  LEGACY_STORAGE_KEYS,
  STORAGE_KEYS,
} from "../constants/storageKeys";

export function useTypingIndicator({
  dispatch,
}) {
  useEffect(() => {
    function handleStorageChange(event) {
      if (
        !event.key?.startsWith(
          STORAGE_KEYS.TYPING_PREFIX
        ) &&
        !event.key?.startsWith(
          LEGACY_STORAGE_KEYS.TYPING_PREFIX
        )
      ) {
        return;
      }

      const typingUsers =
        loadTypingUsers();

      dispatch(
        setTypingUsers(typingUsers)
      );
    }

    window.addEventListener(
      "storage",
      handleStorageChange
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorageChange
      );
    };
  }, [dispatch]);
}