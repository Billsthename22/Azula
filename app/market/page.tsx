"use client"

import { useState, useEffect } from "react"
import { 
  ShoppingBag, Coins, TrendingUp, ShieldCheck, 
  ArrowUpRight, Clock, Star, Zap, Info,
  Search, Filter, ChevronRight, LayoutGrid
} from "lucide-react"
import Link from "next/link"

export default function DivineMarket() {
  const [mounted, setMounted] = useState(false)
  const [essence, setEssence] = useState(1450)

  useEffect(() => setMounted(true), [])

  const listings = [
    { name: "Icarus Wings (v2)", price: 850, type: "Relic", trend: "+12%", color: "text-blue-400" },
    { name: "Prometheus Torch", price: 2100, type: "Utility", trend: "-2%", color: "text-orange-500" },
    { name: "Stygian Iron Blade", price: 4200, type: "Weapon", trend: "+5%", color: "text-purple-500" },
    { name: "Ambrosia Vial", price: 150, type: "Consumable", trend: "Stable", color: "text-green-500" },
  ]

  if (!mounted) return <div className="min-h-screen bg-[#050505]" />

  return (
    <div className="min-h-screen bg-[#020202] text-[#E5E7EB] font-sans overflow-hidden">
      
      {/* --- TOP HUD: ECONOMY BAR --- */}
      <nav className="h-20 border-b border-white/5 bg-black/50 backdrop-blur-2xl flex items-center justify-between px-10 sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <Link href="/forge" className="text-gray-500 hover:text-white transition-colors">
            <LayoutGrid className="w-5 h-5" />
          </Link>
          <div className="h-6 w-[1px] bg-white/10" />
          <h2 className="text-sm font-black uppercase tracking-[0.3em] italic">Azula // <span className="text-amber-500">Market</span></h2>
        </div>

        <div className="flex gap-8">
           <div className="flex items-center gap-3 bg-amber-600/10 border border-amber-600/30 px-5 py-2 rounded-full">
              <Coins className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-black italic">{essence.toLocaleString()} <span className="text-[10px] uppercase opacity-60 ml-1">Essence</span></span>
           </div>
           <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent cursor-pointer hover:border-amber-500/50 transition-all">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
           </div>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto p-10 grid grid-cols-12 gap-10">
        
        {/* --- LEFT: CATEGORIES & FILTERS --- */}
        <section className="col-span-12 lg:col-span-3 space-y-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="SEARCH ARTIFACTS..." 
              className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-[10px] font-black tracking-widest focus:outline-none focus:border-amber-600/50 transition-all"
            />
          </div>

          <div className="bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] p-8">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-8 flex items-center gap-2">
              <Filter className="w-3 h-3" /> Filter // Category
            </h3>
            <div className="space-y-2">
              {["All Items", "Weapons", "Armor", "Relics", "Consumables"].map((cat) => (
                <button key={cat} className="w-full text-left px-4 py-3 rounded-xl text-xs font-bold text-gray-400 hover:bg-white/5 hover:text-white transition-all flex justify-between items-center group">
                  {cat}
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>

          <div className="p-8 bg-gradient-to-br from-amber-600/20 to-transparent border border-amber-600/20 rounded-[2.5rem]">
             <TrendingUp className="w-8 h-8 text-amber-500 mb-4" />
             <h4 className="text-sm font-black uppercase italic mb-2">Market Pulse</h4>
             <p className="text-[11px] text-gray-400 leading-relaxed italic">
               Stygian Iron prices are up 14% following the breach at the Gates of Hades.
             </p>
          </div>
        </section>

        {/* --- CENTER: PRODUCT GRID --- */}
        <section className="col-span-12 lg:col-span-9 space-y-10">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.4em] mb-1">New Arrivals</p>
              <h3 className="text-4xl font-black italic uppercase">The Vault</h3>
            </div>
            <div className="flex gap-4">
              <button className="p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all"><Clock className="w-4 h-4" /></button>
              <button className="p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all"><Star className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {listings.map((item, i) => (
              <div key={i} className="bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] p-8 group hover:border-amber-600/40 transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity">
                  <Zap className={`w-24 h-24 ${item.color}`} />
                </div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-[8px] font-black uppercase px-3 py-1 bg-white/5 rounded-full border border-white/10">{item.type}</span>
                    <span className={`text-[10px] font-black ${item.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{item.trend}</span>
                  </div>
                  
                  <h4 className="text-xl font-black uppercase italic mb-1 group-hover:text-amber-500 transition-colors">{item.name}</h4>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-10">ID // AZU-884-{i}</p>
                  
                  <div className="flex justify-between items-center border-t border-white/5 pt-6">
                    <div>
                      <p className="text-[8px] font-black text-gray-500 uppercase">Price</p>
                      <p className="text-2xl font-black italic">{item.price} <span className="text-[10px] opacity-40">E</span></p>
                    </div>
                    <button className="bg-white text-black px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 hover:text-white transition-all shadow-xl shadow-white/5">
                      Acquire
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* PROMOTIONAL BANNER */}
          <div className="bg-[url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000')] bg-cover bg-center h-64 rounded-[3rem] relative overflow-hidden border border-white/10 group">
             <div className="absolute inset-0 bg-black/70 group-hover:bg-black/50 transition-all duration-700" />
             <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10">
                <span className="text-amber-500 text-[10px] font-black uppercase tracking-[0.5em] mb-4">Limited Expedition</span>
                <h3 className="text-5xl font-black italic uppercase mb-4 tracking-tighter">The Tartarus Sale</h3>
                <p className="text-xs font-bold uppercase tracking-widest opacity-60">Up to 40% Off Underworld Gear // Limited Time</p>
             </div>
          </div>
        </section>
      </main>

      {/* FOOTER MINI-FEED */}
      <div className="fixed bottom-0 w-full bg-[#050505] border-t border-white/5 h-12 flex items-center px-10">
        <div className="flex gap-10 items-center">
           <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-amber-600 rounded-full" />
              <span className="text-[8px] font-black uppercase tracking-widest text-gray-500">Live Auction: Hephaestus Hammer currently 12.4k Essence</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-gray-700 rounded-full" />
              <span className="text-[8px] font-black uppercase tracking-widest text-gray-500">Latest Sale: Poseidon Trident Shell [Tier-2]</span>
           </div>
        </div>
      </div>
    </div>
  )
}