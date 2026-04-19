import React, { useState, useRef, useEffect } from 'react';
import './AIChatPage.css';

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-brand">
      <svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
      <span>BetConnect</span>
    </div>
    <div className="navbar-links">
      <a href="#">Browse Properties</a>
      <a href="#" className="bold">Login</a>
      <button className="signup-btn">Sign Up</button>
    </div>
  </nav>
);

const MessageBubble = ({ message }) => (
  <>
    <div className="message-row">
      <div className="avatar">
        <svg viewBox="0 0 24 24">
          <path d="M20 9V7c0-1.1-.9-2-2-2h-3c0-1.66-1.34-3-3-3S9 3.34 9 5H6c-1.1 0-2 .9-2 2v2c-1.66 0-3 1.34-3 3s1.34 3 3 3v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c1.66 0 3-1.34 3-3s-1.34-3-3-3zm-2 10H6V7h12v12zm-9-6c-.83 0-1.5-.67-1.5-1.5S8.17 10 9 10s1.5.67 1.5 1.5S9.83 13 9 13zm7.5-1.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5zM8 15h8v2H8v-2z"/>
        </svg>
      </div>
      <div className="bubble">{message.text}</div>
    </div>
    <div className="timestamp">{message.time}</div>
  </>
);

const AIChatPage = () => {
  const [messages, setMessages] = useState([{
    id: 1,
    sender: 'ai',
    text: "Hello! I'm your AI real estate assistant. I can help you find the perfect property in Addis Ababa. What are you looking for? You can tell me about your budget, preferred location, number of bedrooms, or any other requirements.",
    time: '09:55 AM',
  }]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getCurrentTime = () =>
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const userMsg = { id: Date.now(), sender: 'user', text: inputValue, time: getCurrentTime() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'ai',
        text: `Sure, looking for "${userMsg.text}"? Let me see what I can find.`,
        time: getCurrentTime(),
      }]);
    }, 1500);
  };

  return (
    <div className="page">
      <Navbar />

      <div className="page-header">
        <div className="page-header-icon">
          <svg viewBox="0 0 24 24">
            <path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74z"/>
          </svg>
        </div>
        <div>
          <h1>AI Property Assistant</h1>
          <p>Tell me what you're looking for, and I'll help you find it</p>
        </div>
      </div>

      <div className="chat-area">
        {messages.map(msg => <MessageBubble key={msg.id} message={msg} />)}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-bar">
        <div className="input-row">
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Type your message... (e.g., 'I need a 3 bedroom house in Bole')"
          />
          <button className="send-btn" onClick={handleSend}>
            <svg viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
            </svg>
          </button>
        </div>
        <p className="input-hint">💡 Try: "Show me apartments in Bole", "I need a house to buy", "3 bedroom properties"</p>
      </div>
    </div>
  );
};

export default AIChatPage;
