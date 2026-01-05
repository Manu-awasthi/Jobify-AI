import mongoose from "mongoose";

const analyzeSchema = new mongoose.Schema(
  {
    jobText: String,
    resumeText: String,
    score: Number,
    matchedSkills: [String],
    missingSkills: [String],
    skillMatchPercentage: Number,
    feedback: String
  },
  { timestamps: true }
);

const Analysis = mongoose.model("Analysis", analyzeSchema);

export default Analysis;
