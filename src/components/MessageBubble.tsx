import hljs from "highlight.js" // https://highlightjs.org/
import { Remarkable } from "remarkable"
import { twMerge } from "tailwind-merge"

// TODO: code highlight still not working
// copy from https://jonschlinkert.github.io/remarkable/demo/
var md = new Remarkable({
  html: false, // Enable HTML tags in source
  xhtmlOut: false, // Use '/' to close single tags (<br />)
  breaks: false, // Convert '\n' in paragraphs into <br>
  langPrefix: "language-", // CSS language prefix for fenced blocks
  linkify: true, // autoconvert URL-like texts to links
  linkTarget: "", // set target to open link in

  // Enable some language-neutral replacements + quotes beautification
  typographer: false,

  // Double + single quotes replacement pairs, when typographer enabled,
  // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
  quotes: "“”‘’",

  // Highlighter function. Should return escaped HTML,
  // or '' if input not changed
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value
      } catch (__) {}
    }

    try {
      return hljs.highlightAuto(str).value
    } catch (__) {}

    return "" // use external default escaping
  }
})

export const MessageBubble = ({ message }: { message }) => {
  return (
    <div
      className={twMerge(
        "flex w-full",
        message.from_id === "me" ? " justify-end" : " justify-start"
      )}>
      <div className=" my-2  min-h-[2.5rem] max-w-[90%] overflow-hidden rounded-lg bg-blue-100 px-4 py-2">
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: md.render(message.text) }}
        />
      </div>
    </div>
  )
}
