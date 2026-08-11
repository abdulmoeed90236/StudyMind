import express from "express";
import path from "path";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { createServer as createViteServer } from "vite";
import { connectToDatabase, getDbStatus } from "./src/server/db.js";
import { User } from "./src/models/User.js";
import { Note } from "./src/models/Note.js";
import { processStudyTextWithGemini, askTutorWithGemini } from "./src/server/ai.js";

const JWT_SECRET = process.env.JWT_SECRET || "studymind_super_secret_quantum_jwt_key_2026";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for body parsing
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // Attempt initial MongoDB connection asynchronously
  connectToDatabase().catch((err) => {
    console.warn("[MongoDB Startup]", err.message);
  });

  // API ROUTES FIRST

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "StudyMind AI Express Server" });
  });

  // MongoDB status endpoint
  app.get("/api/db/status", (_req, res) => {
    res.json(getDbStatus());
  });

  // User Signup API (MongoDB + JWT Secret + bcrypt password hashing)
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const { email, password, university } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }

      await connectToDatabase();

      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          error: "User with this email already exists. Please log in instead.",
        });
      }

      // Hash password using bcrypt
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      user = new User({
        email,
        password: hashedPassword,
        university: university || "",
        plan: "quantum-pass-free",
      });

      await user.save();

      // Sign JWT token using JWT_SECRET
      const token = jwt.sign(
        { userId: user._id, email: user.email, plan: user.plan },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.status(201).json({
        message: "User registered successfully with encrypted password and JWT",
        token,
        user: { id: user._id, email: user.email, university: user.university, plan: user.plan },
      });
    } catch (error: any) {
      console.error("[API Signup Error]", error);
      res.status(500).json({ error: error.message || "Failed to register user" });
    }
  });

  // User Login API (MongoDB + Password verification + JWT Token)
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }

      await connectToDatabase();

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Compare hashed password if password exists in DB
      if (user.password) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(401).json({ error: "Invalid password" });
        }
      }

      // Sign JWT token using JWT_SECRET
      const token = jwt.sign(
        { userId: user._id, email: user.email, plan: user.plan },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({
        message: "Logged in successfully via JWT authentication",
        token,
        user: { id: user._id, email: user.email, university: user.university, plan: user.plan },
      });
    } catch (error: any) {
      console.error("[API Login Error]", error);
      res.status(500).json({ error: error.message || "Failed to log in" });
    }
  });

  // Verify JWT Token Endpoint
  app.get("/api/auth/verify", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ valid: false, error: "Missing or malformed Authorization token header" });
      }

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      res.json({ valid: true, user: decoded });
    } catch (error: any) {
      res.status(401).json({ valid: false, error: "Invalid or expired JWT token" });
    }
  });

  // Notes API - Get all saved notes (MongoDB)
  app.get("/api/notes", async (req, res) => {
    try {
      await connectToDatabase();
      const userEmail = (req.query.email as string) || undefined;
      const filter = userEmail ? { userEmail } : {};
      const notes = await Note.find(filter).sort({ createdAt: -1 }).limit(50);
      res.json({ count: notes.length, notes });
    } catch (error: any) {
      console.error("[API Get Notes Error]", error);
      res.status(500).json({ error: error.message || "Failed to fetch notes" });
    }
  });

  // Notes API - Create/Save note (MongoDB)
  app.post("/api/notes", async (req, res) => {
    try {
      const { subject, title, rawText, summary, eli5Explanation, flashcards, userEmail } = req.body;
      if (!subject || !title || !rawText) {
        return res.status(400).json({ error: "subject, title, and rawText are required" });
      }

      await connectToDatabase();

      const newNote = new Note({
        userEmail,
        subject,
        title,
        rawText,
        summary: summary || { keyTakeaways: [], coreVocabulary: [] },
        eli5Explanation: eli5Explanation || "",
        flashcards: flashcards || [],
      });

      await newNote.save();

      res.status(201).json({
        message: "Note saved to MongoDB successfully",
        note: newNote,
      });
    } catch (error: any) {
      console.error("[API Create Note Error]", error);
      res.status(500).json({ error: error.message || "Failed to save note" });
    }
  });

  // Notes API - Delete note (MongoDB)
  app.delete("/api/notes/:id", async (req, res) => {
    try {
      await connectToDatabase();
      const { id } = req.params;
      const deleted = await Note.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ error: "Note not found" });
      }
      res.json({ message: "Note deleted from MongoDB", id });
    } catch (error: any) {
      console.error("[API Delete Note Error]", error);
      res.status(500).json({ error: error.message || "Failed to delete note" });
    }
  });

  // AI Process API (Gemini AI + optional MongoDB auto-save)
  app.post("/api/ai/process", async (req, res) => {
    try {
      const { rawText, subject, saveToDb, userEmail } = req.body;
      if (!rawText || !subject) {
        return res.status(400).json({ error: "rawText and subject are required" });
      }

      const result = await processStudyTextWithGemini(rawText, subject);

      let savedNote = null;
      if (saveToDb) {
        try {
          await connectToDatabase();
          savedNote = new Note({
            userEmail,
            subject,
            title: `${subject} AI Study Dossier`,
            rawText,
            summary: result.summary,
            eli5Explanation: result.eli5Explanation,
            flashcards: result.flashcards,
          });
          await savedNote.save();
        } catch (dbErr) {
          console.warn("[Auto-save to MongoDB warning]", dbErr);
        }
      }

      res.json({
        success: true,
        data: result,
        savedNote,
      });
    } catch (error: any) {
      console.error("[API AI Process Error]", error);
      res.status(500).json({ error: error.message || "AI processing error" });
    }
  });

  // AI Tutor API
  app.post("/api/ai/tutor", async (req, res) => {
    try {
      const { subject, rawText, question } = req.body;
      if (!question) {
        return res.status(400).json({ error: "question is required" });
      }

      const answer = await askTutorWithGemini(subject || "General", rawText || "", question);
      res.json({ question, answer });
    } catch (error: any) {
      console.error("[API AI Tutor Error]", error);
      res.status(500).json({ error: error.message || "AI Tutor error" });
    }
  });

  // VITE MIDDLEWARE FOR DEV / STATIC FOR PROD
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Express Node.js Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
