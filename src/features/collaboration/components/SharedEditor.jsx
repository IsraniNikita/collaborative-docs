import {
  useEffect,
  useRef,
} from "react";

import { useCollaborationContext } from "../context/CollaborationContext";

import { updateDocument } from "../context/actions";

import {
  saveTypingState,
  removeTypingState,
} from "../services/typingService";

import { TYPING_TIMEOUT } from "../constants/typing";

export function SharedEditor() {
  const {
    state,
    dispatch,
    session,
  } = useCollaborationContext();

  const typingTimeoutRef =
    useRef(null);

  const editorRef = useRef(null);

  useEffect(() => {
    editorRef.current?.focus();
  }, []);

  function handleChange(event) {
    dispatch(
      updateDocument({
        content: event.target.value,

        updatedAt: Date.now(),

        updatedBy:
          session.username,
      })
    );

    saveTypingState({
      id: session.id,

      username:
        session.username,

      timestamp: Date.now(),
    });

    clearTimeout(
      typingTimeoutRef.current
    );

    typingTimeoutRef.current =
      setTimeout(() => {
        removeTypingState(
          session.id
        );
      }, TYPING_TIMEOUT);
  }

  useEffect(() => {
    return () => {
      clearTimeout(
        typingTimeoutRef.current
      );

      removeTypingState(
        session.id
      );
    };
  }, [session.id]);

  return (
    <>
      <label
        htmlFor="workspace-editor"
        className="editor-label"
      >
        Shared Workspace
      </label>

      <textarea
        id="workspace-editor"
        ref={editorRef}
        placeholder="Start collaborating..."
        value={state.document.content}
        onChange={handleChange}
      />
    </>
  );
}