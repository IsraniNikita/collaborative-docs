import { ACTION_TYPES } from "../constants/actionTypes";

export function updateDocument(payload) {
  return {
    type: ACTION_TYPES.UPDATE_DOCUMENT,
    payload,
  };
}

export function setCollaborators(payload) {
  return {
    type: ACTION_TYPES.SET_COLLABORATORS,
    payload,
  };
}

export function setTypingUsers(payload) {
  return {
    type: ACTION_TYPES.SET_TYPING_USERS,
    payload,
  };
}

export function setSyncStatus(payload) {
  return {
    type: ACTION_TYPES.SET_SYNC_STATUS,
    payload,
  };
}