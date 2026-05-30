import "./globals.css";
import { Metadata } from "next";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Manrope } from "next/font/google";
import ClientWrapper from "@/components/effects/ClientWrapper";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Super Network | Building the Future",
  description: "An ultra-fast, decentralized infrastructure for the next generation of internet applications.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} font-body`}>
         <ClientWrapper />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
