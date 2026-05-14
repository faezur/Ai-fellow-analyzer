export default function EvidenceCards({ evidence }) {
  const typeStyle = {
    positive: {
      border: "border-l-green-500",
      tag: "bg-green-50 text-green-700 border-green-200",
      label: "Positive",
      icon: (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
    negative: {
      border: "border-l-red-400",
      tag: "bg-red-50 text-red-700 border-red-200",
      label: "Concern",
      icon: (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v4m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z" />
        </svg>
      ),
    },
    neutral: {
      border: "border-l-gray-300",
      tag: "bg-gray-50 text-gray-600 border-gray-200",
      label: "Neutral",
      icon: (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
        </svg>
      ),
    },
  };

  const dimensionStyle = {
    execution: "bg-blue-50 text-blue-600 border-blue-100",
    systems_building: "bg-purple-50 text-purple-600 border-purple-100",
  };

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
        Evidence from Transcript
      </p>

      <div className="flex flex-col gap-3">
        {evidence.map((e, i) => {
          const type = e.signal ?? e.type ?? "neutral";
          const s = typeStyle[type] ?? typeStyle.neutral;
          const dimension = e.dimension ?? null;
          const dimStyle = dimensionStyle[dimension] ?? "bg-gray-50 text-gray-500 border-gray-100";
          const dimLabel = dimension
            ? dimension.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
            : null;

          return (
            <div
              key={i}
              className={`rounded-lg border border-gray-100 border-l-4 ${s.border} p-3 bg-white shadow-sm`}
            >
              {/* Top row — signal + dimension */}
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className={`inline-flex items-center gap-1 text-xs font-medium border rounded-full px-2.5 py-0.5 ${s.tag}`}>
                  {s.icon}
                  {s.label}
                </span>
                {dimLabel && (
                  <span className={`text-xs border rounded-full px-2.5 py-0.5 font-medium ${dimStyle}`}>
                    {dimLabel}
                  </span>
                )}
              </div>

              {/* Quote */}
              {e.quote && (
                <div className="bg-gray-50 rounded-md px-3 py-2 mb-2">
                  <p className="text-xs text-gray-500 italic leading-relaxed">
                    "{e.quote}"
                  </p>
                </div>
              )}

              {/* Interpretation */}
              {e.interpretation && (
                <p className="text-sm text-gray-700 leading-relaxed">
                  {e.interpretation}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}