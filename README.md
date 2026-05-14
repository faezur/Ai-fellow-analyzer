# AI Fellow Performance Analyzer

##  What it does

This tool analyzes a supervisor's feedback transcript and provides a structured performance evaluation.

Instead of only checking "did they complete tasks?", it evaluates how well a person:
- thinks independently  
- takes initiative  
- builds systems  

---
### Home Page
![UI](./screenshot/111111.jpg)
##  The Problem

Most performance reviews only measure:

- Tasks completed 
- Instructions followed   

But they miss critical factors like:

- Can the person solve problems independently?  
- Do they create reusable processes (SOPs, trackers)?  
- Do they build systems that save time for others?  

---

##  How it Works

The system evaluates performance using two layers:

###  Level 1: Execution
- Completes assigned work  
- Follows instructions  
- Communicates with team  
- Reliable and consistent  

###  Level 2: Systems Thinking
- Solves problems independently  
- Creates SOPs, dashboards, workflows  
- Builds reusable systems  

Score above 7 is only given if Level 2 behavior is clearly present.

---

##  Key Features

-  Performance score (1–10) with reasoning  
-  Evidence extracted from transcript  
-  Gap detection (what is missing)  
-  Smart follow-up questions  
-  No hallucination — only uses actual transcript data  
-  Strict scoring and validation logic  

---

##  AI Logic

This system does not blindly trust AI output.

### Prompt Layer:
- Differentiates execution vs systems thinking  
- Enforces strict scoring rules  
- Prevents inflated scores  

### Parser Layer:
- Cleans and validates AI response  
- Fixes malformed JSON  
- Ensures:
  - Minimum evidence  
  - Real gap detection  
  - Consistent scoring  
 This makes the system reliable and structured.

---

##  Tech Stack

**Frontend:**  
- React + Vite  
- Clean UI for input and results  

**Backend:**  
- Node.js + Express  
- AI analysis + validation  

---

##  How to Use

1. Paste a supervisor transcript  
2. Click **Analyze**  
3. Get:
   - Score  
   - Evidence  
   - Gaps  
   - Follow-up questions  

---

## Example Output

**Score:** 5/10 (Solid execution, needs systems thinking)

**Evidence:**
- "Completed all assigned tasks on time"
- "Good communication with team"

**Gaps:**
- No independent problem solving mentioned
- No systems/process creation

**Follow-up Questions:**
- "Did they create reusable processes?"
- "Any examples of independent initiatives?"

---

##  Limitations

- Depends on quality of input transcript  
- No real KPI integration  
- AI response time may vary  

---

##  Quick Start

### Backend
npm install
npm run dev
### Frontend
npm install
npm run dev

💣 Key Insight
This is not just an AI response generator —
it is a rule-driven evaluation system.

👤 Author
Faiz Ansari
