"use client"

import { useState, useEffect } from "react"
import { 
  BookOpen, Eye, Search, Lock, Scroll, 
  MapPin, Sparkles, ChevronRight, Hash,
  Zap, Flame, Waves, Skull, Info
} from "lucide-react"
import Link from "next/link"

export default function OraclesVault() {
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => setMounted(true), [])

  const archives = [
    { title: "The First Titanomachy", cat: "Historical", access: "Public", icon: <Scroll className="w-4 h-4 text-amber-500" /> },
    { title: "Ichor Composition", cat: "Biological", access: "Tier 2", icon: <Zap className="w-4 h-4 text-blue-500" /> },
    { title: "Underworld Geography", cat: "Cartography", access: "Public", icon: <MapPin className="w-4 h-4 text-purple-500" /> },
    { title: "The Prometheus Incident", cat: "Classified", access: "Tier 5", icon: <Flame className="w-4 h-4 text-red-500" /> },
    { title: "Void Echoes", cat: "Theoretical", access: "Encrypted", icon: <Skull className="w-4 h-4 text-gray-500" /> },
  ]

  if (!mounted) return <div className="min-h-screen bg-[#050505]" />

  return (
    <div className="min-h-screen bg-[#020202] text-[#E5E7EB] font-sans overflow-hidden">
      
      {/* GLOWING HEADER */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-amber-600/10 blur-[120px] rounded-full -z-10" />

      <main className="max-w-[1600px] mx-auto p-8 lg:p-20">
        
        {/* NAV & SEARCH */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-24 gap-12">
          <div className="space-y-4">
            <Link href="/" className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-500 hover:text-white transition-colors">
              // Return to Surface
            </Link>
            <h1 className="text-6xl lg:text-8xl font-black italic uppercase tracking-tighter leading-none">
              ORACLE'S <span className="text-transparent" style={{ WebkitTextStroke: '1px #d97706' }}>VAULT</span>
            </h1>
          </div>

          <div className="relative w-full max-w-md">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
            <input 
              type="text"
              placeholder="QUERY THE ARCHIVES..."
              className="w-full bg-white/5 border border-white/10 rounded-full py-6 pl-16 pr-8 text-xs font-black tracking-widest focus:outline-none focus:border-amber-600/50 transition-all placeholder:text-gray-700"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        <div className="grid grid-cols-12 gap-12">
          
          {/* --- LEFT: BENTO FEATURE (The Forbidden Entry) --- */}
          <section className="col-span-12 lg:col-span-8 space-y-10">
            <div className="group relative bg-[#0A0A0A] border border-white/5 rounded-[4rem] p-12 overflow-hidden hover:border-amber-600/20 transition-all duration-700">
               <div className="absolute top-0 right-0 p-12">
                  <Lock className="w-12 h-12 text-gray-800 opacity-20 group-hover:text-amber-600 group-hover:opacity-100 transition-all" />
               </div>
               
               <div className="max-w-2xl space-y-8 relative z-10">
                  <div className="flex items-center gap-4">
                    <span className="bg-red-600 text-white text-[8px] font-black px-3 py-1 rounded uppercase tracking-tighter">Classified Entry</span>
                    <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Entry #882-Alpha</span>
                  </div>
                  <h2 className="text-5xl lg:text-7xl font-black uppercase italic leading-none">The Death of <br /> Chronos</h2>
                  <p className="text-gray-400 text-lg leading-relaxed italic">
                    "Before the dawn of Azula, there was only the devourer. The records of his fall are incomplete, but the scars remain in the fabric of the Labyrinth."
                  </p>
                  <div className="pt-8 flex gap-6">
                    <button className="flex items-center gap-3 text-amber-500 font-black uppercase text-xs tracking-widest group">
                      Decrypt Scroll <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </button>
                    <div className="h-4 w-[1px] bg-white/10" />
                    <button className="text-gray-600 font-black uppercase text-xs tracking-widest hover:text-white transition-colors">
                      View Citations
                    </button>
                  </div>
               </div>
               
               {/* SCROLL DECORATION BACKGROUND */}
               <div className="absolute -bottom-20 -right-20 opacity-5 group-hover:opacity-10 transition-opacity">
                  <BookOpen className="w-[400px] h-[400px] rotate-12" />
               </div>
            </div>

            {/* CATEGORY EXPLORER */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {["Deities", "Relics", "Prophecies"].map((tag) => (
                 <div key={tag} className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] hover:bg-amber-600 transition-all group cursor-pointer">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-black">
                       <Hash className="w-4 h-4 text-amber-500" />
                    </div>
                    <h3 className="text-xl font-black uppercase italic group-hover:text-black">{tag}</h3>
                    <p className="text-[10px] font-bold uppercase text-gray-600 mt-2 group-hover:text-black/60">324 Entries</p>
                 </div>
               ))}
            </div>
          </section>

          {/* --- RIGHT: DATA STREAM (Live Decryption) --- */}
          <section className="col-span-12 lg:col-span-4 space-y-8">
            <div className="bg-[#0A0A0A] border border-white/10 rounded-[3rem] p-10">
               <div className="flex justify-between items-center mb-10">
                  <h3 className="text-xs font-black uppercase tracking-[0.4em] text-gray-500 italic">Archive Index</h3>
                  <div className="p-2 bg-amber-600/10 rounded-full">
                    <Eye className="w-4 h-4 text-amber-600" />
                  </div>
               </div>

               <div className="space-y-4">
                  {archives.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-5 rounded-2xl border border-white/5 hover:bg-white/5 transition-all group cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-white/5 rounded-lg group-hover:scale-110 transition-transform">
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-sm font-black uppercase italic leading-none mb-1">{item.title}</p>
                          <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">{item.cat}</p>
                        </div>
                      </div>
                      <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${
                        item.access === 'Public' ? 'bg-green-600/20 text-green-500' : 'bg-white/5 text-gray-600'
                      }`}>
                        {item.access}
                      </span>
                    </div>
                  ))}
               </div>

               <button className="w-full mt-10 py-5 border border-amber-600/30 text-amber-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 hover:text-white transition-all">
                  Request Higher Clearance
               </button>
            </div>

            {/* ORACLE FRAGMENT */}
            <div className="bg-gradient-to-br from-[#121212] to-black p-10 rounded-[3rem] border border-white/5 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-amber-600/5 blur-2xl rounded-full" />
               <Info className="w-6 h-6 text-gray-800 mb-6" />
               <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Random Fragment</p>
               <p className="text-lg font-medium italic leading-relaxed text-gray-300">
                 "The sea does not forgive, it only forgets. Poseidon's rage is but a shadow of the deep's true silence."
               </p>
            </div>
          </section>
        </div>
      </main>

      {/* FOOTER NAV MAP */}
      <footer className="fixed bottom-10 right-10 flex gap-4">
         <div className="bg-black/80 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full flex gap-8 items-center">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-amber-500 rounded-full" />
               <span className="text-[10px] font-black uppercase tracking-widest">Vault 01</span>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-gray-800 rounded-full" />
               <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Vault 02 (Locked)</span>
            </div>
         </div>
      </footer>
    </div>
  )
}