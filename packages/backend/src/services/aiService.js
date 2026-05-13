// import OpenAI from "openai";
// import "dotenv/config";

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// export const getAIResponse = async (history) => {
//   const response = await openai.chat.completions.create({
//     model: "gpt-4o",
//     messages: [
//       { role: "system", content: "You are a helpful coding assistant." },
//       ...history, // Spreading previous messages here gives the AI context
//     ],
//   });

//   return response.choices[0].message;
// };
