const COLLABORATOR_PREFIX =
  "syncwrite_collaborator_";

export function saveCollaborator(user) {
  localStorage.setItem(
    `${COLLABORATOR_PREFIX}${user.id}`,
    JSON.stringify(user)
  );
}

export function removeCollaborator(userId) {
  localStorage.removeItem(
    `${COLLABORATOR_PREFIX}${userId}`
  );
}

export function loadCollaborators() {
  const collaborators = [];

  Object.keys(localStorage).forEach((key) => {
    if (
      !key.startsWith(
        COLLABORATOR_PREFIX
      )
    ) {
      return;
    }

    try {
      const collaborator = JSON.parse(
        localStorage.getItem(key)
      );

      collaborators.push(collaborator);
    } catch (error) {
      console.error(
        "Failed to parse collaborator"
      );
    }
  });

  return collaborators;
}