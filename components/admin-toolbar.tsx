"use client"

import { useState } from "react"
import { useSite } from "@/lib/site-context"
import { RotateCcw, X, AlertTriangle } from "lucide-react"
import { defaultContent } from "@/lib/content"

export function AdminToolbar() {
  const { isAdmin, isEditing, language } = useSite()
  const [showReset, setShowReset] = useState(false)

  if (!isAdmin || !isEditing) return null

  const handleReset = () => {
    localStorage.removeItem("sspl-content")
    window.location.reload()
  }

  return (
    <>
      {/* Floating toolbar */}
      <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full border border-border bg-card px-4 py-2 shadow-2xl">
        <div className="flex h-2 w-2 animate-pulse rounded-full bg-accent" />
        <span className="text-sm font-medium text-card-foreground">
          Editing Mode ({language.toUpperCase()})
        </span>
        <div className="h-4 w-px bg-border" />
        <span className="text-xs text-muted-foreground">Hover over text or images to edit</span>
        <div className="h-4 w-px bg-border" />
        <button
          onClick={() => setShowReset(true)}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </button>
      </div>

      {/* Reset Confirmation */}
      {showReset && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-foreground/50 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-sm rounded-xl border border-border bg-card p-6 shadow-2xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground">Reset All Content?</h3>
                <p className="text-sm text-muted-foreground">This will restore default content for all languages.</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleReset}
                className="flex-1 rounded-lg bg-destructive px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-destructive/90"
              >
                Reset Everything
              </button>
              <button
                onClick={() => setShowReset(false)}
                className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
