"use client"

import { useState, useRef } from "react"
import { useSite } from "@/lib/site-context"
import { EditableText } from "@/components/editable-text"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Plus, Pencil, Trash2, X, Check, ImagePlus } from "lucide-react"

interface ClientLogo {
  name: string
  image: string
}

function ClientEditModal({
  logo,
  onSave,
  onClose,
}: {
  logo: ClientLogo | null
  onSave: (data: ClientLogo) => void
  onClose: () => void
}) {
  const [name, setName] = useState(logo?.name ?? "")
  const [image, setImage] = useState(logo?.image ?? "")
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setImage(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">
            {logo ? "Edit Client" : "Add New Client"}
          </h3>
          <button onClick={onClose} className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Image upload */}
        <div className="mb-4">
          <label className="mb-1.5 block text-sm font-medium text-foreground">Logo Image</label>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
          <button
            onClick={() => fileRef.current?.click()}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-secondary/30 p-4 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:bg-secondary/50"
          >
            {image ? (
              <img
                src={image}
                alt="Preview"
                className="h-16 w-auto rounded object-contain"
              />
            ) : (
              <>
                <ImagePlus className="h-5 w-5" />
                Click to upload logo
              </>
            )}
          </button>
        </div>

        {/* Name input */}
        <div className="mb-6">
          <label className="mb-1.5 block text-sm font-medium text-foreground">Client Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter client name"
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (name.trim()) {
                onSave({ name: name.trim(), image })
              }
            }}
            disabled={!name.trim()}
            className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            <Check className="h-4 w-4" />
            {logo ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  )
}

export function ClientsSection() {
  const { content, updateContent, language, isAdmin, isEditing } = useSite()
  const { ref, isVisible } = useScrollAnimation(0.05)
  const isDv = language === "dv"
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [isAdding, setIsAdding] = useState(false)

  const logos = content.clients.logos

  const handleSave = (data: ClientLogo) => {
    const updated = [...logos]
    if (editingIndex !== null) {
      updated[editingIndex] = data
    } else {
      updated.push(data)
    }
    updateContent("clients", "logos", updated)
    setEditingIndex(null)
    setIsAdding(false)
  }

  const handleDelete = (index: number) => {
    const updated = logos.filter((_, i) => i !== index)
    updateContent("clients", "logos", updated)
  }

  return (
    <section id="clients" className="bg-secondary/50 py-24" dir={isDv ? "rtl" : "ltr"}>
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`mb-16 text-center transition-all duration-700 ${
            isVisible ? "animate-fade-in-up" : "translate-y-8 opacity-0"
          }`}
        >
          <span className="mb-3 inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            {content.clients.sectionTag}
          </span>
          <EditableText
            value={content.clients.title}
            onSave={(val) => updateContent("clients", "title", val)}
            as="h2"
            className="text-3xl font-bold text-foreground sm:text-4xl"
          />
          <EditableText
            value={content.clients.subtitle}
            onSave={(val) => updateContent("clients", "subtitle", val)}
            as="p"
            className="mt-3 text-muted-foreground"
          />
        </div>

        {/* Logo Grid */}
        <div
          className={`grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 transition-all duration-700 ${
            isVisible ? "animate-fade-in" : "opacity-0"
          }`}
        >
          {logos.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="group relative flex flex-col items-center justify-center rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
              style={{ animationDelay: `${i * 30}ms` }}
            >
              {/* Admin overlay */}
              {isAdmin && isEditing && (
                <div className="absolute -top-2 end-0 z-10 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => setEditingIndex(i)}
                    className="rounded-lg bg-primary p-1.5 text-primary-foreground shadow-md transition-colors hover:bg-primary/90"
                    aria-label="Edit client"
                  >
                    <Pencil className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => handleDelete(i)}
                    className="rounded-lg bg-destructive p-1.5 text-destructive-foreground shadow-md transition-colors hover:bg-destructive/90"
                    aria-label="Delete client"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              )}

              {logo.image ? (
                <img
                  src={logo.image}
                  alt={logo.name}
                  width={120}
                  height={80}
                  className="h-12 w-auto object-contain opacity-70 transition-opacity group-hover:opacity-100"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-12 w-full items-center justify-center rounded bg-muted">
                  <span className="text-xs text-muted-foreground">No logo</span>
                </div>
              )}
              <span className="mt-2 text-center text-[11px] font-medium leading-tight text-muted-foreground">
                {logo.name}
              </span>
            </div>
          ))}

          {/* Add Client Button */}
          {isAdmin && isEditing && (
            <button
              onClick={() => setIsAdding(true)}
              className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 p-4 text-primary transition-all hover:border-primary hover:bg-primary/10"
            >
              <Plus className="h-6 w-6" />
              <span className="text-xs font-semibold">Add Client</span>
            </button>
          )}
        </div>
      </div>

      {/* Edit / Add Modal */}
      {(editingIndex !== null || isAdding) && (
        <ClientEditModal
          logo={editingIndex !== null ? logos[editingIndex] : null}
          onSave={handleSave}
          onClose={() => {
            setEditingIndex(null)
            setIsAdding(false)
          }}
        />
      )}
    </section>
  )
}
