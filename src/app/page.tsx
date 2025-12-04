import { Header } from '@/components/layout/header'
import { Hero } from '@/components/sections/hero'
import { HowItWorks } from '@/components/sections/how-it-works'
import { IncomeCalculator } from '@/components/sections/income-calculator'
import { FAQ } from '@/components/sections/faq'
import { Footer } from '@/components/layout/footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <IncomeCalculator />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}