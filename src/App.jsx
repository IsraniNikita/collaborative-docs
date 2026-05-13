import { SyncHeader } from "./features/collaboration/components/SyncHeader";

import { WorkspaceLayout } from "./features/collaboration/components/WorkspaceLayout";

export default function App() {
  return (
    <main className="app-shell">
      <SyncHeader />

      <WorkspaceLayout />
    </main>
  );
}