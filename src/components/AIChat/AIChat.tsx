import { useState, useRef, useEffect } from "react";
import { askSafeAI } from "../../services/gemini";
import { Bot, User, Send, Loader2, Trash2 } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  text: string;
};

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text:
        "👋 Assalam-o-Alaikum! I am SafeAI.\n\nI can help during:\n• Earthquake\n• Fire\n• Flood\n• Medical Emergency\n• Snake Bite\n• Heat Stroke\n• First Aid\n\nDescribe your emergency.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const firstLoad = useRef(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }

    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const question = input;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: question,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const reply = await askSafeAI(question);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: reply,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            "❌ Sorry, AI service is currently unavailable.\n\nPlease try again after a few moments.",
        },
      ]);
    }

    setLoading(false);
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        text: "👋 Chat cleared.\n\nHow can I help you today?",
      },
    ]);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <section
      id="assistant"
      className="bg-gray-100 py-14 px-4"
    >
      <div className="max-w-4xl mx-auto">

        <div className="flex items-center justify-between mb-6">

          <div>
            <h2 className="text-3xl font-bold text-blue-700">
              AI Emergency Assistant
            </h2>

            <p className="text-gray-600 mt-1">
              Ask anything related to disasters,
              accidents or first aid.
            </p>
          </div>

          <button
            onClick={clearChat}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            <Trash2 size={18} />
            Clear
          </button>

        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          <div
            ref={chatContainerRef}
            className="h-[500px] overflow-y-auto p-5 space-y-5 bg-slate-50"
          >

            {messages.map((msg, index) => (

              <div
                key={index}
                className={`flex ${
                  msg.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`max-w-[80%] rounded-2xl p-4 whitespace-pre-wrap leading-7 ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white border border-gray-200 text-gray-900 shadow-sm"
                  }`}
                >

                  <div className="flex items-center gap-2 mb-2">

                    {msg.role === "assistant" ? (
                      <>
                        <Bot
                          size={20}
                          className="text-blue-600"
                        />
                        <span className="font-semibold">
                          SafeAI
                        </span>
                      </>
                    ) : (
                      <>
                        <User
                          size={20}
                          className="text-white"
                        />
                        <span className="font-semibold">
                          You
                        </span>
                      </>
                    )}

                  </div>

                  <p
                    className={
                      msg.role === "assistant"
                        ? "text-gray-900"
                        : "text-white"
                    }
                  >
                    {msg.text}
                  </p>

                </div>

              </div>

            ))}

            {loading && (

              <div className="flex justify-start">

                <div className="bg-white border rounded-xl p-4 flex items-center gap-3">

                  <Loader2
                    className="animate-spin text-blue-600"
                    size={22}
                  />

                  <span>
                    SafeAI is thinking...
                  </span>

                </div>

              </div>

            )}

</div>

<div className="border-t bg-white p-4">

  <textarea
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={handleKeyDown}
    rows={3}
    placeholder="Describe your emergency..."
    className="w-full border border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <div className="flex justify-between items-center mt-3">

    <p className="text-sm text-gray-500">
      Press <strong>Enter</strong> to send •{" "}
      <strong>Shift + Enter</strong> for new line
    </p>

    <button
      onClick={sendMessage}
      disabled={loading || !input.trim()}
      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-xl transition"
    >
      {loading ? (
        <>
          <Loader2
            size={18}
            className="animate-spin"
          />
          Sending...
        </>
      ) : (
        <>
          <Send size={18} />
          Send
        </>
      )}
    </button>

  </div>

</div>

</div>

</div>

</section>
);
}