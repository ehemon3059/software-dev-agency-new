'use client'

import CaseStudies from '@/components/CaseStudies'
import FAQSection from '@/components/FAQSection'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import PerfectFit from '@/components/PerfectFit'
import Pricing from '@/components/Pricing'
import ProblemSolution from '@/components/ProblemSolution'
import ProcessSection from '@/components/ProcessSection'
import ServicesSection from '@/components/ServicesSection'
import TechStack from '@/components/TechStack'
import TrustBar from '@/components/TrustBar'
import WhyChooseUs from '@/components/WhyChooseUs'


import { useState } from 'react'

export default function Home() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

 


  


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      

      {/* Trust bar  */}
      <TrustBar />

      <ProblemSolution />

      {/* Services Section */}
      <ServicesSection/>

    <CaseStudies />

    <ProcessSection />

    <TechStack />

    <PerfectFit />

    <Pricing />

    <WhyChooseUs/>

    <FAQSection />

    <FinalCTA />

    <Footer/>


    </div>
  )
}