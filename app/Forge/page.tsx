"use client"

import { useState, useEffect } from "react"
import { 
    Zap, Shield, Sword, Sparkles, Fingerprint, 
    Dna, Boxes, Grape, Trophy, ChevronRight, // Changed GiGrapes to Grape
    Flame, Hammer, Droplets, Gem
  } from "lucide-react"
import Link from "next/link"

export default function HeroForge() {
  const [mounted, setMounted] = useState(false)
  const [lineage, setLineage] = useState("Ares")
  const [level, setLevel] = useState(14)

  useEffect(() => setMounted(true), [])

  const stats = [
    { label: "Might", value: 88, icon: <Hammer className="w-3 h-3 text-red-500" /> },
    { label: "Agility", value: 64, icon: <Flame className="w-3 h-3 text-orange-500" /> },
    { label: "Wisdom", value: 42, icon: <Sparkles className="w-3 h-3 text-blue-500" /> },
    { label: "Divinity", value: 12, icon: <Gem className="w-3 h-3 text-amber-500" /> },
  ]

  const equipment = [
    { slot: "Weapon", name: "Sun-Piercer Spear", rarity: "Epic", stats: "+20 Fire" },
    { slot: "Armor", name: "Nemean Hide", rarity: "Legendary", stats: "+50 Phys Res" },
    { slot: "Relic", name: "Empty Socket", rarity: "Common", stats: "None" },
  ]

  if (!mounted) return <div className="min-h-screen bg-[#050505]" />

  return (
    <div className="min-h-screen bg-[#020202] text-[#E5E7EB] font-sans p-6 lg:p-12 overflow-hidden selection:bg-amber-600">
      
      {/* HEADER HUD */}
      <header className="max-w-[1500px] mx-auto flex justify-between items-end mb-16">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Biological Protocol // 0042</span>
          </div>
          <h1 className="text-6xl font-black italic uppercase tracking-tighter">Hero<span className="text-amber-500">Forge</span></h1>
        </div>
        
        <div className="flex gap-4">
          <Link href="/bestiary" className="px-6 py-3 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all">Bestiary</Link>
          <div className="px-6 py-3 bg-amber-600 text-black rounded-xl text-[10px] font-black uppercase tracking-widest italic flex items-center gap-2">
             <Trophy className="w-3 h-3" /> Rank: Demi-God
          </div>
        </div>
      </header>

      <div className="max-w-[1500px] mx-auto grid grid-cols-12 gap-8">
        
        {/* LEFT: CHARACTER DNA & LINEAGE */}
        <section className="col-span-12 lg:col-span-3 space-y-6">
          <div className="bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-8 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent opacity-50" />
             <Fingerprint className="w-12 h-12 text-amber-600/20 mb-6" />
             <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-6">Demigod Lineage</h3>
             
             <div className="space-y-3">
               {["Ares", "Athena", "Apollo", "Hermes"].map((god) => (
                 <button 
                  key={god}
                  onClick={() => setLineage(god)}
                  className={`w-full p-4 rounded-xl border text-left flex justify-between items-center transition-all ${
                    lineage === god ? 'bg-amber-600 border-amber-400 text-black' : 'bg-white/5 border-white/5 text-gray-400 hover:border-white/20'
                  }`}
                 >
                   <span className="text-sm font-black uppercase italic">{god}</span>
                   {lineage === god && <Dna className="w-4 h-4" />}
                 </button>
               ))}
             </div>
          </div>

          <div className="bg-white/5 border border-white/5 rounded-[2rem] p-8">
             <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-8">Attribute Matrix</h3>
             <div className="space-y-6">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        {s.icon}
                        <span className="text-[10px] font-bold uppercase">{s.label}</span>
                      </div>
                      <span className="text-xs font-black">{s.value}</span>
                    </div>
                    <div className="h-0.5 w-full bg-white/5">
                       <div className="h-full bg-white transition-all duration-1000" style={{ width: `${s.value}%` }} />
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* CENTER: THE BLUEPRINT VISUALIZER */}
        <section className="col-span-12 lg:col-span-6 bg-[#070707] border border-white/5 rounded-[3rem] relative flex flex-col items-center justify-center p-12 overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
           
           {/* AVATAR PLACEHOLDER */}
           <div className="relative w-80 h-[28rem] border-x border-white/5 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-b from-amber-600/5 to-transparent" />
              <div className="w-64 h-full bg-white/5 rounded-full blur-3xl opacity-20 animate-pulse" />
              
              {/* ARMOR SLOTS LAYERED OVER AVATAR */}
              <div className="absolute top-10 -left-10 w-20 h-20 bg-black border border-amber-600/50 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(217,119,6,0.1)]">
                 <Shield className="w-8 h-8 text-amber-500" />
              </div>
              <div className="absolute top-40 -right-10 w-20 h-20 bg-black border border-white/10 rounded-2xl flex items-center justify-center">
                 <Sword className="w-8 h-8 text-gray-700" />
              </div>
              
              <div className="text-center z-10">
                 <p className="text-[8px] font-black text-amber-600 tracking-[1em] mb-4 uppercase">Chassis // 01</p>
                 <div className="text-8xl font-black italic opacity-10 select-none">AZULA</div>
              </div>
           </div>

           <div className="mt-12 flex gap-8">
              <div className="text-center">
                 <p className="text-[10px] font-black uppercase text-gray-500">Combat Power</p>
                 <p className="text-4xl font-black italic">14,204</p>
              </div>
              <div className="w-[1px] h-12 bg-white/10" />
              <div className="text-center">
                 <p className="text-[10px] font-black uppercase text-gray-500">Ascension</p>
                 <p className="text-4xl font-black italic text-amber-500">{level}%</p>
              </div>
           </div>
        </section>

        {/* RIGHT: INVENTORY & AUGMENTS */}
        <section className="col-span-12 lg:col-span-3 space-y-6">
          <div className="bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-8">Equipped Artifacts</h3>
            <div className="space-y-4">
              {equipment.map((item, i) => (
                <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl group cursor-pointer hover:border-amber-600/50 transition-all">
                   <div className="flex justify-between items-center mb-1">
                      <span className="text-[8px] font-black text-gray-600 uppercase">{item.slot}</span>
                      <span className={`text-[8px] font-black uppercase ${item.rarity === 'Legendary' ? 'text-amber-500' : 'text-blue-400'}`}>{item.rarity}</span>
                   </div>
                   <p className="text-sm font-black uppercase italic mb-1 group-hover:text-amber-500">{item.name}</p>
                   <p className="text-[10px] font-bold text-gray-500">{item.stats}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-600/5 border border-amber-600/20 rounded-[2rem] p-8">
             <div className="flex items-center gap-3 mb-6">
                <Boxes className="w-5 h-5 text-amber-500" />
                <h3 className="text-xs font-black uppercase tracking-widest">Skill Tree</h3>
             </div>
             <p className="text-[11px] font-medium leading-relaxed italic text-gray-400 mb-6">
               "Unlock the 'Thunderbolt' augment at level 20 to chain damage between monsters."
             </p>
             <button className="w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-amber-600 hover:text-white transition-all">
                Access Grimoire
             </button>
          </div>
        </section>

      </div>

      {/* FOOTER NAV / STATUS */}
      <footer className="fixed bottom-0 left-0 right-0 p-6 bg-black/80 backdrop-blur-xl border-t border-white/5 flex justify-between items-center px-12">
         <div className="flex gap-12">
            <div>
               <p className="text-[8px] font-black text-gray-600 uppercase">Current Quest</p>
               <p className="text-xs font-bold uppercase italic">Slay the Nemean Lion <span className="text-amber-500 ml-2">40%</span></p>
            </div>
            <div>
               <p className="text-[8px] font-black text-gray-600 uppercase">Party Status</p>
               <p className="text-xs font-bold uppercase italic text-green-500">Solo Deployment</p>
            </div>
         </div>
         <button className="flex items-center gap-3 bg-amber-600 px-10 py-4 rounded-full text-black font-black uppercase text-xs tracking-[0.2em] shadow-[0_0_40px_rgba(217,119,6,0.3)] hover:scale-105 transition-all">
            Enter Labyrinth <ChevronRight className="w-4 h-4" />
         </button>
      </footer>

    </div>
  )
}