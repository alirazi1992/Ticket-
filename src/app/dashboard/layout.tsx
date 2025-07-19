// src/app/dashboard/layout.tsx
import { ReactNode } from 'react';
import InnerLayout from '@/components/InnerLayout';
import LayoutClientWrapper from '@/components/LayoutClientWrapper';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <LayoutClientWrapper>
      <InnerLayout>
        {children}
      </InnerLayout>
    </LayoutClientWrapper>
  );
}
