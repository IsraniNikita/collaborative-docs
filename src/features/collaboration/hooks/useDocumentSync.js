import { useEffect, useRef } from "react";

import { STORAGE_KEYS } from "../constants/storageKeys";

import { SYNC_STATUS } from "../constants/syncStatus";

import {
  loadDocument,
  saveDocument,
} from "../services/storageService";

import {
  updateDocument,
  setSyncStatus,
} from "../context/actions";

export function useDocumentSync({
  state,
  dispatch,
}) {
  const documentRef = useRef(
    state.document
  );

  // Keep latest document reference
  useEffect(() => {
    documentRef.current =
      state.document;
  }, [state.document]);

  // Hydrate document on initial load
  useEffect(() => {
    const storedDocument =
      loadDocument();

    if (!storedDocument) {
      return;
    }

    dispatch(
      updateDocument(storedDocument)
    );
  }, [dispatch]);

  // Persist document with debounce
  useEffect(() => {
    if (!state.document.updatedAt) {
      return;
    }

    dispatch(
      setSyncStatus({
        status: SYNC_STATUS.SAVING,
      })
    );

    const timeoutId = setTimeout(() => {
      saveDocument(state.document);

      dispatch(
        setSyncStatus({
          status:
            SYNC_STATUS.SYNCED,

          lastSyncedAt:
            Date.now(),
        })
      );
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [state.document, dispatch]);

  // Listen for cross-tab updates
  useEffect(() => {
    function handleStorageChange(
      event
    ) {
      if (
        event.key !==
        STORAGE_KEYS.DOCUMENT
      ) {
        return;
      }

      if (!event.newValue) {
        return;
      }

      let incomingDocument;

      try {
        incomingDocument = JSON.parse(
          event.newValue
        );
      } catch (error) {
        console.error(
          "Failed to parse incoming document"
        );

        return;
      }

      // Ignore identical versions
      if (
        incomingDocument.updatedAt ===
        documentRef.current.updatedAt
      ) {
        return;
      }

      // Accept newer versions only
      if (
        incomingDocument.updatedAt >
        documentRef.current.updatedAt
      ) {
        dispatch(
          setSyncStatus({
            status:
              SYNC_STATUS.RECEIVING,
          })
        );

        dispatch(
          updateDocument(
            incomingDocument
          )
        );

        setTimeout(() => {
          dispatch(
            setSyncStatus({
              status:
                SYNC_STATUS.SYNCED,

              lastSyncedAt:
                Date.now(),
            })
          );
        }, 500);
      }
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