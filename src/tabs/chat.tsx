import "../tailwind.css"

import { MessageList } from "../components/MessageList"
import { MessageSendForm } from "../components/MessageSendForm"

export default function HelloTab() {
  return (
    <div className=" container w-full h-full md:max-w-3xl mx-auto px-2">
      <MessageList />
      <MessageSendForm />
    </div>
  )
}
