// ============================================================
// components/Chatbot.jsx - Simple FAQ Chatbot Component
// Provides instant answers to common travel questions
// ============================================================

import React, { useState } from "react";

// Predefined Q&A pairs for the chatbot
const faqData = [
  { q: "how to book", a: "Go to the 'Book Now' page, fill in the form and submit!" },
  { q: "payment", a: "We accept all major cards, UPI, and net banking." },
  { q: "cancel", a: "You can cancel by contacting us at support@travelease.com." },
  { q: "refund", a: "Refunds are processed within 5-7 business days after cancellation." },
  { q: "destinations", a: "We offer trips to Paris, Bali, Maldives, Switzerland, Japan, Dubai, and more!" },
  { q: "hello", a: "Hello! 👋 Welcome to TravelEase. How can I help you today?" },
  { q: "hi", a: "Hi there! 😊 Ask me anything about our travel packages." },
  { q: "price", a: "Prices vary by destination. Check the Destinations page for details!" },
  { q: "contact", a: "Reach us at support@travelease.com or call +91-9876543210." },
  { q: "visa", a: "We assist with visa requirements. Contact our support team!" },
];

// Find a matching response based on user's input keywords
const getBotResponse = (input) => {
  const lower = input.toLowerCase();
  const match = faqData.find((item) => lower.includes(item.q));
  return match
    ? match.a
    : "Sorry, I don't have info on that. Please contact support@travelease.com 😊";
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false); // Controls chat window visibility
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm TravelBot 🤖. Ask me anything!" },
  ]);
  const [input, setInput] = useState(""); // Current user input

  // Send user message and get bot response
  const handleSend = () => {
    if (!input.trim()) return; // Don't send empty messages

    const userMsg = { from: "user", text: input };
    const botMsg = { from: "bot", text: getBotResponse(input) };

    // Add both messages to chat
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput(""); // Clear input field
  };

  // Allow pressing Enter to send message
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="chatbot-container">
      {/* Chat Window - shown when isOpen is true */}
      {isOpen && (
        <div className="chatbot-box card mb-3">
          {/* Chat Header */}
          <div className="chatbot-header d-flex justify-content-between align-items-center">
            <span>
              <i className="bi bi-robot me-2"></i>TravelBot
            </span>
            <button
              className="btn btn-sm text-white p-0"
              onClick={() => setIsOpen(false)}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          {/* Messages Area */}
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-2 d-flex ${msg.from === "user" ? "justify-content-end" : "justify-content-start"}`}
              >
                <span
                  className={`badge rounded-pill px-3 py-2 text-wrap text-start ${
                    msg.from === "user"
                      ? "bg-primary text-white"
                      : "bg-white text-dark border"
                  }`}
                  style={{ maxWidth: "80%", fontSize: "0.85rem" }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="d-flex p-2 border-top bg-white">
            <input
              type="text"
              className="form-control form-control-sm me-2"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className="btn btn-primary btn-sm" onClick={handleSend}>
              <i className="bi bi-send"></i>
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button - floating chat icon */}
      <button className="chatbot-btn" onClick={() => setIsOpen(!isOpen)}>
        <i className={`bi ${isOpen ? "bi-x-lg" : "bi-chat-dots-fill"}`}></i>
      </button>
    </div>
  );
};

export default Chatbot;
