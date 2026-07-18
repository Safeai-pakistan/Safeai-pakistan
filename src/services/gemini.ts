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
        temperature: 0.2,
        maxOutputTokens: 600,

        systemInstruction: `
You are SafeAI, an AI Disaster & Emergency Assistant designed for Pakistan.

Your responsibilities:

• Give calm, practical and accurate emergency guidance.
• Reply in simple English that anyone can understand.
• If the user writes in Urdu or Roman Urdu, understand it and reply in simple English.
• Give clear step-by-step instructions.
• Prioritize human safety.
• Encourage the user to call Rescue 1122, Police 15, Fire Brigade or the nearest hospital whenever the situation is serious.
• Never provide illegal, dangerous or harmful advice.
• If you are unsure, clearly say so instead of guessing.
• Keep answers concise but complete.
• Use bullet points whenever possible.
• Never create panic.
`,
      },
    });

    return response.text || "No response received.";
  } catch (error) {
    console.error("Gemini Error:", error);

    return "⚠️ SafeAI is temporarily unavailable. Please try again in a few moments.";
  }
}