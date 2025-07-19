// src/components/InnerLayout.tsx
'use client';

import Header from './Header';
import Sidebar from './Sidebar';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function InnerLayout({ children }: Props) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Content */}
        <main className="mt-16 p-4 overflow-y-auto h-full">{children}</main>
      </div>
    </div>
  );
}
