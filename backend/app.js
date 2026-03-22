import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 5000;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// Initialize Supabase Admin (using Service Role for rate limiting bypass/safety)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY
);

const app = express();
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://ai-powered-mentor-platform-bven.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

// --- Rate Limiting Middleware ---
const checkRateLimit = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Unauthorized: No token provided" });

  const token = authHeader.split(" ")[1];
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }

  req.user = user;

  // Check plan and limits
  const { data: profile } = await supabase
    .from("profiles")
    .select("plan_name")
    .eq("id", user.id)
    .maybeSingle();

  const plan = profile?.plan_name || 'free';
  const LIMITS = { free: 3, silver: 10, gold: 50 };
  const currentLimit = LIMITS[plan] || 3;

  // Count today's usage
  const today = new Date().toISOString().split('T')[0];
  const { count, error: countError } = await supabase
    .from("usage_logs")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
    .gte("created_at", today);

  if (countError) {
    console.error("Rate limit check error:", countError);
    return next(); // Fail-safe: allow if DB check fails
  }

  if (count >= currentLimit) {
    const nextPlan = plan === 'free' ? 'Silver' : (plan === 'silver' ? 'Gold' : null);
    const upgradeMsg = nextPlan ? `Upgrade to ${nextPlan} for more daily requests.` : "You've reached your maximum daily limit.";
    
    return res.status(429).json({ 
      error: "Daily limit reached", 
      message: `You've reached your daily limit of ${currentLimit} AI requests. ${upgradeMsg}` 
    });
  }

  next();
};

const logUsage = async (userId, feature) => {
  await supabase.from("usage_logs").insert([{ user_id: userId, feature_name: feature }]);
};

// --- Routes ---

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  const lower = message.toLowerCase();
  
  // Roadmap/Navigation redirects (Don't count against limit)
  const roadmapKeywords = ["dsa", "dbms", "ml", "mern", "java", "python", "cloud", "cn", "lld", "sd", "devops"];
  for (const keyword of roadmapKeywords) {
    if (lower.includes(keyword) && lower.includes("roadmap")) {
      return res.status(200).json({ reply: "navigate::/roadmap" });
    }
  }
  
  const convertKeywords = ["convert", "translate", "change language", "switch to", "change from"];
  for (const keyword of convertKeywords) {
    if (lower.includes(keyword)) return res.status(200).json({ reply: `navigate::/code-convertor` });
  }
  
  const debugKeywords = ["debug", "error", "fix", "issue", "problem"];
  for (const keyword of debugKeywords) {
    if (lower.includes(keyword)) return res.status(200).json({ reply: `navigate::/code-debugger` });
  }

  // Pure AI Chat (Apply limit)
  await checkRateLimit(req, res, async () => {
    try {
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: message }] }],
      });

      const response = await result.response;
      const text = await response.text();

      await logUsage(req.user.id, "chat");
      res.status(200).json({ reply: text });
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
});

app.post("/debug-code", checkRateLimit, async (req, res) => {
  const { code } = req.body;
  const prompt = `You are an expert code debugger & developer. Identify bugs and give corrected version.\n\n${code}\n\nRespond with: 1. Bug Explanation, 2. Fixed Code`;

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const response = await result.response;
    const debugOutput = await response.text();
    
    await logUsage(req.user.id, "debug");
    res.json({ result: debugOutput });
  } catch (err) {
    res.status(500).json({ error: "AI Debugging Failed" });
  }
});

app.post("/convert-code", checkRateLimit, async (req, res) => {
  const { sourceCode, fromLang, toLang } = req.body;
  const prompt = `Convert the following ${fromLang} code to ${toLang}:\n\n\`\`\`${fromLang}\n${sourceCode}\n\`\`\``;

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const response = await result.response;
    const convertedCode = await response.text();
    
    await logUsage(req.user.id, "convert");
    res.json({ convertedCode });
  } catch (err) {
    res.status(500).json({ error: "Conversion failed." }); 
  }
});

app.post("/mock-upgrade", checkRateLimit, async (req, res) => {
  try {
    const { plan } = req.body;
    if (!['silver', 'gold'].includes(plan)) {
      return res.status(400).json({ error: "Invalid plan selected" });
    }

    const { error } = await supabase
      .from("profiles")
      .update({ 
        plan_name: plan,
        is_premium: true // Keep for backward compatibility/quick checks
      })
      .eq("id", req.user.id);

    if (error) throw error;

    res.json({ message: `Welcome to ${plan.charAt(0).toUpperCase() + plan.slice(1)}! 🚀` });
  } catch (err) {
    res.status(500).json({ error: "Upgrade failed", details: err.message });
  }
});

app.listen(port, () => console.log('Server running on', port));
export default app;
