import { useLiveQuery } from "dexie-react-hooks"
import { twMerge } from "tailwind-merge"

import { db } from "~src/db"

export function MessageList() {
  const messages = useLiveQuery(() => db.messages.toArray(), [])

  return (
    <ul className="flex-1 overflow-hidden pb-2">
      {(messages || []).map((message) => (
        <li
          key={message.id}
          className={twMerge(
            "chat flex w-full",
            message.from_id === "me"
              ? "chat-end justify-end"
              : "chat-start justify-start"
          )}>
          <div className=" chat-bubble">{message.text}</div>
        </li>
      ))}
    </ul>
  )
}
