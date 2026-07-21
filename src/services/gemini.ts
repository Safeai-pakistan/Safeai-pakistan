import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

const SYSTEM_PROMPT = `
You are SafeAI, an AI Disaster & Emergency Assistant designed for Pakistan.

Rules:

• Always reply in the SAME language used by the user.
• If the user writes in English, reply in English.
• If the user writes in Urdu, reply in Urdu.
• If the user writes in Roman Urdu, reply in Roman Urdu.
• If the user mixes English and Roman Urdu, reply in the same mixed style.
• Never translate unless the user asks.

• Give calm, practical and accurate emergency guidance.
• Give clear step-by-step instructions.
• Keep answers short but complete.
• Use bullet points whenever possible.
• Prioritize human safety.

• For serious emergencies always advise calling:
- Rescue 1122
- Police 15
- Fire Brigade 16
- Nearest Hospital

• Never provide dangerous, illegal or harmful advice.
• If you are unsure, clearly say so instead of guessing.
• Never create panic.
• Never use Markdown formatting.
• Never use * or ** symbols.
• Write replies like a normal WhatsApp message using simple "-" bullet points only.
`;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function generate(userMessage: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",

    contents: userMessage,

    config: {
      temperature: 0.2,
      topP: 0.9,
      maxOutputTokens: 900,
      systemInstruction: SYSTEM_PROMPT,
    },
  });

  return response.text || "No response received.";
}

export async function askSafeAI(userMessage: string) {
  const retries = 3;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await generate(userMessage);

    } catch (error: any) {
      console.error(`Gemini Attempt ${attempt} Failed:`, error);

      const status =
        error?.status ||
        error?.code ||
        error?.error?.code;

      const message =
        error?.message ||
        error?.error?.message ||
        "";

      // Retry for temporary server overload
      if (
        attempt < retries &&
        (status === 503 ||
          message.includes("503") ||
          message.includes("UNAVAILABLE") ||
          message.includes("high demand") ||
          message.includes("Failed to fetch"))
      ) {
        await sleep(2000 * attempt);
        continue;
      }

      // Rate limit
      if (
        status === 429 ||
        message.includes("429")
      ) {
        return `⚠️ SafeAI is busy right now.

Please wait one minute and try again.

Emergency Numbers:

🚑 Rescue 1122
👮 Police 15
🔥 Fire Brigade 16`;
      }

      return `⚠️ SafeAI is temporarily unavailable.

Please try again in a few moments.

Emergency Numbers (Pakistan)

🚑 Rescue 1122
👮 Police 15
🔥 Fire Brigade 16
❤️ Edhi 115
🏥 Chhipa 1020`;
    }
  }

  return `⚠️ SafeAI is temporarily unavailable.

Please try again later.

Emergency Numbers (Pakistan)

🚑 Rescue 1122
👮 Police 15
🔥 Fire Brigade 16
❤️ Edhi 115
🏥 Chhipa 1020`;
}
