"use client";

import React, { useState, useEffect } from "react";
import { 
  CopywriterInput, 
  CopywriterOutput 
} from "@/types/ai-employees";
import { 
  generateCopywriterAI, 
  getCopywriterHistory 
} from "@/lib/ai-service";
import { 
  Sparkles, 
  Copy, 
  Check, 
  History, 
  Send, 
  FileText, 
  Zap, 
  ShoppingBag, 
  Mail, 
  MessageSquare, 
  Layout, 
  ChevronRight,
  TrendingUp,
  Award
} from "lucide-react";
import confetti from "canvas-confetti";

export default function CopywriterView() {
  const [input, setInput] = useState<CopywriterInput>({
    product: "",
    targetCustomer: "",
    painPoint: "",
    price: "",
    usp: "",
    tone: "Hard Selling"
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [currentResult, setCurrentResult] = useState<CopywriterOutput | null>(null);
  const [history, setHistory] = useState<CopywriterOutput[]>([]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'hooks' | 'headlines' | 'primaryText' | 'landingPage' | 'marketplace' | 'email' | 'wa'>('hooks');

  useEffect(() => {
    const loaded = getCopywriterHistory();
    setHistory(loaded);
    if (loaded.length > 0) {
      setCurrentResult(loaded[0]);
    }
  }, []);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.product || !input.targetCustomer) {
      alert("Harap isi Nama Produk dan Target Customer!");
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      const res = generateCopywriterAI(input);
      setCurrentResult(res);
      setHistory(getCopywriterHistory());
      setIsGenerating(false);
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    }, 1500);
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const tones: Array<CopywriterInput['tone']> = [
    'Hard Selling', 'Soft Selling', 'Premium', 'Emotional', 'Viral'
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* LEFT FORM PANEL */}
      <div className="w-full lg:w-96 flex-shrink-0 flex flex-col gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center gap-3 mb-4 border-b border-slate-800 pb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-red-500 flex items-center justify-center text-white font-bold shadow-lg shadow-amber-500/20">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-white text-lg">AI-02 Copywriter</h2>
              <p className="text-xs text-slate-400">Penulis Iklan Conversional AI</p>
            </div>
          </div>

          <form onSubmit={handleGenerate} className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                Produk / Jasa <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: GlowSkin Serum Vitamin C"
                value={input.product}
                onChange={(e) => setInput({ ...input, product: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-500 transition"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                Target Customer <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: Wanita Karir usia 22-35 tahun"
                value={input.targetCustomer}
                onChange={(e) => setInput({ ...input, targetCustomer: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-500 transition"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                Pain Point Utama Customer
              </label>
              <textarea
                placeholder="Contoh: Kulit kusam, noda hitam membandel & jerawat"
                value={input.painPoint}
                onChange={(e) => setInput({ ...input, painPoint: e.target.value })}
                rows={2}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-500 transition resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">Harga Produk</label>
                <input
                  type="text"
                  placeholder="Rp 149.000"
                  value={input.price}
                  onChange={(e) => setInput({ ...input, price: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-500 transition"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">USP / Keunggulan</label>
                <input
                  type="text"
                  placeholder="Triple C 10x Mencerahkan"
                  value={input.usp}
                  onChange={(e) => setInput({ ...input, usp: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-500 transition"
                />
              </div>
            </div>

            {/* TONE SELECTOR */}
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-2 flex items-center justify-between">
                <span>Tone Selector</span>
                <span className="text-[10px] text-amber-400 font-mono">{input.tone}</span>
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {tones.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setInput({ ...input, tone: t })}
                    className={`py-1.5 px-2 rounded-lg text-xs font-medium border transition ${
                      input.tone === t
                        ? "bg-amber-500/20 border-amber-500 text-amber-300"
                        : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="mt-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white font-bold text-sm shadow-lg shadow-amber-500/25 hover:brightness-110 active:scale-[0.99] transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  Generating Copy...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate AI Copywriting
                </>
              )}
            </button>
          </form>
        </div>

        {/* HISTORY MINI PANEL */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <History className="w-3.5 h-3.5" /> History Prompt ({history.length})
          </h3>
          <div className="flex flex-col gap-2 max-h-52 overflow-y-auto pr-1">
            {history.map((h) => (
              <button
                key={h.id}
                onClick={() => setCurrentResult(h)}
                className={`text-left p-2.5 rounded-xl border text-xs transition flex flex-col gap-1 ${
                  currentResult?.id === h.id
                    ? "bg-slate-800 border-amber-500/50 text-white"
                    : "bg-slate-950/40 border-slate-800/80 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div className="font-semibold text-slate-200 line-clamp-1">{h.input.product}</div>
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>{h.input.tone}</span>
                  <span>{new Date(h.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT OUTPUT PANEL */}
      <div className="flex-1 flex flex-col gap-5 min-w-0">
        {currentResult ? (
          <>
            {/* OUTPUT TABS */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 flex items-center gap-1 overflow-x-auto">
              {[
                { id: 'hooks', label: `Hooks (${currentResult.hooks.length})`, icon: TrendingUp },
                { id: 'headlines', label: `Headlines (${currentResult.headlines.length})`, icon: Award },
                { id: 'primaryText', label: 'Meta Ads Text', icon: Send },
                { id: 'landingPage', label: 'Landing Page', icon: Layout },
                { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
                { id: 'email', label: 'Email Marketing', icon: Mail },
                { id: 'wa', label: 'WhatsApp', icon: MessageSquare }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                      activeTab === tab.id
                        ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                        : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENT AREAS */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl min-h-[500px]">
              
              {/* 1. HOOKS (Min 20) */}
              {activeTab === 'hooks' && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <h3 className="font-bold text-white text-base">Hook Generator (20 Variasi)</h3>
                      <p className="text-xs text-slate-400">Gunakan di 3 detik pertama video TikTok/Reels atau baris pertama caption.</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(currentResult.hooks.join("\n\n"), "all-hooks")}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-amber-400 border border-slate-700 flex items-center gap-1.5 transition"
                    >
                      {copiedKey === "all-hooks" ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                      Salin Semua Hook
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentResult.hooks.map((hook, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-950 border border-slate-800/80 hover:border-amber-500/40 rounded-xl p-3.5 text-xs text-slate-200 flex flex-col justify-between gap-3 group transition"
                      >
                        <div className="flex gap-2">
                          <span className="w-5 h-5 rounded-md bg-amber-500/10 text-amber-400 font-mono font-bold flex items-center justify-center text-[10px] flex-shrink-0">
                            {idx + 1}
                          </span>
                          <p className="leading-relaxed font-medium">{hook}</p>
                        </div>
                        <button
                          onClick={() => copyToClipboard(hook, `hook-${idx}`)}
                          className="self-end px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-[10px] text-slate-400 group-hover:text-amber-300 flex items-center gap-1 border border-slate-800 transition"
                        >
                          {copiedKey === `hook-${idx}` ? <Check className="w-3 text-green-400" /> : <Copy className="w-3" />}
                          Salin
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. HEADLINES (Min 20) */}
              {activeTab === 'headlines' && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <h3 className="font-bold text-white text-base">Headline Generator (20 Variasi)</h3>
                      <p className="text-xs text-slate-400">Judul iklan banner, landing page, atau subjek pesan yang menggugah selera.</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(currentResult.headlines.join("\n\n"), "all-headlines")}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-amber-400 border border-slate-700 flex items-center gap-1.5 transition"
                    >
                      {copiedKey === "all-headlines" ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                      Salin Semua Headline
                    </button>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {currentResult.headlines.map((hl, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-950 border border-slate-800/80 hover:border-amber-500/40 rounded-xl p-3 text-xs text-slate-200 flex items-center justify-between gap-3 group transition"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-400 font-mono font-bold flex items-center justify-center text-xs flex-shrink-0">
                            #{idx + 1}
                          </span>
                          <span className="font-semibold text-slate-100">{hl}</span>
                        </div>
                        <button
                          onClick={() => copyToClipboard(hl, `hl-${idx}`)}
                          className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-[10px] text-slate-400 group-hover:text-amber-300 flex items-center gap-1 border border-slate-800 transition flex-shrink-0"
                        >
                          {copiedKey === `hl-${idx}` ? <Check className="w-3 text-green-400" /> : <Copy className="w-3" />}
                          Salin
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. PRIMARY TEXT META ADS */}
              {activeTab === 'primaryText' && (
                <div className="flex flex-col gap-4">
                  <h3 className="font-bold text-white text-base border-b border-slate-800 pb-3">Primary Text Meta Ads (Facebook & Instagram Ads)</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {currentResult.primaryTextMetaAds.map((text, idx) => (
                      <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col gap-3">
                        <div className="flex items-center justify-between text-xs text-slate-400 font-semibold border-b border-slate-900 pb-2">
                          <span>Variasi Meta Ad Copy #{idx + 1}</span>
                          <button
                            onClick={() => copyToClipboard(text, `meta-${idx}`)}
                            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-400 flex items-center gap-1 text-[11px] border border-slate-700"
                          >
                            {copiedKey === `meta-${idx}` ? <Check className="w-3 text-green-400" /> : <Copy className="w-3" />}
                            Salin Copy
                          </button>
                        </div>
                        <pre className="text-xs text-slate-300 font-sans whitespace-pre-wrap leading-relaxed">
                          {text}
                        </pre>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. LANDING PAGE COPY */}
              {activeTab === 'landingPage' && (
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="font-bold text-white text-base">Full Landing Page Structure Copy</h3>
                    <button
                      onClick={() => copyToClipboard(JSON.stringify(currentResult.landingPage, null, 2), "lp-json")}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-amber-400 border border-slate-700 flex items-center gap-1.5 transition"
                    >
                      {copiedKey === "lp-json" ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                      Salin Struktur (JSON)
                    </button>
                  </div>

                  <div className="flex flex-col gap-4">
                    {/* Hero */}
                    <div className="bg-slate-950 border border-amber-500/30 rounded-xl p-4 flex flex-col gap-2">
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">1. HERO SECTION</span>
                      <div className="text-xs font-semibold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded w-fit">{currentResult.landingPage.heroSection.badge}</div>
                      <h4 className="text-lg font-extrabold text-white">{currentResult.landingPage.heroSection.h1}</h4>
                      <p className="text-xs text-slate-300">{currentResult.landingPage.heroSection.subheadline}</p>
                      <button className="mt-2 w-fit px-4 py-2 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs">{currentResult.landingPage.heroSection.ctaButton}</button>
                    </div>

                    {/* Problem */}
                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col gap-2">
                      <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">2. PROBLEM SECTION</span>
                      <h4 className="text-sm font-bold text-white">{currentResult.landingPage.problem.heading}</h4>
                      <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                        {currentResult.landingPage.problem.points.map((pt, i) => (
                          <li key={i}>{pt}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Solution */}
                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col gap-2">
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">3. SOLUTION SECTION</span>
                      <h4 className="text-sm font-bold text-white">{currentResult.landingPage.solution.heading}</h4>
                      <p className="text-xs text-slate-300">{currentResult.landingPage.solution.description}</p>
                    </div>

                    {/* Benefits & Features */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col gap-2">
                        <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">4. BENEFITS</span>
                        {currentResult.landingPage.benefits.map((b, i) => (
                          <div key={i} className="text-xs border-b border-slate-900 pb-1.5 last:border-none">
                            <strong className="text-slate-200">{b.title}</strong>: <span className="text-slate-400">{b.desc}</span>
                          </div>
                        ))}
                      </div>
                      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col gap-2">
                        <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">5. FEATURES</span>
                        {currentResult.landingPage.features.map((f, i) => (
                          <div key={i} className="text-xs border-b border-slate-900 pb-1.5 last:border-none">
                            <strong className="text-slate-200">{f.title}</strong>: <span className="text-slate-400">{f.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 border border-amber-500/40 rounded-xl p-4 flex flex-col items-center text-center gap-2">
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">6. FINAL CTA SECTION</span>
                      <h4 className="text-base font-extrabold text-white">{currentResult.landingPage.cta.heading}</h4>
                      <p className="text-xs text-slate-300">{currentResult.landingPage.cta.subheading}</p>
                      <span className="text-[11px] font-bold text-red-400">{currentResult.landingPage.cta.urgencyText}</span>
                      <button className="mt-1 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold text-xs shadow-lg">
                        {currentResult.landingPage.cta.buttonText}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. MARKETPLACE DESCRIPTION */}
              {activeTab === 'marketplace' && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="font-bold text-white text-base">Deskripsi Tokopedia / Shopee / TikTok Shop</h3>
                    <button
                      onClick={() => copyToClipboard(currentResult.marketplaceDescription, "mp-desc")}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-amber-400 border border-slate-700 flex items-center gap-1.5 transition"
                    >
                      {copiedKey === "mp-desc" ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                      Salin Deskripsi Toko
                    </button>
                  </div>
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                    <pre className="text-xs text-slate-300 font-sans whitespace-pre-wrap leading-relaxed">
                      {currentResult.marketplaceDescription}
                    </pre>
                  </div>
                </div>
              )}

              {/* 6. EMAIL MARKETING */}
              {activeTab === 'email' && (
                <div className="flex flex-col gap-4">
                  <h3 className="font-bold text-white text-base border-b border-slate-800 pb-3">Email Broadcast Campaign</h3>
                  {currentResult.emailMarketing.map((mail, idx) => (
                    <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col gap-3">
                      <div className="flex items-center justify-between text-xs font-semibold text-amber-400 border-b border-slate-900 pb-2">
                        <span>Subject: {mail.subject}</span>
                        <button
                          onClick={() => copyToClipboard(`Subject: ${mail.subject}\n\n${mail.body}`, `email-${idx}`)}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-400 flex items-center gap-1 text-[11px] border border-slate-700"
                        >
                          {copiedKey === `email-${idx}` ? <Check className="w-3 text-green-400" /> : <Copy className="w-3" />}
                          Salin Email
                        </button>
                      </div>
                      <pre className="text-xs text-slate-300 font-sans whitespace-pre-wrap leading-relaxed">
                        {mail.body}
                      </pre>
                    </div>
                  ))}
                </div>
              )}

              {/* 7. WHATSAPP BROADCAST */}
              {activeTab === 'wa' && (
                <div className="flex flex-col gap-4">
                  <h3 className="font-bold text-white text-base border-b border-slate-800 pb-3">WhatsApp Broadcast Message</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentResult.whatsAppBroadcast.map((wa, idx) => (
                      <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between gap-3">
                        <pre className="text-xs text-slate-300 font-sans whitespace-pre-wrap leading-relaxed">
                          {wa}
                        </pre>
                        <button
                          onClick={() => copyToClipboard(wa, `wa-${idx}`)}
                          className="self-end px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-medium border border-emerald-500/40 flex items-center gap-1.5 transition"
                        >
                          {copiedKey === `wa-${idx}` ? <Check className="w-3.5 text-green-400" /> : <Copy className="w-3.5" />}
                          Salin Chat WA
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 flex flex-col items-center justify-center text-center min-h-[500px]">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Belum Ada Copywriting Dibuat</h3>
            <p className="text-xs text-slate-400 max-w-sm">
              Isi form produk di sebelah kiri lalu klik button <strong>Generate AI Copywriting</strong> untuk menghasilkan 20+ variasi copywriting instan!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
