import { useState } from "react";
import { askSafeAI } from "../../services/gemini";

export default function AIChat() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAsk() {
    if (!message.trim()) return;

    setLoading(true);

    const result = await askSafeAI(message);

    setReply(result ?? "No response");

    setLoading(false);
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-slate-900 rounded-xl p-6">
      <h2 className="text-2xl font-bold text-white mb-4">
        🤖 AI Emergency Assistant
      </h2>

      <textarea
        className="w-full p-3 rounded-lg text-black"
        rows={5}
        placeholder="Example: There is a fire in my kitchen..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={handleAsk}
        className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
      >
        {loading ? "Thinking..." : "Ask SafeAI"}
      </button>

      {reply && (
        <div className="mt-6 bg-slate-800 text-white p-4 rounded-lg whitespace-pre-wrap">
          {reply}
        </div>
      )}
    </div>
  );
}