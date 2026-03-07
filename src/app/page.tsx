'use client'

import BlogSection from '@/components/BlogSection'
import CaseStudies from '@/components/CaseStudies'
import ClientLogos from '@/components/ClientLogos'
import FAQSection from '@/components/FAQSection'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'
import FoundersSection from '@/components/FoundersSection'
import Hero from '@/components/Hero'
import PerfectFit from '@/components/PerfectFit'
import Pricing from '@/components/Pricing'
import ProblemSolution from '@/components/ProblemSolution'
import ProcessSection from '@/components/ProcessSection'
import ProjectEstimator from '@/components/ProjectEstimator'
import ServicesSection from '@/components/ServicesSection'
import SocialProof from '@/components/SocialProof'
import TechStack from '@/components/TechStack'
import Testimonials from '@/components/Testimonials'
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

      {/* <TrustBar /> */}

      <ClientLogos />   

      <SocialProof />
      <CaseStudies />
      <FoundersSection />

      <Testimonials /> 

      <BlogSection />

      <ProjectEstimator />


      <ProblemSolution />

      {/* Services Section */}
      <ServicesSection/>


    

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