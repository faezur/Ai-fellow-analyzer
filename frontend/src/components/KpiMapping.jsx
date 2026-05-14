export default function KpiMapping({ kpiMapping }) {
  const severityStyle = {
    strength: "bg-green-50 text-green-700 border-green-200",
    gap:      "bg-red-50 text-red-700 border-red-200",
    neutral:  "bg-gray-50 text-gray-600 border-gray-200",
  };

  const typeStyle = {
    personal: "bg-purple-50 text-purple-700 border-purple-200",
    systemic: "bg-blue-50 text-blue-700 border-blue-200",
  };

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
        KPI Mapping
      </p>

      <div className="flex flex-col gap-2">
        {kpiMapping.map((k, i) => {
          const sev = k.severity ?? "neutral";
          const typ = k.type ?? "personal";
          const sevStyle = severityStyle[sev] ?? severityStyle.neutral;
          const typStyle = typeStyle[typ] ?? typeStyle.personal;

          return (
            <div
              key={i}
              className="bg-white rounded-lg border border-gray-200 p-3"
            >
              {/* KPI name + badges */}
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className="text-sm font-semibold text-gray-800">
                  {k.kpi ?? k.name}
                </span>
                <span className={`text-xs border rounded-full px-2 py-0.5 font-medium ${sevStyle}`}>
                  {sev}
                </span>
                <span className={`text-xs border rounded-full px-2 py-0.5 font-medium ${typStyle}`}>
                  {typ}
                </span>
              </div>

              {/* Evidence */}
              {k.evidence && (
                <p className="text-xs text-gray-500 leading-relaxed">
                  {k.evidence}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}