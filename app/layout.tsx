import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import LanguageSetter from "@/components/LanguageSetter";
import ChatShell from "@/components/chat/ChatShell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: "Yaroslav Tarasov — Product Designer / UI & UX",
  description: "Product Designer / UI & UX. I create intuitive interfaces and think through user experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className={`${inter.variable} antialiased bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100`}>
        <ThemeProvider>
          <LanguageProvider>
            <LanguageSetter />
            <ChatShell>{children}</ChatShell>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
