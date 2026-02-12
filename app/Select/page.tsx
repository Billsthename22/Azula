"use client"

import { useState, useEffect, useRef } from "react"
import { 
  Zap, Waves, Skull, ChevronRight, 
  Flame, Target, Activity, Shield, Sword, Eye, Info,
  Sparkles, Brain, Fingerprint, Box, Volume2, VolumeX
} from "lucide-react"
import Link from "next/link"

export default function CharacterSelect() {
  const [mounted, setMounted] = useState(false)
  const [selected, setSelected] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const lineages = [
    {
      id: "ZEUS_01",
      name: "Kaelen Vane",
      patron: "Zeus",
      title: "Son of the Sky",
      trait: "Lightning Reflexes",
      stats: [
        { label: "Might", val: 6, icon: <Sword className="w-3 h-3" /> },
        { label: "Agility", val: 10, icon: <Activity className="w-3 h-3" /> },
        { label: "Vitality", val: 4, icon: <Shield className="w-3 h-3" /> },
        { label: "Intellect", val: 7, icon: <Brain className="w-3 h-3" /> },
        { label: "Luck", val: 5, icon: <Sparkles className="w-3 h-3" /> }
      ],
      perks: ["Overcharge", "Static Jump"],
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      color: "bg-amber-500",
      accent: "text-amber-500",
      glow: "shadow-amber-500/20",
      normalImg: "/images/kaelen-normal.jpeg", 
      video: "/videos/kaelen-reveal.mp4",
      skill: "Volt-Shatter: High-speed dashes leaving chain lightning in your wake."
    },
    {
      id: "POS_02",
      name: "Marena Thalass",
      patron: "Poseidon",
      title: "Daughter of the Deep",
      trait: "Crushing Pressure",
      stats: [
        { label: "Might", val: 8, icon: <Sword className="w-3 h-3" /> },
        { label: "Agility", val: 4, icon: <Activity className="w-3 h-3" /> },
        { label: "Vitality", val: 8, icon: <Shield className="w-3 h-3" /> },
        { label: "Intellect", val: 6, icon: <Brain className="w-3 h-3" /> },
        { label: "Luck", val: 7, icon: <Sparkles className="w-3 h-3" /> }
      ],
      perks: ["Deep Breath", "Abyssal Sight"],
      icon: <Waves className="w-5 h-5 text-blue-400" />,
      color: "bg-blue-500",
      accent: "text-blue-500",
      glow: "shadow-blue-500/20",
      normalImg: "/images/marena-normal.jpeg",
      video: "/videos/marena-reveal.mp4",
      skill: "Tidal Guard: A pressurized shield that reflects projectile damage."
    },
    {
      id: "HAD_03",
      name: "Vespera Voss",
      patron: "Hades",
      title: "Daughter of the Dead",
      trait: "Soul Siphon",
      stats: [
        { label: "Might", val: 5, icon: <Sword className="w-3 h-3" /> },
        { label: "Agility", val: 7, icon: <Activity className="w-3 h-3" /> },
        { label: "Vitality", val: 8, icon: <Shield className="w-3 h-3" /> },
        { label: "Intellect", val: 9, icon: <Brain className="w-3 h-3" /> },
        { label: "Luck", val: 3, icon: <Sparkles className="w-3 h-3" /> }
      ],
      perks: ["Ghost Step", "Thanatos Pact"],
      icon: <Skull className="w-5 h-5 text-purple-500" />,
      color: "bg-purple-600",
      accent: "text-purple-600",
      glow: "shadow-purple-500/20",
      normalImg: "/images/vespera-normal.jpeg",
      video: "/videos/vespera-reveal.mp4",
      skill: "Stygian Veil: Blend into shadows to bypass and drain life-force."
    }
  ]

  // Synchronize Video Playback with Hover State
  useEffect(() => {
    if (videoRef.current) {
      if (isHovering) {
        videoRef.current.currentTime = 0
        videoRef.current.play().catch(() => console.log("Video interaction required"))
      } else {
        videoRef.current.pause()
      }
    }
  }, [isHovering, selected])

  // Ensure the component is mounted before rendering

  const active = lineages[selected]
  const totalPower = active.stats.reduce((acc, curr) => acc + curr.val, 0)

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans overflow-hidden flex flex-col selection:bg-white selection:text-black relative">
      
      {/* --- CINEMATIC SYSTEM OVERLAYS --- */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] contrast-150" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      <div className="fixed inset-0 pointer-events-none z-40 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px]" />

      <main className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-between p-8 lg:px-20 gap-8 py-20">
        
        {/* --- LEFT: BIOMETRICS & STATS --- */}
        <div className="w-full lg:w-[28%] space-y-8 animate-in fade-in slide-in-from-left duration-700">
           <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <Fingerprint className={`w-4 h-4 ${active.accent} animate-pulse`} />
                 <p className={`text-[10px] font-black uppercase tracking-[0.4em] ${active.accent}`}>Aegis ID: {active.id}</p>
              </div>
              <h2 className="text-6xl lg:text-8xl font-black italic uppercase tracking-tighter leading-[0.8]">
                {active.name.split(' ')[0]}<br/>
                <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>{active.name.split(' ')[1]}</span>
              </h2>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.5em]">{active.title}</p>
           </div>

           <div className="space-y-6 bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-3xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Box className="w-12 h-12" />
              </div>

              <div className="flex justify-between items-end border-b border-white/5 pb-6">
                 <div>
                   <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30 mb-1">Power Level</p>
                   <p className="text-3xl font-black italic tracking-tighter">{totalPower}<span className="text-xs opacity-20 ml-1">/ 50</span></p>
                 </div>
                 <Activity className={`w-6 h-6 mb-1 ${active.accent}`} />
              </div>

              <div className="grid grid-cols-1 gap-5">
                {active.stats.map((stat, i) => (
                  <div key={i} className="group">
                    <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2 transition-colors group-hover:text-white">
                        <div className="flex items-center gap-2">
                          {stat.icon}
                          <span>{stat.label}</span>
                        </div>
                        <span className="font-mono text-[11px]">{stat.val}</span>
                    </div>
                    <div className="h-[3px] w-full bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-1000 ease-out ${active.color} shadow-[0_0_15px_rgba(255,255,255,0.2)]`} 
                          style={{ width: `${stat.val * 10}%` }} 
                        />
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </div>

        {/* --- CENTER: CINEMATIC PORTRAIT (VIDEO ENGINE) --- */}
        <div className="relative flex-1 flex justify-center order-first lg:order-none scale-90 lg:scale-100">
           {/* Technical Rings */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center pointer-events-none">
              <div className="w-[450px] h-[450px] border border-white/5 rounded-full animate-[spin_30s_linear_infinite]" />
              <div className="absolute w-[550px] h-[550px] border border-dashed border-white/5 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
           </div>

           <div 
             onMouseEnter={() => setIsHovering(true)}
             onMouseLeave={() => setIsHovering(false)}
             className="relative w-[320px] h-[500px] lg:w-[420px] lg:h-[650px] rounded-[4rem] overflow-hidden border border-white/10 transition-all duration-700 hover:border-white/40 group shadow-2xl cursor-crosshair bg-zinc-900"
           >
              {/* Static State Image */}
              <img 
                src={active.normalImg} 
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out
                  ${isHovering ? 'opacity-0 scale-110 blur-xl' : 'opacity-100 scale-100'}`} 
                alt={active.name}
              />

              {/* Live Combat Video */}
              <video
                ref={videoRef}
                src={active.video}
                loop
                muted
                playsInline
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out
                  ${isHovering ? 'opacity-100 scale-100' : 'opacity-0 scale-125'}`}
              />

              {/* HUD Overlays within the Portrait */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
              <div className="absolute top-8 left-8 flex items-center gap-2 z-20">
                <div className={`w-2 h-2 rounded-full ${isHovering ? 'bg-red-500 animate-ping' : 'bg-green-500'}`} />
                <span className="text-[8px] font-black uppercase tracking-[0.4em] opacity-50">
                  {isHovering ? 'Streaming_Live' : 'Standby_Mode'}
                </span>
              </div>
              
              <div className="absolute bottom-12 left-0 right-0 px-10 text-center z-20">
                 <div className={`space-y-4 transition-all duration-700 ${isHovering ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <span className="bg-white/10 border border-white/20 text-white text-[8px] font-black px-4 py-1.5 rounded-full tracking-[0.4em] uppercase">Tactical Ability</span>
                    <p className="text-[11px] text-white/70 italic leading-relaxed font-serif uppercase tracking-widest">{active.skill}</p>
                 </div>
                 {!isHovering && (
                    <div className="flex flex-col items-center gap-2 opacity-20 animate-pulse">
                      <p className="text-[8px] font-black uppercase tracking-[0.5em]">Analyze Vessel</p>
                      <ChevronRight className="w-4 h-4 rotate-90" />
                    </div>
                 )}
              </div>
           </div>
        </div>

        {/* --- RIGHT: SELECTION & INITIALIZATION --- */}
        <div className="w-full lg:w-[28%] flex flex-col items-center lg:items-end gap-10 animate-in fade-in slide-in-from-right duration-700">
           
           {/* Passive Detail Card */}
           <div className="w-full bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] space-y-6 backdrop-blur-md">
              <div className="flex items-center gap-3">
                 <Box className={`w-4 h-4 ${active.accent}`} />
                 <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Passive Loadout</p>
              </div>
              <div className="space-y-4">
                 <div className="flex items-start gap-4">
                    <div className={`w-[2px] h-12 ${active.color} rounded-full mt-1 shadow-[0_0_10px_rgba(255,255,255,0.3)]`} />
                    <div>
                       <p className="text-xs font-black text-white uppercase tracking-widest mb-1">{active.trait}</p>
                       <p className="text-[10px] text-white/30 leading-relaxed font-medium italic">Advanced neural link protocols synchronized with {active.patron} essence.</p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Character Swatch Selection */}
           <div className="flex lg:flex-row flex-wrap justify-center lg:justify-end gap-5">
              {lineages.map((hero, i) => (
                <button
                  key={i}
                  onClick={() => { setSelected(i); setIsHovering(false); }}
                  className={`group relative w-20 h-20 rounded-3xl overflow-hidden border-2 transition-all duration-500 shadow-2xl ${
                    selected === i ? 'border-white scale-110 shadow-white/10' : 'border-transparent opacity-30 hover:opacity-100 grayscale hover:grayscale-0'
                  }`}
                >
                  <img src={hero.normalImg} className="w-full h-full object-cover" />
                  <div className={`absolute inset-0 transition-opacity duration-500 ${selected === i ? 'opacity-20 ' + hero.color : 'opacity-0 bg-black'}`} />
                  <div className="absolute inset-0 flex items-center justify-center z-20">{hero.icon}</div>
                </button>
              ))}
           </div>

           {/* CTA Button */}
           <Link 
              href="/Story"
              className="group relative w-full lg:w-72 flex items-center justify-center gap-6 bg-white text-black py-8 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.8em] transition-all hover:scale-[0.98] active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
           >
              Initialize <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
           </Link>
        </div>

      </main>

      {/* FOOTER BAR */}
      <footer className="h-20 border-t border-white/5 flex items-center justify-between px-12 bg-black/80 backdrop-blur-3xl relative z-40">
         <div className="flex items-center gap-10">
            <div className="flex items-center gap-3">
               <div className={`w-1.5 h-1.5 rounded-full ${isHovering ? 'bg-red-500 animate-ping' : 'bg-green-500'}`} />
               <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/40">Status: {isHovering ? 'Engaged' : 'Standby'}</span>
            </div>
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/20 hidden md:block">System: Aegis_Prime_OS_v2.4</span>
         </div>
         <p className="text-[8px] font-medium uppercase tracking-[0.3em] text-white/10 text-right max-w-xs leading-relaxed">
           Prophetic data encrypted. Authorized personnel only. Data wipes are final.
         </p>
      </footer>
    </div>
  )
}