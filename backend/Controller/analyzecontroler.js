import openai from "../utils/openai.js";

export const analyzeResume = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText) {
      return res.status(400).json({ message: "Resume text required" });
    }

    const prompt = `
You are an ATS resume analyzer.

Analyze the resume and return:
1. Resume Score out of 100
2. Key Skills (comma separated)
3. Strengths (bullet points)
4. Improvements (bullet points)
5. If job description is provided, give match percentage

Resume:
${resumeText}

Job Description:
${jobDescription || "Not provided"}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a professional ATS resume analyzer." },
        { role: "user", content: prompt }
      ],
      temperature: 0.3
    });

    res.status(200).json({
      analysis: response.choices[0].message.content
    });

  } catch (error) {
    res.status(500).json({
      message: "AI analysis failed",
      error: error.message
    });
  }
};
