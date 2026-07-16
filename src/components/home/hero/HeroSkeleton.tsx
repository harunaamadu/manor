// src/components/home/hero/HeroSkeleton.tsx
import React from "react";
import Container from "@/components/common/Container";

export default function HeroSkeleton() {
  return (
    <Container
      as="div"
      className="relative h-fit overflow-hidden p-0! bg-linear-to-b from-background from-0% via-foreground/3 via-80% to-foreground/6 to-100% animate-pulse"
    >
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-6 md:min-h-[calc(100svh-24em)] p-4 md:p-10">
        
        {/* Left Side: Content Text Skeleton */}
        <div className="flex flex-col items-center md:items-start justify-center gap-4 w-full">
          {/* Title Header Line */}
          <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-md w-3/4 md:w-full" />
          <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-md w-1/2 md:w-2/3" />
          
          {/* Description Block lines */}
          <div className="space-y-2 w-full max-w-md mt-2">
            <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded-md w-full" />
            <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded-md w-5/6" />
            <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded-md w-4/5" />
          </div>

          {/* Buttons Group */}
          <div className="mt-4 flex items-center gap-4 w-full justify-center md:justify-start">
            <div className="h-11 bg-zinc-300 dark:bg-zinc-700 rounded-md w-32" />
            <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded-md w-24" />
          </div>
        </div>

        {/* Right Side: Square Banner Graphical Placeholder */}
        <div className="relative block aspect-square h-full w-full bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
        
      </div>
    </Container>
  );
}
