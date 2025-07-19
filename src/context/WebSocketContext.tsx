'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const WS_URL = 'ws://localhost:3001'; // change if needed

const WebSocketContext = createContext<WebSocket | null>(null);

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const reconnectRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    setSocket(ws);

    ws.onopen = () => console.log('✅ WebSocket connected');
    ws.onclose = () => {
      console.warn('🔌 WebSocket disconnected, attempting to reconnect...');
      reconnectRef.current = setTimeout(() => {
        setSocket(new WebSocket(WS_URL));
      }, 3000);
    };

    return () => {
      ws.close();
      if (reconnectRef.current) clearTimeout(reconnectRef.current);
    };
  }, []);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};
