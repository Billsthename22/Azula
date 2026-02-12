"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Sparkles, Eye, ChevronRight, Volume2, VolumeX, Flame, Skull } from "lucide-react"

export default function OraclePrelude() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [step, setStep] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false) // Trigger for "Scary" UI effects
  const [isMuted, setIsMuted] = useState(false)

  const messages = [
    "The stars are shifting, mortal. The celestial alignment hasn't looked this jagged in a millennium.",
    "The threads of the Fates are fraying at the edges... Clotho weeps, for the pattern is breaking.",
    "Olympus is silent, yet the earth trembles with a name not yet spoken in the halls of the living.",
    "The Great War did not end with the Titans; it merely slept beneath the roots of the world.",
    "A vessel must be chosen. A soul must be forged in the fires of both divinity and despair.",
    "Step forward into the smoke... and reveal the face of the one who would challenge destiny."
  ]

  useEffect(() => { setMounted(true) }, [])

  // --- THE "SCARY" VOICE ENGINE ---
  const speak = (text) => {
    if (typeof window !== "undefined" && window.speechSynthesis && !isMuted) {
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      const voices = window.speechSynthesis.getVoices()

      // Strategy: Look for specific deep-sounding system voices
      // Mac: "Daniel", "Whisper", "Moirai" | Windows: "David", "Zero"
      const scaryVoice = voices.find(v => 
        v.name.includes("Daniel") || 
        v.name.includes("Male") || 
        v.name.includes("David") ||
        v.name.includes("Low")
      )
      
      utterance.voice = scaryVoice || voices[0]
      utterance.pitch = 0.1; // ULTRA LOW: This makes it gravelly
      utterance.rate = 0.75; // SLOW: Makes every word feel heavy
      utterance.volume = 1.0;

      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)

      window.speechSynthesis.speak(utterance)
    }
  }

  useEffect(() => {
    if (!hasStarted || !mounted) return

    setIsTyping(true)
    let i = 0
    setDisplayedText("")
    const fullText = messages[step]
    
    speak(fullText)

    const typingInterval = setInterval(() => {
      setDisplayedText((prev) => prev + fullText.charAt(i))
      i++
      if (i >= fullText.length) {
        clearInterval(typingInterval)
        setIsTyping(false)
      }
    }, 60) // Slower typing to match the deep voice

    const nextStepTimer = setTimeout(() => {
      if (step < messages.length - 1) setStep(prev => prev + 1)
    }, fullText.length * 60 + 4000)

    return () => {
      clearInterval(typingInterval)
      clearTimeout(nextStepTimer)
      window.speechSynthesis.cancel()
    }
  }, [step, hasStarted, mounted, isMuted])

  if (!mounted) return null

  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
        <div className="mb-12 space-y-4 animate-pulse">
          <h1 className="text-red-900 text-[10px] tracking-[1.5em] uppercase font-black">Warning</h1>
          <p className="text-stone-600 text-xs font-serif italic">"The abyss also listens."</p>
        </div>
        <button onClick={() => setHasStarted(true)} className="group relative">
          <div className="absolute inset-0 bg-red-600/10 blur-3xl rounded-full group-hover:bg-red-600/20 transition-all" />
          <div className="relative border border-stone-800 p-10 rounded-full bg-zinc-950 hover:border-red-900 transition-all">
             <Skull className="w-12 h-12 text-stone-700 group-hover:text-red-900 transition-colors" />
          </div>
          <p className="mt-8 text-stone-500 text-[9px] tracking-[0.6em] uppercase">Sacrifice Silence</p>
        </button>
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-all duration-700 overflow-hidden relative flex flex-col items-center justify-center p-6
      ${isSpeaking ? 'bg-[#0a0000] scale-[1.01]' : 'bg-[#050505] scale-100'}`}>
      
      {/* --- SCARY VISUAL EFFECTS --- */}
      <div className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000 ${isSpeaking ? 'opacity-100' : 'opacity-20'}`}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-red-950/5 blur-[120px]" />
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_90%)]" />
      </div>

      {/* --- HUD --- */}
      <div className="absolute top-12 left-0 w-full flex justify-between px-12 z-50">
        <div className="flex items-center gap-3 opacity-20">
          <Flame className="w-4 h-4 text-red-900" />
          <span className="text-[9px] tracking-[1em] font-black text-stone-500 uppercase">Underworld Channel</span>
        </div>
        <button onClick={() => setIsMuted(!isMuted)}>
          {isMuted ? <VolumeX className="w-4 h-4 text-stone-800" /> : <Volume2 className="w-4 h-4 text-red-900 animate-pulse" />}
        </button>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className={`relative z-10 max-w-4xl w-full text-center space-y-16 transition-transform duration-100 ${isSpeaking ? 'translate-y-[1px]' : ''}`}>
        
        <div className="relative inline-block">
          <div className={`absolute inset-0 bg-red-600/20 blur-3xl rounded-full transition-all duration-1000 ${isSpeaking ? 'scale-150 opacity-100' : 'scale-50 opacity-0'}`} />
          <div className={`relative border p-6 rounded-full bg-black/80 transition-all duration-1000 ${isSpeaking ? 'border-red-900 shadow-[0_0_50px_rgba(127,29,29,0.3)]' : 'border-stone-900'}`}>
            <Eye className={`w-12 h-12 transition-colors duration-1000 ${isSpeaking ? 'text-red-700' : 'text-stone-800'}`} />
          </div>
        </div>

        <div className="min-h-[250px] flex items-center justify-center">
          <h2 className={`text-2xl md:text-5xl font-serif italic leading-[1.7] tracking-tight transition-all duration-700 px-6
            ${isSpeaking ? 'text-stone-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'text-stone-500'}`}>
            "{displayedText}"
            {isTyping && <span className="inline-block w-1 h-10 bg-red-900 ml-2 animate-bounce" />}
          </h2>
        </div>

        <div className="pt-12">
            <div className={`h-[1px] bg-gradient-to-r from-transparent via-red-950 to-transparent transition-all duration-1000 ${isSpeaking ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
        </div>

        {/* Action Button */}
        <div className={`transition-all duration-1000 ${step === messages.length - 1 && !isTyping ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'}`}>
          <button
            onClick={() => router.push('/Select')}
            className="group relative px-20 py-6 bg-transparent border border-red-900/30 hover:border-red-600 transition-all duration-1000"
          >
            <span className="relative text-[10px] font-black uppercase tracking-[1.2em] text-red-900 group-hover:text-red-500 transition-colors">
              Offer Your Soul
            </span>
          </button>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;900&display=swap');
        body { background-color: #050505; cursor: crosshair; }
      `}</style>
    </div>
  )
}