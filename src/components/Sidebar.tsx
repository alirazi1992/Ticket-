// src/components/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function Sidebar() {
  const pathname = usePathname();
  const t = useTranslations('Sidebar');

  const navItems = [
    { name: t('dashboard'), href: '/dashboard/overview' },
    { name: t('tickets'), href: '/dashboard/tickets' },
    { name: t('engineers'), href: '/dashboard/engineers' },
    { name: t('settings'), href: '/dashboard/settings' },
  ];

  return (
    <aside className="w-full sm:w-64 h-screen bg-gray-900 text-white fixed top-0 right-0 p-4">
      <h2 className="text-xl font-bold mb-6">📡 {t('title')}</h2>
      <ul className="space-y-4">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`block px-3 py-2 rounded ${
                pathname.includes(item.href) ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
