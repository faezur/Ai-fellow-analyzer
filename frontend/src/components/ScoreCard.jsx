export default function ScoreCard({ score }) {
  if (!score) {
    return (
      <p className="text-gray-400 text-sm">
        No score available
      </p>
    );
  }

  const value = score.value ?? 0;
  const label = score.label ?? "Unknown";
  const confidence = score.confidence ?? "medium";
  const justification = score.justification ?? "";
  const scoreContext =
    score.scoreContext ??
    "This score reflects execution vs systems thinking distinction";

  // Better label mapping
  const labelMap = {
    "Need Attention": "Needs Improvement",
    "Productivity": "Execution Focused",
    "Performance": "Systems Thinking",
  };

  const displayLabel = labelMap[label] || label;

  // Score styling
  const getScoreStyle = (v) => {
    if (v >= 8)
      return {
        color: "text-green-700",
        bg: "bg-green-50",
        border: "border-green-200",
        bar: "bg-green-500",
      };
    if (v >= 6)
      return {
        color: "text-blue-700",
        bg: "bg-blue-50",
        border: "border-blue-200",
        bar: "bg-blue-500",
      };
    if (v >= 4)
      return {
        color: "text-amber-700",
        bg: "bg-amber-50",
        border: "border-amber-200",
        bar: "bg-amber-500",
      };
    return {
      color: "text-red-700",
      bg: "bg-red-50",
      border: "border-red-200",
      bar: "bg-red-500",
    };
  };

  const style = getScoreStyle(value);
  const pct = (value / 10) * 100;

  const confidenceColor = {
    high: "text-green-600 bg-green-50 border-green-200",
    medium: "text-amber-600 bg-amber-50 border-amber-200",
    low: "text-red-600 bg-red-50 border-red-200",
  }[confidence] ?? "text-gray-600 bg-gray-50 border-gray-200";

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
        Performance Score
      </p>

      <div className={`rounded-xl border ${style.border} ${style.bg} p-4`}>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          {/* Score */}
          <div>
            <span className={`text-5xl font-bold ${style.color}`}>
              {value}
            </span>
            <span className="text-2xl text-gray-400 font-light">/10</span>

            {/* Meaning */}
            <p className="text-xs text-gray-500 mt-1">
              {value >= 7
                ? "Shows systems thinking"
                : value >= 4
                ? "Execution strong, systems missing"
                : "Needs improvement in execution"}
            </p>
          </div>

          {/* Label + Confidence */}
          <div className="flex flex-col gap-2 items-end">
            <span className={`text-sm font-semibold ${style.color}`}>
              {displayLabel}
            </span>

            <span
              className={`text-xs border rounded-full px-2.5 py-0.5 font-medium ${confidenceColor}`}
            >
              Confidence • {confidence}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 h-2 bg-white rounded-full overflow-hidden border border-gray-100">
          <div
            className={`h-full rounded-full ${style.bar} transition-all duration-700`}
            style={{ width: `${pct}%` }}
          />
        </div>

        {/* Score Context */}
        <div className="mt-3 flex items-center gap-2 bg-white/60 rounded-lg px-3 py-2">
          <svg
            className="w-3.5 h-3.5 text-gray-400 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-xs text-gray-500 italic">
            {scoreContext}
          </p>
        </div>

        {/* Reasoning */}
        {justification && (
          <div className="mt-3 border-t border-white/60 pt-3">
            <p className="text-xs font-semibold text-gray-400 mb-1">
              Reasoning
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              {justification}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}