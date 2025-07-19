'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { TicketStatus, TicketWithNotes } from '@/types/ticket';

interface Props {
  ticket: TicketWithNotes;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange?: (ticketId: string, newStatus: TicketStatus) => void;
}

const statusOptions: { value: TicketStatus; label: string }[] = [
  { value: 'open', label: 'باز' },
  { value: 'pending', label: 'در انتظار' },
  { value: 'in_progress', label: 'در حال بررسی' },
  { value: 'resolved', label: 'حل شده' },
  { value: 'closed', label: 'بسته شده' },
];

export default function TicketDetailsModal({
  ticket,
  isOpen,
  onClose,
  onStatusChange,
}: Props) {
  const [selectedStatus, setSelectedStatus] = useState<TicketStatus>(ticket.status);

  const handleSaveStatus = () => {
    if (selectedStatus !== ticket.status) {
      onStatusChange?.(ticket.id, selectedStatus);
    }
    onClose(); // Close after save
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-md bg-white p-6 shadow-xl transition-all">
              <Dialog.Title className="text-lg font-bold mb-4">
                جزئیات تیکت
              </Dialog.Title>

              <div className="space-y-2 text-sm">
                <p><strong>عنوان:</strong> {ticket.title}</p>
                <p><strong>توضیحات:</strong> {ticket.description}</p>
                <p><strong>تاریخ ایجاد:</strong> {new Date(ticket.createdAt).toLocaleString()}</p>

                {/* Type-specific fields */}
                {ticket.type === 'software' && (
                  <>
                    <p><strong>نرم‌افزار:</strong> {ticket.softwareName}</p>
                    <p><strong>نسخه:</strong> {ticket.version}</p>
                  </>
                )}
                {ticket.type === 'hardware' && (
                  <>
                    <p><strong>نوع دستگاه:</strong> {ticket.deviceType}</p>
                    <p><strong>شماره سریال:</strong> {ticket.serialNumber}</p>
                  </>
                )}
                {ticket.type === 'network' && (
                  <>
                    <p><strong>IP:</strong> {ticket.ip}</p>
                    <p><strong>نوع اتصال:</strong> {ticket.connectionType}</p>
                  </>
                )}
              </div>

              {/* Status Dropdown */}
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">تغییر وضعیت:</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as TicketStatus)}
                  className="w-full border border-gray-300 rounded p-2"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Footer Actions */}
              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={onClose}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  بستن
                </button>
                <button
                  onClick={handleSaveStatus}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  ذخیره تغییرات
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
