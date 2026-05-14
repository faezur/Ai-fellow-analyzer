const express = require("express");
const axios = require("axios");
const { buildMasterPrompt } = require("../prompts/masterPrompt");
const { parseAIResponse } = require("../utils/parser");

const router = express.Router();

const OLLAMA_URL = "http://localhost:11434/api/generate";
const MODEL = "llama3.2:1b";

router.post("/", async (req, res) => {
  const { transcript } = req.body;

  if (!transcript || typeof transcript !== "string") {
    return res.status(400).json({ error: "Transcript required" });
  }

  if (transcript.trim().length < 20) {
    return res.status(400).json({ error: "Transcript too short" });
  }

  try {
    const prompt = buildMasterPrompt(transcript.trim());

    const ollamaResponse = await axios.post(
      OLLAMA_URL,
      {
        model: MODEL,
        prompt,
        stream: false,
        options: {
          temperature: 0.3,
          num_predict: 1200,
        },
      },
      { timeout: 180000 }
    );

    const rawResponse = ollamaResponse.data?.response;

    const parsed = parseAIResponse(rawResponse);

    return res.json(parsed);

  } catch (err) {
    console.error("Error:", err.message);

    if (err.code === "ECONNREFUSED") {
      return res.status(503).json({
        error: "Ollama not running",
      });
    }

    if (err.code === "ECONNABORTED") {
      return res.status(504).json({
        error: "Ollama timeout",
      });
    }

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = router;