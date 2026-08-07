"use client";

import React, { useState } from "react";
import { 
  Bot, 
  Crown, 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  BarChart, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  Send, 
  MessageSquare, 
  Smartphone, 
  SendHorizontal, 
  Zap, 
  Search, 
  Palette, 
  Video, 
  BarChart3, 
  BrainCircuit, 
  FileText, 
  RotateCcw,
  Check,
  X,
  Sparkles,
  ShieldCheck,
  Layers
} from "lucide-react";

interface ApprovalItem {
  id: string;
  agentCode: string;
  agentName: string;
  title: string;
  description: string;
  category: string;
  predictedMetrics: {
    roas?: number;
    estimatedRevenue?: string;
    targetAudience?: string;
    dailyBudget?: string;
  };
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'REVISION_REQUESTED';
  timestamp: string;
}

interface ActivityLog {
  id: string;
  timestamp: string;
  agentCode: string;
  agentName: string;
  action: string;
  result: string;
  badgeScore?: number;
  badgeType?: 'winning' | 'campaign' | 'copy' | 'design';
}

export default function CEOOrchestratorView() {
  const [orchestratorPrompt, setOrchestratorPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeChannelTab, setActiveChannelTab] = useState<'telegram' | 'whatsapp'>('telegram');

  // Sample State for Approvals
  const [approvals, setApprovals] = useState<ApprovalItem[]>([
    {
      id: "app-101",
      agentCode: "AI-05-ADS",
      agentName: "Media Buyer AI",
      title: "Scale Meta Ads Campaign: Portable Washing Machine",
      description: "Menaikkan budget campaign dari Rp300.000/hari menjadi Rp600.000/hari karena ROAS stabil di 4.2x selama 3 hari berturut-turut.",
      category: "BUDGET_SCALE",
      predictedMetrics: {
        roas: 4.2,
        estimatedRevenue: "Rp 45.000.000 / bulan",
        targetAudience: "Indonesian Home & Living Enthusiasts (Age 25-45)",
        dailyBudget: "Rp 600.000 / hari"
      },
      status: "PENDING",
      timestamp: "10 menit yang lalu"
    },
    {
      id: "app-102",
      agentCode: "AI-01-RESEARCH",
      agentName: "Market Research AI",
      title: "Launch Winning Product: Smart Ergonomic Seat Cushion",
      description: "Rekomendasi eksekusi launch produk baru dengan Winning Score 92/100 (Demand tinggi di TikTok Shop, Margin 68%).",
      category: "PRODUCT_LAUNCH",
      predictedMetrics: {
        roas: 3.8,
        estimatedRevenue: "Rp 85.000.000 / bulan",
        targetAudience: "Office Workers, Gamers, Remote Workers",
      },
      status: "PENDING",
      timestamp: "25 menit yang lalu"
    }
  ]);

  // Activity Logs
  const [activities, setActivities] = useState<ActivityLog[]>([
    {
      id: "act-1",
      timestamp: "10:45",
      agentCode: "AI-05-ADS",
      agentName: "Media Buyer AI",
      action: "Melakukan Auto-Kill ad set #3 (ROAS < 1.2 dalam 24 jam)",
      result: "Menghemat budget Rp150.000/hari",
    },
    {
      id: "act-2",
      timestamp: "10:30",
      agentCode: "AI-01-RESEARCH",
      agentName: "Market Research AI",
      action: "Menemukan Winning Product Baru: Smart Ergonomic Seat Cushion",
      result: "Winning Score 92/100",
      badgeScore: 92,
      badgeType: "winning"
    },
    {
      id: "act-3",
      timestamp: "10:15",
      agentCode: "AI-02-COPYWRITER",
      agentName: "Sales Copy AI",
      action: "Membuat 10 Variasi Hook Iklan & Script Landing Page",
      result: "10 Hook Angle Emosional & Problem Solving",
      badgeType: "copy"
    },
    {
      id: "act-4",
      timestamp: "09:50",
      agentCode: "AI-03-DESIGNER",
      agentName: "Creative Studio AI",
      action: "Generate 5 Banner Feed IG & Creative Brief Carousel",
      result: "5 Visual Design 1080x1080 Ready",
      badgeType: "design"
    }
  ]);

  // Chat message simulation for AI CEO Orchestrator
  const [ceoMessages, setCeoMessages] = useState([
    {
      sender: "AI_CEO",
      text: "Selamat pagi Bos! Seluruh 5 Karyawan AI Anda berjalan optimal 24/7. Hari ini omset mencapai Rp18.450.000 dengan ROAS 3.85x. Saya butuh persetujuan Anda untuk 2 aksi scaling campaign dan launch produk baru.",
      timestamp: "10:00"
    }
  ]);

  const handleApprove = (id: string) => {
    setApprovals(prev => prev.map(item => item.id === id ? { ...item, status: 'APPROVED' } : item));
    const approvedItem = approvals.find(a => a.id === id);
    if (approvedItem) {
      setActivities(prev => [{
        id: `act-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        agentCode: approvedItem.agentCode,
        agentName: approvedItem.agentName,
        action: `DISETUJUI BOS: ${approvedItem.title}`,
        result: "Eksekusi otomatis sedang berjalan oleh Action Engine"
      }, ...prev]);
    }
  };

  const handleReject = (id: string) => {
    const reason = prompt("Masukkan alasan penolakan / instruksi revisi untuk AI:");
    if (reason !== null) {
      setApprovals(prev => prev.map(item => item.id === id ? { ...item, status: 'REJECTED' } : item));
      const item = approvals.find(a => a.id === id);
      if (item) {
        setActivities(prev => [{
          id: `act-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          agentCode: item.agentCode,
          agentName: item.agentName,
          action: `DITOLAK BOS: ${item.title}`,
          result: `Alasan/Revisi: "${reason}" - AI sedang memperbaikinya.`
        }, ...prev]);
      }
    }
  };

  const handleSendCeoCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orchestratorPrompt.trim()) return;

    const userMsg = orchestratorPrompt;
    setCeoMessages(prev => [...prev, { sender: "USER", text: userMsg, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setOrchestratorPrompt("");
    setIsProcessing(true);

    setTimeout(() => {
      setCeoMessages(prev => [...prev, {
        sender: "AI_CEO",
        text: `Siap Bos! Perintah "${userMsg}" telah saya instruksikan ke 5 Karyawan AI terkait (AI Research, AI Copywriter, AI Designer, AI Video, & AI Ads). Hasil dan draft tindakan akan segera saya laporkan di sini & notifikasi WhatsApp/Telegram.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsProcessing(false);
    }, 1200);
  };

  return (
    <div className="space-y-8">
      {/* CEO BANNER STATEMENT */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-600/20 via-purple-600/20 to-emerald-600/20 border border-amber-500/30 p-6 lg:p-8 backdrop-blur-xl">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Crown className="w-64 h-64 text-amber-300" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Crown className="w-3.5 h-3.5" /> AI Business Operating System
            </div>
            <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
              «"Lu Jadi Bos. 5 Karyawan AI Lu Yang Kerja."»
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Anda memegang kendali keputusan strategis. Seluruh riset produk, penulisan copy, pembuatan desain banner, produksi video short, hingga scaling Meta Ads dikerjakan 24 jam oleh AI Agents.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/30">
              <Bot className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-400">AI Orchestrator (CEO)</div>
              <div className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                ACTIVE 24/7
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">5 Sub-Agents Coordinated</div>
            </div>
          </div>
        </div>
      </div>

      {/* EXECUTIVE BUSINESS OVERVIEW METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Revenue Hari Ini</span>
            <DollarSign className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">Rp 18.450.000</div>
          <div className="flex items-center gap-1 text-xs text-emerald-400 font-semibold mt-2">
            <TrendingUp className="w-3.5 h-3.5" /> +24.5% vs kemarin
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Net Profit</span>
            <BarChart className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white">Rp 7.820.000</div>
          <div className="text-xs text-slate-400 font-medium mt-2">Margin Bersih ~42.3%</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Average Meta ROAS</span>
            <Zap className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-cyan-300">3.85x</div>
          <div className="text-xs text-emerald-400 font-medium mt-2">Meta Ads AI Auto-Optimizing</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Orders</span>
            <ShoppingBag className="w-5 h-5 text-pink-400" />
          </div>
          <div className="text-2xl font-black text-white">142 Orders</div>
          <div className="text-xs text-slate-400 font-medium mt-2">Conversion Rate: 3.8%</div>
        </div>
      </div>

      {/* STATUS 5 AI EMPLOYEES */}
      <div className="space-y-4">
        <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-amber-400" />
          Status 5 Karyawan AI Anda
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-blue-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-bold">AI-01</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <div className="font-bold text-white text-sm">Market Research</div>
              <p className="text-[11px] text-slate-400 mt-1">Menganalisa Shopee & Meta Ads Library</p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] font-semibold text-emerald-400">
              ONLINE - 92/100 Winning Found
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">AI-02</span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
              </div>
              <div className="font-bold text-white text-sm">Sales Copywriter</div>
              <p className="text-[11px] text-slate-400 mt-1">Membuat 10 Hook & Headline Ads</p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] font-semibold text-amber-300">
              WORKING - Draft Ready
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-purple-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold">AI-03</span>
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
              </div>
              <div className="font-bold text-white text-sm">Creative Studio</div>
              <p className="text-[11px] text-slate-400 mt-1">Desain Feed IG & Creative Brief</p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] font-semibold text-purple-300">
              READY - Standby
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-pink-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 text-[10px] font-bold">AI-04</span>
                <span className="w-2.5 h-2.5 rounded-full bg-pink-400"></span>
              </div>
              <div className="font-bold text-white text-sm">Video Production</div>
              <p className="text-[11px] text-slate-400 mt-1">Script & AI Voiceover 9:16 Video</p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] font-semibold text-pink-300">
              READY - Standby
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">AI-05</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <div className="font-bold text-white text-sm">Media Buyer AI</div>
              <p className="text-[11px] text-slate-400 mt-1">Scaling Budget & Auto-Kill Rules</p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] font-semibold text-emerald-400">
              OPTIMIZING - Auto Rules
            </div>
          </div>
        </div>
      </div>

      {/* MAIN TWO-COLUMN SECTION: APPROVAL SYSTEM & TIMELINE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT 2 COLS: AI APPROVAL SYSTEM (TINDAKAN PENTING) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              AI Approval Inbox (Persetujuan Bos)
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold">
                {approvals.filter(a => a.status === 'PENDING').length} Menunggu Action
              </span>
            </h3>
          </div>

          <div className="space-y-4">
            {approvals.map((item) => (
              <div 
                key={item.id}
                className={`p-6 rounded-2xl border transition ${
                  item.status === 'PENDING'
                    ? 'bg-slate-900/90 border-amber-500/40 shadow-lg shadow-amber-500/5'
                    : item.status === 'APPROVED'
                    ? 'bg-slate-900/50 border-emerald-500/30 opacity-80'
                    : 'bg-slate-900/50 border-red-500/30 opacity-70'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300 font-bold text-xs">
                      {item.agentCode}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-400">{item.agentName}</div>
                      <h4 className="text-base font-extrabold text-white">{item.title}</h4>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5" /> {item.timestamp}
                  </span>
                </div>

                <p className="text-xs text-slate-300 mt-3 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  {item.description}
                </p>

                {/* PREDICTED METRICS */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
                  {item.predictedMetrics.roas && (
                    <div className="px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
                      <span className="text-slate-400 block text-[10px]">Prediksi ROAS</span>
                      <span className="font-extrabold text-emerald-300">{item.predictedMetrics.roas}x</span>
                    </div>
                  )}
                  {item.predictedMetrics.estimatedRevenue && (
                    <div className="px-3 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs">
                      <span className="text-slate-400 block text-[10px]">Estimasi Revenue</span>
                      <span className="font-extrabold text-cyan-300">{item.predictedMetrics.estimatedRevenue}</span>
                    </div>
                  )}
                  {item.predictedMetrics.dailyBudget && (
                    <div className="px-3 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs">
                      <span className="text-slate-400 block text-[10px]">Budget Baru</span>
                      <span className="font-extrabold text-purple-300">{item.predictedMetrics.dailyBudget}</span>
                    </div>
                  )}
                </div>

                {/* APPROVAL ACTION BUTTONS */}
                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">
                    Status: {item.status === 'PENDING' ? (
                      <span className="text-amber-400 font-bold">MENUNGGU ACTION BOS</span>
                    ) : item.status === 'APPROVED' ? (
                      <span className="text-emerald-400 font-bold">✓ TELAH DISETUJUI</span>
                    ) : (
                      <span className="text-red-400 font-bold">✕ DITOLAK / DINOVISI</span>
                    )}
                  </span>

                  {item.status === 'PENDING' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleReject(item.id)}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-red-500/20 border border-slate-700 hover:border-red-500/40 text-xs font-bold text-slate-300 hover:text-red-400 transition flex items-center gap-1.5"
                      >
                        <X className="w-4 h-4" /> Reject / Revisi
                      </button>
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 text-xs font-black shadow-lg shadow-emerald-500/20 hover:brightness-110 transition flex items-center gap-1.5"
                      >
                        <Check className="w-4 h-4" /> APPROVE ACTION
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* AI CEO CHAT COMMAND INTERACTION */}
          <div className="mt-8 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-extrabold text-white flex items-center gap-2">
              <Bot className="w-5 h-5 text-amber-400" />
              Perintahkan AI CEO (Orchestrator Box)
            </h4>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {ceoMessages.map((msg, idx) => (
                <div 
                  key={idx}
                  className={`p-3 rounded-2xl text-xs max-w-xl ${
                    msg.sender === 'USER' 
                      ? 'bg-amber-500/20 border border-amber-500/30 text-amber-100 ml-auto' 
                      : 'bg-slate-950 border border-slate-800 text-slate-200'
                  }`}
                >
                  <div className="font-bold text-[10px] text-slate-400 mb-1 flex items-center justify-between">
                    <span>{msg.sender === 'USER' ? 'Anda (Bos)' : 'AI CEO Orchestrator'}</span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendCeoCommand} className="flex gap-2">
              <input
                type="text"
                value={orchestratorPrompt}
                onChange={(e) => setOrchestratorPrompt(e.target.value)}
                placeholder="Berikan instruksi ke AI CEO (contoh: 'Cari 3 winning product fashion wanita lalu buatkan ads-nya')..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                disabled={isProcessing}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition flex items-center gap-1.5 disabled:opacity-50"
              >
                <Send className="w-4 h-4" /> Instruct
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT 1 COL: WHATSAPP/TELEGRAM BOT INTEGRATION SIMULATOR & ACTIVITY TIMELINE */}
        <div className="space-y-6">
          
          {/* WHATSAPP & TELEGRAM BOT NOTIFICATION SIMULATOR */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                Mobile Bot Integration
              </h4>
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setActiveChannelTab('telegram')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                    activeChannelTab === 'telegram' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'
                  }`}
                >
                  Telegram
                </button>
                <button
                  onClick={() => setActiveChannelTab('whatsapp')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                    activeChannelTab === 'whatsapp' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400'
                  }`}
                >
                  WhatsApp
                </button>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed space-y-2">
              <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider border-b border-slate-800 pb-2">
                Format Message {activeChannelTab === 'telegram' ? 'Telegram Bot' : 'WhatsApp Business API'}:
              </div>
              <p>Selamat pagi Bos. ☕</p>
              <p>Berikut laporan ringkas bisnis hari ini:</p>
              <p className="text-emerald-400">Revenue: Rp 18.450.000<br/>ROAS: 3.85x</p>
              <p className="text-cyan-300">Rekomendasi AI CEO:<br/>- Scale Campaign Portable Washer (+30%)<br/>- Launch Smart Cushion</p>
              <p className="text-slate-400 text-[11px] mt-2">Ketik "APPROVE ALL" atau klik tombol di bawah untuk eksekusi.</p>
            </div>

            <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
              <span>Status Bot API: <strong className="text-emerald-400">CONNECTED</strong></span>
              <button className="text-amber-400 hover:underline text-[11px] font-bold">Config Keys →</button>
            </div>
          </div>

          {/* ACTIVITY TIMELINE LOGS */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-400" />
              Real-time Activity Log
            </h4>

            <div className="space-y-3 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-800">
              {activities.map((act) => (
                <div key={act.id} className="relative pl-7 text-xs space-y-1">
                  <div className="absolute left-2 top-1.5 w-3 h-3 rounded-full bg-amber-500 border-2 border-slate-900"></div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-bold text-amber-300">{act.agentName}</span>
                    <span className="font-mono">{act.timestamp}</span>
                  </div>
                  <div className="text-slate-200 font-semibold">{act.action}</div>
                  <div className="text-slate-400 text-[11px]">{act.result}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
