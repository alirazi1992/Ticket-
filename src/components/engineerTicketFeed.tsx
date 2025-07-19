'use client';

import { TicketWithNotes } from '@/types/ticket';
import React from 'react';

interface Props {
  tickets: TicketWithNotes[];
  onSelect?: (ticket: TicketWithNotes) => void;
  selectedTicketId?: string;
  searchTerm?: string;
  statusFilter?: string;
}

// Type guards
const isSoftwareTicket = (
  ticket: TicketWithNotes
): ticket is TicketWithNotes & { softwareName: string; version: string } =>
  ticket.type === 'software';

const isHardwareTicket = (
  ticket: TicketWithNotes
): ticket is TicketWithNotes & { deviceType: string; serialNumber: string } =>
  ticket.type === 'hardware';

const isNetworkTicket = (
  ticket: TicketWithNotes
): ticket is TicketWithNotes & { ip: string; connectionType: string } =>
  ticket.type === 'network';

export default function EngineerTicketFeed({
  tickets,
  onSelect,
  selectedTicketId,
  searchTerm = '',
  statusFilter = 'all',
}: Props) {
  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (filteredTickets.length === 0) {
    return <p className="text-gray-500">هیچ تیکتی با این مشخصات پیدا نشد.</p>;
  }

  return (
    <div className="space-y-4">
      {filteredTickets.map((ticket) => {
        const isSelected = ticket.id === selectedTicketId;
        return (
          <div
            key={ticket.id}
            className={`cursor-pointer border p-4 rounded-md shadow-sm ${
              isSelected
                ? 'bg-blue-100 border-blue-500'
                : 'bg-white border-gray-300 hover:border-blue-400'
            }`}
            onClick={() => onSelect?.(ticket)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">{ticket.title}</h3>
                <p className="text-sm text-gray-600">وضعیت: {ticket.status}</p>
                <p className="text-xs text-gray-400">
                  {new Date(ticket.createdAt).toLocaleString()}
                </p>

                {isSoftwareTicket(ticket) && (
                  <>
                    <p className="text-sm text-gray-700">نرم‌افزار: {ticket.softwareName}</p>
                    <p className="text-sm text-gray-700">نسخه: {ticket.version}</p>
                  </>
                )}

                {isHardwareTicket(ticket) && (
                  <>
                    <p className="text-sm text-gray-700">نوع دستگاه: {ticket.deviceType}</p>
                    <p className="text-sm text-gray-700">سریال: {ticket.serialNumber}</p>
                  </>
                )}

                {isNetworkTicket(ticket) && (
                  <>
                    <p className="text-sm text-gray-700">IP: {ticket.ip}</p>
                    <p className="text-sm text-gray-700">نوع اتصال: {ticket.connectionType}</p>
                  </>
                )}
              </div>
              <span className="text-blue-600 text-sm">مشاهده</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
