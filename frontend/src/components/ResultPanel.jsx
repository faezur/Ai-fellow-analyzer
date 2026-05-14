import { useEffect, useState } from "react";
import ScoreCard from "./ScoreCard";
import EvidenceCards from "./EvidenceCards";
import KpiMapping from "./KpiMapping";
import GapAnalysis from "./GapAnalysis";
import FollowUpQuestions from "./FollowUpQuestions";

const LOADING_STEPS = [
  { icon: "📄", text: "Reading transcript..." },
  { icon: "🔍", text: "Identifying Layer 1 vs Layer 2 behaviors..." },
  { icon: "⚖️", text: "Calibrating score against rubric..." },
  { icon: "🧩", text: "Mapping evidence to KPIs..." },
  { icon: "🕳️", text: "Detecting gaps in performance dimensions..." },
  { icon: "💬", text: "Generating follow-up questions..." },
  { icon: "✅", text: "Finalizing structured analysis..." },
];

function LoadingPanel() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < LOADING_STEPS.length - 1) {
          setCompletedSteps((c) => [...c, prev]);
          return prev + 1;
        }
        return prev;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 min-h-[500px] flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            Analysis in Progress
          </span>
          <span className="flex items-center gap-1.5 text-xs text-blue-600 font-medium bg-blue-50 border border-blue-100 rounded-full px-3 py-1">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
            Ollama processing
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {LOADING_STEPS.map((step, i) => {
            const isDone = completedSteps.includes(i);
            const isActive = i === currentStep;
            const isPending = i > currentStep;

            return (
              <div
                key={i}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 border transition-all duration-500 ${
                  isActive
                    ? "bg-blue-50 border-blue-200 shadow-sm"
                    : isDone
                    ? "bg-green-50 border-green-100"
                    : "bg-gray-50 border-gray-100 opacity-40"
                }`}
              >
                <span className="text-lg">{step.icon}</span>
                <span
                  className={`text-sm font-medium flex-1 ${
                    isActive
                      ? "text-blue-700"
                      : isDone
                      ? "text-green-700"
                      : "text-gray-400"
                  }`}
                >
                  {step.text}
                </span>
                {isDone && (
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {isActive && (
                  <svg className="animate-spin w-4 h-4 text-blue-500 flex-shrink-0" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 bg-amber-50 border border-amber-100 rounded-lg px-4 py-3">
        <p className="text-xs text-amber-700 leading-relaxed">
          <span className="font-semibold">Why does this take time?</span> Ollama runs the LLM locally on your machine — no data leaves your system. Processing time depends on your hardware.
        </p>
      </div>
    </div>
  );
}

export default function ResultPanel({ result, loading, error }) {
  if (loading) return <LoadingPanel />;

  if (error) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col items-center justify-center min-h-[500px] gap-4">
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-red-700">Analysis Failed</p>
          <p className="text-xs text-red-500 mt-1 max-w-xs">{error}</p>
        </div>
        <p className="text-xs text-gray-400 bg-gray-50 rounded-lg px-4 py-2 text-center">
          Please retry or ensure Ollama is running: <code className="font-mono">ollama serve</code>
        </p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col items-center justify-center min-h-[500px] gap-3">
        <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-gray-500">Analysis will appear here</p>
          <p className="text-xs text-gray-400 mt-1">Paste a transcript and click Analyze</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col gap-6 max-h-[85vh] overflow-y-auto">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          Analysis Result
        </span>
        <span className="text-xs bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-3 py-1 font-medium">
          AI Suggested — Not Final
        </span>
      </div>

      <ScoreCard score={result.score} />
      {result.evidence?.length > 0 && <EvidenceCards evidence={result.evidence} />}
      {result.kpiMapping?.length > 0 && <KpiMapping kpiMapping={result.kpiMapping} />}
      {result.gaps?.length > 0 && <GapAnalysis gaps={result.gaps} />}
      {result.followUpQuestions?.length > 0 && <FollowUpQuestions questions={result.followUpQuestions} />}
    </div>
  );
}