import { GoogleGenerativeAI } from "@google/generative-ai";
import { redis } from "./redis";

const GEMINI_KEYS = process.env.GEMINI_KEYS?.split(",") ?? [];

if (!GEMINI_KEYS.length) {
  throw new Error("No Gemini API keys found in env");
}

export async function getGeminiModel() {

  const index = await redis.incr("ideacoach:gemini:key:index");

  const keyIndex = index % GEMINI_KEYS.length;
  const apiKey = GEMINI_KEYS[keyIndex];

  console.log("Using Gemini key index:", keyIndex);

  const genAI = new GoogleGenerativeAI(apiKey);

  return genAI.getGenerativeModel({
    model: "models/gemini-2.5-flash-lite",
  });
}
