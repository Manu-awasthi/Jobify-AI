import express from "express";
import multer from "multer";
import { createRequire } from "module";
// import pdfParse from "pdf-parse";

import Analysis from "../Models/analyzeModel.js";
// import pkg  from "pdf-parse";

const router = express.Router();
// const pdfParse = pkg.default || pkg;


const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");
const upload = multer({storage: multer.memoryStorage() })

router.post("/", upload.single("resume") , async (req , res)=>{
    try{
        if (!req.file) {
      return res.status(400).json({ error: "No resume uploaded" });
    }
        const jobText = req.body.jobText
        const pdfData = await pdfParse(req.file.buffer)
        console.log(pdfData);

        const resumeText = pdfData.text

        const analysis = await Analysis.create(
            {
                jobText,
                resumeText,
                score:75,
                skillsFound: ["React", "Node.js"],
                feedback: "Good, but add MongoDB experience.",

            }
        );
        res.json(analysis);

    }catch(err){
        console.log(err);
        res.status(500).json({error:"failed to analyse"})
          
    }
})


export default router;