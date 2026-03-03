"use client"

import { useState } from "react"
import { useSite } from "@/lib/site-context"
import { EditableText } from "@/components/editable-text"
import { EditableImage } from "@/components/editable-image"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { TrendingUp, Plus, Pencil, Trash2, X, Save, Building2 } from "lucide-react"

export function SuccessStoriesSection() {
  const { content, updateContent, isEditing, language } = useSite()
  const { ref, isVisible } = useScrollAnimation(0.1)
  const isDv = language === "dv"
  
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newStory, setNewStory] = useState({
    client: "",
    title: "",
    description: "",
    image: "",
    result: ""
  })

  const handleAddStory = () => {
    const newId = Date.now().toString()
    const items = [...content.successStories.items, { id: newId, ...newStory, image: newStory.image || "/images/clients/oblu.jpg" }]
    updateContent("successStories", "items", items)
    setNewStory({ client: "", title: "", description: "", image: "", result: "" })
    setShowAddForm(false)
  }

  const handleDeleteStory = (id: string) => {
    const items = content.successStories.items.filter(item => item.id !== id)
    updateContent("successStories", "items", items)
  }

  const handleUpdateStory = (id: string, field: string, value: string) => {
    const items = content.successStories.items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    )
    updateContent("successStories", "items", items)
  }

  return (
    <section id="success-stories" className="bg-secondary/50 py-24" dir={isDv ? "rtl" : "ltr"}>
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`mb-16 text-center transition-all duration-700 ${
            isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="mb-3 inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            {content.successStories.sectionTag}
          </span>
          <EditableText
            value={content.successStories.title}
            onSave={(val) => updateContent("successStories", "title", val)}
            as="h2"
            className="text-3xl font-bold text-foreground sm:text-4xl text-balance"
          />
          <EditableText
            value={content.successStories.subtitle}
            onSave={(val) => updateContent("successStories", "subtitle", val)}
            as="p"
            className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
          />
        </div>

        {/* Stories Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {content.successStories.items.map((story, i) => (
            <div
              key={story.id}
              className={`group relative overflow-hidden rounded-2xl bg-card border border-border shadow-sm transition-all duration-500 hover:shadow-lg hover:border-primary/30 ${
                isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
              }`}
              style={{ animationDelay: `${i * 150}ms` }}
            >
              {editingId === story.id ? (
                <div className="p-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      type="text"
                      value={story.client}
                      onChange={(e) => handleUpdateStory(story.id, "client", e.target.value)}
                      className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Client Name"
                    />
                    <input
                      type="text"
                      value={story.title}
                      onChange={(e) => handleUpdateStory(story.id, "title", e.target.value)}
                      className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Project Title"
                    />
                    <input
                      type="text"
                      value={story.result}
                      onChange={(e) => handleUpdateStory(story.id, "result", e.target.value)}
                      className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Result (e.g., 40% Increase)"
                    />
                  </div>
                  <textarea
                    value={story.description}
                    onChange={(e) => handleUpdateStory(story.id, "description", e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Description"
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
                <>
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <EditableImage
                      src={story.image}
                      alt={story.client}
                      onSave={(val) => handleUpdateStory(story.id, "image", val)}
                      fill
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2 text-white/90 mb-1">
                        <Building2 className="h-4 w-4" />
                        <span className="text-sm font-medium">{story.client}</span>
                      </div>
                      <EditableText
                        value={story.title}
                        onSave={(val) => handleUpdateStory(story.id, "title", val)}
                        as="h3"
                        className="text-xl font-bold text-white"
                      />
                    </div>
                    {isEditing && (
                      <div className="absolute top-4 right-4 flex gap-2">
                        <button
                          onClick={() => setEditingId(story.id)}
                          className="rounded-lg bg-white/20 p-2 text-white hover:bg-white/30 backdrop-blur-sm"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteStory(story.id)}
                          className="rounded-lg bg-white/20 p-2 text-white hover:bg-destructive/80 backdrop-blur-sm"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <EditableText
                      value={story.description}
                      onSave={(val) => handleUpdateStory(story.id, "description", val)}
                      as="p"
                      className="text-sm text-muted-foreground mb-4"
                      multiline
                    />
                    
                    {/* Result Badge */}
                    <div className="flex items-center gap-2 text-primary">
                      <TrendingUp className="h-5 w-5" />
                      <EditableText
                        value={story.result}
                        onSave={(val) => handleUpdateStory(story.id, "result", val)}
                        as="span"
                        className="font-bold text-lg"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Add New Story Form */}
        {isEditing && (
          <>
            {showAddForm ? (
              <div className="mt-6 rounded-xl border border-primary bg-card p-6 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-card-foreground">Add New Success Story</h3>
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
                      value={newStory.client}
                      onChange={(e) => setNewStory({ ...newStory, client: e.target.value })}
                      className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Client Name *"
                    />
                    <input
                      type="text"
                      value={newStory.title}
                      onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
                      className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Project Title *"
                    />
                    <input
                      type="text"
                      value={newStory.result}
                      onChange={(e) => setNewStory({ ...newStory, result: e.target.value })}
                      className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Result (e.g., 40% Increase) *"
                    />
                    <input
                      type="text"
                      value={newStory.image}
                      onChange={(e) => setNewStory({ ...newStory, image: e.target.value })}
                      className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Image URL (optional)"
                    />
                  </div>
                  <textarea
                    value={newStory.description}
                    onChange={(e) => setNewStory({ ...newStory, description: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Description *"
                    rows={3}
                  />
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={handleAddStory}
                      disabled={!newStory.client || !newStory.title || !newStory.description || !newStory.result}
                      className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Save className="h-4 w-4" />
                      Add Story
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
                Add New Success Story
              </button>
            )}
          </>
        )}
      </div>
    </section>
  )
}
