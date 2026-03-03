"use client"

import { useSite } from "@/lib/site-context"
import { EditableText } from "@/components/editable-text"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import {
  Trophy,
  TrendingUp,
  Languages,
  Lightbulb,
  HeartHandshake,
  Clock,
  Settings2,
  Cpu,
  Leaf,
} from "lucide-react"

const featureIcons = [Trophy, TrendingUp, Languages, Lightbulb, HeartHandshake, Clock, Settings2, Cpu, Leaf]

export function FeaturesSection() {
  const { content, updateContent, language } = useSite()
  const { ref, isVisible } = useScrollAnimation(0.05)
  const isDv = language === "dv"

  return (
    <section id="features" className="bg-secondary/50 py-24" dir={isDv ? "rtl" : "ltr"}>
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`mb-16 text-center transition-all duration-700 ${
            isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="mb-3 inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            {content.features.sectionTag}
          </span>
          <EditableText
            value={content.features.title}
            onSave={(val) => updateContent("features", "title", val)}
            as="h2"
            className="text-3xl font-bold text-foreground sm:text-4xl text-balance"
          />
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.features.items.map((item, i) => {
            const Icon = featureIcons[i] || Settings2
            return (
              <div
                key={i}
                className={`group rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-500 hover:border-primary/30 hover:shadow-md ${
                  isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
                }`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <EditableText
                  value={item.title}
                  onSave={(val) => {
                    const items = [...content.features.items]
                    items[i] = { ...items[i], title: val }
                    updateContent("features", "items", items)
                  }}
                  as="h3"
                  className="mb-2 text-lg font-semibold text-card-foreground"
                />
                <EditableText
                  value={item.description}
                  onSave={(val) => {
                    const items = [...content.features.items]
                    items[i] = { ...items[i], description: val }
                    updateContent("features", "items", items)
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
