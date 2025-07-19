'use client';

import { TicketWithNotes, TicketStatus } from '@/types/ticket';
import { useEffect, useState } from 'react';
import { useWebSocket } from '@/context/WebSocketContext';

export default function TicketFeed() {
  const [tickets, setTickets] = useState<TicketWithNotes[]>([]);
  const [replies, setReplies] = useState<Record<string, string>>({});
  const socket = useWebSocket();

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      if (data.action === 'all_tickets') {
        setTickets(data.payload);
      } else if (data.action === 'new_ticket') {
        setTickets((prev) => [data.payload, ...prev]);
      } else if (data.action === 'new_note' || data.action === 'status_updated') {
        const updatedTicket = data.payload;
        setTickets((prev) =>
          prev.map((t) => (t.id === updatedTicket.id ? updatedTicket : t))
        );
      }
    };

    socket.addEventListener('message', handleMessage);
    socket.send(JSON.stringify({ action: 'get_all_tickets' }));

    return () => {
      socket.removeEventListener('message', handleMessage);
    };
  }, [socket]);

  const handleReply = (ticketId: string, reply: string) => {
    if (socket?.readyState === WebSocket.OPEN && reply.trim()) {
      socket.send(
        JSON.stringify({
          action: 'add_note',
          payload: {
            ticketId,
            note: {
              message: reply,
              sender: 'Admin',
              timestamp: new Date().toISOString(),
            },
          },
        })
      );
      setReplies((prev) => ({ ...prev, [ticketId]: '' }));
    }
  };

  const handleStatusChange = (ticketId: string, newStatus: TicketStatus) => {
    if (socket?.readyState === WebSocket.OPEN) {
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
      {tickets.map((ticket, index) => (
        <div key={index} className="border border-gray-300 dark:border-gray-700 rounded p-4 shadow-md bg-white dark:bg-gray-900">
          <h3 className="text-lg font-bold text-violet-600 dark:text-violet-400">{ticket.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{ticket.description}</p>

          {/* ✅ Status Dropdown */}
          <div className="mt-2 flex items-center gap-3">
            <label htmlFor={`status-${ticket.id}`} className="text-sm text-gray-700 dark:text-gray-300">وضعیت:</label>
            <select
              id={`status-${ticket.id}`}
              value={ticket.status}
              onChange={(e) => handleStatusChange(ticket.id, e.target.value as TicketStatus)}
              className="border px-2 py-1 text-sm rounded dark:bg-gray-800 dark:text-white"
            >
              <option value="pending">در انتظار</option>
              <option value="open">باز</option>
              <option value="in_progress">در حال بررسی</option>
              <option value="resolved">حل شده</option>
              <option value="closed">بسته شده</option>
            </select>
          </div>

          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            نوع: {ticket.type} | تاریخ: {new Date(ticket.createdAt).toLocaleString('fa-IR')}
          </p>

          {ticket.notes && ticket.notes.length > 0 && (
            <div className="mt-4 space-y-2 text-sm border-t pt-2 dark:border-gray-700">
              <p className="font-semibold text-gray-700 dark:text-gray-200">💬 پاسخ‌ها:</p>
              {ticket.notes.map((note, i) => (
                <div key={i} className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
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

          {/* ✅ Reply Input */}
          <div className="mt-4">
            <textarea
              value={replies[ticket.id] || ''}
              onChange={(e) =>
                setReplies((prev) => ({ ...prev, [ticket.id]: e.target.value }))
              }
              className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
              placeholder="پاسخ خود را بنویسید..."
            />
            <button
              onClick={() => handleReply(ticket.id, replies[ticket.id] || '')}
              className="mt-2 px-4 py-1 text-sm bg-violet-600 text-white rounded hover:bg-violet-700"
            >
              ارسال پاسخ
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
