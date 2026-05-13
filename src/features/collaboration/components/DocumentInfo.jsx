import { memo } from "react";

import { useCollaborationContext } from "../context/CollaborationContext";

import { formatLastUpdated } from "../utils/formatters";

function DocumentInfoComponent() {
  const { state } =
    useCollaborationContext();

  const {
    updatedBy,
    updatedAt,
  } = state.document;

  if (!updatedBy) {
    return null;
  }

  return (
    <div className="document-info">
      <p>
        Last updated by{" "}
        <strong>
          {updatedBy}
        </strong>
      </p>

      <p>
        {formatLastUpdated(
          updatedAt
        )}
      </p>
    </div>
  );
}

export const DocumentInfo = memo(
  DocumentInfoComponent
);