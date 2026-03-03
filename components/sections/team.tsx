"use client"

import { useSite } from "@/lib/site-context"
import { EditableText } from "@/components/editable-text"
import { EditableImage } from "@/components/editable-image"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function TeamSection() {
  const { content, updateContent, language } = useSite()
  const { ref, isVisible } = useScrollAnimation(0.05)
  const isDv = language === "dv"

  return (
    <section id="team" className="py-24" dir={isDv ? "rtl" : "ltr"}>
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`mb-16 text-center transition-all duration-700 ${
            isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="mb-3 inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            {content.team.sectionTag}
          </span>
          <EditableText
            value={content.team.title}
            onSave={(val) => updateContent("team", "title", val)}
            as="h2"
            className="text-3xl font-bold text-foreground sm:text-4xl"
          />
          <EditableText
            value={content.team.subtitle}
            onSave={(val) => updateContent("team", "subtitle", val)}
            as="p"
            className="mt-3 text-muted-foreground"
          />
        </div>

        {/* Members */}
        <div className="grid gap-8 md:grid-cols-3">
          {content.team.members.map((member, i) => (
            <div
              key={i}
              className={`group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-500 hover:shadow-lg ${
                isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
              }`}
              style={{ animationDelay: `${i * 150}ms` }}
            >
              {/* Photo */}
              <div className="relative h-72 overflow-hidden">
                <EditableImage
                  src={member.image}
                  alt={member.name}
                  onSave={(val) => {
                    const members = [...content.team.members]
                    members[i] = { ...members[i], image: val }
                    updateContent("team", "members", members)
                  }}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Info */}
              <div className="p-6">
                <EditableText
                  value={member.name}
                  onSave={(val) => {
                    const members = [...content.team.members]
                    members[i] = { ...members[i], name: val }
                    updateContent("team", "members", members)
                  }}
                  as="h3"
                  className="text-lg font-bold text-card-foreground"
                />
                <EditableText
                  value={member.role}
                  onSave={(val) => {
                    const members = [...content.team.members]
                    members[i] = { ...members[i], role: val }
                    updateContent("team", "members", members)
                  }}
                  as="p"
                  className="mb-3 text-sm font-medium text-primary"
                />
                <EditableText
                  value={member.bio}
                  onSave={(val) => {
                    const members = [...content.team.members]
                    members[i] = { ...members[i], bio: val }
                    updateContent("team", "members", members)
                  }}
                  as="p"
                  className="text-sm leading-relaxed text-muted-foreground"
                  multiline
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
