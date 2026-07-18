import { useState } from "react";
import { askSafeAI } from "../../services/gemini";
import { Mic } from "lucide-react";

export default function AIChat() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  function getEmergencyLevel(text: string) {
    const t = text.toLowerCase();

    if (
      t.includes("fire") ||
      t.includes("earthquake") ||
      t.includes("flood") ||
      t.includes("explosion") ||
      t.includes("bleeding") ||
      t.includes("unconscious")
    ) {
      return {
        level: "HIGH",
        color: "bg-red-600",
        number: "🚑 Rescue 1122",
      };
    }

    if (
      t.includes("injury") ||
      t.includes("accident") ||
      t.includes("burn")
    ) {
      return {
        level: "MEDIUM",
        color: "bg-yellow-500",
        number: "☎️ Local Hospital",
      };
    }

    return {
      level: "LOW",
      color: "bg-green-600",
      number: "ℹ️ Stay Calm",
    };
  }

  async function handleAsk() {
    if (!message.trim()) return;

    setLoading(true);

    const result = await askSafeAI(message);

    const aiReply = result ?? "No response";

    setReply(aiReply);

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      const speech = new SpeechSynthesisUtterance(aiReply);

      speech.lang = "en-US";
      speech.rate = 1;
      speech.pitch = 1;

      window.speechSynthesis.speak(speech);
    }

    setLoading(false);
  }

  function startListening() {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      console.log("🎤 Listening...");
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error(event.error);
      alert("Microphone Error: " + event.error);
    };

    recognition.start();
  }

  async function copyResponse() {
    if (!reply) return;

    await navigator.clipboard.writeText(reply);

    alert("Response copied!");
  }

  function stopSpeaking() {
    window.speechSynthesis.cancel();
  }

  function clearChat() {
    window.speechSynthesis.cancel();
    setMessage("");
    setReply("");
  }

  const emergency = getEmergencyLevel(message);

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-slate-900 rounded-2xl p-6 shadow-xl">
      <h2 className="text-3xl font-bold text-white mb-6">
        🤖 AI Emergency Assistant
      </h2>

      <textarea
        className="w-full p-4 rounded-xl text-black"
        rows={5}
        placeholder="Example: There is a fire in my kitchen..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <div className="flex gap-3 mt-4 flex-wrap">
        <button
          onClick={handleAsk}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl"
        >
          {loading ? "⏳ Thinking..." : "🤖 Ask SafeAI"}
        </button>

        <button
          onClick={startListening}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"
        >
          <Mic size={20} />
          Speak
        </button>

        <button
          onClick={copyResponse}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
        >
          📋 Copy
        </button>

        <button
          onClick={stopSpeaking}
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl"
        >
          🔇 Stop Voice
        </button>

        <button
          onClick={clearChat}
          className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-xl"
        >
          🗑 Clear
        </button>
      </div>

      {reply && (
        <div className="mt-8 bg-slate-800 rounded-2xl p-6 text-white">
          <div
            className={`${emergency.color} inline-block px-4 py-2 rounded-full font-bold mb-4`}
          >
            🚨 Emergency Level: {emergency.level}
          </div>

          <p className="mb-4 text-lg">
            <strong>Recommended Contact:</strong>
            <br />
            {emergency.number}
          </p>

          <div className="border-l-4 border-cyan-400 pl-4 whitespace-pre-wrap leading-7">
            {reply}
          </div>
        </div>
      )}
    </div>
  );
}