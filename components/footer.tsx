"use client"

import { useSite } from "@/lib/site-context"
import { EditableText } from "@/components/editable-text"
import {
  MapPin,
  Mail,
  Phone,
  Home,
  Info,
  Star,
  Users,
  Briefcase,
  Handshake,
  MessageSquare,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Clock,
} from "lucide-react"

const navIcons: Record<string, React.ReactNode> = {
  "#home": <Home className="h-3.5 w-3.5" />,
  "#about": <Info className="h-3.5 w-3.5" />,
  "#features": <Star className="h-3.5 w-3.5" />,
  "#team": <Users className="h-3.5 w-3.5" />,
  "#services": <Briefcase className="h-3.5 w-3.5" />,
  "#clients": <Handshake className="h-3.5 w-3.5" />,
  "#contact": <MessageSquare className="h-3.5 w-3.5" />,
}

export function Footer() {
  const { content, updateContent, language } = useSite()
  const isDv = language === "dv"
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card" dir={isDv ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">SS</span>
              </div>
              <EditableText
                value={content.footer.companyName}
                onSave={(val) => updateContent("footer", "companyName", val)}
                as="span"
                className="text-lg font-bold text-card-foreground"
              />
            </div>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              {language === "en"
                ? "Business automation through digital transformation. Your trusted IT partner for enterprise solutions."
                : "ޑިޖިޓަލް ޓްރާންސްފޯމޭޝަން މެދުވެރިކޮށް ވިޔަފާރީގެ އޮޓޮމޭޝަން. އެންޓަޕްރައިޒް ސޮލިއުޝަންސް އަށް ތިޔަބޭފުޅުންގެ އިތުބާރު ހޯދާ އައި.ޓީ ޕާޓްނަރ."}
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[
                { icon: <Facebook className="h-4 w-4" />, label: "Facebook", href: "#" },
                { icon: <Twitter className="h-4 w-4" />, label: "Twitter", href: "#" },
                { icon: <Linkedin className="h-4 w-4" />, label: "LinkedIn", href: "#" },
                { icon: <Instagram className="h-4 w-4" />, label: "Instagram", href: "#" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-card-foreground">
              {language === "en" ? "Quick Links" : "ލިންކްތައް"}
            </h4>
            <nav className="flex flex-col gap-2.5">
              {content.nav.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {navIcons[link.href]}
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-card-foreground">
              {language === "en" ? "Contact" : "ގުޅުއްވާ"}
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <EditableText
                  value={content.footer.address}
                  onSave={(val) => updateContent("footer", "address", val)}
                  as="p"
                  className="text-sm text-muted-foreground"
                />
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a
                  href={`mailto:${content.footer.email}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {content.footer.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a
                  href={`tel:${content.footer.phone}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {content.footer.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-card-foreground">
              {language === "en" ? "Business Hours" : "ވިޔަފާރި ގަޑި"}
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-card-foreground">
                    {language === "en" ? "Sun - Thu" : "އާދީއްތަ - ބުރާސްފަތި"}
                  </p>
                  <p>9:00 AM - 6:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-card-foreground">
                    {language === "en" ? "Saturday" : "ހޮނިހިރު"}
                  </p>
                  <p>9:00 AM - 1:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {year} {content.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
