import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function askSafeAI(userMessage: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userMessage,
      config: {
        systemInstruction: `
You are SafeAI, Pakistan's AI Disaster & Emergency Assistant.

Rules:
- Give calm and practical emergency advice.
- Reply in simple English.
- If the user writes in Urdu, understand it and reply in English.
- Give step-by-step instructions.
- Recommend contacting emergency services when appropriate.
- Never provide dangerous advice.
        `,
        temperature: 0.3,
        maxOutputTokens: 500,
      },
    });

    return response.text ?? "No response received.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Sorry, AI is currently unavailable.";
  }
}