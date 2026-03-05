"use client"

import React, { createContext, useContext, useState, useCallback, useEffect } from "react"
import { type Language, type SiteContent, defaultContent } from "./content"

interface SiteContextType {
  language: Language
  setLanguage: (lang: Language) => void
  content: SiteContent
  updateContent: (section: string, key: string, value: unknown) => void
  updateContentDirect: (section: string, data: unknown) => void
  isAdmin: boolean
  setIsAdmin: (val: boolean) => void
  isEditing: boolean
  setIsEditing: (val: boolean) => void
}

const SiteContext = createContext<SiteContextType | undefined>(undefined)

const STORAGE_KEY = "sspl-content"
const LANG_KEY = "sspl-lang"

function getStoredContent(): Record<Language, SiteContent> | null {
  if (typeof window === "undefined") return null
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch {
    // ignore
  }
  return null
}

function mergeLanguageContent(defaultLang: SiteContent, storedLang?: Partial<SiteContent>): SiteContent {
  if (!storedLang) return defaultLang

  const merged = { ...defaultLang } as Record<string, unknown>
  for (const key of Object.keys(defaultLang) as (keyof SiteContent)[]) {
    const defaultSection = defaultLang[key]
    const storedSection = storedLang[key]

    if (
      storedSection &&
      typeof storedSection === "object" &&
      !Array.isArray(storedSection) &&
      defaultSection &&
      typeof defaultSection === "object" &&
      !Array.isArray(defaultSection)
    ) {
      merged[key] = { ...defaultSection, ...storedSection }
    } else if (storedSection !== undefined) {
      merged[key] = storedSection
    }
  }

  return merged as SiteContent
}

function mergeContentWithDefaults(stored: Record<Language, SiteContent>): Record<Language, SiteContent> {
  const merged = {
    en: mergeLanguageContent(defaultContent.en, stored.en),
    dv: mergeLanguageContent(defaultContent.dv, stored.dv),
  }

  // Migrate older stored data where dv careers/success stories were left in the old English defaults.
  if (
    merged.dv.careers.title === "Join Our Team" &&
    merged.dv.successStories.title === "Our Success Stories"
  ) {
    merged.dv = {
      ...merged.dv,
      careers: defaultContent.dv.careers,
      successStories: defaultContent.dv.successStories,
    }
  }

  return merged
}

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")
  const [allContent, setAllContent] = useState<Record<Language, SiteContent>>(defaultContent)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const stored = getStoredContent()
    if (stored) {
      setAllContent(mergeContentWithDefaults(stored))
    }
    const lang = localStorage.getItem(LANG_KEY)
    if (lang === "dv" || lang === "en") {
      setLanguageState(lang)
    }
  }, [])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem(LANG_KEY, lang)
  }, [])

  const saveContent = useCallback((updated: Record<Language, SiteContent>) => {
    setAllContent(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }, [])

  const updateContent = useCallback(
    (section: string, key: string, value: unknown) => {
      setAllContent((prev) => {
        const updated = { ...prev }
        const langContent = { ...updated[language] } as Record<string, unknown>
        const sectionData = { ...(langContent[section] as Record<string, unknown>) }
        sectionData[key] = value
        langContent[section] = sectionData
        updated[language] = langContent as SiteContent
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
        return updated
      })
    },
    [language]
  )

  const updateContentDirect = useCallback(
    (section: string, data: unknown) => {
      setAllContent((prev) => {
        const updated = { ...prev }
        const langContent = { ...updated[language] } as Record<string, unknown>
        langContent[section] = data
        updated[language] = langContent as SiteContent
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
        return updated
      })
    },
    [language]
  )

  const content = allContent[language]

  return (
    <SiteContext.Provider
      value={{
        language,
        setLanguage,
        content,
        updateContent,
        updateContentDirect,
        isAdmin,
        setIsAdmin,
        isEditing,
        setIsEditing,
      }}
    >
      {children}
    </SiteContext.Provider>
  )
}

export function useSite() {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error("useSite must be used within SiteProvider")
  return ctx
}
