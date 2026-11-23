import {
  createContext,
  useContext,
  useReducer,
  useState,
} from "react";

import { collaborationReducer } from "./collaborationReducer";

import { initialCollaborationState } from "../types/state";

import { useDocumentSync } from "../hooks/useDocumentSync";

import { getOrCreateSession } from "../services/sessionService";

import { usePresence } from "../hooks/usePresence";

import { useTypingIndicator } from "../hooks/useTypingIndicator";

const CollaborationContext = createContext(null);
export function CollaborationProvider({ children }) {
  const [state, dispatch] = useReducer(
    collaborationReducer,
    initialCollaborationState
  );

  const [session] = useState(getOrCreateSession);

  usePresence({
    session,
    dispatch,
  });

  useDocumentSync({ state, dispatch });

  useTypingIndicator({
  dispatch,
});

  return (
    <CollaborationContext.Provider
      value={{
        state,
        dispatch,
        session,
      }}
    >
      {children}
    </CollaborationContext.Provider>
  );
}

export function useCollaborationContext() {
  const context = useContext(CollaborationContext);

  if (!context) {
    throw new Error(
      "useCollaborationContext must be used inside CollaborationProvider"
    );
  }

  return context;
}