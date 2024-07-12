import { generateText } from "ai"
import { chromeai } from "chrome-ai"
import { useForm } from "react-hook-form"
import { useHotkeys } from "react-hotkeys-hook"
import { twMerge } from "tailwind-merge"

import { db } from "~src/db"
import { createTextSession } from "~src/utils/raw_chromeai"

// utils
async function generateMessage(message: string) {
  const { text } = await generateText({
    model: chromeai("generic"),
    prompt: message
  })

  return text
}

// utils
async function sendMessage(message, to_id?: string) {
  const id = await db.messages.add({
    text: message,
    from_id: "me",
    to_id: to_id ?? "default",
    created_at: new Date().toISOString()
  })

  // TODO: talk to ai
  // const response = await generateMessage(message)
  const session = await createTextSession()
  const response = await session.prompt(message)
  console.debug("response", response)
  const res_id = await db.messages.add({
    text: response,
    from_id: to_id ?? "default",
    to_id: "me",
    created_at: new Date().toISOString()
  })

  return res_id
}

/**
 * MessageSendForm is `fixed` at the bottom of the screen, must self contain all styles
 */
export function MessageSendForm() {
  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      message: ""
    }
  })

  const onSubmit = async (data) => {
    sendMessage(data.message, "default")
    reset()
  }

  useHotkeys(
    "mod+return",
    () => {
      handleSubmit(onSubmit)()
    },
    {
      enableOnFormTags: ["TEXTAREA"]
    }
  )

  const message = watch("message")

  return (
    <footer className=" w-full md:max-w-3xl max-w-screen-md  sticky bottom-0 py-2 bg-white">
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <fieldset className="relative">
          <textarea
            id="chat-input"
            className=" w-full  rounded-lg textarea textarea-bordered focus:outline-none"
            placeholder="What do you want to talk about?"
            {...register("message")}
          />
          <button
            type="submit"
            disabled={!message?.trim()}
            className=" btn btn-circle btn-sm  absolute bottom-3 right-2 ">
            <svg
              className=" w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor">
              <path d="M13.0001 7.82843V20H11.0001V7.82843L5.63614 13.1924L4.22192 11.7782L12.0001 4L19.7783 11.7782L18.3641 13.1924L13.0001 7.82843Z"></path>
            </svg>
          </button>
        </fieldset>
      </form>
      <div
        className={twMerge(
          " flex justify-end text-xs opacity-0",
          message ? "  opacity-70 " : ""
        )}>
        <p className=" hidden md:block">
          Return to add a new line,{" "}
          <kbd className=" kbd kbd-xs">cmd / ctrl</kbd> +&nbsp;
          <kbd className=" kbd kbd-xs">return</kbd> to send message
        </p>
      </div>
    </footer>
  )
}
