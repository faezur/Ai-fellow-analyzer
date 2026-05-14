import { useState } from "react";

const SAMPLES = [
  `Priya has been with our program for about 4 months. She completes all her deliverables on time and the quality is generally good. When I assign her tasks, she executes them well. However, I've noticed that she rarely takes initiative beyond what's assigned. Last week, she found a data inconsistency in the analysis but waited for me to ask about it before mentioning it. She tends to work in isolation - she hasn't really built relationships with the other fellows or with the broader team. When I asked her about her career goals, she mentioned wanting to do well in the program but couldn't articulate what she wants to build or learn. She seems to be treating this like a regular job rather than a learning opportunity. Her technical work is solid but I'm concerned about whether she's developing judgment and leadership instincts.`,

  `Karthik has been with us for 5 months now. He is always on the floor, very visible, and the workers seem to like him. He coordinates daily with the production team and makes sure reports are submitted on time. However, I have not seen him create any new process or tracker on his own. Everything he does is because I asked him to. Last month I asked him to look into why rejection rates were high — he gave me a list of reasons but no action plan. When I asked what he thought we should do, he said he would wait for my guidance. He is reliable but I am not sure he is thinking beyond his daily checklist.`,

  `Aisha joined 3 months ago and has already done things I did not expect. She noticed that our onboarding tracker was missing key data points and redesigned it without being asked. She also set up a weekly sync with the quality team after noticing miscommunication between departments. When I ask her about problems, she comes with her own analysis and at least two options. The only concern I have is that she sometimes moves fast without looping in stakeholders, which has caused some friction. But overall she is building things that will stay even after she leaves.`,

  `Rohan has been here for 6 months. He is very good at following up with clients and keeping them happy. Customer complaints have reduced since he joined. But when I look at what he has built — there is nothing documented. No process, no SOP, no tracker. Everything is in his head. If he leaves tomorrow, we are back to square one. I have asked him multiple times to document his approach but he says he will do it and never does. His execution is strong but I worry about sustainability.`,

  `Meera joined us 2 months ago. She is still learning the context but her approach is impressive. She asks very specific questions, not generic ones. Last week she came to me with a gap analysis she had done on her own — nobody asked her to. She mapped out which parts of our process had no owner and presented it in a simple table. She admitted she didn't have solutions yet but wanted to flag the gaps early. She is junior but she thinks like someone who wants to build, not just execute.`,

  `Suresh has been with the program for 4 months. Honestly, I am not sure what he does all day. He attends meetings, nods along, and sends status updates. But when I ask him what problems he has solved independently, he cannot give me a clear answer. Last week I gave him a small project to own — he came back asking for step by step guidance on something a first-year student could figure out. He is not a bad person but I think he is coasting. No initiative, no curiosity, no ownership.`,
];

let currentIndex = 0;

export default function TranscriptInput({ onAnalyze, onReset, loading }) {
  const [transcript, setTranscript] = useState("");
  const [sampleLabel, setSampleLabel] = useState(1);

  const handleSubmit = () => {
    if (!transcript.trim() || transcript.length < 50) return;
    onAnalyze(transcript);
  };

  const handleLoadSample = () => {
    const index = currentIndex % SAMPLES.length;

    setTranscript(SAMPLES[index]);
    setSampleLabel(index + 1);
    currentIndex++;

    if (onReset) {
      onReset();
    }
  };

  const charCount = transcript.length;
  const isReady = charCount >= 50;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col gap-4">
      
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          Supervisor Transcript
        </label>

        <button
          onClick={handleLoadSample}
          className="text-xs text-blue-500 underline"
        >
          Load sample {sampleLabel}/{SAMPLES.length}
        </button>
      </div>

      <textarea
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        placeholder="Paste supervisor transcript..."
        className="w-full min-h-[340px] border p-3 text-sm"
        disabled={loading}
      />

      <div className="flex justify-between">
        <span className={`text-xs ${isReady ? "text-green-600" : "text-gray-400"}`}>
          {charCount} characters {isReady && "✓ Ready"}
        </span>

        {transcript && (
          <button onClick={() => setTranscript("")} className="text-xs text-red-400">
            Clear
          </button>
        )}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-3 bg-black text-white rounded-lg"
      >
        {loading ? "Analyzing..." : "Analyze Performance"}
      </button>
    </div>
  );
}