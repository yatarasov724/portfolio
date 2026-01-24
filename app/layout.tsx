import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import LanguageSetter from "@/components/LanguageSetter";

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
    <html lang="en" className="bg-gray-950" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased bg-gray-950 text-gray-100`}>
        <LanguageProvider>
          <LanguageSetter />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
