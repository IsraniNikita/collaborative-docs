import { memo } from "react";

import { CollaboratorList } from "./CollaboratorList";

import { SharedEditor } from "./SharedEditor";

import { TypingIndicator } from "./TypingIndicator";

import { DocumentInfo } from "./DocumentInfo";

function WorkspaceLayoutComponent() {
  return (
    <section className="workspace-layout">
      <aside className="sidebar">
        <CollaboratorList />
      </aside>

      <section className="editor-panel">
        <div className="editor-header">
          <h2>Shared Workspace</h2>
        </div>

        <DocumentInfo />

        <SharedEditor />

        <TypingIndicator />
      </section>
    </section>
  );
}

export const WorkspaceLayout = memo(
  WorkspaceLayoutComponent
);