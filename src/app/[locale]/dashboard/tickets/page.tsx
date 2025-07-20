'use client';

import InnerLayout from '@/components/InnerLayout';
import EngineerTicketFeed from '@/components/engineerTicketFeed';
import TicketDetailsModal from '@/components/TicketDetailsModal';
import { useState } from 'react';
import { TicketStatus, TicketWithNotes } from '@/types/ticket';

const dummyTickets: TicketWithNotes[] = [
  {
    id: 't1',
    title: 'مشکل نرم‌افزار حسابداری',
    description: 'خطای اجرا هنگام ورود کاربر',
    status: 'in_progress',
    createdAt: new Date().toISOString(),
    type: 'software',
    softwareName: 'حسابیار',
    version: 'v2.1',
    notes: [],
  },
  {
    id: 't2',
    title: 'مشکل سخت‌افزاری لپ‌تاپ',
    description: 'خرابی صفحه نمایش',
    status: 'pending',
    createdAt: new Date().toISOString(),
    type: 'hardware',
    deviceType: 'لپ‌تاپ',
    serialNumber: 'ABC123456',
    notes: [],
  },
  {
    id: 't3',
    title: 'قطعی شبکه',
    description: 'عدم اتصال به اینترنت',
    status: 'open',
    createdAt: new Date().toISOString(),
    type: 'network',
    ip: '192.168.1.101',
    connectionType: 'LAN',
    notes: [],
  },
];

const TICKETS_PER_PAGE = 5;

export default function TicketsPage() {
  const [tickets] = useState<TicketWithNotes[]>(dummyTickets);
  const [selectedTicket, setSelectedTicket] = useState<TicketWithNotes | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<TicketStatus | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTickets = tickets.filter((ticket) => {
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalPages = Math.ceil(filteredTickets.length / TICKETS_PER_PAGE);
  const paginatedTickets = filteredTickets.slice(
    (currentPage - 1) * TICKETS_PER_PAGE,
    currentPage * TICKETS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  return (
    <InnerLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-xl font-bold">تیکت‌های شما</h1>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <input
            type="text"
            placeholder="جستجو بر اساس عنوان..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded w-full md:w-1/2"
          />
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as TicketStatus | 'all');
              setCurrentPage(1);
            }}
            className="border p-2 rounded w-full md:w-1/4"
          >
            <option value="all">همه وضعیت‌ها</option>
            <option value="open">باز</option>
            <option value="pending">در انتظار</option>
            <option value="in_progress">در حال بررسی</option>
            <option value="resolved">حل شده</option>
            <option value="closed">بسته شده</option>
          </select>
        </div>

        {/* Ticket Feed */}
        <EngineerTicketFeed tickets={paginatedTickets} onSelect={setSelectedTicket} />

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded disabled:opacity-50"
            disabled={currentPage === 1}
          >
            قبلی
          </button>
          <span>
            صفحه {currentPage} از {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            بعدی
          </button>
        </div>

        {/* Ticket Details Modal */}
        {selectedTicket && (
          <TicketDetailsModal
            ticket={selectedTicket}
            isOpen={!!selectedTicket}
            onClose={() => setSelectedTicket(null)}
          />
        )}
      </div>
    </InnerLayout>
  );
}
