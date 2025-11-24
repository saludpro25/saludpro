import type React from "react"
import type { Metadata, Viewport } from "next"
import { Onest } from "next/font/google"
import "./globals.css"

const onest = Onest({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-onest",
})

export const metadata: Metadata = {
  title: "SaludPro | Directorio de Profesionales de la Salud",
  description:
    "Directorio de especialistas en salud, centros médicos y servicios de digitalización. Encuentra profesionales de la salud cerca de ti.",
  keywords: "SaludPro, profesionales salud, directorio médico, especialistas salud, centros médicos, telemedicina, Colombia",
  authors: [{ name: "SaludPro" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://saludpro.net",
    title: "SaludPro | Directorio de Profesionales de la Salud",
    description: "Encuentra especialistas en salud y centros médicos cerca de ti.",
    siteName: "SaludPro",
  },
  twitter: {
    card: "summary_large_image",
    title: "SaludPro | Directorio de Profesionales de la Salud",
    description: "Encuentra especialistas en salud y centros médicos cerca de ti.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${onest.variable} font-sans`}>
      <body className="antialiased bg-background text-foreground min-h-screen">
        {children}
      </body>
    </html>
  )
}
