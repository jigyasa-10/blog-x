"use client"

import { Button } from "@/components/ui/button"
import { AnimatedTooltip } from "./animated-tooltip"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const people = [
    {
      id: 1,
      name: "Aditya",
      designation: "Software Developer",
      image: "/banner-1.png",
    },
    {
      id: 2,
      name: "Jigyasa",
      designation: "Software Developer",
      image: "/banner-1.png",
    },
    {
      id: 3,
      name: "Drishti",
      designation: "Software Developer",
      image: "/banner-1.png",
    }
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-purple-950/20"></div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <div className="h-px w-12 bg-purple-500"></div>
            <span className="text-purple-500 font-medium">AI-POWERED EXPERTISE</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-8 leading-tight tracking-tight">
            Scaling Human <span className="text-purple-500">Expertise</span> with Artificial Intelligence
          </h1>

          <p className="text-xl md:text-2xl text-foreground/70 mb-12 leading-relaxed max-w-3xl">
            MindSync transforms specialized knowledge into AI-driven solutions, making expertise accessible, scalable,
            and efficient.
          </p>

          <div className="flex justify-center   flex-col sm:flex-row gap-6">
            <Link href="/team">
              <Button
                size="lg"
                className="mt-2"
              >
                Meet The Team <ArrowRight />
              </Button>
            </Link>
            <div className="flex flex-row items-center justify-center mb-10 ">
              <AnimatedTooltip items={people} />
            </div>
          </div>
        </div>
      </div>

      {/* Simple decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
    </section>
  )
}
