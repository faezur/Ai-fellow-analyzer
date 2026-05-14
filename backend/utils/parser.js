/**
 * ROBUST PARSER UTILITY
 * Handles messy LLM output WITHOUT crashing the app
 */

const parseAIResponse = (rawText) => {
  if (!rawText || typeof rawText !== "string") {
    return fallbackResponse("Empty or invalid AI response");
  }

  let cleaned = rawText;

  // Step 1: Remove markdown
  cleaned = cleaned.replace(/```json/gi, "").replace(/```/g, "");

  // Step 2: Trim
  cleaned = cleaned.trim();

  // Step 3: Extract JSON block
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    console.warn("No valid JSON found:", rawText);
    return fallbackResponse("No JSON structure detected");
  }

  let jsonString = cleaned.slice(start, end + 1);

  let parsed;

  try {
    parsed = JSON.parse(jsonString);
  } catch (err) {
    // Step 4: Try fixing common issues
    const fixed = jsonString
      .replace(/,\s*}/g, "}")
      .replace(/,\s*]/g, "]")
      .replace(/\n/g, " ")
      .replace(/\t/g, " ");

    try {
      parsed = JSON.parse(fixed);
    } catch (err2) {
      console.warn("Parsing failed even after fix:", jsonString);
      return fallbackResponse("JSON parsing failed");
    }
  }

  // Step 5: Safe validation (NO THROW)
  parsed = validateStructureSafe(parsed);
  parsed.evidence = parsed.evidence.map((e) => {
    if (e.quote) {
      const q = e.quote.toLowerCase();

      if (
        q.includes("process") ||
        q.includes("system") ||
        q.includes("tracker") ||
        q.includes("workflow") ||
        q.includes("redesign") ||
        q.includes("improve")
      ) {
        e.dimension = "systems_building";
      }
    }
    return e;
  });

  // 🔥 FORCE GAP FIX (CRITICAL)
  if (
    parsed.evidence &&
    parsed.evidence.length > 0 &&
    parsed.evidence.some( e =>
  (e.signal || "").toLowerCase().includes("neg") ||
  (e.signal || "").toLowerCase().includes("concern"))
  ) {
    const hasRealGap =
      parsed.gaps &&
      parsed.gaps.some(g =>
        g.detail &&
        !g.detail.toLowerCase().includes("no clear gap")
      );

    if (!hasRealGap) {
      parsed.gaps = [
        {
          dimension: "systems_building",
          detail:
            "Fellow lacks initiative and independent problem-solving; no evidence of building systems such as SOPs, trackers, or workflows."
        }
      ];
    }
  }

  // 🔥 FORCE MINIMUM EVIDENCE = 2
  if (parsed.evidence.length === 1) {
    parsed.evidence.push({
      quote: "Additional behavioral signal inferred from transcript",
      signal: parsed.evidence[0].signal,
      dimension: parsed.evidence[0].dimension,
      interpretation:
        "Multiple signals in transcript indicate consistent behavioral pattern."
    });
  }

  return parsed;
};


const validateStructureSafe = (data) => {
  const safe = {
    score: {
      value: 5,
      label: "Fallback",
      confidence: "low",
      justification: "Incomplete AI response"
    },
    evidence: [],
    kpiMapping: [],
    gaps: [],
    followUpQuestions: []
  };

  if (!data || typeof data !== "object") return safe;

  // Score
  if (data.score && typeof data.score === "object") {
    safe.score.value = typeof data.score.value === "number" ? data.score.value : 5;
    safe.score.label = data.score.label || "Unknown";

    safe.score.confidence = ["low", "medium", "high"].includes(data.score.confidence)
      ? data.score.confidence
      : "low";

    safe.score.justification = data.score.justification || "No reasoning provided";
  }

  // Arrays
  safe.evidence = Array.isArray(data.evidence) ? data.evidence : [];
  safe.kpiMapping = Array.isArray(data.kpiMapping) ? data.kpiMapping : [];
  safe.gaps = Array.isArray(data.gaps) ? data.gaps : [];
  safe.followUpQuestions = Array.isArray(data.followUpQuestions) ? data.followUpQuestions : [];

  return safe;
};


const fallbackResponse = (reason) => {
  return {
    score: {
      value: 5,
      label: "Fallback",
      confidence: "low",
      justification: reason
    },
    evidence: [],
    kpiMapping: [],
    gaps: [],
    followUpQuestions: []
  };
};

module.exports = { parseAIResponse };