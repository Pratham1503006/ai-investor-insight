import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaDollarSign, FaBars, FaUser, FaPaperPlane, FaRobot } from 'react-icons/fa';
import { BsLightningChargeFill } from 'react-icons/bs';

function AIAdvisor() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const suggestedQuestions = [
    "How can I start investing with $1000?",
    "What's the best way to save for retirement?",
    "How do I create a budget?",
    "What are index funds and are they safe?",
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  async function generateAnswer() {
    if (!question.trim()) return;

    setMessages(prev => [...prev, { role: "user", content: question }]);
    setQuestion("");
    setLoading(true);

    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyC51PThrLcazJmuMZmHZWH11b1KuHuJF24",
        method: "post",
        data: {
          contents: [{
            parts: [{ text: `Act as a financial advisor. Answer the following question: ${question}` }]
          }]
        }
      });
      const answer = (response["data"]["candidates"][0]["content"]["parts"][0]["text"]);
      setMessages(prev => [...prev, { role: "assistant", content: answer }]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "⚠️ Sorry, I'm having trouble connecting. Please try again later."
      }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="flex-shrink-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/10 rounded-lg transition-all">
          </button>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <FaDollarSign className="text-yellow-400" />
            AI Financial Advisor
            <BsLightningChargeFill className="text-yellow-400" />
          </h1>
        </div>
        <button className="p-2 hover:bg-white/10 rounded-lg transition-all">
    
        </button>
      </div>

      <div className="flex-1 flex flex-col p-6">
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 rounded-xl border-2 border-gray-100">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 h-full flex flex-col justify-center">
              <FaRobot className="text-4xl mx-auto mb-4 text-purple-600" />
              <p className="text-lg font-semibold mb-2">How can I help you today?</p>
              <div className="grid grid-cols-1 gap-3 max-w-xs mx-auto">
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => setQuestion(q)}
                    className="p-3 bg-white text-sm rounded-lg border border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} mb-4`}>
              <div className={`max-w-[80%] p-3 rounded-2xl ${msg.role === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-white border border-gray-200 rounded-bl-none"
                }`}>
                <div className="flex items-center gap-2 mb-1">
                  {msg.role === "user" ? (
                    <FaUser className="text-sm opacity-70" />
                  ) : (
                    <FaRobot className="text-sm text-purple-600" />
                  )}
                  <span className="text-xs font-semibold">
                    {msg.role === "user" ? "You" : "Financial Assistant"}
                  </span>
                </div>
                <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center justify-start mb-4">
              <div className="max-w-[80%] p-3 rounded-2xl bg-white border border-gray-200 rounded-bl-none">
                <div className="flex items-center gap-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="relative mt-4">
          <textarea
            ref={textareaRef}
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
              adjustTextareaHeight();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                generateAnswer();
              }
            }}
            rows={1}
            className="w-full p-3 pr-12 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all resize-none overflow-hidden"
            placeholder="Type your financial question..."
            style={{ minHeight: '3rem' }}
          ></textarea>
          <button
            onClick={generateAnswer}
            disabled={!question.trim() || loading}
            className="absolute right-3 bottom-3 p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIAdvisor;