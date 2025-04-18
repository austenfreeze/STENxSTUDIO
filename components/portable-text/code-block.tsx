"use client"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { useState } from "react"
import { Copy } from "lucide-react"

export function CodeBlock({ code, language, filename }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-6 rounded-md overflow-hidden bg-gray-900">
      {filename && (
        <div className="px-4 py-2 bg-gray-800 text-gray-200 text-sm border-b border-gray-700 flex justify-between items-center">
          <span>{filename}</span>
          <button
            onClick={copyToClipboard}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Copy code"
          >
            <Copy size={16} />
            <span className="sr-only">{copied ? "Copied!" : "Copy code"}</span>
          </button>
        </div>
      )}
      <SyntaxHighlighter
        language={language || "javascript"}
        style={atomDark}
        customStyle={{ margin: 0, padding: "1rem" }}
      >
        {code}
      </SyntaxHighlighter>
      {copied && (
        <div className="absolute top-0 right-0 m-2 px-2 py-1 bg-green-500 text-white text-xs rounded">Copied!</div>
      )}
    </div>
  )
}
