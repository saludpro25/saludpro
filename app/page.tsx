import { LpNavbar1 } from "@/components/lp-navbar-1"
import { HeroSection7 } from "@/components/hero-section-7"
import { RecommendedCompanies } from "@/components/recommended-companies"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { BenefitsSection } from "@/components/benefits-section"
import { KitDigitalSection } from "@/components/kit-digital-section"
import { FaqSection1 } from "@/components/faq-section-1"
import { Footer2 } from "@/components/footer-2"

export default function Home() {
  return (
    <main>
      <LpNavbar1 />
      <HeroSection7 />
      <RecommendedCompanies />
      <HowItWorksSection />
      <BenefitsSection />
      <KitDigitalSection />
      <FaqSection1 />
      <Footer2 />
    </main>
  )
}
