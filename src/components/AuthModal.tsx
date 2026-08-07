"use client";

import React, { useState } from "react";
import { 
  Bot, 
  Crown, 
  Mail, 
  Lock, 
  Phone, 
  KeyRound, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Shield, 
  Globe, 
  MessageSquare,
  AlertCircle
} from "lucide-react";

export interface UserSession {
  name: string;
  email: string;
  loginMethod: 'EMAIL' | 'GOOGLE' | 'WHATSAPP_OTP' | 'TELEGRAM_PASS';
  role: string;
  avatarUrl?: string;
}

interface AuthModalProps {
  onLoginSuccess: (session: UserSession) => void;
}

export default function AuthModal({ onLoginSuccess }: AuthModalProps) {
  const [activeOption, setActiveOption] = useState<'EMAIL' | 'GOOGLE' | 'WHATSAPP' | 'TELEGRAM'>('EMAIL');
  
  // Email Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [name, setName] = useState("");

  // WhatsApp State
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  // Telegram State
  const [telegramUsername, setTelegramUsername] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // 1. Email & Password Login / Register
  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    if (!email || !password) {
      setErrorMessage("Harap masukkan email dan kata sandi!");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name: isRegisterMode ? (name || "Bos E-Commerce") : "Bos Executive",
        email: email,
        loginMethod: 'EMAIL',
        role: "Business Owner / CEO",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
      });
    }, 1200);
  };

  // 2. Google OAuth SSO Login
  const handleGoogleAuth = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name: "Bos Premium Google User",
        email: "owner.bosque@gmail.com",
        loginMethod: 'GOOGLE',
        role: "Business Owner / CEO",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
      });
    }, 1500);
  };

  // 3. WhatsApp OTP Auth
  const handleSendWaOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    if (!phoneNumber) {
      setErrorMessage("Harap masukkan nomor WhatsApp aktif!");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
    }, 1000);
  };

  const handleVerifyWaOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode || otpCode.length < 4) {
      setErrorMessage("Kode OTP harus 4-6 digit!");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name: `Bos WA (${phoneNumber.slice(-4)})`,
        email: `wa_${phoneNumber}@bosque-ai.id`,
        loginMethod: 'WHATSAPP_OTP',
        role: "Business Owner / CEO",
        avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
      });
    }, 1200);
  };

  // 4. Telegram Auth Pass
  const handleTelegramAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!telegramUsername) {
      setErrorMessage("Masukkan username Telegram Anda!");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name: `@${telegramUsername.replace('@', '')}`,
        email: `tg_${telegramUsername.replace('@', '')}@bosque-ai.id`,
        loginMethod: 'TELEGRAM_PASS',
        role: "Business Owner / CEO",
        avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
      });
    }, 1200);
  };

  // Demo Fast Bypass
  const handleDemoBypass = () => {
    onLoginSuccess({
      name: "Bosque Chief Executive",
      email: "ceo@bosque.ai",
      loginMethod: 'EMAIL',
      role: "System Administrator & CEO",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-2xl flex items-center justify-center p-4 selection:bg-amber-500 selection:text-slate-950 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-amber-500/10 my-auto">
        
        {/* TOP BRAND HEADER */}
        <div className="flex flex-col items-center text-center space-y-3 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-pink-500 to-emerald-500 flex items-center justify-center text-white font-extrabold text-2xl shadow-xl shadow-amber-500/30">
            B
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-[11px] font-bold mb-1">
              <Crown className="w-3.5 h-3.5" /> AI BUSINESS OPERATING SYSTEM
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Masuk ke Bosque AI OS
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-sm">
              «"Lu Jadi Bos. 5 Karyawan AI Lu Yang Kerja 24 Jam."»
            </p>
          </div>
        </div>

        {/* LOGIN METHOD SWITCHER TABS */}
        <div className="grid grid-cols-4 gap-1.5 bg-slate-950 border border-slate-800 p-1.5 rounded-2xl mb-6 text-xs font-bold">
          <button
            onClick={() => { setActiveOption('EMAIL'); setErrorMessage(""); }}
            className={`py-2 px-2 rounded-xl transition flex flex-col sm:flex-row items-center justify-center gap-1 ${
              activeOption === 'EMAIL' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </button>
          
          <button
            onClick={() => { setActiveOption('GOOGLE'); setErrorMessage(""); }}
            className={`py-2 px-2 rounded-xl transition flex flex-col sm:flex-row items-center justify-center gap-1 ${
              activeOption === 'GOOGLE' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Google</span>
          </button>

          <button
            onClick={() => { setActiveOption('WHATSAPP'); setErrorMessage(""); }}
            className={`py-2 px-2 rounded-xl transition flex flex-col sm:flex-row items-center justify-center gap-1 ${
              activeOption === 'WHATSAPP' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={() => { setActiveOption('TELEGRAM'); setErrorMessage(""); }}
            className={`py-2 px-2 rounded-xl transition flex flex-col sm:flex-row items-center justify-center gap-1 ${
              activeOption === 'TELEGRAM' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Telegram</span>
          </button>
        </div>

        {/* ERROR MESSAGE BANNER */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* 1. EMAIL & PASSWORD OPTION */}
        {activeOption === 'EMAIL' && (
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {isRegisterMode && (
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">Nama Lengkap Bos</label>
                <input
                  type="text"
                  placeholder="Contoh: Budi Santoso"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500"
                />
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 block">Email Bisnis</label>
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
              <label className="text-xs font-semibold text-slate-300 mb-1 block">Kata Sandi</label>
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <Sparkles className="w-4 h-4 animate-spin text-slate-950" />
              ) : (
                <>
                  {isRegisterMode ? "DAFTAR AKUN BOS BARU" : "MASUK SEBAGAI BOS (CEO)"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => { setIsRegisterMode(!isRegisterMode); setErrorMessage(""); }}
                className="text-xs text-slate-400 hover:text-amber-300 font-semibold"
              >
                {isRegisterMode ? "Sudah punya akun? Masuk di sini" : "Belum punya akun? Daftar sebagai Bos Baru"}
              </button>
            </div>
          </form>
        )}

        {/* 2. GOOGLE SSO OPTION */}
        {activeOption === 'GOOGLE' && (
          <div className="space-y-5 text-center py-2">
            <p className="text-xs text-slate-300 leading-relaxed">
              Login instant 1-klik menggunakan akun Google / Google Workspace perusahaan Anda tanpa perlu kata sandi tambahan.
            </p>

            <button
              onClick={handleGoogleAuth}
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs shadow-lg transition flex items-center justify-center gap-3 disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              {isLoading ? "Menghubungkan Akun Google..." : "LANJUTKAN DENGAN GOOGLE SSO"}
            </button>
          </div>
        )}

        {/* 3. WHATSAPP OTP OPTION */}
        {activeOption === 'WHATSAPP' && (
          <div>
            {!otpSent ? (
              <form onSubmit={handleSendWaOtp} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">Nomor WhatsApp Aktif (Indonesia +62)</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="081234567890 atau 628123456789"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
                      required
                    />
                    <Phone className="w-4 h-4 text-emerald-400 absolute left-3.5 top-3" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? <Sparkles className="w-4 h-4 animate-spin" /> : "KIRIM KODE OTP WHATSAPP"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyWaOtp} className="space-y-4">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300">
                  Kode OTP 4-digit telah dikirim ke WhatsApp <strong>{phoneNumber}</strong>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">Masukkan Kode OTP</label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="1234"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-center font-mono text-base font-bold text-emerald-400 tracking-widest focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? <Sparkles className="w-4 h-4 animate-spin" /> : "VERIFIKASI & MASUK DASHBOARD"}
                </button>
              </form>
            )}
          </div>
        )}

        {/* 4. TELEGRAM PASS OPTION */}
        {activeOption === 'TELEGRAM' && (
          <form onSubmit={handleTelegramAuth} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 block">Username Telegram Anda</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="@bosecommerce"
                  value={telegramUsername}
                  onChange={(e) => setTelegramUsername(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                  required
                />
                <MessageSquare className="w-4 h-4 text-cyan-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? <Sparkles className="w-4 h-4 animate-spin" /> : "AUTHENTICATE VIA TELEGRAM BOT"}
            </button>
          </form>
        )}

        {/* FOOTER DEMO BYPASS */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
            <Shield className="w-3.5 h-3.5" /> 256-Bit Encrypted & Supabase Auth Protected
          </div>

          <button
            type="button"
            onClick={handleDemoBypass}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-[11px] transition border border-slate-700 flex items-center gap-1"
          >
            <KeyRound className="w-3 h-3" /> DEMO QUICK BYPASS (DEVELOPER)
          </button>
        </div>

      </div>
    </div>
  );
}
