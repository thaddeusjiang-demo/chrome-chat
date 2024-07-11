import { generateText } from "ai"
import { chromeai } from "chrome-ai"
import { useForm } from "react-hook-form"

import { db } from "~src/db"

// utils
async function generateMessage(message: string) {
  const { text } = await generateText({
    model: chromeai("text"),
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
  const response = await generateMessage(message)
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
  const { register, handleSubmit, reset } = useForm()

  const onSubmit = async (data) => {
    sendMessage(data.message, "default")
    reset()
  }

  return (
    <footer className=" w-full md:max-w-3xl max-w-screen-md  sticky bottom-0 pb-4 bg-white">
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <fieldset className="relative">
          <textarea
            id="chat-input"
            className=" w-full  rounded-lg textarea textarea-bordered"
            placeholder="What do you want to talk about?"
            {...register("message")}
          />
          <button
            type="submit"
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
    </footer>
  )
}
