import type { Metadata } from "next";
import {Inter} from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { QueryProvider } from "@/components/query-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "NGOMS",
  description: "A Non profit organization management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(inter.className,'antialiased min-h-screen')}
      >
        <QueryProvider><Toaster/>{children}</QueryProvider>
        
      </body>
    </html>
  );
}
