import React, { useState, useRef, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import faqData from "./faqData";



const LandingChatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! 👋 Ask me anything about CopyBot or Chatbot. I can speak both in English and Russian!" }
  ]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [shake, setShake] = useState(false);
  const [typingDots, setTypingDots] = useState("");

  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    const lowerInput = input.toLowerCase();
    let bestMatch = null;
    let highestScore = 0;

    faqData.forEach((faq) => {
      const question = faq.question.toLowerCase();
      let score = 0;
      const inputWords = lowerInput.split(" ");
      const questionWords = question.split(" ");
      inputWords.forEach((word) => {
        if (questionWords.includes(word)) {
          score++;
        }
      });
      if (score > highestScore) {
        highestScore = score;
        bestMatch = faq;
      }
    });

    // Start typing animation
    setMessages(prev => [...prev, { sender: "bot", text: "..." }]);
    setTypingDots(".");

    const typingInterval = setInterval(() => {
      setTypingDots(prev => (prev.length >= 3 ? "." : prev + "."));
    }, 400);

    setTimeout(() => {
      clearInterval(typingInterval);
      setMessages(prev => {
        const newMessages = prev.filter((msg, idx) => !(idx === prev.length - 1 && msg.text === "..."));
        if (bestMatch && highestScore > 0) {
          return [...newMessages, { sender: "bot", text: bestMatch.answer }];
        } else {
          return [...newMessages, { sender: "bot", text: "Sorry, I didn't understand. Please try asking differently or contact us at @vkcopybot!" }];
        }
      });
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }, 2000);

    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  if (!open) {
    return (
      <div
        className="fixed bottom-6 right-6 z-50 cursor-pointer animate-pulse"
        onClick={() => setOpen(true)}
      >
        <div className={`bg-cyan-600 hover:bg-cyan-700 p-4 rounded-full shadow-lg text-white ${shake ? "animate-shake" : ""}`}>
          <MessageCircle size={24} />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <div className="bg-gray-900 text-white p-4 rounded-xl shadow-xl w-80 text-sm relative">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          ✖
        </button>

        <div className="font-bold mb-2 text-cyan-400">💬 MindLoop AI</div>

        <div ref={containerRef} className="space-y-2 max-h-80 overflow-y-auto scroll-smooth pr-1">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`rounded-lg px-3 py-2 max-w-[70%] ${
                msg.sender === "user" ? "bg-cyan-600 text-white" : "bg-white/10 text-white"
              }`}>
                {msg.text === "..." ? typingDots : msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-2 mt-4">
          <input
            type="text"
            className="flex-1 bg-gray-700 text-white rounded-xl px-4 py-2 text-sm outline-none"
            placeholder="Ask me something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSend}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-2 rounded-xl text-sm"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingChatbot;
