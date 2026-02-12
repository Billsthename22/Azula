"use client"

import { useState, useEffect } from "react"
import { 
  ShieldAlert, Sword, Skull, Eye, Info, Target, Zap, 
  ChevronLeft, Beaker, Crosshair, MessageSquare, 
  Dna, Flame, Wind, Activity, Lock
} from "lucide-react"
import Link from "next/link"

export default function BestiaryTerminal() {
  const [selectedMonster, setSelectedMonster] = useState(0)
  const [mounted] = useState(true)

  const monsters = [
    {
      name: "The Chimera",
      class: "High-Titan // Therian",
      threat: "Extreme",
      power: 72,
      intel: 65,
      stats: 60,
      description: "A fire-breathing hybrid. Its presence warps the local atmosphere, causing thermal anomalies and bronze degradation.",
      weaknesses: ["Celestial Bronze", "Liquid Nitrogen", "Serpent's Blood"],
      loot: ["Mythic Essence", "Lion's Mane Pelt", "Bellows of Fire"],
      reports: 147
    },
    {
      name: "Medusa",
      class: "Gorgon // Level 9",
      threat: "Lethal",
      power: 65,
      intel: 98,
      stats: 40,
      description: "Visual contact results in immediate petrification. Advanced thermal imaging required for engagement.",
      weaknesses: ["Polished Aegis", "Mirrored Lens", "Stone Dust"],
      loot: ["Serpent's Head", "Petrified Eye", "Gorgon Scales"],
      reports: 89
    }
  ]

  const m = monsters[selectedMonster];

  if (!mounted) return <div className="min-h-screen bg-[#050505]" />

  return (
    <div className="min-h-screen bg-[#020202] text-[#E5E7EB] font-sans p-4 lg:p-8 selection:bg-amber-500 selection:text-black">
      
      {/* --- TOP HUD NAV --- */}
      <header className="max-w-[1600px] mx-auto flex justify-between items-center mb-8 border-b border-white/5 pb-6">
        <Link href="/" className="flex items-center gap-2 group">
           <ChevronLeft className="w-4 h-4 text-amber-500 group-hover:-translate-x-1 transition-transform" />
           <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Back to Temple</span>
        </Link>
        <div className="flex gap-8 items-center">
            <div className="text-right">
                <p className="text-[8px] font-black text-amber-600 uppercase tracking-widest">System Status</p>
                <p className="text-[10px] font-bold uppercase">Encrypted // Azula_V3</p>
            </div>
            <div className="w-10 h-10 bg-amber-600 rounded flex items-center justify-center font-black italic text-xl">A</div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto grid grid-cols-12 gap-6">
        
        {/* --- LEFT COLUMN: DATA & STATS --- */}
        <section className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8">
            <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">The Archive</p>
            <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-4">{m.name}</h1>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-6">{m.class}</p>
            
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 mb-8">
                <ShieldAlert className="text-amber-600 w-5 h-5" />
                <span className="text-xs font-black uppercase tracking-widest">Threat Level: <span className="text-amber-500">{m.threat}</span></span>
            </div>

            <div className="space-y-6">
                {[
                    { label: "Power", val: m.power },
                    { label: "Intelligence", val: m.intel },
                    { label: "Stability", val: m.stats }
                ].map((s) => (
                    <div key={s.label}>
                        <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                            <span className="text-gray-500">{s.label}</span>
                            <span>{s.val} / 100</span>
                        </div>
                        <div className="h-1 w-full bg-white/5 rounded-full">
                            <div className="h-full bg-amber-600 transition-all duration-1000" style={{ width: `${s.val}%` }} />
                        </div>
                    </div>
                ))}
            </div>
          </div>

          <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 grid grid-cols-2 gap-4">
             <div className="p-4 border border-white/5 rounded-xl text-center group hover:border-amber-500/50 transition-colors">
                <Wind className="w-5 h-5 mx-auto mb-2 text-gray-600 group-hover:text-amber-500" />
                <p className="text-[8px] font-black uppercase text-gray-500">Speed</p>
                <p className="text-xs font-bold uppercase italic">Mach 0.8</p>
             </div>
             <div className="p-4 border border-white/5 rounded-xl text-center group hover:border-amber-500/50 transition-colors">
                <Target className="w-5 h-5 mx-auto mb-2 text-gray-600 group-hover:text-amber-500" />
                <p className="text-[8px] font-black uppercase text-gray-500">Origin</p>
                <p className="text-xs font-bold uppercase italic">{m.name.split(' ')[1] || 'Unknown'}</p>
             </div>
          </div>
        </section>

        {/* --- CENTER COLUMN: VISUALIZER & GRID --- */}
        <section className="col-span-12 lg:col-span-4 space-y-6">
          <div className="aspect-square bg-[#0F0F0F] border-2 border-amber-600/20 rounded-[2.5rem] relative flex items-center justify-center overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-t from-amber-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="w-48 h-48 border border-white/10 rounded-3xl flex items-center justify-center relative">
                <div className="absolute inset-0 border-t-2 border-amber-500 w-1/4 animate-spin-slow rounded-full opacity-20" />
                <Skull className="w-20 h-20 text-gray-800 group-hover:text-white transition-colors duration-500" />
             </div>
             <div className="absolute bottom-8 text-[8px] font-black tracking-[0.5em] text-gray-600">SCANNING_PROTOCOL_ACTIVE</div>
          </div>

          <div className="grid grid-cols-3 gap-3">
             {[Eye, Info, Zap, Dna, ShieldAlert, Beaker, Sword, Target, ScrollText].map((Icon, i) => (
               <div key={i} className="aspect-square bg-white/5 border border-white/5 rounded-xl flex items-center justify-center hover:bg-amber-600 hover:text-black transition-all cursor-pointer">
                  <Icon className="w-5 h-5" />
               </div>
             ))}
          </div>
        </section>

        {/* --- RIGHT COLUMN: LOOT & REPORTS --- */}
        <section className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 mb-6">Weakness Exploitation</h3>
            <div className="space-y-4">
              {m.weaknesses.map((w, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl group hover:border-amber-500/30 transition-all">
                  <div className="flex items-center gap-3">
                    <Crosshair className="w-4 h-4 text-gray-600 group-hover:text-red-500" />
                    <span className="text-xs font-bold uppercase italic">{w}</span>
                  </div>
                  <span className="text-[10px] font-black text-gray-600">EFF: 9{i}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 mb-6">Mythic Loot</h3>
            <div className="space-y-4">
               {m.loot.map((l, i) => (
                 <div key={i} className="flex items-center gap-4 text-xs font-bold uppercase italic">
                    <div className="w-2 h-2 bg-amber-600 rounded-full" />
                    <span>{l}</span>
                 </div>
               ))}
            </div>
          </div>

          <div className="bg-amber-600 rounded-2xl p-6 text-black flex justify-between items-center group cursor-pointer hover:bg-white transition-all">
             <div>
                <p className="text-[8px] font-black uppercase">Sighting Reports</p>
                <p className="text-2xl font-black italic">{m.reports}</p>
             </div>
             <MessageSquare className="w-8 h-8 opacity-20 group-hover:opacity-100 transition-opacity" />
          </div>
        </section>

      </main>

      {/* --- FOOTER DECORATION --- */}
      <footer className="mt-12 text-center py-8 border-t border-white/5">
         <p className="text-[8px] font-black text-gray-700 uppercase tracking-[1.5em]">Azula Terminal // Authorization Tier 04</p>
      </footer>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  )
}

// Minimal placeholder for the icon that was missing in standard lucide
function ScrollText(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 12h-5"/><path d="M15 8h-5"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"/></svg>
  )
}