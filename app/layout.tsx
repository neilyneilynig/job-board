import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import SmoothScroll from '/components/providers/SmoothScroll';

export const metadata: Metadata = {
  title: "JobBoard - Find Your Dream Job",
  description: "Premium job board for creative professionals and software developers. Discover opportunities at leading tech companies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="bg-black">
        <body
          className={`${GeistSans.variable} ${GeistMono.variable} antialiased bg-black`}
        >
          <SmoothScroll>{children}</SmoothScroll>
        </body>
      </html>
    </ClerkProvider>
  );
}
