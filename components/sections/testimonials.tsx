"use client"

import { useState, useEffect, useCallback } from "react"
import { useSite } from "@/lib/site-context"
import { EditableText } from "@/components/editable-text"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Quote, ChevronLeft, ChevronRight } from "lucide-react"

export function TestimonialsSection() {
  const { content, updateContent, language } = useSite()
  const { ref, isVisible } = useScrollAnimation(0.1)
  const isDv = language === "dv"
  const [current, setCurrent] = useState(0)
  const items = content.testimonials.items

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % items.length)
  }, [items.length])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + items.length) % items.length)
  }, [items.length])

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="py-24" dir={isDv ? "rtl" : "ltr"}>
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`mb-16 text-center transition-all duration-700 ${
            isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="mb-3 inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            {content.testimonials.sectionTag}
          </span>
          <EditableText
            value={content.testimonials.title}
            onSave={(val) => updateContent("testimonials", "title", val)}
            as="h2"
            className="text-3xl font-bold text-foreground sm:text-4xl"
          />
          <EditableText
            value={content.testimonials.subtitle}
            onSave={(val) => updateContent("testimonials", "subtitle", val)}
            as="p"
            className="mt-3 text-muted-foreground"
          />
        </div>

        {/* Carousel */}
        <div
          className={`relative mx-auto max-w-3xl transition-all duration-700 ${
            isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm sm:p-12">
            <Quote className="mb-6 h-10 w-10 text-primary/30" />

            <div className="min-h-[160px]">
              <EditableText
                value={items[current].quote}
                onSave={(val) => {
                  const newItems = [...items]
                  newItems[current] = { ...newItems[current], quote: val }
                  updateContent("testimonials", "items", newItems)
                }}
                as="p"
                className="mb-8 text-lg leading-relaxed text-card-foreground italic"
                multiline
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <EditableText
                  value={items[current].author}
                  onSave={(val) => {
                    const newItems = [...items]
                    newItems[current] = { ...newItems[current], author: val }
                    updateContent("testimonials", "items", newItems)
                  }}
                  as="h4"
                  className="font-bold text-card-foreground"
                />
                <EditableText
                  value={items[current].role}
                  onSave={(val) => {
                    const newItems = [...items]
                    newItems[current] = { ...newItems[current], role: val }
                    updateContent("testimonials", "items", newItems)
                  }}
                  as="p"
                  className="text-sm text-muted-foreground"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={next}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="mt-6 flex justify-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${
                  i === current ? "w-8 bg-primary" : "w-2 bg-border hover:bg-muted-foreground/40"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
