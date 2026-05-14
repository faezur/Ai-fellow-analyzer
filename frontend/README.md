# AI Fellow Performance Analyzer

Supervisor transcript paste karo → Structured AI performance analysis pao.

---

## Architecture

```
Frontend (React + Vite)     Backend (Node + Express)     AI (Ollama local)
     :5173          →→→          :3001            →→→       :11434
  Transcript input          /analyze endpoint          llama3.2 model
  Result display            masterPrompt inject        JSON response
```

---

## Setup Instructions

### Step 1 — Ollama install karo

```bash
# Mac/Linux
curl -fsSL https://ollama.ai/install.sh | sh

# Windows
# https://ollama.ai/download se installer download karo
```

### Step 2 — Model pull karo

```bash
ollama pull llama3.2
```

### Step 3 — Ollama test karo

```bash
ollama run llama3.2
# "Hello" type karo — agar response aaya toh sab theek hai
# Ctrl+D se bahar aao
```

### Step 4 — Backend setup

```bash
cd server
npm install
npm run dev
# Server start hoga: http://localhost:3001
```

### Step 5 — Frontend setup (nayi terminal mein)

```bash
cd client
npm install
npm run dev
# Frontend start hoga: http://localhost:5173
```

### Step 6 — Browser mein kholo

```
http://localhost:5173
```

---

## Project Structure

```
ai-fellow-analyzer/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TranscriptInput.jsx     ← Left panel (textarea + button)
│   │   │   ├── ResultPanel.jsx         ← Right panel (orchestrator)
│   │   │   ├── ScoreCard.jsx           ← Score display
│   │   │   ├── EvidenceCards.jsx       ← Evidence with quotes
│   │   │   ├── KpiMapping.jsx          ← KPI table
│   │   │   ├── GapAnalysis.jsx         ← Gaps list
│   │   │   └── FollowUpQuestions.jsx   ← AI-generated questions
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── prompts/
│   │   └── masterPrompt.js    ← THE HEART — AI instructions
│   ├── utils/
│   │   └── parser.js          ← JSON cleaner for LLM output
│   ├── routes/
│   │   └── analyze.js         ← POST /analyze endpoint
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Why llama3.2?

- Locally runs — no API cost, no internet needed
- Fast enough for structured JSON output
- Good instruction following for prompt engineering
- Privacy: transcript data kabhi bahar nahi jaata

---

## Prompt Engineering Approach

`server/prompts/masterPrompt.js` mein:

1. **Layer 1 vs Layer 2 framework** — Surface behaviors vs deep judgment behaviors
2. **Strict scoring rules** — Guards against inflation (no undeserved 8+)
3. **KPI definitions** — 7 dimensions clearly defined
4. **JSON-only instruction** — LLM ko strict format force kiya
5. **Bias awareness** — Supervisor over/under-praise handle karna

---

## Challenges

- LLMs kabhi kabhi clean JSON nahi dete → `parser.js` ne solve kiya
- Ollama slow hota hai locally → 120s timeout set kiya
- Scoring calibration → Prompt mein explicit rules diye

---

## Future Improvements

- Multiple transcript comparison
- Historical trend tracking per fellow
- Export to PDF report
- Fine-tuned model on real performance data
- Side-by-side supervisor vs peer review