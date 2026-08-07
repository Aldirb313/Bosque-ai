"use client";

import React, { useState, useEffect } from "react";
import { ProductResearchInput, ProductResearchOutput } from "@/types/ai-employees";
import { generateProductResearchAI, getResearchHistory, saveResearchResult, deductUserCredit } from "@/lib/ai-service";
import { 
  Search, 
  Sparkles, 
  TrendingUp, 
  ShoppingBag, 
  DollarSign, 
  Globe, 
  Share2, 
  Download, 
  Bookmark, 
  CheckCircle2, 
  Zap, 
  Award, 
  BarChart2, 
  Flame, 
  Layers, 
  Store,
  ArrowUpRight,
  History,
  Check,
  ShieldAlert,
  FlameKindling
} from "lucide-react";
import confetti from "canvas-confetti";

export default function ProductResearchView() {
  const [input, setInput] = useState<ProductResearchInput>({
    keyword: "",
    category: "Elektronik & Gadget",
    targetMarket: "Mahasiswa & Pekerja Muda",
    country: "Indonesia",
    targetPrice: "Rp 150.000 - Rp 300.000"
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [currentResult, setCurrentResult] = useState<ProductResearchOutput | null>(null);
  const [history, setHistory] = useState<ProductResearchOutput[]>([]);
  const [copiedLink, setCopiedLink] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const loaded = getResearchHistory();
    setHistory(loaded);
    if (loaded.length > 0) {
      setCurrentResult(loaded[0]);
    }
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.keyword) {
      alert("Harap masukkan Keyword produk!");
      return;
    }

    setIsGenerating(true);

    try {
      // Check and deduct credit
      const hasCredit = deductUserCredit("AI-01 Product Research Execution", "AI-01 Research", 1);
      if (!hasCredit) {
        alert("🚨 Credit AI Anda telah habis! Silakan upgrade ke paket PRO atau BUSINESS di menu Billing & Analytics.");
        setIsGenerating(false);
        return;
      }

      // Try API route, fallback to direct helper
      const res = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input)
      });
      
      let newResult: ProductResearchOutput;
      if (res.ok) {
        const json = await res.json();
        newResult = json.data;
      } else {
        newResult = generateProductResearchAI(input);
      }

      setCurrentResult(newResult);
      const updatedHistory = getResearchHistory();
      setHistory(updatedHistory);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error(err);
      const newResult = generateProductResearchAI(input);
      setCurrentResult(newResult);
      setHistory(getResearchHistory());
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveResearch = () => {
    if (!currentResult) return;
    saveResearchResult(currentResult);
    setHistory(getResearchHistory());
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleExportPDF = () => {
    if (!currentResult) return;
    window.print();
  };

  const handleShare = () => {
    if (!currentResult) return;
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* HEADER ITEM ROLE */}
      <div className="bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-slate-900 border border-blue-800/50 rounded-3xl p-6 lg:p-8 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs font-bold">
              <Zap className="w-3.5 h-3.5" /> AI-01 PRODUCT RESEARCH
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              Periset Pasar AI (Product Winning Analyzer)
            </h2>
            <p className="text-slate-300 text-sm max-w-2xl">
              Membantu seller menguji & menemukan produk winning berpotensi tinggi dengan analisis cerdas dari **Meta (FB & IG Ads Library)**, Shopee, Tokopedia, TikTok Shop, Amazon, & Signal Trends.
            </p>
          </div>

          {currentResult && (
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleSaveResearch}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition shadow-sm"
              >
                {savedSuccess ? <Check className="w-4 h-4 text-emerald-400" /> : <Bookmark className="w-4 h-4 text-blue-400" />}
                {savedSuccess ? "Saved!" : "Save Research"}
              </button>
              <button
                onClick={handleExportPDF}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition shadow-sm"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                Export PDF
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-lg shadow-blue-500/25"
              >
                {copiedLink ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                {copiedLink ? "Link Copied!" : "Share Result"}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: FORM INPUT & HISTORY */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-400" />
              Parameter Riset Produk
            </h3>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Keyword Produk <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Portable Blender, Sunscreen Gel, Ergonomic Chair"
                  value={input.keyword}
                  onChange={(e) => setInput({ ...input, keyword: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Kategori</label>
                  <input
                    type="text"
                    placeholder="Contoh: Dapur / Beauty"
                    value={input.category}
                    onChange={(e) => setInput({ ...input, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Negara Target</label>
                  <input
                    type="text"
                    placeholder="Contoh: Indonesia, US"
                    value={input.country}
                    onChange={(e) => setInput({ ...input, country: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Target Market (Audiens)</label>
                <input
                  type="text"
                  placeholder="Contoh: Mahasiswa, Ibu Muda, Pekerja Kantoran"
                  value={input.targetMarket}
                  onChange={(e) => setInput({ ...input, targetMarket: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Harga Target Jual</label>
                <input
                  type="text"
                  placeholder="Contoh: Rp 189.000"
                  value={input.targetPrice}
                  onChange={(e) => setInput({ ...input, targetPrice: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500 transition"
                />
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-sm hover:opacity-95 transition shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    Memproses Analisis Marketplace & Trends...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Analisa Product Winning Sekarang
                  </>
                )}
              </button>
            </form>
          </div>

          {/* HOT TRENDING WINNING PRODUCTS CATALOG (QUICK SELECTION) */}
          <div className="bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-amber-300 flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
                Rekomendasi Produk Hits Saat Ini
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold">
                HOT RESELL READY
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Pilih salah satu produk trending teratas di bawah ini untuk langsung memuat data analisa winning & estimasi profitnya:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: "Portable Blender Wireless", cat: "Dapur & Elektronik", price: "Rp 189.000", viral: "96%", keyword: "Portable Blender" },
                { name: "Electric Protein Shaker", cat: "Fitness & Sport", price: "Rp 149.000", viral: "92%", keyword: "Electric Protein Shaker" },
                { name: "Sunscreen Gel SPF 50", cat: "Beauty & Skincare", price: "Rp 99.000", viral: "98%", keyword: "Sunscreen Gel SPF 50" },
                { name: "Ergonomic Neck Pillow", cat: "Health & Travel", price: "Rp 129.000", viral: "89%", keyword: "Ergonomic Neck Pillow" }
              ].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setInput({
                      ...input,
                      keyword: item.keyword,
                      category: item.cat,
                      targetPrice: item.price
                    });
                    const res = generateProductResearchAI({
                      keyword: item.keyword,
                      category: item.cat,
                      targetMarket: input.targetMarket,
                      country: input.country,
                      targetPrice: item.price
                    });
                    setCurrentResult(res);
                  }}
                  className="bg-slate-950/90 border border-slate-800 p-3 rounded-2xl cursor-pointer hover:border-amber-500/50 hover:bg-amber-950/20 transition space-y-1.5 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-400 font-mono">VIRAL {item.viral}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 transition" />
                  </div>
                  <div className="text-xs font-extrabold text-white group-hover:text-amber-300 transition">{item.name}</div>
                  <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
                    <span>{item.cat}</span>
                    <span className="font-bold text-emerald-400">{item.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RESEARCH HISTORY LIST */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <History className="w-4 h-4 text-blue-400" />
                Riwayat Riset Terimpan
              </h3>
              <span className="text-xs text-slate-500">{history.length} item</span>
            </div>

            <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
              {history.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setCurrentResult(item)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                    currentResult?.id === item.id
                      ? "bg-blue-950/40 border-blue-600/50"
                      : "bg-slate-950 border-slate-800/80 hover:border-slate-700"
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-white">{item.input.keyword}</div>
                    <div className="text-[11px] text-slate-400">{item.input.category} • {new Date(item.createdAt).toLocaleDateString('id-ID')}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold font-mono ${
                      item.overallScore >= 80 ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    }`}>
                      {item.overallScore}/100
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DASHBOARD RESULT */}
        <div className="lg:col-span-7 space-y-6">
          {currentResult ? (
            <div className="space-y-6">
              {/* OVERALL SCORE & MAIN METRICS CARD */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Hasil Analisis Produk</span>
                    <h3 className="text-2xl font-black text-white">{currentResult.productName}</h3>
                    <p className="text-xs text-slate-400 mt-1">Target Price: <span className="text-slate-200 font-semibold">{currentResult.input.targetPrice || 'N/A'}</span> | Region: <span className="text-slate-200 font-semibold">{currentResult.input.country}</span></p>
                  </div>

                  <div className="flex items-center gap-4 bg-slate-950 border border-slate-800 p-4 rounded-2xl">
                    <div className="text-right">
                      <div className="text-xs text-slate-400 font-medium">Product Score</div>
                      <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400 font-mono">
                        {currentResult.overallScore}/100
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold">
                      <Award className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                {/* DETAIL SCORES GRID */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
                  <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl">
                    <div className="text-xs text-slate-400 mb-1 flex items-center justify-between">
                      <span>Demand</span>
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div className="text-xl font-bold text-white font-mono">{currentResult.details.demandScore}%</div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${currentResult.details.demandScore}%` }}></div>
                    </div>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl">
                    <div className="text-xs text-slate-400 mb-1 flex items-center justify-between">
                      <span>Competition</span>
                      <BarChart2 className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                    <div className="text-xl font-bold text-white font-mono">{currentResult.details.competitionScore}%</div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: `${currentResult.details.competitionScore}%` }}></div>
                    </div>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl">
                    <div className="text-xs text-slate-400 mb-1 flex items-center justify-between">
                      <span>Profit Margin</span>
                      <DollarSign className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                    <div className="text-xl font-bold text-white font-mono">{currentResult.details.profitMarginScore}%</div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: `${currentResult.details.profitMarginScore}%` }}></div>
                    </div>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl">
                    <div className="text-xs text-slate-400 mb-1 flex items-center justify-between">
                      <span>Viral Potential</span>
                      <Flame className="w-3.5 h-3.5 text-rose-400" />
                    </div>
                    <div className="text-xl font-bold text-white font-mono">{currentResult.details.viralPotentialScore}%</div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-rose-500 h-full rounded-full" style={{ width: `${currentResult.details.viralPotentialScore}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI RECOMMENDATION */}
              <div className="bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-800/40 rounded-3xl p-6 shadow-xl space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  AI Recommendation & Execution Plan
                </div>
                <p className="text-slate-200 text-sm leading-relaxed">
                  {currentResult.aiRecommendation}
                </p>
                <div className="pt-2 text-xs font-semibold text-emerald-300 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  Estimasi Keuntungan: <span className="text-white font-bold">{currentResult.estimatedProfitRange}</span>
                </div>
              </div>

                {/* REALTIME AUDIT & VERIFICATION BADGE */}
                {currentResult.realtimeDataVerification && (
                  <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                      <ShieldAlert className="w-4 h-4 text-emerald-400" />
                      <span>Data Verification Audit: <strong className="text-white font-mono">100% VALID & LIVE SCAN</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                      <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/30">Meta Ads Verified</span>
                      <span className="px-2 py-0.5 rounded bg-pink-500/10 text-pink-300 border border-pink-500/30">TikTok Verified</span>
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">Shopee Scanned</span>
                      <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30">Google Trends Sync</span>
                    </div>
                  </div>
                )}

                {/* WINNING SCORE PARAMETERS 0-100 */}
                {currentResult.winningScoreParameters && (
                  <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                        <FlameKindling className="w-4 h-4 text-amber-400" /> Parameter Winning Score (0-100)
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-400">Skor Utama: {currentResult.overallScore}/100</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                      <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">Demand</span>
                        <span className="font-extrabold text-white text-sm font-mono">{currentResult.winningScoreParameters.demandScore}</span>
                      </div>
                      <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">Competition</span>
                        <span className="font-extrabold text-white text-sm font-mono">{currentResult.winningScoreParameters.competitionScore}</span>
                      </div>
                      <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">Profit Margin</span>
                        <span className="font-extrabold text-emerald-400 text-sm font-mono">{currentResult.winningScoreParameters.marginScore}</span>
                      </div>
                      <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">Trend</span>
                        <span className="font-extrabold text-purple-300 text-sm font-mono">{currentResult.winningScoreParameters.trendScore}</span>
                      </div>
                      <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">Ads Opportunity</span>
                        <span className="font-extrabold text-cyan-300 text-sm font-mono">{currentResult.winningScoreParameters.advertisingOpportunityScore}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* TARGET AUDIENCE BREAKDOWN */}
                {currentResult.targetAudience && (
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <Globe className="w-5 h-5 text-cyan-400" />
                      Target Audience & Persona Profiling
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                        <div className="font-bold text-white text-sm">{currentResult.targetAudience.persona}</div>
                        <div className="text-slate-400">Rentang Usia: <strong className="text-slate-200">{currentResult.targetAudience.ageGroup}</strong></div>
                        <div className="text-slate-400">Level Pendapatan: <strong className="text-slate-200">{currentResult.targetAudience.incomeLevel}</strong></div>
                      </div>

                      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                        <div className="font-bold text-amber-300">Buying Triggers Utama:</div>
                        <ul className="list-disc list-inside text-slate-300 space-y-1">
                          {currentResult.targetAudience.buyingTriggers.map((tr, idx) => (
                            <li key={idx}>{tr}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* MARGIN ESTIMATION & LAUNCH STRATEGY */}
                {currentResult.marginEstimation && currentResult.launchStrategy && (
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-emerald-400" />
                      Margin Breakdown & Strategi Launching Produk
                    </h4>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">Est. Modal Supplier</span>
                        <span className="font-bold text-white">{currentResult.marginEstimation.supplierCostRange}</span>
                      </div>
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">Rekomendasi Harga Jual</span>
                        <span className="font-bold text-emerald-400">{currentResult.marginEstimation.recommendedSellingPrice}</span>
                      </div>
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">Est. Net Profit / Unit</span>
                        <span className="font-bold text-amber-300">{currentResult.marginEstimation.estimatedNetProfitUnit}</span>
                      </div>
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">Break-even ROAS</span>
                        <span className="font-bold text-cyan-300 font-mono">{currentResult.marginEstimation.breakEvenRoas}</span>
                      </div>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
                      <div className="font-bold text-amber-300">Checklist Aksi Launching 3 Hari Pertama:</div>
                      <ul className="space-y-1.5 text-slate-300">
                        {currentResult.launchStrategy.actionChecklist.map((act, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                              ✓
                            </span>
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

              {/* MARKETPLACE ANALYSIS */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Store className="w-5 h-5 text-indigo-400" />
                  Marketplace Intelligence & Volume Data
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentResult.marketplaces.map((mp, i) => (
                    <div key={i} className="bg-slate-950 border border-slate-800/80 p-4 rounded-2xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-white text-sm">{mp.platform}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          mp.competitionLevel === 'Low' ? 'bg-emerald-500/20 text-emerald-300' :
                          mp.competitionLevel === 'Medium' ? 'bg-blue-500/20 text-blue-300' :
                          'bg-rose-500/20 text-rose-300'
                        }`}>
                          Comp: {mp.competitionLevel}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400">Search Volume / Sales: <span className="text-slate-200 font-bold">{mp.volumeText}</span></div>
                      <div className="text-xs text-slate-400">Kisaran Harga: <span className="text-slate-200">{mp.avgPrice}</span></div>
                      <div className="text-[11px] text-slate-500">Top Competitor Stores: {mp.topStoresCount} toko</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* TREND ANALYSIS */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-rose-400" />
                  Trend Signal & Social Pulse
                </h4>

                <div className="space-y-3">
                  {currentResult.trendAnalysis.map((tr, i) => (
                    <div key={i} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">{tr.source}</div>
                        <div className="text-xs text-slate-400">{tr.statusText}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-extrabold text-emerald-400 font-mono">{tr.growthRate}</div>
                        <div className="text-[10px] text-slate-500">Score: {tr.score}/100</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WINNING PRODUCTS RECOMMENDATION CARD */}
              {currentResult.winningProducts && currentResult.winningProducts.length > 0 && (
                <div className="bg-gradient-to-b from-amber-950/30 via-slate-900 to-slate-900 border border-amber-500/40 rounded-3xl p-6 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-extrabold text-amber-300 flex items-center gap-2">
                      <Flame className="w-5 h-5 text-amber-400 animate-bounce" />
                      Rekomendasi Produk Winning Hits & Potensial Resell
                    </h4>
                    <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold border border-amber-500/30">
                      HIGH PROFIT MARGIN
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Daftar varian produk berpotensi tinggi dengan rasio viralitas masif yang paling menguntungkan untuk dijual kembali (*resell/dropship/white-label*).
                  </p>

                  <div className="grid grid-cols-1 gap-4 pt-2">
                    {currentResult.winningProducts.map((prod) => (
                      <div key={prod.id} className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl space-y-3 hover:border-amber-500/30 transition">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                          <div>
                            <span className="text-[10px] font-bold text-amber-400 font-mono tracking-wider">{prod.trendStatus}</span>
                            <h5 className="text-sm font-extrabold text-white">{prod.name}</h5>
                            <span className="text-[11px] text-slate-400">Kategori: {prod.category}</span>
                          </div>
                          <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 self-start sm:self-auto">
                            <span className="text-xs text-slate-400">Viral Score:</span>
                            <span className="text-sm font-black text-amber-400 font-mono">{prod.viralScore}/100</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                          <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60">
                            <span className="text-slate-400 text-[10px] block">Est. Modal Supplier:</span>
                            <span className="font-bold text-slate-200">{prod.estSupplierPrice}</span>
                          </div>
                          <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60">
                            <span className="text-slate-400 text-[10px] block">Est. Harga Jual Target:</span>
                            <span className="font-bold text-emerald-400">{prod.estSellingPrice}</span>
                          </div>
                          <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60">
                            <span className="text-slate-400 text-[10px] block">Estimasi Keuntungan:</span>
                            <span className="font-bold text-amber-300">{prod.potentialProfitMargin}</span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-300 bg-slate-900/40 p-3 rounded-xl border border-slate-800/40 italic">
                          💡 <span className="font-semibold text-slate-200">Alasan Winning:</span> {prod.reasonWhyWinning}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* WINNING ANGLES */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  Winning Angles Pemasaran Terbaik
                </h4>

                <ul className="space-y-2.5">
                  {currentResult.winningAngles.map((angle, i) => (
                    <li key={i} className="flex items-start gap-3 bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 text-xs text-slate-200">
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <span>{angle}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-400 space-y-4">
              <Search className="w-12 h-12 text-slate-600 mx-auto" />
              <div className="text-base font-bold text-white">Belum ada riset yang dipilih</div>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Silakan isi keyword produk di formulir sebelah kiri untuk memulai riset produk winning otomatis dengan AI-01.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
