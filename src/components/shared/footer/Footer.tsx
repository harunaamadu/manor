"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
// import { Instagram, Facebook, Twitter, ArrowRight } from "lucide-react";
import Container from "@/components/common/Container";
import { textContainerVariants, textItemVariants } from "@/lib/animation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  Facebook02Icon,
  InstagramIcon,
  NewTwitterIcon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo, { website_name } from "../ui/logo";

const shopLinks = [
  { label: "Chairs", href: "/shop/chairs" },
  { label: "Sofas", href: "/shop/sofas" },
  { label: "Tables", href: "/shop/tables" },
  { label: "Lamps", href: "/shop/lamps" },
  { label: "Kitchen Sets", href: "/shop/kitchen-sets" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
  { label: "Facebook", href: "https://facebook.com", icon: Facebook02Icon },
  { label: "Twitter", href: "https://twitter.com", icon: NewTwitterIcon },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Container
      as="footer"
      className="max-md:pb-20 border-t border-border pt-12 md:pt-16 bg-amber-400/5 dark:bg-background"
    >
      <motion.div
        variants={textContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]"
      >
        {/* Brand + newsletter */}
        <motion.div variants={textItemVariants} className="flex flex-col gap-4">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            Thoughtfully made furniture for rooms you actually want to live in.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-2 flex w-full max-w-xs items-center gap-2"
          >
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>
            <Input
              id="footer-email"
              type="email"
              required
              placeholder="Your email"
              className="w-full border-0 border-b"
              size={12}
            />
            <Button
              type="submit"
              aria-label="Subscribe"
              size={"icon"}
              className="flex shrink-0"
            >
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={20}
                color="currentColor"
                strokeWidth={1.5}
              />
            </Button>
          </form>
        </motion.div>

        {/* Shop links */}
        <motion.div variants={textItemVariants} className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold">Shop</h4>
          <ul className="flex flex-col gap-2">
            {shopLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Company links */}
        <motion.div variants={textItemVariants} className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold">Company</h4>
          <ul className="flex flex-col gap-2">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Social + legal (own column on desktop) */}
        <motion.div variants={textItemVariants} className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold">Follow</h4>
          <ul className="flex items-center gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <HugeiconsIcon
                    icon={Icon}
                    size={20}
                    color="currentColor"
                    strokeWidth={1.5}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      {/* Bottom bar */}
      <div className="mt-12 flex flex-col-reverse items-center gap-4 border-t border-border py-6 sm:flex-row sm:justify-between">
        <p className="text-xs text-muted-foreground">
          © {year} <em className="capitalize font-semibold">{website_name}</em>{" "}
          All rights reserved.
        </p>
        <ul className="flex items-center gap-6">
          {legalLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default Footer;
