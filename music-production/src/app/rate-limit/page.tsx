"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TriangleAlert } from "lucide-react";

export default function RateLimitPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center space-y-6 p-8 bg-secondary/30 rounded-2xl border border-border"
      >
        <div className="flex justify-center">
          <TriangleAlert className="w-16 h-16 text-primary" />
        </div>
        <h1 className="text-3xl font-bold font-display">Rate Limit Reached!</h1>
        <p className="text-muted-foreground">
          You&aposve reached the rate limit. Would you like to continue on WhatsApp?
        </p>
        <Link 
          href="https://wa.me/5527995096289?text=Hi%20Gabriel,%20I'd%20like%20to%20talk%20about%20my%20music%20project!" 
          className="inline-block w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Continue on WhatsApp
        </Link>
        <Link 
          href="/" 
          className="inline-block w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}