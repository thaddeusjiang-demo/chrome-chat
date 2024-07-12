import { useLiveQuery } from "dexie-react-hooks"

import { db } from "~src/db"

import { MessageBubble } from "./MessageBubble"

export function MessageList() {
  const messages = useLiveQuery(() => db.messages.toArray(), [])

  return (
    <>
      {(messages || []).map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </>
  )
}
