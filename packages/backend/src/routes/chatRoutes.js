import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Ensure this is imported!
import { Chat } from "../models/Chat.js";

const router = express.Router();

router.post("/message", async (req, res) => {
  const { userId, prompt } = req.body; // Added userId to save to DB
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: `You are an expert, friendly developer assistant. 
    1. Always format your responses using rich Markdown (headings, bolding, bullet points, and code blocks).
    2. Be concise but thorough.
    3. ALWAYS end your response with a single, highly relevant follow-up question to guide the user's learning.`,
  });

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  try {
    // 1. Fetch history from MongoDB to give Gemini context
    let chat = await Chat.findOne({ userId });
    if (!chat) chat = new Chat({ userId, messages: [] });

    // 2. Prepare the history for Gemini
    const history = chat.messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user", // Gemini uses 'model' instead of 'assistant'
      parts: [{ text: m.content }],
    }));

    // 3. Start the stream
    const chatSession = model.startChat({ history });
    const result = await chatSession.sendMessageStream(prompt);

    let fullResponse = "";

    for await (const chunk of result.stream) {
      const chunkText = chunk.text(); // This is the correct Gemini method
      fullResponse += chunkText;
      res.write(chunkText);
    }

    // 4. Save the new messages to MongoDB after the stream finishes
    chat.messages.push({ role: "user", content: prompt });
    chat.messages.push({ role: "assistant", content: fullResponse });
    await chat.save();

    res.end();
  } catch (error) {
    console.error("Streaming Error:", error);
    res.status(500).end();
  }
});

export default router;
