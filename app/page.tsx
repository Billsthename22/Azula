"use client"

import { useState, useEffect } from "react"
import { 
  Library, Flame, Wind, Waves, Skull, Sparkles, 
  Map as MapIcon, ScrollText, Shield, 
  Eye, Compass, Gem, Zap, Moon, Sun, Anchor
} from "lucide-react"

export default function AzulaMythos() {
  const [activeRealm, setActiveRealm] = useState<"olympus" | "underworld" | "oceans">("olympus")
  const [mounted, setMounted] = useState(false)
  const [favor, setFavor] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  const deities = [
    { name: "Zeus", title: "King of Gods", power: "Lightning", realm: "olympus", icon: <Zap className="w-4 h-4"/> },
    { name: "Hades", title: "Lord of the Dead", power: "Invisibility", realm: "underworld", icon: <Skull className="w-4 h-4"/> },
    { name: "Poseidon", title: "Earth-Shaker", power: "Storms", realm: "oceans", icon: <Anchor className="w-4 h-4"/> },
    { name: "Athena", title: "Goddess of Strategy", power: "Wisdom", realm: "olympus", icon: <Shield className="w-4 h-4"/> },
    { name: "Artemis", title: "The Huntress", power: "Archery", realm: "olympus", icon: <Moon className="w-4 h-4"/> },
  ]

  if (typeof window === "undefined") return <div className="min-h-screen bg-[#050505]" />

  return (
    <div className="flex min-h-screen bg-[#050505] text-[#E5E7EB] font-serif overflow-hidden selection:bg-amber-500 selection:text-black">
      
      {/* --- SIDEBAR: THE GREAT ARCHIVES --- */}
      <aside className="w-20 lg:w-24 border-r border-white/5 flex flex-col items-center py-12 gap-12 bg-black/60 backdrop-blur-3xl z-50">
        <div className="w-14 h-14 bg-amber-600 rounded-full flex items-center justify-center group cursor-pointer hover:shadow-[0_0_40px_rgba(217,119,6,0.6)] transition-all duration-700 border-2 border-amber-400/20">
          <span className="text-white font-black text-3xl tracking-tighter italic">A</span>
        </div>
        
        <nav className="flex flex-col gap-10 text-gray-600">
          <Library className="w-6 h-6 hover:text-amber-500 cursor-pointer transition-all hover:scale-110" />
          <MapIcon className="w-6 h-6 hover:text-amber-500 cursor-pointer transition-all hover:scale-110" />
          <ScrollText className="w-6 h-6 hover:text-amber-500 cursor-pointer transition-all hover:scale-110" />
          <Compass className="w-6 h-6 hover:text-amber-500 cursor-pointer transition-all hover:scale-110" />
        </nav>

        <div className="mt-auto flex flex-col gap-8">
          <div className="relative group">
            <div className="absolute -inset-2 bg-amber-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity" />
            <Gem className="w-6 h-6 text-amber-500 cursor-pointer relative" onClick={() => setFavor(f => f + 1)} />
          </div>
        </div>
      </aside>

      {/* --- MAIN TEMPLE --- */}
      <main className="flex-1 h-screen overflow-y-auto relative pb-20 scroll-smooth">
        
        {/* ATMOSPHERIC DUST & LIGHT */}
        <div className="fixed inset-0 pointer-events-none opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        <div className={`fixed top-0 right-0 w-[1000px] h-[800px] blur-[180px] rounded-full pointer-events-none transition-colors duration-1000 -z-10 ${
          activeRealm === 'olympus' ? 'bg-amber-500/10' : 
          activeRealm === 'underworld' ? 'bg-purple-900/20' : 'bg-blue-900/20'
        }`} />

        <div className="max-w-[1400px] mx-auto p-8 lg:p-16 space-y-20">
          
          {/* EPIC HEADER */}
          <header className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-10">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-500">Ancient Archive // Azula</span>
                <div className="h-[1px] w-24 bg-gradient-to-r from-amber-500/50 to-transparent" />
              </div>
              <h1 className="text-8xl lg:text-[10rem] font-extrabold uppercase tracking-tighter leading-none text-white italic">
                AZU<span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(217,119,6,0.8)' }}>LA</span>
              </h1>
            </div>

            <div className="flex bg-white/5 p-2 rounded-2xl border border-white/10 backdrop-blur-xl">
              {[
                { id: "olympus", icon: <Sun className="w-5 h-5" />, label: "Olympus" },
                { id: "oceans", icon: <Waves className="w-5 h-5" />, label: "Oceans" },
                { id: "underworld", icon: <Moon className="w-5 h-5" />, label: "Abyss" }
              ].map((realm) => (
                <button 
                  key={realm.id}
                  onClick={() => setActiveRealm(realm.id as any)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all font-black uppercase text-[10px] tracking-widest ${
                    activeRealm === realm.id ? "bg-amber-600 text-white shadow-xl" : "text-gray-500 hover:text-white"
                  }`}
                >
                  {realm.icon} {realm.label}
                </button>
              ))}
            </div>
          </header>

          {/* BENTO GRID 2.0 */}
          <div className="grid grid-cols-12 gap-8">
            
            {/* LARGE FEATURE: THE ODYSSEY SCROLL */}
            <section className="col-span-12 lg:col-span-8 bg-[#0A0A0A] border border-white/5 rounded-[3rem] p-12 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 blur-[100px] rounded-full" />
               <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 bg-amber-600/10 rounded-full flex items-center justify-center border border-amber-600/20">
                      <Eye className="w-5 h-5 text-amber-500" />
                    </div>
                    <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500">Featured Legend</h2>
                  </div>

                  <div className="space-y-6 max-w-2xl">
                    <h3 className="text-5xl lg:text-7xl font-black uppercase italic leading-none">The Thread of <br /><span className="text-amber-500">Ariadne</span></h3>
                    <p className="text-gray-400 text-lg leading-relaxed font-medium italic">
                      "Beyond the labyrinth lies the beast, but behind the hero lies the truth. Discover how a simple string conquered the impossible."
                    </p>
                    <div className="flex gap-4 pt-4">
                      <button className="px-8 py-4 bg-white text-black font-black uppercase text-xs tracking-widest rounded-full hover:bg-amber-600 hover:text-white transition-all">
                        Begin Descent
                      </button>
                      <button className="px-8 py-4 border border-white/10 font-black uppercase text-xs tracking-widest rounded-full hover:bg-white/5 transition-all">
                        View Map
                      </button>
                    </div>
                  </div>
               </div>
            </section>

            {/* DIVINE FAVOR MODULE */}
            <section className="col-span-12 lg:col-span-4 bg-gradient-to-b from-[#111] to-black rounded-[3rem] p-10 border border-white/5 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-black uppercase italic tracking-widest mb-2">Divine Favor</h3>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-10">Ascension Progress</p>
                
                <div className="relative h-48 w-48 mx-auto flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/5" />
                    <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="4" fill="transparent" 
                      strokeDasharray={553} strokeDashoffset={553 - (553 * (favor % 100)) / 100}
                      className="text-amber-500 transition-all duration-1000" />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-5xl font-black italic">{favor}</span>
                    <p className="text-[8px] font-black uppercase text-gray-500">Offering Level</p>
                  </div>
                </div>
              </div>
              
              <button onClick={() => setFavor(f => f + 5)} className="w-full py-4 mt-8 bg-amber-600/10 border border-amber-600/30 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-amber-600 hover:text-white transition-all group">
                Make Offering <Flame className="w-3 h-3 inline-block ml-2 group-hover:animate-bounce" />
              </button>
            </section>
          </div>

          {/* THE PANTHEON TILES */}
          <section className="space-y-10">
            <div className="flex justify-between items-end">
              <h3 className="text-3xl font-black uppercase italic">Ancient <span className="text-amber-500">Entities</span></h3>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">5 Active Manifestations</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {deities.map((god, i) => (
                <div key={i} className="group p-8 bg-white/5 border border-white/5 rounded-[2.5rem] hover:bg-white/[0.08] hover:border-amber-500/30 transition-all text-center">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-amber-600 transition-all text-gray-400 group-hover:text-white">
                    {god.icon}
                  </div>
                  <h4 className="font-black uppercase italic mb-1">{god.name}</h4>
                  <p className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.2em]">{god.power}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SACRED MAP INTERFACE */}
          <section className="bg-[url('https://images.unsplash.com/photo-1541447271487-09612b3f49f7?q=80&w=2000')] bg-cover bg-fixed rounded-[4rem] border border-white/10 overflow-hidden group">
            <div className="bg-black/80 backdrop-blur-sm p-12 lg:p-20 hover:backdrop-blur-none transition-all duration-1000">
              <div className="max-w-xl space-y-8">
                <span className="text-amber-500 font-black text-xs uppercase tracking-[0.4em]">Cartography of the Gods</span>
                <h3 className="text-6xl font-black uppercase italic leading-none">The Isle <br /> of Crete</h3>
                <p className="text-gray-400 leading-relaxed italic">
                  Explore the rugged cliffs and ancient palaces where the Minotaur roamed. Every corner of Azula hides a secret lost to time.
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-2xl font-black italic">4.2k</p>
                    <p className="text-[10px] font-bold text-gray-600 uppercase">Artifacts Found</p>
                  </div>
                  <div>
                    <p className="text-2xl font-black italic">12</p>
                    <p className="text-[10px] font-bold text-gray-600 uppercase">Temples Built</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* --- RIGHT INFO PANEL: THE CONSTELLATION --- */}
      <aside className="hidden xl:flex w-96 border-l border-white/5 p-12 flex-col bg-black/60 backdrop-blur-3xl z-40">
        <div className="space-y-12">
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-gray-500 mb-8">Celestial Terminal</h3>
            <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-gray-400">STARGAZE STATUS</span>
                <span className="text-[10px] font-black text-green-500">CLEAR</span>
              </div>
              <div className="space-y-2">
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-600 w-3/4 animate-pulse" />
                </div>
                <p className="text-[8px] font-bold text-gray-600 uppercase">Constellation Alignment: 75%</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-gray-500 mb-8">The Oracle's Scroll</h3>
            <div className="space-y-8">
              {[
                { time: "2m ago", text: "The Oracle at Delphi has spoken. Beware the tides." },
                { time: "1h ago", text: "New Artifact: The Golden Fleece discovered in Colchis." },
                { time: "4h ago", text: "Zeus grants +5 Favor to those who seek wisdom." }
              ].map((note, i) => (
                <div key={i} className="group cursor-pointer">
                  <p className="text-[9px] font-black text-amber-600 uppercase mb-1">{note.time}</p>
                  <p className="text-sm font-medium leading-snug group-hover:text-amber-500 transition-colors">{note.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <div className="p-8 bg-amber-600 rounded-[2.5rem] text-black">
            <h4 className="text-xl font-black uppercase italic mb-2">Join the Saga</h4>
            <p className="text-xs font-bold leading-relaxed mb-6">Contribute your own myths to the Azula Archive.</p>
            <button className="w-full py-3 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">
              Scribe a Myth
            </button>
          </div>
        </div>
      </aside>
    </div>
  )
}