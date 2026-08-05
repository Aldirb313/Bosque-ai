"use client";

import React, { useState } from "react";
import ProductResearchView from "@/components/ProductResearchView";
import CopywriterView from "@/components/CopywriterView";
import CreativeDesignerView from "@/components/CreativeDesignerView";
import VideoCreatorView from "@/components/VideoCreatorView";
import AdsManagerView from "@/components/AdsManagerView";
import SaaSAdminBillingAnalyticsView from "@/components/SaaSAdminBillingAnalyticsView";
import { 
  Search,
  Bot, 
  Zap, 
  Palette, 
  Video, 
  BarChart3, 
  Sparkles, 
  ShieldCheck, 
  CreditCard
} from "lucide-react";

export default function SaaSMainDashboard() {
  const [activeTab, setActiveTab] = useState<'research' | 'copywriter' | 'designer' | 'video' | 'ads' | 'billing'>('research');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* HEADER TOP NAV */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800 px-4 lg:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-pink-500 to-emerald-500 flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-amber-500/20">
            B
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-white text-lg tracking-tight">BOSQUE AI</h1>
              <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-emerald-500/20 border border-amber-500/30 text-amber-300 font-mono text-[10px] font-bold">
                SAAS V3.0 FULL SUITE
              </span>
            </div>
            <p className="text-xs text-slate-400">Autonomous AI Employees Platform</p>
          </div>
        </div>

        {/* AI EMPLOYEE SELECTOR SWITCHER */}
        <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-2xl shadow-inner overflow-x-auto">
          <button
            onClick={() => setActiveTab('research')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              activeTab === 'research'
                ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Search className="w-4 h-4" />
            AI-01 Research
          </button>
          <button
            onClick={() => setActiveTab('copywriter')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              activeTab === 'copywriter'
                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Zap className="w-4 h-4" />
            AI-02 Copywriter
          </button>
          <button
            onClick={() => setActiveTab('designer')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              activeTab === 'designer'
                ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md shadow-indigo-500/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Palette className="w-4 h-4" />
            AI-03 Designer
          </button>
          <button
            onClick={() => setActiveTab('video')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              activeTab === 'video'
                ? "bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white shadow-md shadow-pink-500/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Video className="w-4 h-4" />
            AI-04 Video Creator
          </button>
          <button
            onClick={() => setActiveTab('ads')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              activeTab === 'ads'
                ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 shadow-md shadow-emerald-500/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            AI-05 Ads Manager
          </button>
          <button
            onClick={() => setActiveTab('billing')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              activeTab === 'billing'
                ? "bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 text-white shadow-md shadow-emerald-500/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <CreditCard className="w-4 h-4" />
            Billing & Analytics
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Database Active
          </div>
        </div>
      </header>

      {/* SUB-HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-b border-slate-800/80 px-4 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-amber-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                {activeTab === 'research' && 'AI-01 Periset Pasar AI (Product Winning)'}
                {activeTab === 'copywriter' && 'AI-02 Penulis Iklan Conversional'}
                {activeTab === 'designer' && 'AI-03 Desainer Brand Studio Canva'}
                {activeTab === 'video' && 'AI-04 Editor Video AI Vertical 9:16'}
                {activeTab === 'ads' && 'AI-05 Media Buyer AI & Campaign Optimizer'}
                {activeTab === 'billing' && 'Subscription, Midtrans/Stripe Billing & SaaS Analytics'}
                <span className="text-slate-500">|</span>
                <span className="text-slate-400 text-xs font-normal">Karyawan AI Aktif</span>
              </h2>
              <p className="text-xs text-slate-400">
                {activeTab === 'research' && 'Analisis kelayakan produk winning Meta Ads Library (FB & IG), Shopee, Tokopedia, TikTok Shop, Amazon & Google Trends.'}
                {activeTab === 'copywriter' && 'Menghasilkan 20+ variasi Hook, Headline, Primary Text Meta Ads, Landing Page Copy, Marketplace & Email.'}
                {activeTab === 'designer' && 'Menghasilkan Banner Ads, Instagram Feed, Cover Marketplace, Poster & Logo Concept otomatis.'}
                {activeTab === 'video' && 'Membuat Script AI, Scene Gen, AI Voiceover, Subtitle Otomatis & Avatar Presenter 9:16 MP4.'}
                {activeTab === 'ads' && 'Rekomendasi Campaign, Target Audience, Scaling Strategy, Kill Ads Rules & AI Insights Dashboard.'}
                {activeTab === 'billing' && 'Kelola Paket Langganan, Pengisian Credit, Mutasi Transaksi, Metriks MRR & Supabase Security Audit.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>AI Model Engine v4.5 Ready</span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT WORKSPACE */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8">
        {activeTab === 'research' && <ProductResearchView />}
        {activeTab === 'copywriter' && <CopywriterView />}
        {activeTab === 'designer' && <CreativeDesignerView />}
        {activeTab === 'video' && <VideoCreatorView />}
        {activeTab === 'ads' && <AdsManagerView />}
        {activeTab === 'billing' && <SaaSAdminBillingAnalyticsView />}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950 px-4 lg:px-8 py-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>© 2026 BOSQUE AI SaaS Platform. Hak Cipta Dilindungi.</div>
        <div className="flex flex-wrap items-center justify-center gap-3 text-slate-400">
          <span className="hover:text-white cursor-pointer">AI-02 Copywriter</span>
          <span>•</span>
          <span className="hover:text-white cursor-pointer">AI-03 Designer</span>
          <span>•</span>
          <span className="hover:text-white cursor-pointer">AI-04 Video Creator</span>
          <span>•</span>
          <span className="hover:text-white cursor-pointer">AI-05 Ads Manager</span>
          <span>•</span>
          <span className="hover:text-white cursor-pointer">Database Status: Connected</span>
        </div>
      </footer>
    </div>
  );
}
