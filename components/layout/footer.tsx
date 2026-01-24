"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const footerLinks = {
  product: {
    title: "Product",
    links: [
      { href: "#features", label: "Features" },
      { href: "#pricing", label: "Pricing" },
      { href: "#showcase", label: "Showcase" },
      { href: "#", label: "Changelog" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { href: "#", label: "Documentation" },
      { href: "#", label: "API Reference" },
      { href: "#", label: "Guides" },
      { href: "#faq", label: "FAQ" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { href: "#", label: "About" },
      { href: "#", label: "Blog" },
      { href: "#", label: "Careers" },
      { href: "#", label: "Contact" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { href: "#", label: "Privacy" },
      { href: "#", label: "Terms" },
      { href: "#", label: "Security" },
    ],
  },
};

const socialLinks = [
  { href: "https://github.com", icon: Github, label: "GitHub" },
  { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:hello@claudetasks.com", icon: Mail, label: "Email" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-background-secondary">
      {/* Gradient decoration */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-6">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="group flex items-center gap-2">
              <motion.div
                className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20 text-primary"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-lg bg-primary/30 blur-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="relative h-5 w-5"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </motion.div>
              <span className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                Claude Tasks
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-foreground-muted">
              AI-powered task management that understands your workflow. Built with
              Claude to help you focus on what matters.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background-tertiary text-foreground-muted transition-colors hover:border-primary/50 hover:text-primary"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h3 className="text-sm font-semibold text-foreground">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground-muted transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-foreground-muted">
            &copy; {currentYear} Claude Task Manager. All rights reserved.
          </p>
          <p className="text-sm text-foreground-muted">
            Powered by{" "}
            <Link
              href="https://anthropic.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary transition-colors hover:text-primary-glow"
            >
              Anthropic
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
