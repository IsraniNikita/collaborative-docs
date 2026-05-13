import { useEffect } from "react";

import {
  saveCollaborator,
  removeCollaborator,
  loadCollaborators,
} from "../services/presenceService";

import { setCollaborators } from "../context/actions";

import {
  HEARTBEAT_INTERVAL,
  STALE_THRESHOLD,
} from "../constants/presence";

export function usePresence({
  session,
  dispatch,
}) {
  useEffect(() => {
    function updatePresence() {
      saveCollaborator({
        id: session.id,
        username: session.username,
        lastSeen: Date.now(),
      });

      const collaborators =
        loadCollaborators();

      const now = Date.now();

      const activeCollaborators =
        collaborators.filter((user) => {
          return (
            now - user.lastSeen <
            STALE_THRESHOLD
          );
        });

      dispatch(
        setCollaborators(
          activeCollaborators
        )
      );
    }

    updatePresence();

    const intervalId = setInterval(
      updatePresence,
      HEARTBEAT_INTERVAL
    );

    return () => {
      clearInterval(intervalId);
    };
  }, [session, dispatch]);

  useEffect(() => {
    function handleBeforeUnload() {
      removeCollaborator(session.id);
    }

    window.addEventListener(
      "beforeunload",
      handleBeforeUnload
    );

    return () => {
      window.removeEventListener(
        "beforeunload",
        handleBeforeUnload
      );
    };
  }, [session]);

  useEffect(() => {
    function handleStorageChange(event) {
      if (
        !event.key?.startsWith(
          "syncwrite_collaborator_"
        )
      ) {
        return;
      }

      const collaborators =
        loadCollaborators();

      const now = Date.now();

      const activeCollaborators =
        collaborators.filter((user) => {
          return (
            now - user.lastSeen <
            STALE_THRESHOLD
          );
        });

      dispatch(
        setCollaborators(
          activeCollaborators
        )
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