import { memo } from "react";
import { useCollaborationContext } from "../context/CollaborationContext";

function CollaboratorListComponent() {
  const { state, session } =
    useCollaborationContext();

  return (
    <div>
      <h2>
        {state.collaborators.length} online
      </h2>

      <ul>
        {state.collaborators.map((user) => (
          <li
            key={user.id}
            className="collaborator-item"
          >
            <div className="collaborator-user">
              <div className="online-dot" />

              <span>
                {user.username}
              </span>
            </div>

            {user.id === session.id && (
              <span>(You)</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export const CollaboratorList =
  memo(CollaboratorListComponent);