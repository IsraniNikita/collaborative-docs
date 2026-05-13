import { CollaborationProvider } from "../../features/collaboration/context/CollaborationContext";

export function AppProviders({ children }) {
  return (
    <CollaborationProvider>
      {children}
    </CollaborationProvider>
  );
}