"use client";

import React, { useState } from "react";
import { 
  ShieldCheck, 
  Lock, 
  Smartphone, 
  Key, 
  History, 
  Monitor, 
  Globe, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  QrCode,
  Copy,
  Check,
  LogOut,
  UserCheck
} from "lucide-react";
import { EnterpriseUserSession, SecurityDevice, AuditLogEntry } from "@/types/enterprise-auth";

interface SecurityCenterViewProps {
  session: EnterpriseUserSession;
  onLogoutAllDevices: () => void;
}

export default function SecurityCenterView({ session, onLogoutAllDevices }: SecurityCenterViewProps) {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(session.twoFactorEnabled);
  const [showQrCode, setShowQrCode] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Sample Devices
  const [devices, setDevices] = useState<SecurityDevice[]>([
    {
      id: "dev-1",
      deviceName: "MacBook Pro M3 Max",
      browser: "Chrome 125.0",
      os: "macOS Sonoma",
      ipAddress: session.lastLoginIp,
      location: session.lastLoginLocation,
      lastActive: "Sedang Aktif Sekarang",
      isCurrent: true
    },
    {
      id: "dev-2",
      deviceName: "iPhone 15 Pro",
      browser: "Safari Mobile",
      os: "iOS 17.5",
      ipAddress: "114.122.45.18",
      location: "Bandung, Indonesia",
      lastActive: "2 jam yang lalu",
      isCurrent: false
    }
  ]);

  // Audit Logs & Security Events
  const [auditLogs] = useState<AuditLogEntry[]>([
    {
      id: "log-1",
      eventType: "LOGIN_SUCCESS",
      description: "Login berhasil via Google SSO",
      ipAddress: session.lastLoginIp,
      timestamp: "Hari ini 06:05"
    },
    {
      id: "log-2",
      eventType: "MFA_ENABLED",
      description: "Google Authenticator 2FA diaktifkan",
      ipAddress: session.lastLoginIp,
      timestamp: "Kemarin 14:20"
    },
    {
      id: "log-3",
      eventType: "LOGIN_FAILED",
      description: "Gagal login: Percobaan kata sandi salah (1x)",
      ipAddress: "202.158.40.12",
      timestamp: "3 hari yang lalu"
    }
  ]);

  const backupCodes = [
    "A8B9-C1D2", "E3F4-G5H6", "I7J8-K9L0", "M1N2-O3P4", "Q5R6-S7T8"
  ];

  const handleCopyBackupCodes = () => {
    navigator.clipboard.writeText(backupCodes.join("\n"));
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(null as any), 2000);
  };

  const handleRevokeDevice = (deviceId: string) => {
    setDevices(prev => prev.filter(d => d.id !== deviceId));
  };

  return (
    <div className="space-y-8">
      {/* HEADER BANNER */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-white">Security Center & Audit Log</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold font-mono">
                OWASP SECURED
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Kelola keamanan akun, 2-Factor Authentication (2FA), sesi perangkat aktif, dan histori audit log.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-400">Status Akun:</span>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-extrabold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            SECURE & PROTECTED
          </span>
        </div>
      </div>

      {/* TWO-FACTOR AUTHENTICATION & DEVICE MANAGEMENT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 2FA SETUP CARD */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-white text-base">Two-Factor Authentication (2FA)</h3>
            </div>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
              twoFactorEnabled ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
            }`}>
              {twoFactorEnabled ? 'AKTIF' : 'NON-AKTIF'}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Lindungi akun Bosque AI Anda dari akses ilegal dengan Google Authenticator atau aplikasi TOTP lainnya.
          </p>

          {!twoFactorEnabled ? (
            <div className="space-y-4">
              <button
                onClick={() => { setTwoFactorEnabled(true); setShowQrCode(true); }}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition flex items-center justify-center gap-2"
              >
                <QrCode className="w-4 h-4" /> AKTIFKAN GOOGLE AUTHENTICATOR (2FA)
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="font-bold">Google Authenticator App:</span>
                  <span className="text-emerald-400 font-mono">CONNECTED</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Setiap kali login, Anda akan diminta memasukkan kode 6-digit dari aplikasi Google Authenticator.
                </div>
              </div>

              {/* BACKUP CODES */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Key className="w-4 h-4 text-amber-400" /> Kode Cadangan Emergency (Backup Codes)
                  </span>
                  <button
                    onClick={handleCopyBackupCodes}
                    className="text-amber-400 hover:underline flex items-center gap-1 text-[11px] font-bold"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedCode ? 'Disalin!' : 'Salin Kode'}
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2 font-mono text-xs text-amber-300 bg-slate-900 p-2.5 rounded-lg text-center">
                  {backupCodes.map((code, idx) => (
                    <span key={idx}>{code}</span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setTwoFactorEnabled(false)}
                className="text-xs text-red-400 hover:underline font-semibold"
              >
                Non-aktifkan 2FA
              </button>
            </div>
          )}
        </div>

        {/* DEVICE MANAGEMENT */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Monitor className="w-5 h-5 text-cyan-400" />
              <h3 className="font-bold text-white text-base">Kelola Perangkat Active Sessions</h3>
            </div>
            <button
              onClick={onLogoutAllDevices}
              className="text-xs font-bold text-red-400 hover:underline flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout All Devices
            </button>
          </div>

          <div className="space-y-3">
            {devices.map((d) => (
              <div key={d.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-900 text-slate-300">
                    <Monitor className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white flex items-center gap-2">
                      {d.deviceName}
                      {d.isCurrent && (
                        <span className="px-2 py-0.2 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-mono font-bold">
                          Perangkat Ini
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {d.browser} • {d.os} • IP: {d.ipAddress} ({d.location})
                    </div>
                  </div>
                </div>

                {!d.isCurrent && (
                  <button
                    onClick={() => handleRevokeDevice(d.id)}
                    className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-800 text-[11px] font-bold transition"
                  >
                    Revoke
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* AUDIT LOG TABLE */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <History className="w-5 h-5 text-purple-400" />
          <h3 className="font-bold text-white text-base">Security Audit Log & History</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-3">Event Type</th>
                <th className="p-3">Deskripsi Aktivitas</th>
                <th className="p-3">IP Address</th>
                <th className="p-3">Waktu Log</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-3 font-bold">
                    <span className={`px-2 py-0.5 rounded text-[10px] ${
                      log.eventType === 'LOGIN_SUCCESS' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                      log.eventType === 'MFA_ENABLED' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30' :
                      'bg-red-500/10 text-red-400 border border-red-500/30'
                    }`}>
                      {log.eventType}
                    </span>
                  </td>
                  <td className="p-3 text-slate-200 font-sans">{log.description}</td>
                  <td className="p-3 text-slate-400">{log.ipAddress}</td>
                  <td className="p-3 text-slate-400">{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
