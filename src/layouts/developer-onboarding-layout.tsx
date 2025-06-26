import React from "react";
import IMAGES from "../assets/images";
import { cn } from "../lib/utils";
import { RegistrationProvider } from "../context/RegistrationContext";

interface LayoutProps {
  className?: string;
  children: React.ReactNode;
}

export default function DeveloperOnboardingLayout({
  children,
  className,
}: LayoutProps) {
  return (
    <RegistrationProvider>
      <div
        className={cn(
          "min-h-screen w-full overflow-hidden bg-white text-black",
          className
        )}
      >
        {/* Header */}
        <header className="container mx-auto py-10">
          <img src={IMAGES.appLogo} alt="App Logo" />
        </header>

        {/* Main Content Wrapper (relative for positioning) */}
        <div className="relative w-full flex flex-col px-48 mx-auto mt-10x">
          {children}
          
          {/* Positioned Vector Pattern (behind or fixed to a spot) */}
          <div className="absolute left-1/3 -bottom-30 -z-0">
            <img
              src={IMAGES.VectorCriclesPattern}
              alt="Vector Pattern"
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </RegistrationProvider>
  );
}
