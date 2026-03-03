"use client"

import { useEffect, useRef, useState } from "react"

export function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Add initial state class
    el.classList.add("opacity-0", "translate-y-8")

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When element enters viewport, animate in
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true)
          setHasAnimated(true)
          el.classList.remove("opacity-0", "translate-y-8")
          el.classList.add("animate-fade-in-up")
        }
        // When scrolling back up and element is visible, keep it visible
        else if (entry.isIntersecting && hasAnimated) {
          setIsVisible(true)
          el.classList.remove("opacity-0", "translate-y-8")
          el.classList.add("animate-fade-in-up")
        }
        // When scrolling down and element leaves viewport, don't hide it
        // This keeps the animation visible after first scroll
      },
      { 
        threshold,
        rootMargin: "0px 0px -50px 0px"
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, hasAnimated])

  return { ref, isVisible }
}

// Enhanced hook for multiple items with staggered animations
export function useStaggeredAnimation(itemCount: number, threshold = 0.1) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    for (let i = 0; i < itemCount; i++) {
      const el = document.getElementById(`stagger-item-${i}`)
      if (!el) continue

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set([...prev, i]))
          }
        },
        { threshold, rootMargin: "0px 0px -30px 0px" }
      )

      observer.observe(el)
      observers.push(observer)
    }

    return () => observers.forEach(obs => obs.disconnect())
  }, [itemCount, threshold])

  return visibleItems
}
