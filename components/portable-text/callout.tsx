import { PortableText } from "@portabletext/react"
import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react"

export function Callout({ type, heading, text }) {
  const getStyles = () => {
    switch (type) {
      case "info":
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          text: "text-blue-800",
          icon: <Info className="h-5 w-5 text-blue-500" />,
        }
      case "warning":
        return {
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          text: "text-yellow-800",
          icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
        }
      case "success":
        return {
          bg: "bg-green-50",
          border: "border-green-200",
          text: "text-green-800",
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
        }
      case "error":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          text: "text-red-800",
          icon: <AlertCircle className="h-5 w-5 text-red-500" />,
        }
      default:
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          text: "text-blue-800",
          icon: <Info className="h-5 w-5 text-blue-500" />,
        }
    }
  }

  const styles = getStyles()

  return (
    <div className={`my-6 p-4 border rounded-md ${styles.bg} ${styles.border}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-0.5">{styles.icon}</div>
        <div className="ml-3">
          {heading && <h4 className={`text-lg font-medium ${styles.text}`}>{heading}</h4>}
          <div className={`mt-2 ${styles.text} text-sm`}>
            <PortableText value={text} />
          </div>
        </div>
      </div>
    </div>
  )
}
