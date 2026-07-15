"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ContainerElement } from "../common/Container";

gsap.registerPlugin(ScrollTrigger);

interface RevealProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
  as?: ContainerElement;
  stagger?: number;
  delay?: number;
  className?: string;
}

export default function Reveal({
  children,
  as: Element = "div",
  stagger = 0.15,
  delay = 0,
  className,
  ...props
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-reveal]", {
        opacity: 0,
        y: 60,
        duration: 1,
        delay,
        stagger: stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [delay, stagger]);

  return (
    <Element ref={ref} className={className} {...props}>
      {children}
    </Element>
  );
}
