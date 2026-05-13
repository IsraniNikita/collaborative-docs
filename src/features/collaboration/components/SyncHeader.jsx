import { memo } from "react";

import { useCollaborationContext } from "../context/CollaborationContext";

import { SYNC_STATUS } from "../constants/syncStatus";

const STATUS_CONFIG = {
  [SYNC_STATUS.SYNCED]: {
    icon: "🟢",
    label: "Synced",
  },

  [SYNC_STATUS.SAVING]: {
    icon: "🟡",
    label: "Saving...",
  },

  [SYNC_STATUS.RECEIVING]: {
    icon: "🔵",
    label: "Receiving update...",
  },

  [SYNC_STATUS.ERROR]: {
    icon: "🔴",
    label: "Sync failed",
  },
};

function SyncHeaderComponent() {
  const { state } =
    useCollaborationContext();

  const currentStatus =
    STATUS_CONFIG[state.sync.status] ??
    STATUS_CONFIG[SYNC_STATUS.ERROR];

  return (
    <header className="topbar">
      <h1>SyncWrite</h1>

      <span className="sync-status">
        <span>{currentStatus.icon}</span>

        <span>{currentStatus.label}</span>
      </span>
    </header>
  );
}

export const SyncHeader = memo(
  SyncHeaderComponent
);