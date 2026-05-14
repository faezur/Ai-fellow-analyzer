export default function GapAnalysis({ gaps }) {
  if (!gaps || gaps.length === 0) {
    return (
      <p className="text-sm text-gray-400">
        No gap analysis available
      </p>
    );
  }

  const labelMap = {
    execution: "Execution",
    systems_building: "Systems Building",
    kpi_impact: "KPI Impact",
    change_management: "Change Management"
  };

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
        Gaps Identified
      </p>

      <div className="flex flex-col gap-2">
        {gaps.map((gap, i) => {
          const dimension = gap.dimension || "general";
          const text = gap.detail || "No detail provided";
          const isNoGap = text.toLowerCase().includes("no clear gap");

          return (
            <div
              key={i}
              className={`flex items-start gap-3 rounded-lg p-3 border ${
                isNoGap
                  ? "bg-gray-50 border-gray-100"
                  : "bg-red-50 border-red-100"
              }`}
            >
              <div
                className={`mt-0.5 w-4 h-4 rounded-full ${
                  isNoGap ? "bg-gray-200" : "bg-red-200"
                }`}
              />

              <div>
                <span
                  className={`text-xs font-semibold uppercase ${
                    isNoGap ? "text-gray-400" : "text-red-400"
                  }`}
                >
                  {labelMap[dimension] || "General"}
                </span>

                <p
                  className={`text-sm mt-1 ${
                    isNoGap ? "text-gray-500" : "text-red-800"
                  }`}
                >
                  {text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}