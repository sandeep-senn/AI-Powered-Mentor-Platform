import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 5000;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const lower = message.toLowerCase();

  // 🧠 1. Redirect to /roadmap if roadmap-related
  const roadmapKeywords = ["dsa", "dbms", "ml", "mern", "java", "python", "cloud", "cn", "lld", "sd", "devops"];
  for (const keyword of roadmapKeywords) {
    if (lower.includes(keyword) && lower.includes("roadmap")) {
      return res.status(200).json({
      reply: `📍 Here's the roadmap you asked for:<br><a href="/roadmap" class="text-indigo-400 underline">Click here</a>`
      });
    }
  }
  
  // 🔁 2. Redirect to /code-convertor if conversion detected
  const convertKeywords = ["convert", "translate", "change language", "switch to", "change from"];
  for (const keyword of convertKeywords) {
    if (lower.includes(keyword)) {
      return res.status(200).json({
      reply: `🔄 Want to convert code?<br><a href="/code-convertor" class="text-blue-400 underline">Click here</a>`
      });
    }
  }
  
  // 🐞 3. Redirect to /code-debug if debugging needed
  const debugKeywords = ["debug", "error", "fix", "issue", "problem"];
  for (const keyword of debugKeywords) {
    if (lower.includes(keyword)) {
      return res.status(200).json({
      reply: `🔄 Want to debug code?<br><a href="/code-debug" class="text-blue-400 underline">Click here</a>`
      });
    }
  }

  // 🤖 4. Fallback to Gemini LLM
  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: message }] }],
    });

    const response = await result.response;
    const text = await response.text();

    res.status(200).json({ reply: text });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});


app.post("/debug-code", async (req, res) => {
  const { code } = req.body;

  const prompt = `
  You are an expert code debugger & developer. The following code has bugs or issues. Identify bugs, explain them briefly, and give corrected version.
  
  ${code}

  Respond in the following format:
  1. Bug Explanation
  2. Fixed Code
  `;

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const response = await result.response;
    const debugOutput = await response.text();
    res.json({ result: debugOutput });
  } catch (err) {
    res.status(500).json({ error: "AI Debugging Failed", details: err.message });
  }
});

app.post("/convert-code", async (req, res) => {
  const { sourceCode, fromLang, toLang } = req.body;

  const prompt = `Convert the following ${fromLang} code to ${toLang}:\n\n\`\`\`${fromLang}\n${sourceCode}\n\`\`\``;

  try {
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const response = await result.response;
    const convertedCode = response.text();
    res.json({ convertedCode });
  } catch (err) {
    res.status(500).json({ error: "Conversion failed." }); 
  }
});

app.listen(port, () =>{
    console.log('Started bro')
})

export default app;
