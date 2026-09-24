import { useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';
import { getWebSocketUrl } from '../../config/api';

const ChatPanel = ({ roomId, email, enabled }) => {
  const [messages, setMessages] = useState([
    { id: 'sys-1', sender_email: 'System', message: 'Welcome to the Future Consultation Portal.', isSystem: true },
  ]);
  const [input, setInput] = useState('');
  const [connected, setConnected] = useState(false);
  const wsRef = useRef(null);

  useEffect(() => {
    if (!enabled || !roomId || !email) return;

    const ws = new WebSocket(getWebSocketUrl(roomId, email));
    wsRef.current = ws;

    ws.onopen = () => setConnected(true);
    ws.onclose = () => setConnected(false);
    ws.onerror = () => setConnected(false);

    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload.type === 'history' && Array.isArray(payload.messages)) {
          setMessages([
            { id: 'sys-1', sender_email: 'System', message: 'Welcome to the Future Consultation Portal.', isSystem: true },
            ...payload.messages.map((m) => ({
              id: m.id,
              sender_email: m.sender_email,
              message: m.message,
              isSystem: false,
            })),
          ]);
        } else if (payload.type === 'message') {
          setMessages((prev) => {
            if (prev.some((m) => m.id === payload.id)) return prev;
            return [...prev, {
              id: payload.id,
              sender_email: payload.sender_email,
              message: payload.message,
              isSystem: false,
            }];
          });
        }
      } catch {
        // ignore malformed frames
      }
    };

    return () => {
      ws.close();
      wsRef.current = null;
    };
  }, [roomId, email, enabled]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    wsRef.current.send(JSON.stringify({ type: 'message', message: input.trim() }));
    setInput('');
  };

  return (
    <div className="meeting-chat-panel floating-glass floating-glass--static">
      <div className="meeting-chat-header">
        <h3>Chat</h3>
        <span className={`meeting-future-badge ${connected ? 'connected' : ''}`}>
          {connected ? 'Live' : 'Connecting'}
        </span>
      </div>
      <div className="meeting-chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`meeting-chat-msg ${msg.isSystem ? 'system' : ''}`}>
            {!msg.isSystem && <strong>{msg.sender_email}: </strong>}
            {msg.message}
          </div>
        ))}
      </div>
      <form className="meeting-chat-input" onSubmit={handleSend}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={enabled ? 'Type a message...' : 'Verify email to chat'}
          disabled={!enabled}
        />
        <button type="submit" aria-label="Send" disabled={!enabled || !connected}>
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default ChatPanel;
