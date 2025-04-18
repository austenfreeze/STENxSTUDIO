"use client"

import { useState, useRef, useEffect } from "react"
import { client } from "@/lib/sanity.client"
import { Edit, Check, X } from "lucide-react"

interface InlineEditorProps {
  value: string
  documentId: string
  field: string
  documentType: string
  preview?: boolean
  className?: string
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
}

export function InlineEditor({
  value,
  documentId,
  field,
  documentType,
  preview = false,
  className = "",
  as: Component = "p",
}: InlineEditorProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedValue, setEditedValue] = useState(value)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  if (!preview) {
    return <Component className={className}>{value}</Component>
  }

  const handleSave = async () => {
    if (editedValue === value) {
      setIsEditing(false)
      return
    }

    setIsSubmitting(true)
    try {
      await client
        .patch(documentId)
        .set({ [field]: editedValue })
        .commit()
      setIsSubmitting(false)
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating content:", error)
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setEditedValue(value)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="relative">
        <textarea
          ref={inputRef}
          value={editedValue}
          onChange={(e) => setEditedValue(e.target.value)}
          className={`block w-full min-h-[100px] p-2 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
          disabled={isSubmitting}
        />
        <div className="absolute top-2 right-2 flex gap-1">
          <button
            onClick={handleSave}
            disabled={isSubmitting}
            className="p-1 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50"
            title="Save changes"
          >
            <Check className="h-4 w-4" />
          </button>
          <button
            onClick={handleCancel}
            disabled={isSubmitting}
            className="p-1 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50"
            title="Cancel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="group relative">
      <Component className={className}>{value}</Component>
      <button
        onClick={() => setIsEditing(true)}
        className="absolute top-0 right-0 p-1 bg-blue-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
        title="Edit content"
      >
        <Edit className="h-4 w-4" />
      </button>
    </div>
  )
}
