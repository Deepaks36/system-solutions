"use client"

import { SiteProvider } from "@/lib/site-context"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/sections/hero"
import { AboutSection } from "@/components/sections/about"
import { FeaturesSection } from "@/components/sections/features"
import { CareersSection } from "@/components/sections/careers"
import { SuccessStoriesSection } from "@/components/sections/success-stories"
import { TeamSection } from "@/components/sections/team"
import { ServicesSection } from "@/components/sections/services"
import { ClientsSection } from "@/components/sections/clients"
import { TestimonialsSection } from "@/components/sections/testimonials"
import { ContactSection } from "@/components/sections/contact"
import { Footer } from "@/components/footer"
import { AdminToolbar } from "@/components/admin-toolbar"

export default function Home() {
  return (
    <SiteProvider>
      <div className="relative min-h-screen">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <FeaturesSection />
          <CareersSection />
          <SuccessStoriesSection />
          <TeamSection />
          <ServicesSection />
          <ClientsSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <Footer />
        <AdminToolbar />
      </div>
    </SiteProvider>
  )
}
