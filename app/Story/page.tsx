"use client"

import { useState, useEffect, useRef } from "react"
import { MapPin, Wind, Anchor, Skull } from "lucide-react"

export default function StoryMode() {
  const [mounted, setMounted] = useState(false)
  const [currentSceneKey, setCurrentSceneKey] = useState("the_forge")
  const [displayText, setDisplayText] = useState("")
  const [isGlitching, setIsGlitching] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [divinity, setDivinity] = useState(10)
  const [mortality, setMortality] = useState(90)
  const [favor, setFavor] = useState({ zeus: 0, poseidon: 0, hades: 0 })

  // Fixed Story Object
  const story: any = {
    the_forge: {
      bg: "/images/bg-olympus-forge.jpeg",
      video: "/videos/olympus-forge.mp4",
      characterImg: "/images/clay-form.png",
      speaker: "The Fates",
      location: "The Loom of Destiny",
      text: "Before the first heartbeat echoed in the halls of man, your spirit was forged in the heart of a Great Storm. You are not mere clay; you are the strike that follows the flash, the blood of the Sky King bound in a mortal frame. You lie upon the Anvil of Heaven, waiting for the spark of your father to wake you.",
      choices: [{ text: "Listen to the thunder roll...", next: "the_loom" }]
    },
    the_loom: {
      bg: "/images/bg-olympus-forge.jpeg",
      video: "/videos/olympus-forge.mp4",
      characterImg: "/images/clay-form.png",
      speaker: "The Fates",
      location: "The Loom of Destiny",
      text: "The Three Sisters lean over you. Clotho draws a thread of pure electric blue from the spindle. 'The seed of Olympus,' they whisper. 'A prince of the clouds, cast down to walk among the dust of Troy. Your path is already written in the stars, but the weight of your hand... that is for you to decide.'",
      choices: [{ text: "Feel the static in your veins...", next: "the_awakening" }]
    },
    the_awakening: {
      bg: "/images/bg-olympus-forge.jpeg",
      video: "/videos/olympus-forge.mp4",
      characterImg: "/images/clay-form.png",
      speaker: "The Fates",
      location: "The Loom of Destiny",
      text: "[PROPHETIC WARNING: This choice will echo through the ages. One path leads to the terror of the storm; the other to its grace. There is no turning back.] Atropos holds her shears open, but she does not cut. Not yet. A jagged bolt of Master-Bolt lightning hangs suspended above your chest, humming with a frequency that would shatter a normal man. 'Claim it, Son of Thunder,' the Sisters hiss. 'Will you be the Bolt that strikes the guilty, or the Light that guides the lost?'",
      choices: [
        {
          text: "Claim the Wrath (The Striking Bolt)",
          impact: { favor: "zeus", divinity: 10, mortality: -5 },
          next: "transition_fury"
        },
        {
          text: "Claim the Glory (The Guiding Light)",
          impact: { favor: "zeus", divinity: 5, mortality: 10 },
          next: "transition_majesty"
        }
      ]
    },
    transition_fury: {
      video: "/videos/fury-choice.mp4",
      bg: "/images/bg-olympus-forge.jpeg",
      speaker: "The Storm",
      location: "Your Soul",
      text: "The heavens shatter as you seize the bolt. You are no longer clay; you are the lightning itself, hungry and merciless.",
      choices: [{ text: "Wake up...", next: "the_first_breath" }]
    },
    transition_majesty: {
      video: "/videos/majesty-choice.mp4",
      bg: "/images/bg-olympus-forge.jpeg",
      speaker: "The Light",
      location: "Your Soul",
      text: "A golden warmth spreads through your veins. You claim the storm, not to destroy, but to rule with the weight of a king.",
      choices: [{ text: "Wake up...", next: "the_first_breath" }]
    },
    the_first_breath: {
      bg: "/images/bg-temple-dawn.jpeg",
      characterImg: "/images/hero-silhouette.png",
      speaker: "The Oracle",
      location: "Temple of the Setting Sun",
      text: "You inhale, and the world rushes in—the scent of salt, cedar, and old blood. You are standing on the edge of a cliff. Below, a thousand ships sail toward a war you do not yet understand.",
      choices: [
        { text: "Jump into the sea", log: "Trusting the tides.", impact: { favor: "poseidon", mortality: -5 }, next: "the_shore" },
        { text: "Walk toward the palace", log: "Seeking mortal glory.", impact: { mortality: 10 }, next: "the_palace_gates" }
      ]
    },
    the_shore: {
      bg: "/images/bg-storm-beach.jpeg",
      characterImg: "/images/nymph-echo.png",
      speaker: "Thetis",
      location: "The Iron Coast",
      text: "The waves do not drown you; they carry you. A sea-nymph rises from the foam, clutching a spear of celestial bronze. 'The ocean remembers what the land forgets,' she whispers.",
      choices: [
        { text: "Accept the Spear", log: "Armed by the sea.", impact: { favor: "poseidon", divinity: 10 }, next: "the_siren_call" },
        { text: "Ask for her blessing", log: "Seeking wisdom over steel.", impact: { mortality: 5, favor: "poseidon" }, next: "the_siren_call" }
      ]
    },
    the_siren_call: {
      bg: "/images/bg-ocean-abyss.jpeg",
      characterImg: "/images/siren-mist.png",
      speaker: "Siren of the Depths",
      location: "The Charybdis Maw",
      text: "The water turns black. A melody pulls at your very marrow, promising a world without war. Your heart slows. To listen is to sleep forever; to fight is to suffer.",
      choices: [
        { text: "Sing back to her", impact: { divinity: 15 }, next: "the_omens" },
        { text: "Dive deeper into silence", impact: { favor: "poseidon", mortality: 5 }, next: "the_omens" }
      ]
    },
    the_palace_gates: {
      bg: "/images/bg-throne-room.jpeg",
      characterImg: "/images/king-priam.png",
      speaker: "King Priam",
      location: "The Golden Hall",
      text: "The King sits upon a throne of ivory. He looks at you, not as a god, but as a soldier. 'The gods want a sacrifice,' he growls. 'I want a champion. Which are you?'",
      choices: [
        { text: "I am your Champion", impact: { mortality: 15, divinity: -5 }, next: "the_arena_test" },
        { text: "I am the Sacrifice", impact: { divinity: 10, favor: "hades" }, next: "the_arena_test" }
      ]
    },
    the_arena_test: {
      bg: "/images/bg-arena.jpeg",
      characterImg: "/images/hector-armor.png",
      speaker: "Hector",
      location: "The Training Grounds",
      text: "The Prince of Troy draws his sword. The sun glints off his bronze helm. 'If you are to lead my men, show me your spirit doesn't break under weight.'",
      choices: [
        { text: "Deflect his strike", impact: { mortality: 5 }, next: "the_omens" },
        { text: "Strike his shield", impact: { favor: "zeus", divinity: 5 }, next: "the_omens" }
      ]
    },
    the_omens: {
      bg: "/images/bg-red-sky.jpeg",
      characterImg: "/images/eagle-zeus.png",
      speaker: "Narrator",
      location: "The Cliffs of Miletus",
      text: "The sky turns the color of bruised plums. An eagle tears a serpent apart in mid-air. Zeus is watching. The war has moved from the council of gods to the dirt of the earth.",
      choices: [
        { text: "Pray for a Storm", impact: { favor: "zeus", divinity: 10 }, next: "the_underworld_cross" },
        { text: "Ignore the signs", impact: { mortality: 20 }, next: "the_underworld_cross" }
      ]
    },
    the_underworld_cross: {
      bg: "/images/bg-river-styx.jpeg",
      characterImg: "/images/charon-boat.png",
      speaker: "Charon",
      location: "The Banks of the Styx",
      text: "To reach the battlefield, you must cross the river that divides the living from the dead. Charon holds out a withered hand. He doesn't want gold; he wants a memory.",
      choices: [
        { text: "Give a memory of Love", impact: { favor: "hades", mortality: -10 }, next: "the_battle_eve" },
        { text: "Give a memory of Pain", impact: { favor: "zeus", divinity: 5 }, next: "the_battle_eve" }
      ]
    },
    the_battle_eve: {
      bg: "/images/bg-war-camp.jpeg",
      characterImg: "/images/hero-armored.png",
      speaker: "Ares (Shadow)",
      location: "The Greek Camp",
      text: "The air smells of woodsmoke and bronze. Thousands of men sharpen blades. A tall figure in blood-stained armor stands by your tent. 'Tomorrow,' he says, 'the ground will drink. Will you be the one to pour the wine?'",
      choices: [
        { text: "Sharpen your blade", impact: { divinity: 5, mortality: 5 }, next: "the_gates_of_troy" },
        { text: "Write a letter home", impact: { mortality: 15 }, next: "the_gates_of_troy" }
      ]
    },
    the_gates_of_troy: {
      bg: "/images/bg-troy-walls.jpeg",
      characterImg: "/images/troy-gates.png",
      speaker: "Narrator",
      location: "The Scaean Gates",
      text: "The walls of Troy loom like mountains. This is where history ends and myth begins. The trumpet sounds. The dust rises. Your name is a whisper on the wind, waiting to become a roar.",
      choices: [{ text: "CHARGE THE GATES", next: "FINISH" }]
    }
  };

  useEffect(() => {
    setMounted(true)
    let i = 0
    const fullText = story[currentSceneKey].text
    setDisplayText("")
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, i + 1))
      i++
      if (i >= fullText.length) clearInterval(interval)
    }, 25)
    return () => clearInterval(interval)
  }, [currentSceneKey])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(e => {
        if (videoRef.current) videoRef.current.muted = true;
      });
    }
  }, [currentSceneKey])

  const handleChoice = (choice: any) => {
    setIsGlitching(true)
    setTimeout(() => {
      if (choice.impact) {
        if (choice.impact.favor) {
          setFavor((prev: any) => ({ ...prev, [choice.impact.favor]: prev[choice.impact.favor] + (choice.impact.divinity || 5) }))
        }
        setDivinity(prev => prev + (choice.impact.divinity || 0))
        setMortality(prev => Math.max(0, prev + (choice.impact.mortality || 0)))
      }
      if (choice.next === "FINISH") alert("PROLOGUE COMPLETE: THE WAR BEGINS")
      else setCurrentSceneKey(choice.next)
      setIsGlitching(false)
    }, 400)
  }

  if (!mounted) return null
  const scene = story[currentSceneKey]

  const hasWarning = scene.text.startsWith("[")
  const warningContent = hasWarning ? scene.text.substring(scene.text.indexOf("[") + 1, scene.text.indexOf("]")) : null

  return (
    <div className="min-h-screen bg-[#080808] text-stone-200 font-serif overflow-hidden flex flex-col">
      <div className="h-20 border-b border-stone-900 flex items-center justify-between px-12 bg-black/60 backdrop-blur-2xl z-50">
        <div className="flex gap-10 items-center">
          <div className="space-y-1">
            <p className="text-[9px] uppercase tracking-[0.4em] text-stone-500">Divine Essence</p>
            <div className="w-32 h-1 bg-stone-800 rounded-full">
              <div className="h-full bg-amber-500 shadow-[0_0_10px_#f59e0b]" style={{ width: `${divinity}%` }} />
            </div>
          </div>
          <div className="h-8 w-px bg-stone-800" />
          <div className="flex gap-6 text-stone-400">
            <div className="flex items-center gap-2"><Wind className="w-3 h-3" /> <span>{favor.zeus}</span></div>
            <div className="flex items-center gap-2"><Anchor className="w-3 h-3" /> <span>{favor.poseidon}</span></div>
            <div className="flex items-center gap-2"><Skull className="w-3 h-3" /> <span>{favor.hades}</span></div>
          </div>
        </div>
      </div>

      <main className="relative flex-1 flex flex-col">
        <div className="absolute inset-0 z-0">
          {scene.video ? (
            <video
              ref={videoRef}
              key={currentSceneKey}
              autoPlay
              loop
              playsInline
              className={`w-full h-full object-cover brightness-[0.3] ${isGlitching ? 'scale-110' : 'scale-100'}`}
            >
              <source src={scene.video} type="video/mp4" />
            </video>
          ) : (
            <img src={scene.bg} className="w-full h-full object-cover brightness-[0.3]" alt="background" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
        </div>

        <div className="absolute bottom-0 right-0 h-[85vh] z-10 pointer-events-none">
          {scene.characterImg && (
            <img src={scene.characterImg} className={`h-full object-contain transition-all duration-1000 ${isGlitching ? 'opacity-0' : 'opacity-100'}`} alt="character" />
          )}
        </div>

        <div className="mt-auto relative z-20 p-12 lg:p-24">
          <div className="max-w-4xl space-y-10">
            <div className="space-y-3">
              <span className="text-amber-700 text-[11px] tracking-[0.6em] font-black uppercase block">{scene.speaker}</span>
              <p className="text-stone-500 text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 italic"><MapPin className="w-3 h-3" /> {scene.location}</p>
            </div>

            <div className="min-h-[160px]">
              <div className="text-2xl lg:text-4xl leading-tight text-stone-100 font-serif italic antialiased">
                {hasWarning && displayText.length > 5 && (
                  <span className="text-xs block mb-6 font-sans not-italic tracking-[0.3em] text-amber-500 uppercase font-black animate-pulse border-l-2 border-amber-600 pl-4">
                    {displayText.includes("]") ? warningContent : "READING DESTINY..."}
                  </span>
                )}
                <span>"{hasWarning ? (displayText.includes("]") ? displayText.split("]")[1].trim() : "...") : displayText}"</span>
                <span className="w-2 h-2 bg-amber-600 inline-block ml-2 animate-ping" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {scene.choices.map((choice: any, i: number) => (
                <button
                  key={i}
                  onClick={() => handleChoice(choice)}
                  className="group relative p-6 bg-stone-900/20 border border-stone-800/50 hover:border-amber-900/50 hover:bg-amber-900/10 transition-all text-left"
                >
                  <p className="text-[9px] uppercase tracking-widest text-stone-600 mb-2">Destiny 0{i + 1}</p>
                  <p className="text-sm tracking-widest group-hover:text-amber-500 transition-colors">{choice.text}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}