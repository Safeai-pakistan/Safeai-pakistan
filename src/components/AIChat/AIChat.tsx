import { useState } from "react";
import { askSafeAI } from "../../services/gemini";
import { Mic, Bot, User } from "lucide-react";
import toast from "react-hot-toast";

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
    if (!message.trim()) {
      toast.error("Please enter a question.");
      return;
    }

    setLoading(true);

    try {
      const result = await askSafeAI(message);

      const aiReply = result ?? "No response";

      setReply(aiReply);

      toast.success("AI response received!");

      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();

        const speech = new SpeechSynthesisUtterance(aiReply);
        speech.lang = "en-US";
        speech.rate = 1;
        speech.pitch = 1;

        window.speechSynthesis.speak(speech);
      }
    } catch {
      toast.error("Unable to contact SafeAI.");
    }

    setLoading(false);
  }

  function startListening() {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Speech Recognition is not supported.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      toast("🎤 Listening...");
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
      toast.success("Voice captured!");
    };

    recognition.onerror = () => {
      toast.error("Microphone error.");
    };

    recognition.start();
  }

  async function copyResponse() {
    if (!reply) {
      toast.error("Nothing to copy.");
      return;
    }

    await navigator.clipboard.writeText(reply);

    toast.success("Response copied!");
  }

  function stopSpeaking() {
    window.speechSynthesis.cancel();
    toast("🔇 Voice stopped");
  }

  function clearChat() {
    window.speechSynthesis.cancel();
    setMessage("");
    setReply("");
    toast.success("Chat cleared.");
  }

  const emergency = getEmergencyLevel(message);

  return (
    <section
      id="ai"
      className="max-w-4xl mx-auto mt-12 px-5 scroll-mt-24"
    >
      <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-6">

        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <Bot className="text-cyan-400" size={32} />
          AI Emergency Assistant
        </h2>

        <div className="bg-slate-950 rounded-xl border border-slate-800 p-4">

          <div className="flex items-center gap-2 mb-3 text-cyan-400">
            <User size={18} />
            <span className="font-semibold">Your Message</span>
          </div>

          <textarea
            className="w-full p-4 rounded-xl bg-white text-black"
            rows={5}
            placeholder="Example: There is a fire in my kitchen..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="flex gap-3 mt-5 flex-wrap">

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
          <div className="mt-8 bg-slate-950 border border-slate-800 rounded-2xl p-6">

            <div
              className={`${emergency.color} inline-block px-4 py-2 rounded-full font-bold mb-4 text-white`}
            >
              🚨 Emergency Level: {emergency.level}
            </div>

            <p className="mb-5 text-white">
              <strong>Recommended Contact:</strong>
              <br />
              {emergency.number}
            </p>

            <div className="flex items-center gap-2 text-cyan-400 mb-3">
              <Bot size={18} />
              <span className="font-semibold">SafeAI Response</span>
            </div>

            <div className="bg-slate-900 border-l-4 border-cyan-400 rounded-xl p-5 text-white whitespace-pre-wrap leading-7">
              {reply}
            </div>

          </div>
        )}

      </div>
    </section>
  );
}