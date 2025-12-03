import type { Metadata } from "next";
import { Providers } from "./providers";
import Navigation from "@/app/components/Navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: "FinanceHub",
  description: "Freelance finance dashboard and toolkit",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <Providers>
          <Navigation />
          {children}
        </Providers>
      </body>
    </html>
  );
}
