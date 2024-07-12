import { useLiveQuery } from "dexie-react-hooks"
import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

import { db } from "~src/db"

import { MessageBubble } from "./MessageBubble"

function listMessages(count: number) {
  return db.messages.reverse().limit(count).toArray()
}

const PAGE_SIZE = 10

export function MessageList() {
  const [count, setCount] = useState(PAGE_SIZE)
  const total = useLiveQuery(() => db.messages.count())
  const messages = useLiveQuery(() => listMessages(count), [count])

  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView) {
      setCount((count) => count + PAGE_SIZE)
    }
  }, [inView])

  return (
    <>
      <div className=" h-full flex flex-col-reverse overflow-y-auto">
        {(messages || []).map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {count < total ? <div ref={ref}>load more</div> : null}
      </div>
    </>
  )
}
