import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema({
  jobText: { type: String, },
  resumeText: { type: String, required: true },
  score: { type: Number , default:0},
  skillMatch: { type: [String], default:[]},
  feedBack: { type: String},
  createdAt: { type: Date, default: Date.now },
});

const Analysis = mongoose.model("Analysis", analysisSchema);
export default Analysis;
