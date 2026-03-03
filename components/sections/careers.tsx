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
  
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newPosition, setNewPosition] = useState({
    title: "",
    department: "",
    location: "",
    type: "",
    description: ""
  })

  const handleAddPosition = () => {
    const newId = Date.now().toString()
    const positions = [...content.careers.positions, { id: newId, ...newPosition }]
    updateContent("careers", "positions", positions)
    setNewPosition({ title: "", department: "", location: "", type: "", description: "" })
    setShowAddForm(false)
  }

  const handleDeletePosition = (id: string) => {
    const positions = content.careers.positions.filter(p => p.id !== id)
    updateContent("careers", "positions", positions)
  }

  const handleUpdatePosition = (id: string, field: string, value: string) => {
    const positions = content.careers.positions.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    )
    updateContent("careers", "positions", positions)
  }

  return (
    <section id="careers" className="bg-background py-24" dir={isDv ? "rtl" : "ltr"}>
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
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

        {/* Positions List */}
        <div className="space-y-4">
          {content.careers.positions.map((position, i) => (
            <div
              key={position.id}
              className={`group rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-500 hover:border-primary/30 hover:shadow-md ${
                isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
              }`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {editingId === position.id ? (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      type="text"
                      value={position.title}
                      onChange={(e) => handleUpdatePosition(position.id, "title", e.target.value)}
                      className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Job Title"
                    />
                    <input
                      type="text"
                      value={position.department}
                      onChange={(e) => handleUpdatePosition(position.id, "department", e.target.value)}
                      className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Department"
                    />
                    <input
                      type="text"
                      value={position.location}
                      onChange={(e) => handleUpdatePosition(position.id, "location", e.target.value)}
                      className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Location"
                    />
                    <input
                      type="text"
                      value={position.type}
                      onChange={(e) => handleUpdatePosition(position.id, "type", e.target.value)}
                      className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Job Type"
                    />
                  </div>
                  <textarea
                    value={position.description}
                    onChange={(e) => handleUpdatePosition(position.id, "description", e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Job Description"
                    rows={3}
                  />
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => setEditingId(null)}
                      className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                      <Save className="h-4 w-4" />
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Briefcase className="h-5 w-5 text-primary" />
                      <EditableText
                        value={position.title}
                        onSave={(val) => handleUpdatePosition(position.id, "title", val)}
                        as="h3"
                        className="text-lg font-semibold text-card-foreground"
                      />
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <span className="font-medium">{position.department}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {position.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {position.type}
                      </span>
                    </div>
                    <EditableText
                      value={position.description}
                      onSave={(val) => handleUpdatePosition(position.id, "description", val)}
                      as="p"
                      className="mt-2 text-sm text-muted-foreground"
                      multiline
                    />
                  </div>
                  {isEditing && (
                    <div className="flex gap-2">
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
              )}
            </div>
          ))}
        </div>

        {/* Add New Position Form */}
        {isEditing && (
          <>
            {showAddForm ? (
              <div className="mt-6 rounded-xl border border-primary bg-card p-6 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-card-foreground">Add New Position</h3>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      type="text"
                      value={newPosition.title}
                      onChange={(e) => setNewPosition({ ...newPosition, title: e.target.value })}
                      className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Job Title *"
                    />
                    <input
                      type="text"
                      value={newPosition.department}
                      onChange={(e) => setNewPosition({ ...newPosition, department: e.target.value })}
                      className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Department *"
                    />
                    <input
                      type="text"
                      value={newPosition.location}
                      onChange={(e) => setNewPosition({ ...newPosition, location: e.target.value })}
                      className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Location *"
                    />
                    <input
                      type="text"
                      value={newPosition.type}
                      onChange={(e) => setNewPosition({ ...newPosition, type: e.target.value })}
                      className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Job Type (Full-time/Part-time) *"
                    />
                  </div>
                  <textarea
                    value={newPosition.description}
                    onChange={(e) => setNewPosition({ ...newPosition, description: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Job Description *"
                    rows={3}
                  />
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={handleAddPosition}
                      disabled={!newPosition.title || !newPosition.department || !newPosition.location || !newPosition.type}
                      className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Save className="h-4 w-4" />
                      Add Position
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
                Add New Position
              </button>
            )}
          </>
        )}
      </div>
    </section>
  )
}
