"use client"

import { useState } from "react"
import { useSite } from "@/lib/site-context"
import { EditableText } from "@/components/editable-text"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Briefcase, MapPin, Clock, Plus, Pencil, Trash2, X, Save } from "lucide-react"

export function CareersSection() {
  const { content, updateContent, isEditing, language } = useSite()
  const { ref, isVisible } = useScrollAnimation(0.1)
  const isDv = language === "dv"
  const uiText = {
    addNewPosition: isDv ? "Add New Position (DV)" : "Add New Position",
    jobTitle: isDv ? "Job Title (DV)" : "Job Title",
    department: isDv ? "Department (DV)" : "Department",
    location: isDv ? "Location (DV)" : "Location",
    jobType: isDv ? "Job Type (DV)" : "Job Type",
    jobDescription: isDv ? "Job Description (DV)" : "Job Description",
    save: isDv ? "Save (DV)" : "Save",
    addPosition: isDv ? "Add Position (DV)" : "Add Position",
    jobTypeHint: isDv ? "Job Type (Full-time/Part-time) (DV) *" : "Job Type (Full-time/Part-time) *",
  }

  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newPosition, setNewPosition] = useState({
    title: "",
    department: "",
    location: "",
    type: "",
    description: "",
  })

  const handleAddPosition = () => {
    const newId = Date.now().toString()
    const positions = [...content.careers.positions, { id: newId, ...newPosition }]
    updateContent("careers", "positions", positions)
    setNewPosition({ title: "", department: "", location: "", type: "", description: "" })
    setShowAddForm(false)
  }

  const handleDeletePosition = (id: string) => {
    const positions = content.careers.positions.filter((p) => p.id !== id)
    updateContent("careers", "positions", positions)
  }

  const handleUpdatePosition = (id: string, field: string, value: string) => {
    const positions = content.careers.positions.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    updateContent("careers", "positions", positions)
  }

  return (
    <section id="careers" className="bg-background py-24" dir={isDv ? "rtl" : "ltr"}>
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`mb-16 text-center transition-all duration-700 ${
            isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="mb-3 inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            {content.careers.sectionTag}
          </span>
          <EditableText
            value={content.careers.title}
            onSave={(val) => updateContent("careers", "title", val)}
            as="h2"
            className="text-3xl font-bold text-foreground sm:text-4xl text-balance"
          />
          <EditableText
            value={content.careers.subtitle}
            onSave={(val) => updateContent("careers", "subtitle", val)}
            as="p"
            className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {content.careers.positions.map((position, i) => (
            <div
              key={position.id}
              className={`group relative flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-500 hover:border-primary/30 hover:shadow-lg ${
                isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
              }`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {editingId === position.id ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={position.title}
                    onChange={(e) => handleUpdatePosition(position.id, "title", e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                    placeholder={uiText.jobTitle}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={position.department}
                      onChange={(e) => handleUpdatePosition(position.id, "department", e.target.value)}
                      className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                      placeholder={uiText.department}
                    />
                    <input
                      type="text"
                      value={position.location}
                      onChange={(e) => handleUpdatePosition(position.id, "location", e.target.value)}
                      className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                      placeholder={uiText.location}
                    />
                    <input
                      type="text"
                      value={position.type}
                      onChange={(e) => handleUpdatePosition(position.id, "type", e.target.value)}
                      className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                      placeholder={uiText.jobType}
                    />
                  </div>
                  <textarea
                    value={position.description}
                    onChange={(e) => handleUpdatePosition(position.id, "description", e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                    placeholder={uiText.jobDescription}
                    rows={3}
                  />
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => setEditingId(null)}
                      className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                      <Save className="h-4 w-4" />
                      {uiText.save}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Briefcase className="h-6 w-6" />
                      </div>
                      {isEditing && (
                        <div className="flex gap-1">
                          <button
                            onClick={() => setEditingId(position.id)}
                            className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePosition(position.id)}
                            className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>

                    <EditableText
                      value={position.title}
                      onSave={(val) => handleUpdatePosition(position.id, "title", val)}
                      as="h3"
                      className="text-lg font-semibold text-card-foreground mb-2"
                    />

                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <span className="font-medium text-primary">{position.department}</span>
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {position.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {position.type}
                      </span>
                    </div>

                    <EditableText
                      value={position.description}
                      onSave={(val) => handleUpdatePosition(position.id, "description", val)}
                      as="p"
                      className="text-sm text-muted-foreground line-clamp-3"
                      multiline
                    />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {isEditing && (
          <>
            {showAddForm ? (
              <div className="mt-6 rounded-xl border border-primary bg-card p-6 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-card-foreground">{uiText.addNewPosition}</h3>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={newPosition.title}
                    onChange={(e) => setNewPosition({ ...newPosition, title: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                    placeholder={`${uiText.jobTitle} *`}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={newPosition.department}
                      onChange={(e) => setNewPosition({ ...newPosition, department: e.target.value })}
                      className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                      placeholder={`${uiText.department} *`}
                    />
                    <input
                      type="text"
                      value={newPosition.location}
                      onChange={(e) => setNewPosition({ ...newPosition, location: e.target.value })}
                      className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                      placeholder={`${uiText.location} *`}
                    />
                    <input
                      type="text"
                      value={newPosition.type}
                      onChange={(e) => setNewPosition({ ...newPosition, type: e.target.value })}
                      className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                      placeholder={uiText.jobTypeHint}
                    />
                  </div>
                  <textarea
                    value={newPosition.description}
                    onChange={(e) => setNewPosition({ ...newPosition, description: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                    placeholder={`${uiText.jobDescription} *`}
                    rows={3}
                  />
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={handleAddPosition}
                      disabled={!newPosition.title || !newPosition.department || !newPosition.location || !newPosition.type}
                      className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Save className="h-4 w-4" />
                      {uiText.addPosition}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowAddForm(true)}
                className="mt-6 flex items-center gap-2 rounded-lg border border-dashed border-border bg-transparent px-4 py-3 text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors w-full justify-center"
              >
                <Plus className="h-4 w-4" />
                {uiText.addNewPosition}
              </button>
            )}
          </>
        )}
      </div>
    </section>
  )
}
