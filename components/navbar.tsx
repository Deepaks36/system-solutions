"use client"

import { useState, useEffect } from "react"
import { useSite } from "@/lib/site-context"
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

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  const handleLogin = () => {
    if (username === "admin" && password === "admin123") {
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Brand */}
            <a href="#home" className="flex items-center gap-2">
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

            {/* Desktop links */}
            <div className="hidden items-center gap-1 lg:flex">
              {content.nav.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary ${
                    scrolled ? "text-foreground" : "text-foreground"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right side controls */}
            <div className="flex items-center gap-2">
              {/* Language Switcher */}
              <button
                onClick={() => setLanguage(language === "en" ? "dv" : "en")}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors hover:bg-primary/10 ${
                  scrolled ? "text-foreground" : "text-foreground"
                }`}
                aria-label="Switch language"
              >
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">{language === "en" ? "DV" : "EN"}</span>
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
                {content.nav.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary/10"
                  >
                    {link.label}
                  </a>
                ))}
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
            <p className="mt-3 text-xs text-muted-foreground">Default: admin / admin123</p>
          </div>
        </div>
      )}
    </>
  )
}
