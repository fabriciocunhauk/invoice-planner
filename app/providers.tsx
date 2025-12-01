"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/app/components/ui/tooltip";
import { FinanceProvider } from "@/app/context/FinanceContext";
import { Toaster } from "@/app/components/ui/toaster";
import { Toaster as Sonner } from "@/app/components/ui/sonner";
import { ThemeProvider } from "next-themes";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <FinanceProvider>
            <Toaster />
            <Sonner />
            {children}
          </FinanceProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
