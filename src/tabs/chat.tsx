import "../tailwind.css"

import { MessageList } from "../components/MessageList"
import { MessageSendForm } from "../components/MessageSendForm"

export default function HelloTab() {
  return (
    <div className=" container w-full h-full max-h-screen overflow-hidden md:max-w-3xl mx-auto px-2 flex flex-col">
      <div className="  grow overflow-y-auto">
        <MessageList />
      </div>
      <div className=" flex-0">
        <MessageSendForm />
      </div>
    </div>
  )
}
