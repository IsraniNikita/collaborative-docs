import { ACTION_TYPES } from "../constants/actionTypes";

export function collaborationReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_DOCUMENT:
      return {
        ...state,

        document: {
          ...state.document,
          ...action.payload,
        },
      };

    case ACTION_TYPES.SET_COLLABORATORS:
      return {
        ...state,
        collaborators: action.payload,
      };

    case ACTION_TYPES.SET_TYPING_USERS:
      return {
        ...state,
        typingUsers: action.payload,
      };

    case ACTION_TYPES.SET_SYNC_STATUS:
      return {
        ...state,

        sync: {
          ...state.sync,
          ...action.payload,
        },
      };

    default:
      return state;
  }
}