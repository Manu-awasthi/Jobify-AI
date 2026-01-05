import express from "express";
import multer from "multer";
import { createRequire } from "module";
import Analysis from "../Models/analyzeModel.js";
import getOpenAI from "../utils/openai.js";

const router = express.Router();

// pdf-parse workaround for ES modules
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

// multer config
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});

router.post("/", upload.single("resume"), async (req, res) => {
  try {
    /* ---------- Validation ---------- */
    if (!req.file) {
      return res.status(400).json({ error: "No resume uploaded" });
    }

    if (!req.body.jobText) {
      return res.status(400).json({ error: "Job description is required" });
    }

    /* ---------- Extract Resume Text ---------- */
    const pdfData = await pdfParse(req.file.buffer);
    const resumeText = pdfData.text;

    if (!resumeText || resumeText.length < 100) {
      return res.status(400).json({ error: "Resume text too short or unreadable" });
    }

    const jobText = req.body.jobText;

    /* ---------- ATS Prompt ---------- */
    const prompt = `
You are an ATS resume analyzer.

Analyze the resume strictly AGAINST the job description.

Rules:
- Be realistic and strict
- Do not give high scores easily
- Base the score on skill match and relevance

Return ONLY raw JSON (no markdown, no backticks):

{
  "score": number (0-100),
  "matchedSkills": [skills present in BOTH resume and job description],
  "missingSkills": [important job skills missing in resume],
  "skillMatchPercentage": number (0-100),
  "feedback": "clear improvement feedback"
}

Resume:
${resumeText}

Job Description:
${jobText}
`;

    /* ---------- OpenAI Call ---------- */
    const openai = getOpenAI();

    const aiResponse = await openai.responses.create({
      model: "gpt-4o-mini",
      input: prompt,
      max_output_tokens: 500
    });

    const aiText = aiResponse.output_text;

    /* ---------- Clean & Parse JSON ---------- */
    const cleanJson = aiText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let aiResult;
    try {
      aiResult = JSON.parse(cleanJson);
    } catch (err) {
      return res.status(500).json({
        error: "AI returned invalid JSON",
        rawResponse: aiText
      });
    }

    /* ---------- Save to MongoDB ---------- */
    const analysis = await Analysis.create({
      jobText,
      resumeText,
      score: aiResult.score,
      matchedSkills: aiResult.matchedSkills,
      missingSkills: aiResult.missingSkills,
      skillMatchPercentage: aiResult.skillMatchPercentage,
      feedback: aiResult.feedback
    });

    /* ---------- Response ---------- */
    res.status(200).json(analysis);

  } catch (err) {
    console.error("Resume analysis failed:", err);
    res.status(500).json({ error: "Failed to analyze resume" });
  }
});

export default router;
