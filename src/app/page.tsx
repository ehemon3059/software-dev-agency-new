'use client'

// import BlogSection from '@/components/BlogSection'
import CaseStudies from '@/components/CaseStudies'

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
// import ServicesSection from '@/components/ServicesSection'
import SocialProof from '@/components/SocialProof'
import TechStack from '@/components/TechStack'
import Testimonials from '@/components/Testimonials'

import WhyChooseUs from '@/components/WhyChooseUs'


import { useState } from 'react'

export default function Home() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

 


  


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
  


      <SocialProof />

      <ProblemSolution />

    

      <CaseStudies />

    <ProcessSection />
      
    <TechStack />

      <Testimonials /> 

      {/* <FoundersSection /> */}

    <Pricing />

      {/* <BlogSection /> */}

      <ProjectEstimator />



      {/* Services Section */}


    



    <PerfectFit />


    <WhyChooseUs/>

    <FAQSection />

    <FinalCTA />

    <Footer/>


    </div>
  )
}