'use client';

import { TicketWithNotes } from '@/types/ticket';
import { useEffect, useState } from 'react';
import { useWebSocket } from '@/context/WebSocketContext';
import { TicketStatus } from '@/types/ticket';

export default function ClientTicketFeed() {
  const [tickets, setTickets] = useState<TicketWithNotes[]>([]);
  const socket = useWebSocket();

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      if (data.action === 'all_tickets') {
        setTickets(data.payload);
      } else if (data.action === 'new_ticket') {
        setTickets((prev) => [data.payload, ...prev]);
      } else if (data.action === 'status_updated') {
        const updated = data.payload;
        setTickets((prev) =>
          prev.map((t) => (t.id === updated.id ? { ...t, status: updated.status } : t))
        );
      }
    };

    socket.addEventListener('message', handleMessage);
    socket.send(JSON.stringify({ action: 'get_all_tickets' }));

    return () => {
      socket.removeEventListener('message', handleMessage);
    };
  }, [socket]);

  const handleStatusChange = (ticketId: string, newStatus: TicketStatus) => {
    // Optimistically update UI
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: newStatus } : t))
    );

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          action: 'update_status',
          payload: { ticketId, status: newStatus },
        })
      );
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-3xl mx-auto">
      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          className="border border-gray-300 dark:border-gray-700 rounded p-4 shadow bg-white dark:bg-gray-900"
        >
          <h3 className="text-lg font-bold text-violet-600 dark:text-violet-400">{ticket.title}</h3>
          <p className="text-sm text-gray-700 dark:text-gray-200">{ticket.description}</p>

          {/* ✅ Ticket Status Dropdown */}
          <div className="mt-2 text-sm">
            <label className="font-semibold text-gray-600 dark:text-gray-300 mr-2">وضعیت:</label>
            <select
              value={ticket.status}
              onChange={(e) =>
                handleStatusChange(ticket.id, e.target.value as TicketStatus)
              }
              className="border rounded px-2 py-1 text-sm dark:bg-gray-800 dark:text-white"
            >
              <option value="open">باز</option>
              <option value="pending">در انتظار</option>
              <option value="in_progress">در حال بررسی</option>
              <option value="resolved">برطرف شده</option>
              <option value="closed">بسته شده</option>
            </select>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            نوع: {ticket.type} | تاریخ: {new Date(ticket.createdAt).toLocaleString('fa-IR')}
          </p>

          {ticket.notes && ticket.notes.length > 0 && (
            <div className="mt-4 space-y-2 text-sm border-t pt-2 dark:border-gray-700">
              <p className="font-semibold text-gray-700 dark:text-gray-200">💬 پاسخ‌ها:</p>
              {ticket.notes.map((note, i) => (
                <div key={i} className="bg-gray-50 dark:bg-gray-800 p-2 rounded">
                  <p>
                    <strong>{note.sender}:</strong> {note.message}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(note.timestamp).toLocaleString('fa-IR')}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
