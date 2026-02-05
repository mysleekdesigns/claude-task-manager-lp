import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageLoader } from "@/components/ui/page-loader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Claude Task Manager - AI-Powered Task Management",
  description:
    "Manage tasks intelligently with Claude AI assistance. Organize, prioritize, and complete your work with the power of AI.",
  keywords: [
    "task management",
    "AI",
    "Claude",
    "productivity",
    "project management",
    "AI task manager",
    "workflow automation",
    "smart scheduling",
  ],
  authors: [{ name: "Claude Task Manager" }],
  creator: "Claude Task Manager",
  publisher: "Claude Task Manager",
  metadataBase: new URL("https://claudetaskmanager.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Claude Task Manager - AI-Powered Task Management",
    description:
      "Manage tasks intelligently with Claude AI assistance. Organize, prioritize, and complete your work with the power of AI.",
    url: "https://claudetaskmanager.com",
    siteName: "Claude Task Manager",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claude Task Manager - AI-Powered Task Management",
    description:
      "Manage tasks intelligently with Claude AI assistance. Organize, prioritize, and complete your work with the power of AI.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Claude Task Manager",
              applicationCategory: "ProductivityApplication",
              operatingSystem: "Web",
              description:
                "Manage tasks intelligently with Claude AI assistance. Organize, prioritize, and complete your work with the power of AI.",
              url: "https://claudetaskmanager.com",
              offers: [
                {
                  "@type": "Offer",
                  name: "Free",
                  price: "0",
                  priceCurrency: "USD",
                },
                {
                  "@type": "Offer",
                  name: "Pro",
                  price: "12",
                  priceCurrency: "USD",
                  billingIncrement: "P1M",
                },
                {
                  "@type": "Offer",
                  name: "Enterprise",
                  description: "Custom pricing",
                },
              ],
              featureList: [
                "AI-Powered Task Management",
                "Smart Priority Scheduling",
                "Real-time Collaboration",
                "Intelligent Insights & Analytics",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How does the AI task management work?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Claude Task Manager uses advanced AI to analyze your tasks, deadlines, and work patterns. It automatically categorizes and prioritizes your work, suggests optimal scheduling, and provides actionable insights to boost your productivity. The AI learns from your preferences over time to deliver increasingly personalized recommendations.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I use Claude Task Manager with my existing tools?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes! Claude Task Manager integrates with popular tools including Slack, GitHub, Jira, Google Calendar, and more. Our API also allows you to build custom integrations. Enterprise plans include dedicated integration support for proprietary tools.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is my data secure?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Absolutely. We use end-to-end encryption, SOC 2 Type II compliance, and enterprise-grade security measures. Your data is stored in secure cloud infrastructure with regular backups. Enterprise plans include additional security features like SSO, SAML authentication, and audit logs.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What happens when I reach my task limit on the free plan?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "On the free plan, you can manage up to 50 active tasks. Once you reach the limit, you can archive completed tasks to make room for new ones, or upgrade to Pro for unlimited tasks. We'll always notify you before you hit the limit so there are no surprises.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How does real-time collaboration work?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Team members can share workspaces, assign tasks, leave comments, and track progress together in real-time. Changes sync instantly across all devices. The AI also provides team-level insights, helping managers identify bottlenecks and optimize resource allocation.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I try Pro features before committing?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes! We offer a 14-day free trial of the Pro plan with full access to all features. No credit card required to start. At the end of the trial, you can choose to upgrade or continue with the free plan — your data is never lost.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What kind of support do you offer?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Free users get access to our community forum and help documentation. Pro users receive priority email support with 24-hour response times. Enterprise customers get a dedicated account manager, priority support with 4-hour response times, and custom onboarding.",
                  },
                },
              ],
            }),
          }}
        />
        <PageLoader />
        <Header />
        <main className="relative pt-16 lg:pt-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
