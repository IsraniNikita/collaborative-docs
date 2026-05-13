export function generateSessionId() {
  return crypto.randomUUID();
}

export function generateUsername() {
  const randomNumber = Math.floor(Math.random() * 10000);

  return `User_${randomNumber}`;
}