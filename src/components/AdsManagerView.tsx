"use client";

import React, { useState, useEffect } from "react";
import { 
  AdsManagerInput, 
  AdsManagerOutput, 
  CampaignDashboardItem 
} from "@/types/ai-employees";
import { 
  generateAdsAI, 
  getAdsHistory 
} from "@/lib/ai-service";
import { 
  BarChart3, 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  Target, 
  DollarSign, 
  Layers, 
  Play, 
  Pause, 
  Activity, 
  History, 
  Zap, 
  CheckCircle, 
  XCircle, 
  ArrowUpRight, 
  ArrowDownRight,
  SlidersHorizontal,
  PieChart
} from "lucide-react";
import confetti from "canvas-confetti";

export default function AdsManagerView() {
  const [input, setInput] = useState<AdsManagerInput>({
    product: "",
    budget: "",
    targetCustomer: ""
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [currentResult, setCurrentResult] = useState<AdsManagerOutput | null>(null);
  const [history, setHistory] = useState<AdsManagerOutput[]>([]);
  const [filterStatus, setFilterStatus] = useState<'All' | 'Active' | 'Learning' | 'Scale' | 'Stop'>('All');

  useEffect(() => {
    const loaded = getAdsHistory();
    setHistory(loaded);
    if (loaded.length > 0) {
      setCurrentResult(loaded[0]);
    }
  }, []);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.product || !input.budget) {
      alert("Harap isi Nama Produk dan Budget!");
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      const res = generateAdsAI(input);
      setCurrentResult(res);
      setHistory(getAdsHistory());
      setIsGenerating(false);
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    }, 1600);
  };

  const filteredCampaigns = currentResult?.campaigns.filter((c) => {
    if (filterStatus === 'All') return true;
    return c.status === filterStatus;
  }) || [];

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* LEFT FORM PANEL */}
      <div className="w-full lg:w-96 flex-shrink-0 flex flex-col gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center gap-3 mb-4 border-b border-slate-800 pb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/20">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-white text-lg">AI-05 Ads Manager</h2>
              <p className="text-xs text-slate-400">Media Buyer AI & Campaign Optimizer</p>
            </div>
          </div>

          <form onSubmit={handleGenerate} className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                Produk / Kampanye <span className="text-emerald-400">*</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: GlowSkin Vitamin C Serum"
                value={input.product}
                onChange={(e) => setInput({ ...input, product: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                Total Budget Iklan <span className="text-emerald-400">*</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: Rp 10.000.000 / Bulan"
                value={input.budget}
                onChange={(e) => setInput({ ...input, budget: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 block">Target Customer Audience</label>
              <textarea
                placeholder="Contoh: Wanita 22-35 thn, Pembeli online aktif di Jabodetabek"
                value={input.targetCustomer}
                onChange={(e) => setInput({ ...input, targetCustomer: e.target.value })}
                rows={2}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="mt-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 hover:brightness-110 active:scale-[0.99] transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-slate-950" />
                  Analyzing Media Buyer Strategy...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  Generate Campaign Strategy
                </>
              )}
            </button>
          </form>
        </div>

        {/* HISTORY PANEL */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <History className="w-3.5 h-3.5" /> History Media Buyer Audit ({history.length})
          </h3>
          <div className="flex flex-col gap-2 max-h-52 overflow-y-auto pr-1">
            {history.map((h) => (
              <button
                key={h.id}
                onClick={() => setCurrentResult(h)}
                className={`text-left p-2.5 rounded-xl border text-xs transition flex flex-col gap-1 ${
                  currentResult?.id === h.id
                    ? "bg-slate-800 border-emerald-500/50 text-white"
                    : "bg-slate-950/40 border-slate-800/80 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div className="font-semibold text-slate-200 line-clamp-1">{h.input.product}</div>
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>{h.input.budget}</span>
                  <span>{h.campaigns.length} Campaigns</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT MEDIA BUYER DASHBOARD WORKSPACE */}
      <div className="flex-1 flex flex-col gap-5 min-w-0">
        {currentResult ? (
          <div className="flex flex-col gap-6">
            
            {/* OVERALL METRICS CARDS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col gap-1 shadow-lg">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Ad Spent</span>
                <span className="text-xl font-black text-white">{currentResult.overallStats.totalSpent}</span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                  <ArrowUpRight className="w-3 h-3" /> Budget Allocated
                </span>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col gap-1 shadow-lg">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Conversions</span>
                <span className="text-xl font-black text-white">{currentResult.overallStats.totalConversions} Order</span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                  <TrendingUp className="w-3 h-3" /> Sales Generated
                </span>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col gap-1 shadow-lg">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Average ROAS</span>
                <span className="text-xl font-black text-emerald-400">{currentResult.overallStats.avgRoas}x</span>
                <span className="text-[10px] text-slate-400 font-mono">Target &gt; 3.5x ROAS</span>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col gap-1 shadow-lg">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Blended CPA</span>
                <span className="text-xl font-black text-cyan-400">{currentResult.overallStats.blendedCpa}</span>
                <span className="text-[10px] text-slate-400 font-mono">Cost per Acquisition</span>
              </div>
            </div>

            {/* AI STRATEGY RECOMMENDATIONS (AUDIENCE, SCALING, KILL ADS) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Target Audience */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 border-b border-slate-800 pb-2">
                  <Target className="w-4 h-4" /> Target Audience Setup
                </div>
                <div className="text-xs text-slate-300 space-y-1.5">
                  <div><strong className="text-slate-400">Umur:</strong> {currentResult.recommendation.audience.ageRange}</div>
                  <div><strong className="text-slate-400">Gender:</strong> {currentResult.recommendation.audience.gender}</div>
                  <div><strong className="text-slate-400">Interests:</strong> {currentResult.recommendation.audience.interests.join(", ")}</div>
                </div>
              </div>

              {/* Scaling Strategy */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 border-b border-slate-800 pb-2">
                  <TrendingUp className="w-4 h-4" /> Scaling Strategy
                </div>
                <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                  {currentResult.recommendation.scalingStrategy.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>

              {/* Kill Ads Recommendation */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs font-bold text-red-400 border-b border-slate-800 pb-2">
                  <AlertTriangle className="w-4 h-4" /> Kill Ads Rules
                </div>
                <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                  {currentResult.recommendation.killAdsRecommendation.map((k, idx) => (
                    <li key={idx}>{k}</li>
                  ))}
                </ul>
              </div>

            </div>

            {/* CAMPAIGN MANAGEMENT TABLE DASHBOARD */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="font-bold text-white text-base">Campaign Performance Dashboard</h3>
                  <p className="text-xs text-slate-400">Pantau dan kelola performa iklan real-time dengan rekomendasi AI Instant Insight.</p>
                </div>

                {/* STATUS FILTER TABS */}
                <div className="flex items-center bg-slate-950 border border-slate-800 p-1 rounded-xl">
                  {(['All', 'Active', 'Learning', 'Scale', 'Stop'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setFilterStatus(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                        filterStatus === st
                          ? "bg-slate-800 text-emerald-400 border border-slate-700"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* TABLE LIST */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="p-3">Status</th>
                      <th className="p-3">Nama Campaign</th>
                      <th className="p-3">Daily Budget</th>
                      <th className="p-3">Total Spent</th>
                      <th className="p-3">Conversions</th>
                      <th className="p-3">CPA</th>
                      <th className="p-3">ROAS</th>
                      <th className="p-3">CTR</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredCampaigns.map((c) => (
                      <React.Fragment key={c.id}>
                        <tr className="hover:bg-slate-800/40 transition">
                          <td className="p-3">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                              c.status === 'Active' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" :
                              c.status === 'Scale' ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/30" :
                              c.status === 'Learning' ? "bg-amber-500/10 text-amber-400 border-amber-500/30" :
                              "bg-red-500/10 text-red-400 border-red-500/30"
                            }`}>
                              {c.status}
                            </span>
                          </td>
                          <td className="p-3 font-semibold text-white">{c.name}</td>
                          <td className="p-3 font-mono">{c.budgetDaily}</td>
                          <td className="p-3 font-mono">{c.spent}</td>
                          <td className="p-3 font-bold text-white">{c.conversions}</td>
                          <td className="p-3 font-mono">{c.cpa}</td>
                          <td className="p-3 font-bold text-emerald-400 font-mono">{c.roas}x</td>
                          <td className="p-3 font-mono">{c.ctr}</td>
                        </tr>

                        {/* AI INSIGHT ROW */}
                        <tr className="bg-slate-950/60">
                          <td colSpan={8} className="p-3 border-b border-slate-800/80">
                            <div className="flex items-center gap-2 text-xs">
                              <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                              <span className="font-semibold text-slate-300">AI Insight & Recomendation:</span>
                              <span className={`text-slate-300 font-medium ${c.status === 'Stop' ? 'text-red-300 font-bold' : ''}`}>
                                {c.aiInsight}
                              </span>
                            </div>
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 flex flex-col items-center justify-center text-center min-h-[500px]">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
              <BarChart3 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Media Buyer AI Ads Manager Belum Aktif</h3>
            <p className="text-xs text-slate-400 max-w-sm">
              Isi parameter produk dan budget iklan di sebelah kiri lalu klik <strong>Generate Campaign Strategy</strong> untuk menganalisis strategi media buyer & mendapatkan AI Optimization Insight!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
