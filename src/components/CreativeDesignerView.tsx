"use client";

import React, { useState, useEffect } from "react";
import { 
  CreativeDesignerInput, 
  CreativeDesignerOutput, 
  CreativeAsset 
} from "@/types/ai-employees";
import { 
  generateCreativeAI, 
  getCreativeHistory 
} from "@/lib/ai-service";
import { 
  Palette, 
  Sparkles, 
  Download, 
  RefreshCw, 
  Grid, 
  Image as ImageIcon, 
  History, 
  Layers, 
  Maximize2, 
  Type, 
  Sliders, 
  ExternalLink,
  Plus
} from "lucide-react";
import confetti from "canvas-confetti";

export default function CreativeDesignerView() {
  const [input, setInput] = useState<CreativeDesignerInput>({
    product: "",
    brandName: "",
    style: "Modern Minimalist",
    targetAudience: ""
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [currentResult, setCurrentResult] = useState<CreativeDesignerOutput | null>(null);
  const [history, setHistory] = useState<CreativeDesignerOutput[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<CreativeAsset | null>(null);
  const [isRegenerating, setIsRegenerating] = useState<string | null>(null);

  useEffect(() => {
    const loaded = getCreativeHistory();
    setHistory(loaded);
    if (loaded.length > 0) {
      setCurrentResult(loaded[0]);
      if (loaded[0].assets.length > 0) {
        setSelectedAsset(loaded[0].assets[0]);
      }
    }
  }, []);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.product || !input.brandName) {
      alert("Harap isi Produk dan Nama Brand!");
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      const res = generateCreativeAI(input);
      setCurrentResult(res);
      if (res.assets.length > 0) setSelectedAsset(res.assets[0]);
      setHistory(getCreativeHistory());
      setIsGenerating(false);
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    }, 1800);
  };

  const handleRegenerateSingle = (assetId: string) => {
    setIsRegenerating(assetId);
    setTimeout(() => {
      if (currentResult) {
        const newImages = [
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80"
        ];
        const randomImg = newImages[Math.floor(Math.random() * newImages.length)];
        
        const updatedAssets = currentResult.assets.map(a => {
          if (a.id === assetId) {
            return { ...a, imageUrl: randomImg };
          }
          return a;
        });
        const updatedResult = { ...currentResult, assets: updatedAssets };
        setCurrentResult(updatedResult);
        if (selectedAsset?.id === assetId) {
          setSelectedAsset({ ...selectedAsset, imageUrl: randomImg });
        }
      }
      setIsRegenerating(null);
    }, 1200);
  };

  const handleDownload = (asset: CreativeAsset) => {
    const link = document.createElement("a");
    link.href = asset.imageUrl || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80";
    link.download = `${asset.title.toLowerCase().replace(/\s+/g, "_")}.jpg`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const designStyles = [
    "Modern Minimalist",
    "Cyberpunk & Neon",
    "Luxury & Elegant",
    "Retro Vintage",
    "Clean Corporate",
    "Aesthetic Pastel"
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* LEFT FORM PANEL */}
      <div className="w-full lg:w-96 flex-shrink-0 flex flex-col gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center gap-3 mb-4 border-b border-slate-800 pb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-white text-lg">AI-03 Creative Designer</h2>
              <p className="text-xs text-slate-400">Desainer Brand AI (Canva Studio)</p>
            </div>
          </div>

          <form onSubmit={handleGenerate} className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                Nama Produk <span className="text-indigo-400">*</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: Cold Brew Coffee Botol"
                value={input.product}
                onChange={(e) => setInput({ ...input, product: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                Nama Brand / Toko <span className="text-indigo-400">*</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: Kopi Kenangan"
                value={input.brandName}
                onChange={(e) => setInput({ ...input, brandName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 block">Target Audience</label>
              <input
                type="text"
                placeholder="Contoh: Gen Z, Pekerja Kantoran, Pecinta Kopi"
                value={input.targetAudience}
                onChange={(e) => setInput({ ...input, targetAudience: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            {/* STYLE SELECTOR */}
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-2 flex items-center justify-between">
                <span>Design Style Theme</span>
                <span className="text-[10px] text-indigo-400 font-mono">{input.style}</span>
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {designStyles.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setInput({ ...input, style: s })}
                    className={`py-1.5 px-2 rounded-lg text-xs font-medium border transition text-left truncate ${
                      input.style === s
                        ? "bg-indigo-500/20 border-indigo-500 text-indigo-300"
                        : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="mt-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 hover:brightness-110 active:scale-[0.99] transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  Generating Brand Assets...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate All Creative Designs
                </>
              )}
            </button>
          </form>
        </div>

        {/* HISTORY GALLERY */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <History className="w-3.5 h-3.5" /> History Studio Gallery ({history.length})
          </h3>
          <div className="flex flex-col gap-2 max-h-52 overflow-y-auto pr-1">
            {history.map((h) => (
              <button
                key={h.id}
                onClick={() => {
                  setCurrentResult(h);
                  if (h.assets.length > 0) setSelectedAsset(h.assets[0]);
                }}
                className={`text-left p-2.5 rounded-xl border text-xs transition flex flex-col gap-1 ${
                  currentResult?.id === h.id
                    ? "bg-slate-800 border-indigo-500/50 text-white"
                    : "bg-slate-950/40 border-slate-800/80 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div className="font-semibold text-slate-200 line-clamp-1">{h.input.brandName} - {h.input.product}</div>
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>{h.input.style}</span>
                  <span>{h.assets.length} Assets</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT CANVA-LIKE EDITOR STUDIO */}
      <div className="flex-1 flex flex-col gap-5 min-w-0">
        {currentResult ? (
          <div className="flex flex-col gap-5">
            {/* ASSET SELECTOR STRIP */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex items-center gap-2 overflow-x-auto">
              {currentResult.assets.map((asset) => (
                <button
                  key={asset.id}
                  onClick={() => setSelectedAsset(asset)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                    selectedAsset?.id === asset.id
                      ? "bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-500/30"
                      : "bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Grid className="w-3.5 h-3.5" />
                  {asset.type}
                </button>
              ))}
            </div>

            {/* MAIN CANVA STUDIO EDITOR WORKSPACE */}
            {selectedAsset && (
              <div className="flex flex-col gap-5">
                
                {/* CREATIVE BRIEF GENERATOR CARD PANEL */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col gap-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                      <h3 className="font-bold text-white text-sm">AI Creative Brief Generator</h3>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 font-mono text-[10px] font-bold">
                      {currentResult.input.style}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-500 font-bold block text-[10px] uppercase">Konsep Visual</span>
                      <span className="text-slate-200 font-semibold mt-1 block">{currentResult.input.style} aesthetic with bold focal product photography</span>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-500 font-bold block text-[10px] uppercase">Palet Warna Utama</span>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        {['#6366f1', '#ec4899', '#0f172a', '#f8fafc'].map((c) => (
                          <span key={c} className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: c }} />
                        ))}
                      </div>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-500 font-bold block text-[10px] uppercase">Layout & Typography</span>
                      <span className="text-slate-200 font-semibold mt-1 block">Hero Headline Top-Left, CTA Button Bottom-Right</span>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-500 font-bold block text-[10px] uppercase">Target Copy In Image</span>
                      <span className="text-amber-400 font-bold mt-1 block">Problem-Solving Hook & Diskon Badge</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
                  
                  {/* CANVAS PREVIEW (8 COLS) */}
                  <div className="xl:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[520px] shadow-2xl relative overflow-hidden">
                    {/* Canvas Background Pattern */}
                    <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

                    {/* Header Actions Bar */}
                    <div className="w-full flex items-center justify-between mb-4 z-10">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-300 font-mono text-[11px] font-bold border border-indigo-500/30">
                          {selectedAsset.aspectRatio} ({selectedAsset.dimensions})
                        </span>
                        <h3 className="font-bold text-white text-sm">{selectedAsset.title}</h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleRegenerateSingle(selectedAsset.id)}
                          disabled={isRegenerating === selectedAsset.id}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition disabled:opacity-50"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 text-indigo-400 ${isRegenerating === selectedAsset.id ? "animate-spin" : ""}`} />
                          Regenerate Image
                        </button>
                        <button
                          onClick={() => handleDownload(selectedAsset)}
                          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:brightness-110 text-white text-xs font-bold shadow-md shadow-indigo-500/20 flex items-center gap-1.5 transition"
                        >
                          <Download className="w-3.5 h-3.5" />
                          Download Asset
                        </button>
                      </div>
                    </div>

                    {/* THE GRAPHICAL BANNER CANVAS */}
                    <div 
                      className="relative rounded-xl overflow-hidden shadow-2xl transition-all duration-300 group flex items-center justify-center max-w-full"
                      style={{
                        aspectRatio: selectedAsset.aspectRatio === '16:9' ? '16/9' : selectedAsset.aspectRatio === '9:16' ? '9/16' : '1/1',
                        width: selectedAsset.aspectRatio === '9:16' ? '300px' : '100%',
                        maxHeight: '460px'
                      }}
                    >
                      {/* Background AI Generated Image */}
                      {selectedAsset.imageUrl ? (
                        <img
                          src={selectedAsset.imageUrl}
                          alt={selectedAsset.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-slate-950 flex items-center justify-center">
                          <ImageIcon className="w-12 h-12 text-slate-800" />
                        </div>
                      )}

                      {/* Gradient Overlay for Text Legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-85" />

                      {/* OVERLAY GRAPHIC ELEMENTS & TYPOGRAPHY */}
                      <div className="absolute inset-0 p-6 flex flex-col justify-between z-10 text-white">
                        
                        {/* Top Badge & Brand Name */}
                        <div className="flex items-start justify-between">
                          {selectedAsset.badge && (
                            <span 
                              className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest shadow-lg"
                              style={{ backgroundColor: selectedAsset.accentColor, color: '#090d16' }}
                            >
                              {selectedAsset.badge}
                            </span>
                          )}
                          <span className="font-mono text-xs font-black tracking-wider text-slate-300 backdrop-blur-md bg-black/40 px-2.5 py-1 rounded-lg border border-white/10">
                            {currentResult.input.brandName.toUpperCase()}
                          </span>
                        </div>

                        {/* Middle / Bottom Headline & CTA */}
                        <div className="flex flex-col gap-2">
                          <h2 className="text-xl md:text-2xl font-black tracking-tight drop-shadow-md text-white leading-tight uppercase">
                            {selectedAsset.headline}
                          </h2>
                          <p className="text-xs md:text-sm text-slate-200 font-medium drop-shadow-sm line-clamp-2">
                            {selectedAsset.subtext}
                          </p>
                          
                          {/* Dynamic CTA Button */}
                          <div className="mt-2 flex items-center gap-3">
                            <button
                              className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider shadow-xl transition transform active:scale-95 flex items-center gap-1.5"
                              style={{ backgroundColor: selectedAsset.accentColor, color: '#0f172a' }}
                            >
                              {selectedAsset.ctaText}
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* AI Prompt Details Footnote */}
                    <div className="w-full mt-4 bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-xs text-slate-400 flex items-start gap-2 z-10">
                      <Sparkles className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-300">Image Generation Prompt:</strong> {selectedAsset.prompt}
                      </div>
                    </div>

                  </div>

                  {/* EDIT SIDEBAR CONTROLS (4 COLS) */}
                  <div className="xl:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col gap-4">
                    <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                      <Sliders className="w-4 h-4 text-indigo-400" />
                      <h3 className="font-bold text-white text-sm">Design Customizer</h3>
                    </div>

                    <div className="flex flex-col gap-3 text-xs">
                      <div>
                        <label className="text-slate-400 font-semibold mb-1 block">Headline Text</label>
                        <input
                          type="text"
                          value={selectedAsset.headline}
                          onChange={(e) => {
                            const val = e.target.value;
                            setSelectedAsset({ ...selectedAsset, headline: val });
                          }}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="text-slate-400 font-semibold mb-1 block">Subtext / Description</label>
                        <input
                          type="text"
                          value={selectedAsset.subtext}
                          onChange={(e) => {
                            const val = e.target.value;
                            setSelectedAsset({ ...selectedAsset, subtext: val });
                          }}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="text-slate-400 font-semibold mb-1 block">CTA Button Text</label>
                        <input
                          type="text"
                          value={selectedAsset.ctaText}
                          onChange={(e) => {
                            const val = e.target.value;
                            setSelectedAsset({ ...selectedAsset, ctaText: val });
                          }}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="text-slate-400 font-semibold mb-1 block">Badge Text</label>
                        <input
                          type="text"
                          value={selectedAsset.badge || ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            setSelectedAsset({ ...selectedAsset, badge: val });
                          }}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="text-slate-400 font-semibold mb-1 block">Accent Theme Color</label>
                        <div className="flex items-center gap-2">
                          {['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#ef4444', '#3b82f6'].map((color) => (
                            <button
                              key={color}
                              onClick={() => setSelectedAsset({ ...selectedAsset, accentColor: color })}
                              className={`w-6 h-6 rounded-full border-2 transition ${
                                selectedAsset.accentColor === color ? "scale-110 border-white" : "border-transparent"
                              }`}
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
                        <span className="text-slate-400 font-semibold text-[11px]">All Generated Formats in Pack:</span>
                        <div className="grid grid-cols-2 gap-1.5">
                          {currentResult.assets.map((a) => (
                            <div
                              key={a.id}
                              onClick={() => setSelectedAsset(a)}
                              className={`p-2 rounded-lg border text-[11px] cursor-pointer transition ${
                                selectedAsset.id === a.id ? "bg-indigo-950/60 border-indigo-500 text-indigo-300" : "bg-slate-950/40 border-slate-800 text-slate-400"
                              }`}
                            >
                              <div className="font-bold truncate">{a.type}</div>
                              <div className="text-[9px] text-slate-500">{a.aspectRatio}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 flex flex-col items-center justify-center text-center min-h-[500px]">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4">
              <Palette className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Studio Kreatif Canva AI Belum Aktif</h3>
            <p className="text-xs text-slate-400 max-w-sm">
              Isi parameter desain di sebelah kiri lalu klik <strong>Generate All Creative Designs</strong> untuk membuat Banner Ads, IG Feed, Cover Marketplace & Poster otomatis!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
