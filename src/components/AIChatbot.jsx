
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import "./AIChatbot.css";

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Welcome to Abhilasha Ladies Beauty Parlour! ✨ How can I help you today?",
    },
  ]);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (e) => {
    e.preventDefault();

    const question = input.trim();

    if (!question || loading) return;

    const updatedMessages = [
      ...messages,
      { role: "user", content: question },
    ];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const conversation = updatedMessages
        .filter((message) =>
          ["user", "assistant"].includes(message.role)
        )
        .slice(-12)
        .map(({ role, content }) => ({ role, content }));

      const { data, error } = await supabase.functions.invoke(
        "chat",
        {
          body: { messages: conversation },
        }
      );

      if (error) throw error;

      if (!data?.reply) {
        throw new Error("No response received.");
      }

      setMessages((previous) => [
        ...previous,
        { role: "assistant", content: data.reply },
      ]);
    } catch (error) {
      console.error("Chatbot error:", error);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            "Sorry, I am temporarily unavailable. Please contact us on WhatsApp: +91 81169 13003.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-chatbot">
      {isOpen && (
        <div className="ai-chat-window">
          <div className="ai-chat-header">
            <div className="ai-chat-brand">
              <div className="ai-chat-avatar">
                <Sparkles size={21} />
              </div>

              <div>
                <h3>Abhilasha AI</h3>
                <span>
                  <span className="ai-online-dot"></span>
                  Online Assistant
                </span>
              </div>
            </div>

            <button
              className="ai-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
            >
              <X size={21} />
            </button>
          </div>

          <div className="ai-chat-messages">
            <div className="ai-chat-welcome">
              How can we make your day more beautiful? ✨
            </div>

            {messages.map((message, index) => (
              <div
                key={index}
                className={`ai-message ${
                  message.role === "user" ? "ai-user" : "ai-bot"
                }`}
              >
                {message.content}
              </div>
            ))}

            {loading && (
              <div className="ai-message ai-bot ai-loading">
                <Loader2 size={16} className="ai-spinner" />
                Thinking...
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <form className="ai-chat-input" onSubmit={sendMessage}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask us anything..."
              disabled={loading}
              maxLength={2000}
            />

            <button
              type="submit"
              disabled={!input.trim() || loading}
              aria-label="Send message"
            >
              <Send size={19} />
            </button>
          </form>

          <div className="ai-chat-footer">
            Powered by AI · Abhilasha Ladies Beauty Parlour
          </div>
        </div>
      )}

      <button
        className="ai-chat-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open AI chat"}
      >
        {isOpen ? <X size={25} /> : <MessageCircle size={26} />}
      </button>
    </div>
  );
}
