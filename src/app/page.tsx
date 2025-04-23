import Hero from "@/components/hero"
import ProblemStatement from "@/components/problem-statement"
import HowItWorks from "@/components/how-it-works"
import UseCases from "@/components/use-cases"
import FinalCTA from "@/components/final-cta"

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ProblemStatement />
      <HowItWorks />
      <UseCases />
      <FinalCTA />
    </main>
  )
}
