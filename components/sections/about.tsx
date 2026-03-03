"use client"

import { useSite } from "@/lib/site-context"
import { EditableText } from "@/components/editable-text"
import { EditableImage } from "@/components/editable-image"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function AboutSection() {
  const { content, updateContent, language } = useSite()
  const { ref, isVisible } = useScrollAnimation(0.1)
  const isDv = language === "dv"

  return (
    <section id="about" className="py-24" dir={isDv ? "rtl" : "ltr"}>
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image */}
          <div
            className={`overflow-hidden rounded-2xl transition-all duration-700 ${
              isVisible ? "animate-slide-in-left" : "opacity-0 -translate-x-8"
            }`}
          >
            <EditableImage
              src={content.about.image}
              alt="About Systems Solutions"
              onSave={(val) => updateContent("about", "image", val)}
              width={600}
              height={450}
              className="h-auto w-full rounded-2xl object-cover"
            />
          </div>

          {/* Text */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "animate-slide-in-right" : "opacity-0 translate-x-8"
            }`}
          >
            <span className="mb-3 inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              {content.about.sectionTag}
            </span>

            <EditableText
              value={content.about.title}
              onSave={(val) => updateContent("about", "title", val)}
              as="h2"
              className="mb-6 text-3xl font-bold leading-tight text-foreground sm:text-4xl text-balance"
            />

            <EditableText
              value={content.about.description}
              onSave={(val) => updateContent("about", "description", val)}
              as="p"
              className="text-base leading-relaxed text-muted-foreground"
              multiline
            />
          </div>
        </div>
      </div>
    </section>
  )
}
