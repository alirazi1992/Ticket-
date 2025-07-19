'use client';

import InnerLayout from '@/components/InnerLayout';

export default function SettingsPage() {
  return (
    <InnerLayout>
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold">تنظیمات</h1>
        <p className="text-gray-600">در این صفحه می‌توانید تنظیمات کاربری خود را مدیریت کنید.</p>

        {/* Add your actual settings form or components here */}
        <div className="border p-4 rounded bg-white shadow">
          <p>🚧 بخش تنظیمات در حال توسعه است...</p>
        </div>
      </div>
    </InnerLayout>
  );
}
