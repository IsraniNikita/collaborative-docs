import { SYNC_STATUS } from "../constants/syncStatus";

export const initialCollaborationState = {
  document: {
    content: "",
    updatedAt: null,
    updatedBy: null,
  },

  collaborators: [],

  typingUsers: [],

  sync: {
    status: SYNC_STATUS.SYNCED,
    lastSyncedAt: null,
  },
};