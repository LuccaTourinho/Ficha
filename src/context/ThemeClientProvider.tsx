// components/ThemeClientProvider.tsx
'use client';

import { ThemeProvider } from '@/context/ThemeContext';

export function ThemeClientProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return <ThemeProvider>{children}</ThemeProvider>;
}