import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { CursorGlow } from "@/components/ui/cursor-glow";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://duane.co.za"),
  title: "Duane Cilliers — Maker",
  description:
    "Full-stack developer and maker based in Cape Town. Building REPE, shipping code, making things.",
  keywords: [
    "developer",
    "maker",
    "full-stack",
    "Cape Town",
    "Next.js",
    "React",
    "TypeScript",
  ],
  openGraph: {
    title: "Duane Cilliers — Maker",
    description:
      "Full-stack developer and maker based in Cape Town. Building REPE, shipping code, making things.",
    url: "https://duane.co.za",
    siteName: "Duane Cilliers",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <CursorGlow />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
