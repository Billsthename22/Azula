"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Eye, Volume2, VolumeX, Flame, Skull, Zap } from "lucide-react"

export default function OraclePrelude() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [step, setStep] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
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

  const speak = (text: string | undefined) => {
    if (typeof window !== "undefined" && window.speechSynthesis && !isMuted) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      const voices = window.speechSynthesis.getVoices()
      const scaryVoice = voices.find(v => v.name.includes("Daniel") || v.name.includes("David") || v.name.includes("Male"))
      
      utterance.voice = scaryVoice || voices[0]
      utterance.pitch = 0.1;
      utterance.rate = 0.7;
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
    }, 50)

    const nextStepTimer = setTimeout(() => {
      if (step < messages.length - 1) setStep(prev => prev + 1)
    }, fullText.length * 50 + 3500)

    return () => {
      clearInterval(typingInterval)
      clearTimeout(nextStepTimer)
      window.speechSynthesis.cancel()
    }
  }, [step, hasStarted, mounted, isMuted])

  if (!mounted) return null

  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center overflow-hidden">
        {/* Occult Background elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-red-900 rounded-full animate-[spin_60s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-red-950 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
        </div>

        <div className="mb-12 space-y-4">
          <h1 className="text-red-600 text-[10px] tracking-[2em] uppercase font-black animate-pulse">Initializing Connection</h1>
          <p className="text-stone-700 text-xs font-serif italic tracking-widest">"BLOOD FOR THE UNSEEN"</p>
        </div>

        <button 
          onClick={() => setHasStarted(true)} 
          className="group relative flex flex-col items-center transition-transform hover:scale-110 active:scale-95"
        >
          <div className="relative z-10 w-24 h-24 flex items-center justify-center border-2 border-red-900 bg-black rotate-45 group-hover:bg-red-950 transition-all duration-500">
             <Skull className="w-10 h-10 text-red-600 -rotate-45 group-hover:text-white transition-colors" />
          </div>
          <span className="mt-12 text-red-900 text-[10px] tracking-[1em] uppercase font-black group-hover:text-red-500 transition-colors">
            Initiate Sacrifice
          </span>
        </button>
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-all duration-1000 overflow-hidden relative flex flex-col items-center justify-center p-6 font-serif
      ${isSpeaking ? 'bg-[#050000]' : 'bg-black'}`}>
      
      {/* Dynamic Scanline/Noise Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Side Progress Bar */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4">
        {messages.map((_, i) => (
          <div 
            key={i} 
            className={`w-1 h-8 transition-all duration-1000 ${i <= step ? 'bg-red-600' : 'bg-zinc-900'}`} 
          />
        ))}
      </div>

      {/* --- HUD --- */}
      <div className="absolute top-8 left-0 w-full flex justify-between px-8 md:px-12 z-50">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-red-600 animate-ping' : 'bg-zinc-800'}`} />
          <span className="text-[10px] tracking-[0.5em] font-black text-zinc-500 uppercase italic">Oracle.Link_V.01</span>
        </div>
        <button onClick={() => setIsMuted(!isMuted)} className="hover:scale-110 transition-transform">
          {isMuted ? <VolumeX className="w-5 h-5 text-zinc-800" /> : <Volume2 className="w-5 h-5 text-red-600" />}
        </button>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 max-w-5xl w-full flex flex-col items-center">
        
        {/* Oracle Eye Container */}
        <div className="mb-12 relative">
          <div className={`absolute inset-0 bg-red-600/10 blur-[100px] transition-opacity duration-1000 ${isSpeaking ? 'opacity-100' : 'opacity-0'}`} />
          <div className={`p-8 border-2 transition-all duration-700 rotate-45 ${isSpeaking ? 'border-red-600 shadow-[0_0_40px_rgba(220,38,38,0.2)]' : 'border-zinc-900'}`}>
            <Eye className={`w-12 h-12 -rotate-45 transition-colors duration-700 ${isSpeaking ? 'text-white' : 'text-zinc-800'}`} />
          </div>
          {/* Glitch Zap Icons */}
          {isSpeaking && (
            <>
              <Zap className="absolute -top-4 -left-4 w-4 h-4 text-red-500 animate-pulse" />
              <Zap className="absolute -bottom-4 -right-4 w-4 h-4 text-red-500 animate-pulse delay-150" />
            </>
          )}
        </div>

        {/* Message Area */}
        <div className="min-h-[200px] flex items-center justify-center text-center">
          <h2 className={`text-2xl md:text-4xl lg:text-5xl font-black italic leading-snug tracking-tighter transition-all duration-500 px-4 md:px-20
            ${isSpeaking ? 'text-white scale-[1.02]' : 'text-zinc-600 scale-100'}`}
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {displayedText}
            {isTyping && <span className="inline-block w-1.5 h-8 md:h-12 bg-red-600 ml-3 animate-pulse" />}
          </h2>
        </div>

        {/* Action Button */}
        <div className={`mt-20 transition-all duration-1000 ${step === messages.length - 1 && !isTyping ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'}`}>
          <button
            onClick={() => router.push('/Select')}
            className="group relative px-12 py-4 bg-red-600 overflow-hidden skew-x-[-12deg] hover:bg-white transition-colors duration-300"
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
               <Flame className="text-black w-6 h-6 animate-bounce" />
            </div>
            <span className="relative z-10 text-xs font-black uppercase tracking-[0.5em] text-black group-hover:opacity-0 transition-opacity">
              Burn The Fates
            </span>
          </button>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&display=swap');
        body { background-color: #000; cursor: crosshair; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #330000; border-radius: 10px; }
      `}</style>
    </div>
  )
}