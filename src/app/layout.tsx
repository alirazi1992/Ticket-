// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { AuthProvider } from '@/context/AuthProvider';
import { UserSettingsProvider } from '@/context/UserSettingsContext';

export const metadata: Metadata = {
  title: 'Client Portal',
  description: 'IT Support and Ticketing System',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <AuthProvider>
          <UserSettingsProvider>
            {children}
          </UserSettingsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
