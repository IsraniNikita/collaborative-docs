import { useEffect } from "react";

import {
  loadTypingUsers,
} from "../services/typingService";

import { setTypingUsers } from "../context/actions";

export function useTypingIndicator({
  dispatch,
}) {
  useEffect(() => {
    function handleStorageChange(event) {
      if (
        !event.key?.startsWith(
          "syncwrite_typing_"
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