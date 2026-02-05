"use client";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FeaturedProduction from "@/components/FeaturedProduction";
import About from "@/components/About";
import PortfolioGrid from "@/components/PortfolioGrid";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import References from "@/components/References";

export default function Home() {
  return (
      <div className="min-h-screen bg-background overflow-x-hidden max-w-full">
      {/* Film grain overlay */}
      <div className="grain-overlay" />
      
      <Navigation />
      <main>
        <Hero />
        <FeaturedProduction />
        <About />
        <PortfolioGrid />
        <References/>
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
