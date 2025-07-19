// src/components/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'داشبورد', href: '/dashboard/overview' },
  { name: 'تیکت‌ها', href: '/dashboard/tickets' },
  { name: 'مهندسین', href: '/dashboard/engineers' },
  { name: 'تنظیمات', href: '/dashboard/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full sm:w-64 h-screen bg-gray-900 text-white fixed top-0 right-0 p-4">
      <h2 className="text-xl font-bold mb-6">📡 پنل پشتیبانی</h2>
      <ul className="space-y-4">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`block px-3 py-2 rounded ${
                pathname === item.href ? 'bg-blue-600' : 'hover:bg-gray-700'
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
