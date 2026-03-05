"use client"

import { useEffect, useRef, useState } from "react"

export function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Add initial state class
    el.classList.add("opacity-0", "translate-y-8")

    let hasAnimated = false

    const handleScroll = () => {
      if (!el) return

      const rect = el.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementTop = rect.top
      const elementHeight = rect.height

      // Calculate when element should be visible (with threshold)
      const triggerPoint = windowHeight * (1 - threshold)

      // Animate when element enters the viewport area
      if (elementTop < triggerPoint && elementTop + elementHeight > 0) {
        if (!hasAnimated) {
          hasAnimated = true
          el.classList.remove("opacity-0", "translate-y-8")
          el.classList.add("animate-fade-in-up")
        }
        setIsVisible(true)
      } else {
        // When scrolling away from the element, reset for re-animation
        // This allows animation to replay when scrolling back
        if (hasAnimated && (elementTop > windowHeight || elementTop + elementHeight < 0)) {
          hasAnimated = false
          el.classList.remove("animate-fade-in-up")
          el.classList.add("opacity-0", "translate-y-8")
          setIsVisible(false)
        }
      }
    }

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true })
    
    // Initial check
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [threshold])

  return { ref, isVisible }
}

// Enhanced hook for multiple items with staggered animations
export function useStaggeredAnimation(itemCount: number, threshold = 0.1) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())

  useEffect(() => {
    const handleScroll = () => {
      for (let i = 0; i < itemCount; i++) {
        const el = document.getElementById(`stagger-item-${i}`)
        if (!el) continue

        const rect = el.getBoundingClientRect()
        const windowHeight = window.innerHeight

        if (rect.top < windowHeight * (1 - threshold) && rect.bottom > 0) {
          setVisibleItems(prev => new Set([...prev, i]))
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [itemCount, threshold])

  return visibleItems
}
