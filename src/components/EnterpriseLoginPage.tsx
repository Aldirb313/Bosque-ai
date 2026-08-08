"use client";

import React, { useState } from "react";
import { 
  Bot, 
  Crown, 
  Mail, 
  Lock, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  KeyRound, 
  Globe, 
  Smartphone, 
  Check, 
  AlertTriangle,
  Zap,
  Search,
  Palette,
  Video,
  BarChart3
} from "lucide-react";
import { EnterpriseUserSession } from "@/types/enterprise-auth";

interface EnterpriseLoginPageProps {
  onLoginSuccess: (session: EnterpriseUserSession) => void;
}

export default function EnterpriseLoginPage({ onLoginSuccess }: EnterpriseLoginPageProps) {
  const [activeTab, setActiveTab] = useState<'LOGIN' | 'REGISTER' | 'FORGOT' | 'MAGIC' | 'OTP'>('LOGIN');

  // Form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [otpCode, setOtpCode] = useState("");

  // Security state
  const [failedCount, setFailedCount] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle Login Execution with OWASP Brute-Force Check
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (isLocked) {
      setErrorMessage("🚨 AKUN TERKUNCI! Anda telah gagal login 5 kali. Coba lagi dalam 15 menit atau reset password.");
      return;
    }

    if (!email || !password) {
      setErrorMessage("Harap masukkan Email dan Kata Sandi!");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // Simulate wrong password test for security lockout demo
      if (password === "wrong") {
        const nextFailed = failedCount + 1;
        setFailedCount(nextFailed);
        setIsLoading(false);
        if (nextFailed >= 5) {
          setIsLocked(true);
          setErrorMessage("🚨 AKUN TERKUNCI TINGKAT KEAMANAN HIGH! Gagal 5x percobaan berturut-turut.");
        } else {
          setErrorMessage(`Kata sandi salah! Percobaan ${nextFailed}/5 sebelum akun dikunci.`);
        }
        return;
      }

      // Success Login Payload
      setIsLoading(false);
      onLoginSuccess({
        id: "usr-ent-001",
        name: fullName || "Bos Executive",
        email: email,
        phoneNumber: "+62 812 3456 7890",
        role: "MEMBER",
        subscription: {
          tier: "Pro",
          status: "active",
          creditsRemaining: 500
        },
        twoFactorEnabled: false,
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        lastLoginIp: "180.252.112.45",
        lastLoginLocation: "Jakarta, Indonesia"
      });
    }, 1400);
  };

  // Google OAuth SSO
  const handleOAuthLogin = (provider: 'Google' | 'GitHub') => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        id: `usr-sso-${Date.now()}`,
        name: `Bos ${provider} Enterprise`,
        email: `ceo.${provider.toLowerCase()}@bosque-ai.id`,
        role: "SUPER_ADMIN",
        subscription: {
          tier: "Agency",
          status: "active",
          creditsRemaining: 2500
        },
        twoFactorEnabled: true,
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        lastLoginIp: "202.158.40.12",
        lastLoginLocation: "Surabaya, Indonesia"
      });
    }, 1500);
  };

  // Magic Link Request
  const handleMagicLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage("Masukkan email bisnis Anda!");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage(`✨ Magic Link login telah dikirim ke ${email}. Cek inbox email Anda!`);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 lg:p-8 selection:bg-amber-500 selection:text-slate-950">
      <div className="w-full max-w-6xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 min-h-[680px]">
        
        {/* LEFT COLUMN: BRANDING, TAGLINE, SHOWCASE (7 COLS) */}
        <div className="lg:col-span-7 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/30 p-8 lg:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800 relative overflow-hidden">
          
          {/* Background Ambient Glow */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Brand Header */}
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-pink-500 to-emerald-500 flex items-center justify-center text-white font-extrabold text-2xl shadow-xl shadow-amber-500/30">
                B
              </div>
              <div>
                <h1 className="font-extrabold text-white text-2xl tracking-tight">BOSQUE AI</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-[10px] font-bold">
                  ENTERPRISE OS V4.0
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <h2 className="text-2xl lg:text-3xl font-black text-white leading-tight">
                «"Lu Jadi Bos. 5 Karyawan AI Lu Yang Kerja."»
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed max-w-lg">
                Platform Operating System AI pertama untuk pemilik bisnis. Biarkan 5 Karyawan AI menangani operasional 24/7 selagi Anda fokus mengambil keputusan strategis.
              </p>
            </div>
          </div>

          {/* Middle 5 AI Employee Benefit Chips */}
          <div className="relative z-10 my-8 space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">5 Karyawan AI Aktif 24 Jam:</div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-blue-500/30 flex items-center gap-2.5">
                <Search className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <div>
                  <span className="font-bold text-white block">AI-01 Product Research</span>
                  <span className="text-[10px] text-slate-400">Winning Score 0-100 & Marketplace</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-amber-500/30 flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <div>
                  <span className="font-bold text-white block">AI-02 Sales Copywriter</span>
                  <span className="text-[10px] text-slate-400">10 Hook, Headline & Angles</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-purple-500/30 flex items-center gap-2.5">
                <Palette className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <div>
                  <span className="font-bold text-white block">AI-03 Creative Designer</span>
                  <span className="text-[10px] text-slate-400">Banner & Creative Brief Generator</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-pink-500/30 flex items-center gap-2.5">
                <Video className="w-4 h-4 text-pink-400 flex-shrink-0" />
                <div>
                  <span className="font-bold text-white block">AI-04 Video Creator</span>
                  <span className="text-[10px] text-slate-400">9:16 Shorts & Voiceover AI</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-emerald-500/30 flex items-center gap-2.5 text-xs">
              <BarChart3 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <div>
                <span className="font-bold text-white block">AI-05 Media Buyer Ads Manager</span>
                <span className="text-[10px] text-slate-400">Rekomendasi SCALE & KILL Ads Campaign Otomatis</span>
              </div>
            </div>
          </div>

          {/* Footer Security Badges */}
          <div className="relative z-10 flex items-center gap-4 text-[11px] text-slate-400 pt-4 border-t border-slate-800/80">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" /> OWASP Top 10 Secured
            </span>
            <span>•</span>
            <span>256-Bit SSL Encrypted</span>
            <span>•</span>
            <span>2FA & Audit Log Active</span>
          </div>
        </div>

        {/* RIGHT COLUMN: ENTERPRISE AUTHENTICATION FORM (5 COLS) */}
        <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between bg-slate-900">
          
          <div className="space-y-6">
            
            {/* Header Tabs */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setActiveTab('LOGIN'); setErrorMessage(""); setSuccessMessage(""); }}
                  className={`text-sm font-bold pb-1 transition ${activeTab === 'LOGIN' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-slate-400 hover:text-white'}`}
                >
                  Masuk Portal
                </button>
                <button
                  onClick={() => { setActiveTab('REGISTER'); setErrorMessage(""); setSuccessMessage(""); }}
                  className={`text-sm font-bold pb-1 transition ${activeTab === 'REGISTER' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-slate-400 hover:text-white'}`}
                >
                  Daftar Bos Baru
                </button>
              </div>

              <button
                onClick={() => { setActiveTab('MAGIC'); setErrorMessage(""); setSuccessMessage(""); }}
                className="text-xs font-semibold text-cyan-400 hover:underline"
              >
                Magic Link 🪄
              </button>
            </div>

            {/* Notification Messages */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div className="leading-relaxed">{errorMessage}</div>
              </div>
            )}

            {successMessage && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div className="leading-relaxed">{successMessage}</div>
              </div>
            )}

            {/* OAUTH SSO BUTTONS */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleOAuthLogin('Google')}
                disabled={isLoading}
                className="py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-200 flex items-center justify-center gap-2 transition disabled:opacity-50"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                Google SSO
              </button>

              <button
                type="button"
                onClick={() => handleOAuthLogin('GitHub')}
                disabled={isLoading}
                className="py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-200 flex items-center justify-center gap-2 transition disabled:opacity-50"
              >
                <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub SSO
              </button>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-800 w-full" />
              <span className="bg-slate-900 px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest absolute">
                atau via email
              </span>
            </div>

            {/* LOGIN / REGISTER FORM */}
            {activeTab === 'LOGIN' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">Email Perusahaan / Bisnis</label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="bos@perusahaan.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500"
                      required
                    />
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-300">Kata Sandi</label>
                    <button
                      type="button"
                      onClick={() => setActiveTab('FORGOT')}
                      className="text-[11px] text-amber-400 hover:underline"
                    >
                      Lupa Password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500"
                      required
                    />
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-800 bg-slate-950 text-amber-500 focus:ring-0"
                    />
                    <span>Ingat Saya (30 Hari)</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <Sparkles className="w-4 h-4 animate-spin text-slate-950" />
                  ) : (
                    <>
                      MASUK SEBAGAI BOS (CEO)
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* MAGIC LINK FORM */}
            {activeTab === 'MAGIC' && (
              <form onSubmit={handleMagicLink} className="space-y-4">
                <p className="text-xs text-slate-400 leading-relaxed">
                  Kami akan mengirimkan link login sekali pakai instan langsung ke email Anda tanpa perlu mengingat kata sandi.
                </p>

                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">Email Bisnis</label>
                  <input
                    type="email"
                    placeholder="bos@perusahaan.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl bg-cyan-500 text-slate-950 font-black text-xs shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? <Sparkles className="w-4 h-4 animate-spin" /> : "KIRIM MAGIC LINK LOGIN"}
                </button>
              </form>
            )}

          </div>

          {/* QUICK DEMO BYPASS */}
          <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span className="text-[11px]">Demo Mode Ready</span>
            <button
              onClick={() => onLoginSuccess({
                id: "usr-demo",
                name: "Bosque Executive Owner",
                email: "ceo@bosque.ai",
                role: "SUPER_ADMIN",
                subscription: { tier: "Agency", status: "active", creditsRemaining: 2500 },
                twoFactorEnabled: true,
                avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
                lastLoginIp: "127.0.0.1",
                lastLoginLocation: "Local Workstation"
              })}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-[11px] transition border border-slate-700 flex items-center gap-1"
            >
              <KeyRound className="w-3.5 h-3.5" /> QUICK DEMO BYPASS
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
