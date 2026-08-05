"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  VideoCreatorInput, 
  VideoCreatorOutput, 
  VideoScene 
} from "@/types/ai-employees";
import { 
  generateVideoAI, 
  getVideoHistory 
} from "@/lib/ai-service";
import { 
  Video, 
  Sparkles, 
  Play, 
  Pause, 
  Volume2, 
  Download, 
  History, 
  Layers, 
  CheckCircle2, 
  Mic, 
  Captions, 
  UserCheck, 
  Film,
  ArrowRight,
  RefreshCw
} from "lucide-react";
import confetti from "canvas-confetti";

export default function VideoCreatorView() {
  const [input, setInput] = useState<VideoCreatorInput>({
    productDescription: "",
    sellingAngle: "",
    platform: "TikTok Video",
    avatarVoice: "Indonesian Female - Maya"
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [currentResult, setCurrentResult] = useState<VideoCreatorOutput | null>(null);
  const [history, setHistory] = useState<VideoCreatorOutput[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const loaded = getVideoHistory();
    setHistory(loaded);
    if (loaded.length > 0) {
      setCurrentResult(loaded[0]);
    }
  }, []);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.productDescription || !input.sellingAngle) {
      alert("Harap isi Deskripsi Produk dan Selling Angle!");
      return;
    }

    setIsGenerating(true);
    setCurrentStep(1); // Scripting

    setTimeout(() => setCurrentStep(2), 700);  // Scene Gen
    setTimeout(() => setCurrentStep(3), 1400); // Voice Over
    setTimeout(() => setCurrentStep(4), 2100); // Rendering

    setTimeout(() => {
      const res = generateVideoAI(input);
      setCurrentResult(res);
      setHistory(getVideoHistory());
      setIsGenerating(false);
      setCurrentStep(0);
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    }, 2800);
  };

  const handleTogglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const workflowSteps = [
    { title: "Upload Product & Angle", icon: Film },
    { title: "AI Script Generator", icon: Sparkles },
    { title: "Scene Generation", icon: Layers },
    { title: "AI Voice & Subtitles", icon: Mic },
    { title: "Render & Download MP4", icon: Download }
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* LEFT FORM & WORKFLOW PANEL */}
      <div className="w-full lg:w-96 flex-shrink-0 flex flex-col gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center gap-3 mb-4 border-b border-slate-800 pb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 via-rose-500 to-red-500 flex items-center justify-center text-white font-bold shadow-lg shadow-pink-500/20">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-white text-lg">AI-04 Video Creator</h2>
              <p className="text-xs text-slate-400">Editor Video Vertical AI 9:16</p>
            </div>
          </div>

          {/* WORKFLOW STATUS STEPPER */}
          <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 mb-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Automated Workflow</span>
            <div className="flex flex-col gap-1.5 text-xs">
              {workflowSteps.map((step, idx) => {
                const Icon = step.icon;
                const isDone = currentResult && currentStep === 0;
                const isActive = isGenerating && currentStep === idx;

                return (
                  <div key={idx} className="flex items-center justify-between py-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isDone || (isGenerating && currentStep > idx)
                          ? "bg-emerald-500 text-slate-950"
                          : isActive
                          ? "bg-pink-500 text-white animate-pulse"
                          : "bg-slate-800 text-slate-500"
                      }`}>
                        {isDone || (isGenerating && currentStep > idx) ? "✓" : idx + 1}
                      </div>
                      <span className={`${isActive ? "text-pink-400 font-bold" : isDone ? "text-slate-200" : "text-slate-500"}`}>
                        {step.title}
                      </span>
                    </div>
                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-pink-400 animate-spin" : "text-slate-600"}`} />
                  </div>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleGenerate} className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                Deskripsi Produk <span className="text-pink-400">*</span>
              </label>
              <textarea
                placeholder="Contoh: Sneakers Running Ultra Light Air-Cushion anti pegal"
                value={input.productDescription}
                onChange={(e) => setInput({ ...input, productDescription: e.target.value })}
                rows={2}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-pink-500 transition resize-none"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                Selling Angle Utama <span className="text-pink-400">*</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: Sensasi Langkah Melayang di Awan Diskon 40%"
                value={input.sellingAngle}
                onChange={(e) => setInput({ ...input, sellingAngle: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-pink-500 transition"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">Platform Target</label>
                <select
                  value={input.platform}
                  onChange={(e) => setInput({ ...input, platform: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-pink-500"
                >
                  <option value="TikTok Video">TikTok Video (9:16)</option>
                  <option value="Instagram Reel">Instagram Reel (9:16)</option>
                  <option value="YouTube Shorts">YouTube Shorts (9:16)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">Voice Presenter</label>
                <select
                  value={input.avatarVoice}
                  onChange={(e) => setInput({ ...input, avatarVoice: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-pink-500"
                >
                  <option value="Indonesian Female - Maya">Maya (Indo Female)</option>
                  <option value="Indonesian Male - Budi">Budi (Indo Male)</option>
                  <option value="English Female - Sarah">Sarah (ENG Female)</option>
                  <option value="English Male - James">James (ENG Male)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="mt-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white font-bold text-sm shadow-lg shadow-pink-500/25 hover:brightness-110 active:scale-[0.99] transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  Rendering Video 9:16...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate Video Vertical 9:16
                </>
              )}
            </button>
          </form>
        </div>

        {/* HISTORY PANEL */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <History className="w-3.5 h-3.5" /> History Video Render ({history.length})
          </h3>
          <div className="flex flex-col gap-2 max-h-52 overflow-y-auto pr-1">
            {history.map((h) => (
              <button
                key={h.id}
                onClick={() => setCurrentResult(h)}
                className={`text-left p-2.5 rounded-xl border text-xs transition flex flex-col gap-1 ${
                  currentResult?.id === h.id
                    ? "bg-slate-800 border-pink-500/50 text-white"
                    : "bg-slate-950/40 border-slate-800/80 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div className="font-semibold text-slate-200 line-clamp-1">{h.title}</div>
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>{h.input.platform}</span>
                  <span>{h.durationSeconds}s MP4</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT VIDEO PLAYER & SCENE WORKSPACE */}
      <div className="flex-1 flex flex-col gap-5 min-w-0">
        {currentResult ? (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
            
            {/* 9:16 VERTICAL VIDEO PLAYER (5 COLS) */}
            <div className="xl:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col items-center shadow-2xl relative">
              <div className="w-full flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-pink-400 font-mono">9:16 VERTICAL FORMAT</span>
                <span className="text-xs text-slate-400">{currentResult.durationSeconds} Seconds MP4</span>
              </div>

              {/* MOCK VERTICAL VIDEO SCREEN */}
              <div className="relative w-full max-w-[280px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-800 bg-black group flex flex-col justify-between p-4">
                {/* VIDEO ELEMENT */}
                <video
                  ref={videoRef}
                  src={currentResult.videoUrl}
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* OVERLAY GRADIENT */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none" />

                {/* TOP BRAND & AVATAR BADGE */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                    <img
                      src={currentResult.avatarPresenter.imageUrl}
                      alt={currentResult.avatarPresenter.name}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span className="text-[10px] font-bold text-white">{currentResult.avatarPresenter.name}</span>
                  </div>
                  <span className="text-[10px] font-bold text-pink-400 bg-pink-500/20 px-2 py-0.5 rounded-full border border-pink-500/30">
                    AI VOICE
                  </span>
                </div>

                {/* PLAY / PAUSE OVERLAY BUTTON */}
                <button
                  onClick={handleTogglePlay}
                  className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-pink-500/80 hover:bg-pink-500 text-white flex items-center justify-center shadow-xl transition transform active:scale-90 z-20"
                >
                  {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
                </button>

                {/* AUTO SUBTITLE OVERLAY */}
                <div className="relative z-10 text-center mb-2">
                  <div className="bg-amber-400 text-slate-950 font-black text-xs px-3 py-1.5 rounded-lg shadow-lg inline-block leading-tight uppercase tracking-wider">
                    {currentResult.scenes[activeSceneIndex]?.subtitleText || "AUTO SUBTITLE READY"}
                  </div>
                </div>
              </div>

              {/* DOWNLOAD MP4 BUTTON */}
              <a
                href={currentResult.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full max-w-[280px] py-2.5 px-4 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:brightness-110 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 transition"
              >
                <Download className="w-4 h-4" />
                Download Video MP4
              </a>
            </div>

            {/* SCENE & SCRIPT DETAILS (7 COLS) */}
            <div className="xl:col-span-7 flex flex-col gap-4">
              {/* SCRIPT SUMMARY */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col gap-3">
                <h3 className="font-bold text-white text-sm border-b border-slate-800 pb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-pink-400" />
                  AI Generated Script & Voiceover
                </h3>
                <div className="grid grid-cols-1 gap-2.5 text-xs">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <strong className="text-pink-400 block mb-1">🔥 Hook (0-3s):</strong>
                    <p className="text-slate-200">{currentResult.script.hook}</p>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <strong className="text-indigo-400 block mb-1">⚡ Body (4-10s):</strong>
                    <p className="text-slate-200">{currentResult.script.body}</p>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <strong className="text-emerald-400 block mb-1">🛒 CTA (11-15s):</strong>
                    <p className="text-slate-200">{currentResult.script.cta}</p>
                  </div>
                </div>
              </div>

              {/* SCENE TIMELINE BREAKDOWN */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col gap-3">
                <h3 className="font-bold text-white text-sm border-b border-slate-800 pb-2 flex items-center justify-between">
                  <span>Scene Breakdown ({currentResult.scenes.length} Scenes)</span>
                  <span className="text-xs text-slate-400 font-mono">9:16 Ready</span>
                </h3>

                <div className="flex flex-col gap-3">
                  {currentResult.scenes.map((scene, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveSceneIndex(idx)}
                      className={`p-3.5 rounded-xl border text-xs cursor-pointer transition flex items-start gap-3 ${
                        activeSceneIndex === idx
                          ? "bg-slate-800 border-pink-500/60 shadow-md"
                          : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <div className="w-16 h-20 rounded-lg overflow-hidden bg-slate-950 flex-shrink-0 relative border border-slate-800">
                        <img src={scene.bgImageUrl} alt={`Scene ${scene.sceneNumber}`} className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 left-1 right-1 text-[9px] font-bold bg-black/80 text-white rounded text-center px-1">
                          {scene.timeRange}
                        </span>
                      </div>
                      <div className="flex-1 flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white">Scene #{scene.sceneNumber}</span>
                          <span className="text-[10px] text-pink-400 font-mono">{scene.timeRange}</span>
                        </div>
                        <p className="text-slate-300 font-medium">{scene.scriptText}</p>
                        <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded w-fit mt-1">
                          {scene.subtitleText}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 flex flex-col items-center justify-center text-center min-h-[500px]">
            <div className="w-16 h-16 rounded-2xl bg-pink-500/10 text-pink-400 flex items-center justify-center mb-4">
              <Video className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Editor Video AI 9:16 Belum Aktif</h3>
            <p className="text-xs text-slate-400 max-w-sm">
              Isi deskripsi produk dan selling angle di sebelah kiri lalu klik <strong>Generate Video Vertical 9:16</strong> untuk membuat video otomatis dengan voiceover & subtitle!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
