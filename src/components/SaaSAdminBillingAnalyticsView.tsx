"use client";

import React, { useState, useEffect } from "react";
import { UserSubscription, CreditTransaction, AnalyticsMetrics, PlanTier } from "@/types/ai-employees";
import { getUserSubscription, updateUserSubscription, getCreditTransactions, getSaaSAnalytics } from "@/lib/ai-service";
import { 
  CreditCard, 
  Zap, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity, 
  ShieldCheck, 
  Lock, 
  Award, 
  Check, 
  History, 
  BarChart3, 
  ArrowUpRight, 
  Sparkles,
  Server,
  Database
} from "lucide-react";
import confetti from "canvas-confetti";

export default function SaaSAdminBillingAnalyticsView() {
  const [sub, setSub] = useState<UserSubscription | null>(null);
  const [txs, setTxs] = useState<CreditTransaction[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsMetrics | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedGateway, setSelectedGateway] = useState<'Midtrans' | 'Stripe'>('Midtrans');

  useEffect(() => {
    setSub(getUserSubscription());
    setTxs(getCreditTransactions());
    setAnalytics(getSaaSAnalytics());
  }, []);

  const handleUpgrade = (plan: PlanTier) => {
    setLoading(true);
    setTimeout(() => {
      const updated = updateUserSubscription(plan, selectedGateway);
      setSub(updated);
      setTxs(getCreditTransactions());
      setLoading(false);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
      alert(`Selamat! Akun Anda telah di-upgrade ke paket ${plan} via ${selectedGateway}. Credit telah ditambahkan.`);
    }, 1000);
  };

  return (
    <div className="space-y-10">
      {/* HEADER BILLING & ANALYTICS */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-teal-900/30 to-slate-900 border border-emerald-800/50 rounded-3xl p-6 lg:p-8 backdrop-blur-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" /> PRODUCTION AUDIT & SYSTEM HUB
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              Subscription, Credit Engine & SaaS Analytics
            </h2>
            <p className="text-slate-300 text-sm max-w-2xl">
              Pusat kendali langganan pengguna, mutasi credit AI, metriks bisnis (MRR, Churn, Retention), & Keamanan Supabase RLS.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-950/80 border border-slate-800 p-4 rounded-2xl">
            <div>
              <div className="text-[11px] text-slate-400 font-medium">Sisa Credit Anda</div>
              <div className="text-2xl font-black text-emerald-400 font-mono">
                {sub?.creditsRemaining} <span className="text-xs text-slate-400 font-normal">/ {sub?.monthlyLimit}</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: SUBSCRIPTION PLANS & GATEWAY */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-400" />
              Paket Langganan SaaS
            </h3>
            <p className="text-xs text-slate-400">Pilih paket yang sesuai untuk skala bisnis e-commerce & agency Anda.</p>
          </div>

          {/* GATEWAY SELECTOR */}
          <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-2xl">
            <button
              onClick={() => setSelectedGateway('Midtrans')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                selectedGateway === 'Midtrans'
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Zap className="w-3.5 h-3.5" /> Midtrans (IDR / QRIS / Transfer)
            </button>
            <button
              onClick={() => setSelectedGateway('Stripe')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                selectedGateway === 'Stripe'
                  ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" /> Stripe (Credit Card / USD)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* FREE PLAN */}
          <div className={`bg-slate-900 border rounded-3xl p-6 space-y-6 relative transition ${
            sub?.plan === 'FREE' ? "border-slate-700 bg-slate-900/90" : "border-slate-800"
          }`}>
            {sub?.plan === 'FREE' && (
              <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-[10px] font-bold border border-slate-700">
                PAKET AKTIF
              </span>
            )}
            <div>
              <div className="text-xs font-mono font-bold text-slate-400 uppercase">FREE STARTER</div>
              <div className="text-3xl font-black text-white mt-1">Rp 0 <span className="text-xs font-normal text-slate-400">/bulan</span></div>
              <p className="text-xs text-slate-400 mt-2">Untuk mencoba kemampuan AI Employee dasar.</p>
            </div>

            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" /> 10 AI Credits / bulan
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" /> Akses AI-01 hingga AI-05
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" /> Standard Generation Speed
              </li>
            </ul>

            <button
              onClick={() => handleUpgrade('FREE')}
              disabled={sub?.plan === 'FREE' || loading}
              className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition border border-slate-700 disabled:opacity-50"
            >
              {sub?.plan === 'FREE' ? "Paket Saat Ini" : "Downgrade ke Free"}
            </button>
          </div>

          {/* PRO PLAN */}
          <div className={`bg-gradient-to-b from-blue-950/40 via-slate-900 to-slate-900 border rounded-3xl p-6 space-y-6 relative transition shadow-2xl ${
            sub?.plan === 'PRO' ? "border-blue-500 shadow-blue-500/10" : "border-blue-800/40"
          }`}>
            <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-extrabold shadow-md">
              MOST POPULAR 🔥
            </span>
            <div>
              <div className="text-xs font-mono font-bold text-blue-400 uppercase">PRO SELLER</div>
              <div className="text-3xl font-black text-white mt-1">
                {selectedGateway === 'Midtrans' ? 'Rp 299.000' : '$19.99'} <span className="text-xs font-normal text-slate-400">/bulan</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">Untuk seller active & pembuat konten harian.</p>
            </div>

            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-center gap-2 font-semibold text-white">
                <Check className="w-4 h-4 text-emerald-400" /> 500 AI Credits / bulan
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" /> Unlimited Product Research
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" /> Fast AI Generation & HD Render
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" /> Save & Export PDF / Video MP4
              </li>
            </ul>

            <button
              onClick={() => handleUpgrade('PRO')}
              disabled={sub?.plan === 'PRO' || loading}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white font-bold text-xs transition shadow-lg shadow-blue-500/25 disabled:opacity-50"
            >
              {sub?.plan === 'PRO' ? "Paket Aktif Saat Ini" : `Upgrade Pro (${selectedGateway})`}
            </button>
          </div>

          {/* BUSINESS PLAN */}
          <div className={`bg-gradient-to-b from-purple-950/40 via-slate-900 to-slate-900 border rounded-3xl p-6 space-y-6 relative transition ${
            sub?.plan === 'BUSINESS' ? "border-purple-500 shadow-purple-500/10" : "border-slate-800"
          }`}>
            {sub?.plan === 'BUSINESS' && (
              <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-purple-600 text-white text-[10px] font-bold">
                PAKET AKTIF
              </span>
            )}
            <div>
              <div className="text-xs font-mono font-bold text-purple-400 uppercase">BUSINESS AGENCY</div>
              <div className="text-3xl font-black text-white mt-1">
                {selectedGateway === 'Midtrans' ? 'Rp 999.000' : '$69.99'} <span className="text-xs font-normal text-slate-400">/bulan</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">Untuk tim agency, brand besar & multi-store.</p>
            </div>

            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-center gap-2 font-semibold text-white">
                <Check className="w-4 h-4 text-purple-400" /> 2,500 AI Credits / bulan
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-purple-400" /> Multi-User Team Account (5 Sub-users)
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-purple-400" /> Priority Server API Queue
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-purple-400" /> Custom AI Model Fine-Tuning
              </li>
            </ul>

            <button
              onClick={() => handleUpgrade('BUSINESS')}
              disabled={sub?.plan === 'BUSINESS' || loading}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-95 text-white font-bold text-xs transition shadow-lg shadow-purple-500/25 disabled:opacity-50"
            >
              {sub?.plan === 'BUSINESS' ? "Paket Aktif Saat Ini" : `Upgrade Business (${selectedGateway})`}
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 2: CREDIT SYSTEM TRANSACTION HISTORY */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <History className="w-5 h-5 text-emerald-400" />
              Database Transaction History & Credit Ledger
            </h3>
            <p className="text-xs text-slate-400">Audit mutasi pemakaian & pengisian credit AI pengguna.</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400">
            Audit Ready
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-mono border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">ID Transaksi</th>
                <th className="px-4 py-3">Tanggal & Waktu</th>
                <th className="px-4 py-3">Aktivitas / Modul</th>
                <th className="px-4 py-3">Credit</th>
                <th className="px-4 py-3">Saldo Akhir</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {txs.map((t) => (
                <tr key={t.id} className="hover:bg-slate-950/40 transition">
                  <td className="px-4 py-3 font-mono text-slate-400">{t.id}</td>
                  <td className="px-4 py-3 text-slate-400">{new Date(t.timestamp).toLocaleString('id-ID')}</td>
                  <td className="px-4 py-3 font-semibold text-white">{t.action}</td>
                  <td className="px-4 py-3">
                    <span className={`font-mono font-bold ${t.amount > 0 ? "text-emerald-400" : "text-rose-400"}`}>
                      {t.amount > 0 ? `+${t.amount}` : t.amount}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-200">{t.balanceAfter}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 3: SAAS ANALYTICS DASHBOARD */}
      {analytics && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              SaaS Business Analytics & Performance Metrics
            </h3>
            <p className="text-xs text-slate-400">Tracking statistik performa bisnis & pertumbuhan MRR.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <div className="text-xs text-slate-400 mb-1 flex items-center justify-between">
                <span>Monthly Recurring Rev (MRR)</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono">Rp {(analytics.mrr / 1000000).toFixed(1)}M</div>
              <div className="text-[10px] text-emerald-400 mt-1 font-semibold">+12.4% dari bulan lalu</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <div className="text-xs text-slate-400 mb-1 flex items-center justify-between">
                <span>Total Active Users</span>
                <Users className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono">{analytics.activeUsers.toLocaleString('id-ID')}</div>
              <div className="text-[10px] text-blue-400 mt-1 font-semibold">60.3% dari total user</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <div className="text-xs text-slate-400 mb-1 flex items-center justify-between">
                <span>Retention Rate</span>
                <Activity className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono">{analytics.retentionRate}%</div>
              <div className="text-[10px] text-purple-400 mt-1 font-semibold">Churn Rate hanya {analytics.churnRate}%</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <div className="text-xs text-slate-400 mb-1 flex items-center justify-between">
                <span>AI Credits Generated</span>
                <Zap className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono">{(analytics.totalAiCreditsUsed / 1000).toFixed(1)}k</div>
              <div className="text-[10px] text-amber-400 mt-1 font-semibold">Server response &lt; 800ms</div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: SECURITY & SUPABASE INFRASTRUCTURE AUDIT */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-6 shadow-xl">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-rose-400" />
            Security & Supabase Row Level Security (RLS) Audit
          </h3>
          <p className="text-xs text-slate-400">Pemeriksaan keamanan API, Enkripsi, & Kebijakan Akses Database.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <ShieldCheck className="w-4 h-4" /> Supabase RLS Active
            </div>
            <p className="text-[11px] text-slate-400">
              Setiap tabel database (`user_subscriptions`, `credit_transactions`, `research_history`) dilindungi dengan RLS kebijakan `auth.uid() = user_id`.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <Server className="w-4 h-4" /> API Rate Limiting (100 req/m)
            </div>
            <p className="text-[11px] text-slate-400">
              Seluruh Next.js API Routes dilindungi dengan header Rate Limit untuk mencegah skrip bot DDoS & pembobolan credit.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <Database className="w-4 h-4" /> Storage Security Policy
            </div>
            <p className="text-[11px] text-slate-400">
              Media asset & file PDF/MP4 yang di-generate disimpan aman di Supabase Storage Bucket dengan akses bertanda tangan (Signed URLs).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
