"use client"

import { useSite } from "@/lib/site-context"
import { EditableText } from "@/components/editable-text"
import { EditableImage } from "@/components/editable-image"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { ArrowDown } from "lucide-react"

export function HeroSection() {
  const { content, updateContent, language } = useSite()
  const { ref, isVisible } = useScrollAnimation(0.05)
  const isDv = language === "dv"

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
      dir={isDv ? "rtl" : "ltr"}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <EditableImage
          src={content.hero.image}
          alt="Hero background"
          onSave={(val) => updateContent("hero", "image", val)}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Content */}
      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div
            className={`transition-all duration-700 ${
              isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Systems Solutions Pvt Ltd
            </span>
          </div>

          <div
            className={`transition-all duration-700 delay-150 ${
              isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
            }`}
          >
            <EditableText
              value={content.hero.title}
              onSave={(val) => updateContent("hero", "title", val)}
              as="h1"
              className="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance"
            />
          </div>

          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
            }`}
          >
            <EditableText
              value={content.hero.subtitle}
              onSave={(val) => updateContent("hero", "subtitle", val)}
              as="p"
              className="mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground"
              multiline
            />
          </div>

          <div
            className={`transition-all duration-700 delay-[450ms] ${
              isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
            }`}
          >
            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
            >
              {content.hero.cta}
              <ArrowDown className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="flex h-8 w-5 items-start justify-center rounded-full border-2 border-muted-foreground/40 p-1">
          <div className="h-2 w-1 animate-bounce rounded-full bg-muted-foreground/60" />
        </div>
      </div>
    </section>
  )
}
