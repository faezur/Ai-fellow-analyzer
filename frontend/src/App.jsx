import { useState } from "react";
import TranscriptInput from "./components/TranscriptInput";
import ResultPanel from "./components/ResultPanel";

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔥 ANALYZE FUNCTION
  const handleAnalyze = async (transcript) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Analysis failed");
      }

      if (json.data) {
        setResult(json.data);
      } else if (json.score) {
        setResult(json);
      } else {
        throw new Error("No data in response");
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 THIS IS THE FIX
  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between">
          <div>
            <h1 className="text-xl font-semibold">
              AI Fellow Performance Analyzer
            </h1>
            <p className="text-sm text-gray-500">
              Supervisor transcript → Structured AI analysis
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-2 gap-6">
          
          <TranscriptInput
            onAnalyze={handleAnalyze}
            onReset={handleReset}   // 🔥 IMPORTANT
            loading={loading}
          />

          <ResultPanel
            result={result}
            loading={loading}
            error={error}
          />

        </div>
      </main>
    </div>
  );
}