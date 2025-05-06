import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
function HeroSection() {
    const navigate = useNavigate()

    const handleLoginRoute =()=>{
        navigate('/login')
    }
  return (
<section className="w-full py-20 md:py-32 lg:py-40 bg-gradient-to-r from-[#001f3f] to-[#003366]">
        <div className="px-4 md:px-6 flex justify-center">
            <div className="max-w-3xl w-full text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white">
        The engagement platform that <span className="text-blue-400">customers love</span>
        </h1>
        <p className="text-lg text-white md:text-xl">
        Start sending push, SMS, and email from one unified platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Button size="lg"  onClick={handleLoginRoute} asChild className="bg-blue-500 text-white font-bold hover:bg-blue-600 shadow-md transition-transform hover:scale-105">
           
              <span>Get Started Now <ArrowRight className="ml-2 h-5 w-5" /></span>
            
          </Button>
          <Button size="lg" variant="outline"  className="text-white font-Poppins border-primaryButton bg-transparent hover:bg-primaryButton hover:text-primary-foreground shadow-sm transition-transform hover:scale-105">
            
            <span>Talk to Sales</span>
            
          </Button>
        </div>
      </div>
       {/* Optional: Placeholder for an image or illustration */}
{/*        
       <div className="mt-12 md:mt-16 lg:mt-20">
          <img
              src="https://picsum.photos/1200/600"
              alt="Hero Illustration"
              data-ai-hint="website dashboard illustration"
              className="mx-auto rounded-lg shadow-xl"
              width={1200}
              height={600}
          />
       </div>
       */}
    </div>
  </section>
  )
}

export default HeroSection
