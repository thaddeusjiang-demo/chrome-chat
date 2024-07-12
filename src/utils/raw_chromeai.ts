import { remember } from "@epic-web/remember"

export const textSession = remember("textSession", () =>
  window.ai.createTextSession()
)

export async function promptText(message) {
  const result = await (await textSession).prompt(message)
  return result
}

export async function promptTextStreaming(message) {
  const result = await (await textSession).promptStreaming(message)
  return result
}

export async function canCreateTextSession() {
  const result = await window.ai.canCreateTextSession()
  return result === "readily"
}
