import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SaathiFloating } from "@/components/assistant/SaathiFloating";

export const metadata: Metadata = {
  title: "JanSaathi AI — Every Citizen. Every Opportunity.",
  description: "An inclusive India-wide government scheme discovery platform built on Bauhaus architectural design principles. Discover verified Central and State government welfare schemes with transparent eligibility rules.",
  keywords: ["government schemes india", "myscheme", "scholarships", "pm kisan", "ayushman bharat", "state welfare", "jansaathi ai", "bauhaus public service"],
  authors: [{ name: "JanSaathi Public Interest Project" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F0F0F0] text-[#121212] font-sans antialiased selection:bg-[#F0C020] selection:text-black">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1 w-full flex flex-col">
            {children}
          </main>
          <SaathiFloating />
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
