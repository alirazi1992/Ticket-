// src/components/LayoutClientWrapper.tsx
'use client';

import { UserSettingsProvider } from '@/context/UserSettingsContext';

export default function LayoutClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <UserSettingsProvider>
      {children}
    </UserSettingsProvider>
  );
}
