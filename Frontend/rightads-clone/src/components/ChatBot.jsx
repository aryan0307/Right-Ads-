import React, { useState, useEffect, useRef } from 'react';
import './ChatBot.css';
import { MessageSquare, X, Send, User, Bot } from 'lucide-react';
import botData from '../assets/bot_info.json';
import { API_BASE } from '../config/api';

const ChatBot = ({ darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content: `Hello! I am the ${botData.company_name} assistant. How can I help you today regarding our services?`
    }
  ]);

  const messagesEndRef = useRef(null);

  const servicesList = Array.isArray(botData.services)
    ? botData.services.join(', ')
    : '';

  const industriesList = Array.isArray(botData.industries_served)
    ? botData.industries_served.join(', ')
    : '';

  const locationsList = Array.isArray(botData.target_locations)
    ? botData.target_locations.join(', ')
    : '';

  const uniqueSellingPoints = Array.isArray(botData.why_choose_us)
    ? botData.why_choose_us.join(' | ')
    : '';

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userText = input.trim();

    const updatedMessages = [
      ...messages,
      {
        role: 'user',
        content: userText
      }
    ];

    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    try {
      const companyContext = `
You are the official AI assistant of ${botData.company_name}.

Company:
${botData.company_name}

Tagline:
${botData.tagline}

About:
${botData.about_company}

Website:
${botData.website}

Email:
${botData.email}

Services:
${servicesList}

Industries Served:
${industriesList}

Locations:
${locationsList}

Why Choose Us:
${uniqueSellingPoints}

STRICT RULES:

1. Answer ONLY questions related to Right Ads Digital.

2. Allowed topics:
- SEO
- Website Development
- Branding
- Google Ads
- Social Media Marketing
- Careers
- Internships
- Contact Information
- Company Services

3. If the question is unrelated, reply exactly:

"${botData.fallback_prompt || 'Please ask questions related to Right Ads Digital and our services only.'}"

4. Keep answers short and professional.
`;

      const contentsPayload = [
        {
          role: 'user',
          parts: [{ text: companyContext }]
        },

        ...updatedMessages.map(msg => ({
          role: msg.role === 'bot' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        }))
      ];

      const response = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          contents: contentsPayload
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error?.message || 'HTTP Transaction Fault'
        );
      }

      const botReplyText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        'Please contact our team directly for further assistance.';

      setMessages(prev => [
        ...prev,
        {
          role: 'bot',
          content: botReplyText
        }
      ]);
    } catch (error) {
      console.error('Gemini Proxy Route Fault:', error);

      setMessages(prev => [
        ...prev,
        {
          role: 'bot',
          content:
            'I am facing a small connectivity issue. Please try again later or contact Right Ads Digital directly.'
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={`chatbot-wrapper ${darkMode ? 'dark' : 'light'}`}>
      {!isOpen && (
        <button
          className="chatbot-toggle"
          onClick={() => setIsOpen(true)}
        >
          <MessageSquare size={24} />
        </button>
      )}

      {isOpen && (
        <div className="chatbot-container>

          <div className="chatbot-header">
            <div className="header-info">
              <div className="bot-status-container">
                <Bot size={20} />
                <span className="live-pulse-dot"></span>
              </div>

              <span>Right Ads AI Engine</span>
            </div>

            <button
              className="close-btn"
              onClick={() => setIsOpen(false)}
            >
              <X size={18} />
            </button>
          </div>

          <div className="chatbot-messages">

            {messages.map((m, i) => (
              <div key={i} className={`message-bubble ${m.role}`}>

                <div className="icon-wrapper">
                  {m.role === 'bot'
                    ? <Bot size={14} />
                    : <User size={14} />}
                </div>

                <div className="message-text">
                  {m.content}
                </div>

              </div>
            ))}

            {isTyping && (
              <div className="message-bubble bot typing-state-active">

                <div className="icon-wrapper">
                  <Bot size={14} />
                </div>

                <div className="message-text typing-dots">
                  <span className="bounce-dot"></span>
                  <span className="bounce-dot"></span>
                  <span className="bounce-dot"></span>
                </div>

              </div>
            )}

            <div ref={messagesEndRef} />

          </div>

          <div className="chatbot-input">

            <input
              type="text"
              placeholder="Ask about SEO, Web Dev, Google Ads..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === 'Enter' && handleSend()
              }
              disabled={isTyping}
            />

            <button
              className="send-btn"
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
            >
              <Send size={18} />
            </button>

          </div>

        </div>
      )}
    </div>
  );
};

export default ChatBot;
