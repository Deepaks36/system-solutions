"use client"

import { useSite } from "@/lib/site-context"
import { EditableText } from "@/components/editable-text"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import {
  Code2,
  Globe,
  Smartphone,
  BrainCircuit,
  LayoutGrid,
  Users,
} from "lucide-react"

const serviceIcons = [Code2, Globe, Smartphone, BrainCircuit, LayoutGrid, Users]

export function ServicesSection() {
  const { content, updateContent, language } = useSite()
  const { ref, isVisible } = useScrollAnimation(0.05)
  const isDv = language === "dv"

  return (
    <section id="services" className="py-24" dir={isDv ? "rtl" : "ltr"}>
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`mb-16 text-center transition-all duration-700 ${
            isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="mb-3 inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            {content.services.sectionTag}
          </span>
          <EditableText
            value={content.services.title}
            onSave={(val) => updateContent("services", "title", val)}
            as="h2"
            className="text-3xl font-bold text-foreground sm:text-4xl text-balance"
          />
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.services.items.map((item, i) => {
            const Icon = serviceIcons[i] || Code2
            return (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm transition-all duration-500 hover:border-primary/40 hover:shadow-lg ${
                  isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
                }`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Decorative accent */}
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary to-accent opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </div>

                <EditableText
                  value={item.title}
                  onSave={(val) => {
                    const items = [...content.services.items]
                    items[i] = { ...items[i], title: val }
                    updateContent("services", "items", items)
                  }}
                  as="h3"
                  className="mb-3 text-lg font-bold text-card-foreground"
                />
                <EditableText
                  value={item.description}
                  onSave={(val) => {
                    const items = [...content.services.items]
                    items[i] = { ...items[i], description: val }
                    updateContent("services", "items", items)
                  }}
                  as="p"
                  className="text-sm leading-relaxed text-muted-foreground"
                  multiline
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
