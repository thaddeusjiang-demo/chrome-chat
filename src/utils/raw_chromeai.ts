export async function createTextSession() {
  const result = await window.ai.createTextSession()
  return result
}

export async function canCreateTextSession() {
  const result = await window.ai.canCreateTextSession()
  return result === "readily"
}

export async function prompt(session, message) {
  const result = await session.prompt(message)
  return result
}
