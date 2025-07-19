// src/components/Header.tsx
'use client';

import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  return (
    <header className="w-full h-16 bg-white shadow flex items-center justify-between px-4 sm:px-6 fixed top-0 right-0 left-0 z-40">
      <h1 className="text-lg font-bold text-gray-800">🌐 سامانه پشتیبانی مشتری</h1>

      <div className="flex items-center gap-4">
        {/* Optional theme/language toggles */}
        <button
          onClick={() => alert('تنظیمات در دست توسعه است')}
          className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-sm"
        >
          ⚙️ تنظیمات
        </button>
        <button
          onClick={() => router.push('/')}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
        >
          خروج
        </button>
      </div>
    </header>
  );
}
