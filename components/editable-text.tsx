"use client"

import { useState, useRef, useEffect } from "react"
import { useSite } from "@/lib/site-context"
import { Pencil } from "lucide-react"

interface EditableTextProps {
  value: string
  onSave: (value: string) => void
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span"
  className?: string
  multiline?: boolean
}

export function EditableText({
  value,
  onSave,
  as: Tag = "p",
  className = "",
  multiline = false,
}: EditableTextProps) {
  const { isAdmin, isEditing } = useSite()
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(value)
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null)

  useEffect(() => {
    setText(value)
  }, [value])

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [editing])

  if (!isAdmin || !isEditing) {
    return <Tag className={className}>{value}</Tag>
  }

  if (editing) {
    return (
      <div className="relative">
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={() => {
              onSave(text)
              setEditing(false)
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setText(value)
                setEditing(false)
              }
            }}
            className="w-full rounded-md border-2 border-primary bg-background p-2 text-foreground outline-none"
            rows={4}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={() => {
              onSave(text)
              setEditing(false)
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSave(text)
                setEditing(false)
              }
              if (e.key === "Escape") {
                setText(value)
                setEditing(false)
              }
            }}
            className="w-full rounded-md border-2 border-primary bg-background p-2 text-foreground outline-none"
          />
        )}
      </div>
    )
  }

  return (
    <div className="group relative inline-block">
      <Tag className={className}>{value}</Tag>
      <button
        onClick={() => setEditing(true)}
        className="absolute -top-2 -right-2 rounded-full bg-primary p-1 text-primary-foreground opacity-0 shadow-md transition-opacity group-hover:opacity-100"
        aria-label="Edit text"
      >
        <Pencil className="h-3 w-3" />
      </button>
    </div>
  )
}
