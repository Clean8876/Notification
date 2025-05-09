import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom'
import HeroSection from '../components/landingpage/HeroSection'
import Navbars from '../components/Navbars'
import Placeholder from '../components/landingpage/Placeholder'


function LandingPage() {
    const navigate = useNavigate();
  
    const featuresData = [
      {
        feature: "Mobile Push Notification",
        description: "Instant alerts sent directly to your users' phones",
        content: "Reach your users wherever they are with real-time mobile push notifications. Perfect for time-sensitive updates, promotions, or re-engagement strategies—our system ensures your message never gets lost in the noise.",
      },
      {
        feature: "Email Notificaiton",
        description: "Professional emails that keep your users informed",
        content: "Send branded, reliable email notifications for everything from account updates to promotional campaigns. Designed to land in inboxes, not spam folders—keep your users in the loop with confidence.",
      },
      {
        feature: "In App Notification",
        description: "Seamless updates inside your app experience",
        content: "Deliver real-time messages inside your app to guide, inform, or engage users without interrupting their flow. Whether it’s a feature highlight, status alert, or gentle nudge, in-app notifications enhance your UX.",
      },
    ];
      const pricingData = [
          {
            feature: "₹600 / month",
            description: "Flexible monthly plan to get started quickly.",
            content: "Ideal for indie developers or small teams who want full access without a long-term commitment. Test features, send real-time notifications, and scale as needed—no strings attached."
          },
          {
            feature: "₹7200 / year",
            description: "Cost-effective annual plan with extra savings.",
            content: "Perfect for serious projects that are here to stay. Get 12 months of full service while saving on your monthly spend—plus priority support to keep your notification flow smooth."
          },
          {
            feature: "₹21,600 / 3 years",
            description: "Long-term commitment, maximum value.",
            content: "Built for teams or apps ready to grow over time. With this plan, lock in future-proof pricing, ensure uninterrupted service, and focus on building—while we handle the messaging backbone."
          }
        ];
        const aboutData = [
          {
            feature: "Who We Are",
            content: "We're a notification platform built for developers who value seamless communication. In a world where user attention is fragmented, we provide the tools to deliver the right message, at the right time, through the right channel—whether it's mobile push, email, or in-app notifications."
          },
          {
            feature: "Our Mission",
            content: "To simplify developer workflows while maximizing user engagement. We believe notifications should be powerful yet effortless—transforming how apps communicate with users without adding technical complexity. Our solutions help you maintain user relationships at every stage of their journey."
          },
          {
            feature: "Why Choose Us",
            content: "Unlike generic notification services, we're built specifically for product teams that care about delivery rates and user experience. With deliverability-focused infrastructure, flexible pricing, and intuitive integration, we handle the heavy lifting so you can focus on what matters—building great products."
          }
        ];
  
  return (
<div>
    <div className="lex flex-col min-h-screen">
    <Navbars/>
    {/* Hero */}
    <main className="flex-grow">
    <HeroSection/>
    <Placeholder id="features" title="Features" data={featuresData}/>
    <Placeholder id="pricing" title="Pricing" data={pricingData}/>
    <Placeholder id="about" title="About us" data={aboutData}/>
    {/* Logos */}
    <section className="bg-white py-16 px-6 text-center">
            <h2 className="text-sm text-gray-500 uppercase tracking-widest mb-4">
                Built for reliability
            </h2>
            <p className="text-xl md:text-2xl font-semibold text-gray-800 mb-8 max-w-2xl mx-auto">
                Works seamlessly with the tools you already use
            </p>
            <div className="flex flex-wrap items-center justify-center gap-10 opacity-80">
                <img
                src="src/assets/FirebaseLogo.png"
                alt="Firebase"
                className="h-auto w-auto object-contain"
                />
                <img
                src="src/assets/FlutterLogo.png"
                alt="Flutter"
                className="h-18 w-auto object-contain"
                />
                {/* Add more logos as needed */}
            </div>
    </section>

    {/* Features Grid */}



    {/* Journey Builder */}
    <section className="bg-gray-50 py-20 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <Badge className="mb-2">Orchestrate</Badge>
          <h3 className="text-2xl font-bold mb-4">Send the right message, exactly when it matters.</h3>
          <p className="text-gray-600 mb-6">
          Don’t spam. Connect. Use smart triggers and multi-channel delivery to send the kind of messages that build loyalty — not churn. From the first touch to long-term retention, you control the timing, content, and channels. We just make it seamless.
          </p>
          <Button  variant="default" >Explore Journeys</Button>
        </div>
        <div className="h-64 bg-gray-200 rounded overflow-hidden relative">
          <img
            src="src/assets/8431429_3905235(1).jpg"
            alt="Firebase"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </section>

    {/* Segmentation */}
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      <div className="h-64 bg-gray-200 rounded overflow-hidden relative">
          <img
            src="src/assets/8431429_3905235(1).jpg"
            alt="Firebase"
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <Badge className="mb-2">Segment</Badge>
          <h3 className="text-2xl font-bold mb-4">Target users with precision</h3>
          <p className="text-gray-600 mb-6">
            Create audience segments in real-time and drive hyper-relevant messaging.
          </p>
          <Button>Explore Segmentation</Button>
        </div>
      </div>
    </section>
    </main>
    {/* Footer */}
    <footer className="text-center py-10 text-sm text-gray-500 border-t">
      © {new Date().getFullYear()} Notification.
    </footer>
  </div></div>
  )
}

export default LandingPage
