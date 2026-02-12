"use client"

import { useState, useEffect } from "react"
import { 
  Globe, Users, Trophy, ChevronRight, 
  ShieldAlert, Landmark, Sword, Flag,
  TrendingUp, BarChart3, Activity
} from "lucide-react"
import Link from "next/link"

export default function Strategos() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => setMounted(true), [])

  const factions = [
    { name: "Olympian Guard", god: "Zeus", control: 42, status: "Expanding", color: "bg-amber-500" },
    { name: "Abyssal Reapers", god: "Hades", control: 31, status: "Fortifying", color: "bg-purple-600" },
    { name: "Tide-Breakers", god: "Poseidon", control: 27, status: "Regrouping", color: "bg-blue-600" },
  ]

  const topHeroes = [
    { rank: 1, name: "Achilles_99", clan: "Myrmidon", score: "1.2M", avatar: "A" },
    { rank: 2, name: "TheOracle", clan: "Delphi", score: "940K", avatar: "O" },
    { rank: 3, name: "SirenSong", clan: "Atlantis", score: "882K", avatar: "S" },
  ]

  if (!mounted) return <div className="min-h-screen bg-[#050505]" />

  return (
    <div className="min-h-screen bg-[#020202] text-[#E5E7EB] font-sans selection:bg-amber-500 selection:text-black">
      
      {/* --- COMMAND HEADER --- */}
      <header className="p-8 lg:p-12 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-[#050505]">
        <div>
          <div className="flex items-center gap-3 mb-4">
             <div className="px-2 py-0.5 bg-red-600 text-[8px] font-black uppercase tracking-widest rounded animate-pulse">Live War-Room</div>
             <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">Protocol // Global_Dominance</span>
          </div>
          <h1 className="text-6xl lg:text-8xl font-black italic uppercase tracking-tighter leading-none">
            STRATE<span className="text-amber-500">GOS</span>
          </h1>
        </div>

        <div className="flex gap-4">
          <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center min-w-[120px]">
             <p className="text-[8px] font-black text-gray-500 uppercase">Total Heroes</p>
             <p className="text-2xl font-black italic">142.8K</p>
          </div>
          <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center min-w-[120px]">
             <p className="text-[8px] font-black text-gray-500 uppercase">Active Skirmishes</p>
             <p className="text-2xl font-black italic text-red-500">642</p>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto p-8 lg:p-12 grid grid-cols-12 gap-8">
        
        {/* --- LEFT: FACTION DOMINANCE (Bento Style) --- */}
        <section className="col-span-12 lg:col-span-7 space-y-8">
          <div className="bg-[#0A0A0A] border border-white/5 rounded-[3rem] p-10 relative overflow-hidden">
             <div className="flex justify-between items-center mb-12">
                <h2 className="text-2xl font-black italic uppercase flex items-center gap-3">
                   <Globe className="w-6 h-6 text-amber-500" /> Territorial Control
                </h2>
                <div className="flex items-center gap-2">
                   <span className="w-2 h-2 bg-green-500 rounded-full" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Servers Nominal</span>
                </div>
             </div>

             <div className="space-y-10">
                {factions.map((f, i) => (
                  <div key={i} className="group cursor-pointer">
                    <div className="flex justify-between items-end mb-3">
                       <div>
                          <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{f.god} Lineage</p>
                          <h3 className="text-2xl font-black uppercase italic group-hover:text-amber-500 transition-colors">{f.name}</h3>
                       </div>
                       <div className="text-right">
                          <p className="text-xs font-black italic">{f.control}%</p>
                          <p className={`text-[8px] font-black uppercase ${f.status === 'Expanding' ? 'text-green-500' : 'text-amber-600'}`}>{f.status}</p>
                       </div>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                       <div 
                        className={`h-full ${f.color} transition-all duration-1000 ease-out`} 
                        style={{ width: `${f.control}%` }} 
                       />
                    </div>
                  </div>
                ))}
             </div>

             <div className="mt-12 pt-10 border-t border-white/5 grid grid-cols-3 gap-6">
                <div className="flex items-center gap-4 group">
                   <div className="p-3 bg-white/5 rounded-xl group-hover:bg-amber-600 group-hover:text-black transition-all">
                      <Flag className="w-5 h-5" />
                   </div>
                   <p className="text-[10px] font-black uppercase leading-tight">Claim <br/>Territory</p>
                </div>
                <div className="flex items-center gap-4 group">
                   <div className="p-3 bg-white/5 rounded-xl group-hover:bg-red-600 transition-all">
                      <Sword className="w-5 h-5" />
                   </div>
                   <p className="text-[10px] font-black uppercase leading-tight">Join <br/>Alliance</p>
                </div>
                <div className="flex items-center gap-4 group">
                   <div className="p-3 bg-white/5 rounded-xl group-hover:bg-blue-600 transition-all">
                      <Landmark className="w-5 h-5" />
                   </div>
                   <p className="text-[10px] font-black uppercase leading-tight">Visit <br/>Council</p>
                </div>
             </div>
          </div>

          {/* WORLD ACTIVITY FEED */}
          <div className="bg-[#0A0A0A] border border-white/5 rounded-[3rem] p-10">
             <h3 className="text-xs font-black uppercase tracking-[0.4em] text-gray-600 mb-8">Tactical Data Feed</h3>
             <div className="space-y-6">
                {[
                  { time: "02m", msg: "Achilles_99 captured the 'Bronze Grove' in the name of Zeus.", icon: <Flag className="w-3 h-3 text-amber-500"/> },
                  { time: "14m", msg: "Faction 'Abyssal Reapers' triggered a mass-sacrifice event.", icon: <Activity className="w-3 h-3 text-purple-500"/> },
                  { time: "28m", msg: "Labyrinth breach detected in Sector 7-B. Heroes required.", icon: <ShieldAlert className="w-3 h-3 text-red-500"/> },
                ].map((log, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 hover:bg-white/5 rounded-2xl transition-all group">
                     <span className="text-[10px] font-black text-gray-700 mt-1">{log.time}</span>
                     <div className="mt-1">{log.icon}</div>
                     <p className="text-xs font-medium text-gray-400 group-hover:text-white transition-colors">{log.msg}</p>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* --- RIGHT: GLOBAL LEADERBOARD --- */}
        <section className="col-span-12 lg:col-span-5 space-y-8">
           <div className="bg-gradient-to-br from-[#111] to-black border border-white/10 rounded-[3rem] p-10">
              <div className="flex justify-between items-center mb-10">
                 <h2 className="text-2xl font-black italic uppercase">The Pantheon</h2>
                 <Trophy className="w-6 h-6 text-amber-500" />
              </div>

              <div className="space-y-4">
                 {topHeroes.map((hero, i) => (
                   <div key={i} className={`p-6 rounded-3xl border flex items-center justify-between transition-all group cursor-pointer ${
                     hero.rank === 1 ? 'bg-amber-600/10 border-amber-600/40' : 'bg-white/5 border-white/5 hover:border-white/20'
                   }`}>
                      <div className="flex items-center gap-5">
                         <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl italic ${
                           hero.rank === 1 ? 'bg-amber-600 text-black' : 'bg-white/10 text-gray-400'
                         }`}>
                           {hero.rank}
                         </div>
                         <div>
                            <p className="text-lg font-black uppercase italic leading-none group-hover:text-amber-500 transition-colors">{hero.name}</p>
                            <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest mt-1">{hero.clan} Clan</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="text-xl font-black italic">{hero.score}</p>
                         <p className="text-[8px] font-black text-gray-600 uppercase">Divine Pts</p>
                      </div>
                   </div>
                 ))}
              </div>

              <button className="w-full mt-10 py-5 bg-white text-black rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-amber-600 hover:text-white transition-all shadow-xl">
                 View All Rankings
              </button>
           </div>

           {/* PERSONAL STANDING CARD */}
           <div className="bg-[#0A0A0A] border border-white/10 rounded-[3rem] p-10 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-600/5 blur-3xl rounded-full" />
              <div className="flex items-center gap-6">
                 <div className="w-20 h-20 bg-amber-600 rounded-3xl flex items-center justify-center font-black text-4xl text-black italic">
                    {/* Placeholder for user's own avatar */}
                    U
                 </div>
                 <div>
                    <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Your Standing</h3>
                    <p className="text-3xl font-black italic uppercase">Rank #12,402</p>
                    <div className="flex items-center gap-2 mt-2">
                       <BarChart3 className="w-3 h-3 text-green-500" />
                       <span className="text-[10px] font-bold text-green-500 uppercase">+14 Spots this week</span>
                    </div>
                 </div>
              </div>
           </div>
        </section>

      </main>

      {/* --- FOOTER CTA --- */}
      <footer className="p-12 text-center">
         <Link href="/forge" className="inline-flex items-center gap-4 text-gray-600 hover:text-amber-500 transition-all">
            <span className="text-[10px] font-black uppercase tracking-[0.5em]">Forge your legacy and climb the pantheon</span>
            <ChevronRight className="w-4 h-4" />
         </Link>
      </footer>
    </div>
  )
}