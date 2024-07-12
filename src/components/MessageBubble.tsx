// FIXME: bug in extension: Uncaught Error: Cannot find module 'path'
// import ReactMarkdown from "react-markdown"
// import remarkGfm from "remark-gfm"

import { twMerge } from "tailwind-merge"

export const MessageBubble = ({ message }: { message }) => {
  return (
    <div
      className={twMerge(
        "flex w-full",
        message.from_id === "me" ? " justify-end" : " justify-start"
      )}>
      <div className=" my-2  min-h-[2.5rem] max-w-[90%] overflow-hidden rounded-lg bg-blue-100 px-4 py-2">
        <div className="prose break-words md:prose">{message.text ?? " "}</div>
      </div>
    </div>
  )
}
