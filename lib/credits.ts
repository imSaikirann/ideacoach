export function getNextResetDate() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 1);
}

export function shouldReset(resetsAt?: Date | null) {
  if (!resetsAt) return true;
  return new Date() >= resetsAt;
}
