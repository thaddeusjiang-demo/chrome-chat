import "./tailwind.css"

export default function PopupPage() {
  const openChatPage = () => {
    chrome.tabs.create({ url: chrome.runtime.getURL("tabs/chat.html") })
  }

  return (
    <div className=" w-96 p-4">
      <h1 className="text-2xl mb-2">Hi, this is local-chat</h1>
      <div>
        <button
          onClick={openChatPage}
          className="btn btn-sm rounded-full btn-primary">
          Start chat
        </button>
      </div>
    </div>
  )
}
