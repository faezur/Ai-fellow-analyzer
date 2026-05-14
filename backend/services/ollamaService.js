const axios = require("axios");

const generateAnalysis = async (prompt) => {
  try {
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "llama3.2",
      prompt: prompt,
      stream: false,
      options: {
        temperature: 0,      
        top_p: 1,
        top_k: 1,
        repeat_penalty: 1,
        num_predict: 800     
      }
    });

    return response.data.response;
  } catch (error) {
    console.log("Ollama Error:", error.message);
    throw error;
  }
};

module.exports = generateAnalysis;