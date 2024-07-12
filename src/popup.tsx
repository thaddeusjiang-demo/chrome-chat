import { useEffect, useState } from "react"

import "./tailwind.css"

import { canCreateTextSession } from "./utils/raw_chromeai"

export default function PopupPage() {
  const openChatPage = () => {
    chrome.tabs.create({ url: chrome.runtime.getURL("tabs/chat.html") })
  }

  const [canUse, setCanUse] = useState(false)
  useEffect(() => {
    async function canUseAi() {
      const result = await canCreateTextSession()
      setCanUse(result)
    }
    canUseAi()
  }, [])

  return (
    <div className=" w-96 p-4">
      <h1 className="text-2xl mb-2">Hi, this is local-chat</h1>
      {canUse ? null : (
        // TODO: markdown
        <div className="text-red-500 text-sm mb-2">
          You need to enable the extension to use this feature, follow [this
          link](https://ai-sdk-chrome-ai.vercel.app/) to enable it
        </div>
      )}
      <div>
        <button
          onClick={openChatPage}
          disabled={!canUse}
          className="btn btn-sm rounded-full btn-primary">
          Start chat
        </button>
      </div>
    </div>
  )
}
