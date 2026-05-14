export default function FollowUpQuestions({ questions }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
        Follow-up Questions for Supervisor
      </p>

      <div className="flex flex-col gap-2">
        {questions.map((q, i) => {
          const text = typeof q === "string" ? q : q.question ?? "";
          return (
            <div
              key={i}
              className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-lg p-3"
            >
              {/* Number badge */}
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-200 text-blue-800 text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-blue-900 leading-relaxed">{text}</p>
            </div>
          );
        })}
      </div>

      <p className="mt-3 text-xs text-gray-400 text-center">
        These questions can be asked to the supervisor for further clarity.
      </p>
    </div>
  );
}