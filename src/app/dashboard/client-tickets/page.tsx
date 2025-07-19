'use client';

import InnerLayout from '@/components/InnerLayout';

export default function ProfilePage() {
  return (
    <InnerLayout>
      <div className="p-6 space-y-4">
        <h1 className="text-xl font-bold">پروفایل کاربری</h1>

        <div className="bg-white shadow rounded p-4 space-y-2">
          <div>
            <strong>نام:</strong> علی رضی
          </div>
          <div>
            <strong>نقش:</strong> کارشناس IT
          </div>
          <div>
            <strong>ایمیل:</strong> ali.razi@example.com
          </div>
          <div>
            <strong>شماره تماس:</strong> 0912-123-4567
          </div>
        </div>
      </div>
    </InnerLayout>
  );
}
