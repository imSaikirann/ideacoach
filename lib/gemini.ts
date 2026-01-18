import { GoogleGenerativeAI } from "@google/generative-ai";
import { redis } from "./redis";

const GEMINI_KEYS = process.env.GEMINI_KEYS?.split(",") ?? [];

if (!GEMINI_KEYS.length) {
  throw new Error("No Gemini API keys found in env");
}

export async function getGeminiModel() {
  // increment index atomically
  const index = await redis.incr("gemini:key:index");

  // round-robin selection
  const key = GEMINI_KEYS[index % GEMINI_KEYS.length];


  console.log("Using Gemini key index:", index % GEMINI_KEYS.length);

  const genAI = new GoogleGenerativeAI(key);

  return genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });
}
