const express = require("express");
const cors = require("cors");
const analyzeRoute = require("./routes/analyze");

const app = express();
const PORT = 5000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  res.json({ message: "AI Fellow Analyzer Backend Running" });
});

app.use("/analyze", analyzeRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Ollama se connect hoga: http://localhost:11434`);
});