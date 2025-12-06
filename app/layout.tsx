import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Yaroslav Tarasov — Product Designer / UI & UX",
  description: "Product Designer / UI & UX. Создаю интуитивные интерфейсы и продумываю пользовательский опыт.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-gray-950" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased bg-gray-950 text-gray-100`}>
        {children}
      </body>
    </html>
  );
}
