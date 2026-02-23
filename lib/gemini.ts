import { GoogleGenerativeAI } from "@google/generative-ai";
import { redis } from "./redis";

const GEMINI_KEYS = process.env.GEMINI_KEYS?.split(",") ?? [];

if (!GEMINI_KEYS.length) {
  throw new Error("No Gemini API keys found in env");
}

export async function getGeminiModel() {

  const index = await redis.incr("ideacoach:gemini:key:index"); //0

  const keyIndex = index % GEMINI_KEYS.length;
  const apiKey = GEMINI_KEYS[keyIndex];



  const genAI = new GoogleGenerativeAI(apiKey);

  return genAI.getGenerativeModel({
    model: "models/gemini-2.5-flash-lite",
  });
}
