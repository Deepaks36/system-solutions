"use client"

import { useState, useEffect } from "react"
import { useSite } from "@/lib/site-context"
import { defaultContent, ADMIN_CREDENTIALS } from "@/lib/content"
import { useTheme } from "next-themes"
import { Menu, X, Sun, Moon, Globe, Lock } from "lucide-react"

export function Navbar() {
  const { content, language, setLanguage, isAdmin, setIsAdmin, isEditing, setIsEditing } = useSite()
  const { theme, setTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  // Track active section based on scroll position
  useEffect(() => {
    const sections = ["home", "about", "features", "careers", "success-stories", "team", "services", "clients", "testimonials", "contact"]
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100 // Offset for navbar
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const top = element.offsetTop
          const height = element.offsetHeight
          
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogin = () => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsAdmin(true)
      setShowLogin(false)
      setUsername("")
      setPassword("")
      setLoginError("")
    } else {
      setLoginError("Invalid username or password")
    }
  }

  const handleLogout = () => {
    setIsAdmin(false)
    setIsEditing(false)
    setUsername("")
    setPassword("")
  }

  const isDv = language === "dv"
  const navTabActiveClass = "bg-primary/10 text-primary"
  const navTabInactiveClass = "text-foreground hover:bg-primary/10 hover:text-primary"
  const requiredLinks = defaultContent[language].nav.links
  const customLinks = content.nav.links ?? []
  const navLinks = requiredLinks.map((requiredLink) => {
    const match = customLinks.find((link) => link.href === requiredLink.href)
    return match ?? requiredLink
  }).concat(customLinks.filter((link) => !requiredLinks.some((requiredLink) => requiredLink.href === link.href)))

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur-md shadow-sm border-b border-border"
            : "bg-transparent"
        }`}
        dir={isDv ? "rtl" : "ltr"}
      >
        <div className="mx-auto max-w-screen-2xl px-3 sm:px-4 lg:px-5">
          <div className="flex h-16 items-center gap-3">
            {/* Brand - as link */}
            <a href="#home" className="flex items-center gap-2 shrink-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">SS</span>
              </div>
              <span
                className={`text-lg font-bold ${
                  scrolled ? "text-foreground" : "text-foreground"
                }`}
              >
                {content.nav.brand}
              </span>
            </a>

            {/* Right side links + controls */}
            <div className="ml-auto flex items-center gap-2">
              {/* Desktop links */}
              <div className="hidden items-center gap-1 lg:flex">
                {navLinks.map((link) => {
                  const sectionId = link.href.replace("#", "")
                  const isActive = activeSection === sectionId
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      className={`rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 ${
                        isActive 
                          ? navTabActiveClass
                          : navTabInactiveClass
                      }`}
                    >
                      {link.label}
                    </a>
                  )
                })}
              </div>

              {/* Language Switcher */}
              <button
                onClick={() => setLanguage(language === "en" ? "dv" : "en")}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors hover:bg-primary/10 ${
                  scrolled ? "text-foreground" : "text-foreground"
                }`}
                aria-label="Switch language"
              >
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">{content.nav.languageLabel}</span>
                <span className="text-xs font-semibold uppercase">{language === "en" ? "DV" : "EN"}</span>
              </button>

              {/* Theme toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className={`rounded-md p-2 transition-colors hover:bg-primary/10 ${
                    scrolled ? "text-foreground" : "text-foreground"
                  }`}
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>
              )}

              {/* Admin */}
              {isAdmin ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                      isEditing
                        ? "bg-accent text-accent-foreground"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {isEditing ? "Done Editing" : "Edit Mode"}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <Lock className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{content.nav.adminLogin}</span>
                </button>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="rounded-md p-2 text-foreground lg:hidden"
                aria-label="Toggle mobile menu"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="border-t border-border bg-background/95 backdrop-blur-md lg:hidden" dir={isDv ? "rtl" : "ltr"}>
              <div className="flex flex-col gap-1 px-2 py-3">
                {navLinks.map((link) => {
                  const sectionId = link.href.replace("#", "")
                  const isActive = activeSection === sectionId
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                        isActive 
                          ? navTabActiveClass
                          : "text-foreground/80 hover:bg-primary/10 hover:text-primary"
                      }`}
                    >
                      {link.label}
                    </a>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Login Dialog */}
      {showLogin && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/50 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-sm rounded-xl border border-border bg-card p-6 shadow-2xl">
            <h2 className="mb-4 text-lg font-semibold text-card-foreground">Admin Login</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                setLoginError("")
              }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="mb-3 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setLoginError("")
              }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="mb-3 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
            />
            {loginError && <p className="mb-3 text-sm text-destructive">{loginError}</p>}
            <div className="flex gap-2">
              <button
                onClick={handleLogin}
                className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setShowLogin(false)
                  setUsername("")
                  setPassword("")
                  setLoginError("")
                }}
                className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary"
              >
                Cancel
              </button>
            </div>
            {/* <p className="mt-3 text-xs text-muted-foreground text-center">Default: admin / admin123</p> */}
          </div>
        </div>
      )}
    </>
  )
}
