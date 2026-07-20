import { useEffect, useRef, useState } from "react";
import { Send, Bot, User, Mic, MicOff, Volume2, Loader2 } from "lucide-react";
import { askSafeAI } from "../../services/gemini";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}
interface Message {
  role: "user" | "assistant";
  text: string;
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem("safeai-chat");
  
    if (saved) {
      return JSON.parse(saved);
    }
  
    return [
      {
        role: "assistant",
        text:
          "👋 Assalam-o-Alaikum! I am SafeAI.\n\nDescribe your emergency and I'll guide you step by step.",
      },
    ];
  });
     

  const [input, setInput] = useState("");
  useEffect(() => {
    const handleEmergency = () => {
      const emergencyPrompt = localStorage.getItem("safeai-emergency");
  
      if (!emergencyPrompt) return;
  
      localStorage.removeItem("safeai-emergency");
  
      document
        .getElementById("ai")
        ?.scrollIntoView({
          behavior: "smooth",
        });
  
      sendEmergencyMessage(emergencyPrompt);
    };
  
    window.addEventListener("safeai-emergency", handleEmergency);
  
    return () =>
      window.removeEventListener(
        "safeai-emergency",
        handleEmergency
      );
  }, []);

  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  const recognitionRef = useRef<any>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);
  
  useEffect(() => {
    localStorage.setItem(
      "safeai-chat",
      JSON.stringify(messages)
    );
  }, [messages]);  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognitionRef.current = recognition;
  }, []);

  const speak = (text: string) => {
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    if (!recognitionRef.current) {
      alert("Voice Recognition is not supported.");
      return;
    }

    recognitionRef.current.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
  };
  const sendEmergencyMessage = async (question: string) => {
    const userMessage = {
      role: "user" as const,
      text: question,
    };
  
    setMessages((prev) => [...prev, userMessage]);
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
  
      speak(reply);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Sorry, I couldn't process your request.",
        },
      ]);
    }
  
    setLoading(false);
  };
  const sendMessage = async () => {
    if (!input.trim()) return;

    const question = input.trim();

    const userMessage: Message = {
      role: "user",
      text: question,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const reply = await askSafeAI(question);

      const aiMessage: Message = {
        role: "assistant",
        text: reply,
      };

      setMessages((prev) => [...prev, aiMessage]);

      speak(reply);
    } catch {
      const errorMessage: Message = {
        role: "assistant",
        text:
          "Sorry, I couldn't process your request. Please try again.",
      };

      setMessages((prev) => [...prev, errorMessage]);

      speak(errorMessage.text);
    }

    setLoading(false);
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
      id="ai"
      className="py-16 px-4 bg-slate-950 text-white"
    >
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold">
            SafeAI Voice Assistant
          </h2>

          <p className="text-slate-400 mt-2">
            Chat or speak with AI during emergencies.
          </p>
        </div>

        <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">

          <div className="h-[500px] overflow-y-auto p-6 space-y-4">
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
                  className={`max-w-[85%] rounded-2xl p-4 ${
                    msg.role === "user"
                      ? "bg-blue-600"
                      : "bg-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">

                    {msg.role === "assistant" ? (
                      <Bot size={18} />
                    ) : (
                      <User size={18} />
                    )}

                    <span className="font-semibold">
                      {msg.role === "assistant"
                        ? "SafeAI"
                        : "You"}
                    </span>
                  </div>

                  <p className="whitespace-pre-wrap text-sm leading-7">
                    {msg.text}
                  </p>

                  {msg.role === "assistant" && (
                    <button
                      onClick={() => speak(msg.text)}
                      className="mt-3 flex items-center gap-2 text-xs text-blue-300 hover:text-blue-100"
                    >
                      <Volume2 size={15} />
                      Speak
                    </button>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex">
                <div className="bg-slate-800 rounded-xl p-4 flex items-center gap-3">
                  <Loader2
                    className="animate-spin"
                    size={18}
                  />

                  Thinking...
                </div>
              </div>
            )}

            <div ref={bottomRef}></div>
          </div>
          <div className="border-t border-slate-800 p-4">

<textarea
  rows={3}
  value={input}
  onChange={(e) => setInput(e.target.value)}
  onKeyDown={handleKeyDown}
  placeholder="Describe your emergency..."
  className="w-full rounded-xl bg-slate-800 border border-slate-700 p-4 outline-none resize-none focus:border-blue-500"
/>

<div className="flex flex-wrap gap-3 mt-4">

  {!listening ? (
    <button
      onClick={startListening}
      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl font-semibold transition"
    >
      <Mic size={18} />
      Start Voice
    </button>
  ) : (
    <button
      onClick={stopListening}
      className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 px-5 py-3 rounded-xl font-semibold transition"
    >
      <MicOff size={18} />
      Stop
    </button>
  )}

  <button
    onClick={sendMessage}
    disabled={loading}
    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-5 py-3 rounded-xl font-semibold transition"
  >
    {loading ? (
      <>
        <Loader2 className="animate-spin" size={18} />
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

{listening && (
  <p className="mt-4 text-red-400 animate-pulse">
    🎤 Listening...
  </p>
)}
</div>

</div>

<div className="grid md:grid-cols-3 gap-4 mt-8">

<button
onClick={() =>
  setInput("There is an earthquake. What should I do?")
}
className="bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-blue-500 transition"
>
🌍 Earthquake
</button>

<button
onClick={() =>
  setInput("Someone is having a heart attack.")
}
className="bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-blue-500 transition"
>
❤️ Heart Attack
</button>

<button
onClick={() =>
  setInput("There is a fire in my house.")
}
className="bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-blue-500 transition"
>
🔥 Fire
</button>

</div>

</div>
</section>
);
}