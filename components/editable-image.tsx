"use client"

import { useRef } from "react"
import { useSite } from "@/lib/site-context"
import { ImagePlus } from "lucide-react"

interface EditableImageProps {
  src: string
  alt: string
  onSave: (dataUrl: string) => void
  className?: string
  width?: number
  height?: number
  fill?: boolean
}

export function EditableImage({
  src,
  alt,
  onSave,
  className = "",
  width,
  height,
  fill = false,
}: EditableImageProps) {
  const { isAdmin, isEditing } = useSite()
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string
      onSave(dataUrl)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className={`group relative ${fill ? "h-full w-full" : ""}`}>
      {src ? (
        fill ? (
          <img
            src={src}
            alt={alt}
            className={`absolute inset-0 h-full w-full object-cover ${className}`}
            loading="lazy"
          />
        ) : (
          <img
            src={src}
            alt={alt}
            width={width || 600}
            height={height || 400}
            className={className}
            loading="lazy"
          />
        )
      ) : (
        <div
          className={`flex items-center justify-center bg-muted ${fill ? "absolute inset-0 h-full w-full" : ""} ${className}`}
          style={!fill ? { width: width || 600, height: height || 400 } : undefined}
        >
          <span className="text-muted-foreground">{alt}</span>
        </div>
      )}

      {isAdmin && isEditing && (
        <>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            onClick={() => fileRef.current?.click()}
            className="absolute inset-0 flex items-center justify-center bg-foreground/30 opacity-0 transition-opacity group-hover:opacity-100"
            aria-label="Upload image"
          >
            <div className="flex items-center gap-2 rounded-lg bg-background/90 px-4 py-2 text-sm font-medium text-foreground shadow-lg">
              <ImagePlus className="h-4 w-4" />
              Upload Image
            </div>
          </button>
        </>
      )}
    </div>
  )
}
