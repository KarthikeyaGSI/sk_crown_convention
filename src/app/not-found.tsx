"use client";

import React from "react";
import Link from "next/link";
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-luxury-bg text-white-soft flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="space-y-6 max-w-md">
        <span className="text-xs uppercase tracking-[0.3em] text-gold font-sans font-semibold">
          Error 404
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white-soft">
          Page Not Found
        </h1>
        <div className="w-12 h-[1px] bg-gold mx-auto" />
        <p className="text-sm text-muted-text font-sans font-light leading-relaxed">
          The sanctuary page you are seeking does not exist or has been relocated. Return to our homepage to continue planning your celebration.
        </p>
        <div className="pt-4">
          <Link href="/" passHref>
            <Button variant="primary">Return Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
