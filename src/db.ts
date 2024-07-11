// db.ts
import Dexie, { type EntityTable } from "dexie"

type Message = {
  id: number
  text: string
  from_id: string
  to_id: string
  created_at: string
}

const db = new Dexie("local-chat") as Dexie & {
  messages: EntityTable<
    Message,
    "id" // primary key "id" (for the typings only)
  >
}

// Schema declaration:
db.version(1).stores({
  messages: "++id, text, from_id, to_id, created_at" // primary key "id" (for the runtime!)
})

export type { Message }
export { db }
