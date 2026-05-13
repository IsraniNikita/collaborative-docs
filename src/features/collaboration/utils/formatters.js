export function formatLastUpdated(timestamp) {
  if (!timestamp) {
    return "Never";
  }

  const secondsAgo = Math.floor(
    (Date.now() - timestamp) / 1000
  );

  if (secondsAgo < 60) {
    return `${secondsAgo}s ago`;
  }

  const minutesAgo = Math.floor(
    secondsAgo / 60
  );

  if (minutesAgo < 60) {
    return `${minutesAgo}m ago`;
  }

  const hoursAgo = Math.floor(
    minutesAgo / 60
  );

  return `${hoursAgo}h ago`;
}