import React, { useEffect, useMemo, useRef, useState } from 'react';
import './Chatbot.css';

const intentMatches = [
  {
    keywords: ['add user', 'create user', 'new user'],
    response:
      'To add a user: fill Name + Email, then click Add User. Validation blocks blanks and bad emails.'
  },
  {
    keywords: ['edit user', 'update user'],
    response:
      'To edit a user: click ✏️ Edit on the card, update fields, then Update User.'
  },
  {
    keywords: ['delete', 'remove'],
    response:
      'To delete: click 🗑️ Delete on a card and confirm. The list updates instantly.'
  },
  {
    keywords: ['error', 'fail', 'problem'],
    response:
      'If you see errors: ensure the backend is running (port 5000) and that emails are unique + valid.'
  },
  {
    keywords: ['api', 'endpoint'],
    response:
      'API base is /api. Available routes: GET /users, POST /users, PUT /users/:id, DELETE /users/:id.'
  }
];

const Chatbot = ({ users = [], loading = false }) => { const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! I can help with adding, editing, or deleting users.' }
  ]);
  const bodyRef = useRef(null);

  const userCount = users.length;

  const lookupResponse = useMemo(
    () => (text) => {
      const normalized = text.toLowerCase();

      if (loading) {
        return 'Still loading users—give me a second.';
      }

      if (normalized.includes('count') || normalized.includes('how many')) {
        return `You currently have ${userCount} user${userCount === 1 ? '' : 's'}.`;
      }

      const hit = intentMatches.find(({ keywords }) =>
        keywords.some((k) => normalized.includes(k))
      );
      if (hit) return hit.response;

      return "I didn't catch that. Ask about adding, editing, deleting, API routes, or user count.";
    },
    [loading, userCount]
  );

  const sendMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { from: 'user', text: trimmed }]);
    const reply = lookupResponse(trimmed);
 // slight delay for UX
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: 'bot', text: reply }]);
    }, 200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
    setInput('');
  };

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, isOpen]);
  return (
    <div className={`chatbot ${isOpen ? 'open' : ''}`}>
      {!isOpen && (
        <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
          💬 Chat
        </button>
      )}

      {isOpen && (
        <div className="chatbot-panel">
          <div className="chatbot-header">
            <div>
              <strong>Assistant</strong>
              <div className="chatbot-subtitle">User management helper</div>
            </div>
            <button className="chatbot-close" onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>

          <div className="chatbot-body" ref={bodyRef}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`chatbot-message ${msg.from}`}>
                <span className="bubble">{msg.text}</span>
              </div>
            ))}
          </div>

          <form className="chatbot-input" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Ask about add/edit/delete/users..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}  </div>
  );
};

export default Chatbot;