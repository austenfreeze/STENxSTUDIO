import { definePlugin } from "sanity"

interface VisualEditingConfig {
  previewUrl?: string
}

export const visualEditing = definePlugin<VisualEditingConfig>((config = {}) => {
  const { previewUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000" } = config

  return {
    name: "visual-editing",
    document: {
      actions: (prev, context) => {
        const { schemaType, documentId } = context

        // Add a "Preview" action to the document actions
        return [
          ...prev,
          {
            name: "preview",
            label: "Preview",
            icon: () => (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            ),
            onHandle: () => {
              // Generate a preview URL based on the document type and ID
              let url = `${previewUrl}/api/preview?secret=${process.env.SANITY_PREVIEW_SECRET}&id=${documentId}`

              if (schemaType === "post") {
                url += "&type=post"
              } else if (schemaType === "homepage") {
                url += "&type=homepage"
              }

              // Open the preview URL in a new tab
              window.open(url, "_blank")
            },
          },
          {
            name: "visual-edit",
            label: "Visual Edit",
            icon: () => (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
              </svg>
            ),
            onHandle: () => {
              // Generate a visual editing URL
              let url = `${previewUrl}/studio-preview`

              if (schemaType === "post") {
                url += `/post/${documentId}`
              } else if (schemaType === "homepage") {
                url += `/homepage/${documentId}`
              } else {
                url += `/${schemaType}/${documentId}`
              }

              url += `?preview=true&secret=${process.env.SANITY_PREVIEW_SECRET}`

              // Open the visual editing URL in a new tab
              window.open(url, "_blank")
            },
          },
        ]
      },
    },
  }
})
