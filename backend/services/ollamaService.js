const axios = require("axios");

const generateAnalysis = async (prompt) => {
  try {
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "llama3.2",
      prompt,
      stream: false,
    });

    return response.data.response;
  } catch (error) {
    console.log("Ollama Error:", error.message);
    throw error;
  }
};

module.exports = generateAnalysis;