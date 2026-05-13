# 🤖 AI Chat Application

A full-stack, real-time AI chat application built with React, Express, MongoDB, and the Google Gemini API. This project is structured as a modern monorepo using Turborepo and pnpm.

## ✨ Features

* **Real-time AI Streaming:** Utilizes Server-Sent Events (SSE) to stream responses from Gemini 2.5 Flash, providing a ChatGPT-like typing experience.
* **Persistent Chat History:** Automatically saves user prompts and AI responses to MongoDB in an industry-standard message array format.
* **Markdown Support:** Renders rich text, code blocks, and formatting using `react-markdown`.
* **Monorepo Architecture:** Clean separation of concerns between the frontend and backend, orchestrated by Turborepo for lightning-fast builds.

## 🛠️ Tech Stack

**Frontend**
* React 
* Vite
* `react-markdown` (for rendering AI responses)

**Backend**
* Node.js & Express
* Mongoose (MongoDB ODM)
* `@google/generative-ai` (Gemini SDK)
* `dotenv`

**Tooling**
* Turborepo
* pnpm (Package Manager)

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed:
* [Node.js](https://nodejs.org/) (v18 or higher)
* [pnpm](https://pnpm.io/installation)
* MongoDB (Local instance or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
* A [Google Gemini API Key](https://aistudio.google.com/app/apikey)

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/ai-chat-app.git](https://github.com/your-username/ai-chat-app.git)
   cd ai-chat-app