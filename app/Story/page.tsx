"use client"

import { useState, useEffect, useRef, useSyncExternalStore } from "react"
import { MapPin, Wind, Anchor, Skull, Zap, Flame } from "lucide-react"

// Hydration helper to prevent SSR mismatch
const subscribe = () => () => {}

export default function StoryMode() {
  const isClient = useSyncExternalStore(subscribe, () => true, () => false)

  // --- CORE GAME STATE ---
  const [currentSceneKey, setCurrentSceneKey] = useState("the_forge")
  const [displayText, setDisplayText] = useState("")
  const [isGlitching, setIsGlitching] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [divinity, setDivinity] = useState(10)
  const [mortality, setMortality] = useState(90)
  const [favor, setFavor] = useState({ zeus: 0, poseidon: 0, hades: 0 })

  // --- COMBAT ENGINE STATE ---
  const [timeLeft, setTimeLeft] = useState(3.0)
  const [holdProgress, setHoldProgress] = useState(0)
  const [isParryWindow, setIsParryWindow] = useState(false)
  const holdInterval = useRef<NodeJS.Timeout | null>(null)

  const story: any = {
   the_forge: {
     video: "/videos/olympus-forge.mp4",
     characterImg: "/images/clay-form.png",
     speaker: "The Fates",
     location: "The Loom of Destiny",
     text: "Before the first heartbeat echoed in the halls of man, your spirit was forged in the heart of a Great Storm. You lie upon the Anvil of Heaven, waiting for the spark of your father to wake you.",
     choices: [{ text: "Listen to the thunder roll...", next: "the_loom" }]
   },
   the_loom: {
     video: "/videos/olympus-forge.mp4",
     characterImg: "/images/clay-form.png",
     speaker: "The Fates",
     location: "The Loom of Destiny",
     text: "Clotho draws a thread of pure electric blue from the spindle. 'The seed of Olympus,' they whisper. 'A prince of the clouds, cast down to walk among the dust of Troy.'",
     choices: [{ text: "Feel the static in your veins...", next: "the_awakening" }]
   },
   the_awakening: {
     video: "/videos/olympus-forge.mp4",
     characterImg: "/images/clay-form.png",
     speaker: "The Fates",
     location: "The Loom of Destiny",
     text: "[PROPHETIC WARNING: This choice will echo through the ages.] Will you be the Bolt that strikes the guilty, or the Light that guides the lost?",
     choices: [
       { text: "Claim the Wrath (Striking Bolt)", impact: { favor: "zeus", divinity: 10, mortality: -5 }, next: "transition_fury" },
       { text: "Claim the Glory (Guiding Light)", impact: { favor: "zeus", divinity: 5, mortality: 10 }, next: "transition_majesty" }
     ]
   },
   transition_fury: {
     video: "/videos/fury-choice.mp4",
     speaker: "The Storm",
     location: "Your Soul",
     text: "The heavens shatter as you seize the bolt. You are no longer clay; you are the lightning itself, hungry and merciless.",
     choices: [{ text: "Wake up...", next: "the_first_breath" }]
   },
   transition_majesty: {
     video: "/videos/majesty-choice.mp4",
     speaker: "The Light",
     location: "Your Soul",
     text: "A golden warmth spreads through your veins. You claim the storm, not to destroy, but to rule with the weight of a king.",
     choices: [{ text: "Wake up...", next: "the_first_breath" }]
   },
   the_first_breath: {
     video: "/videos/troy-arrival.mp4",
     speaker: "The Herald",
     location: "The Beaches of Troy",
     text: "The smell of ozone vanishes, replaced by salt spray. 'Heir of the Storm,' a warrior shouts, 'the King demands your blade at the gates!'",
     choices: [
       { text: "To the front lines (Seek Glory)", next: "transition_glory" },
       { text: "Study the walls (Seek Strategy)", next: "transition_strategy" }
     ]
   },
   transition_glory: {
     video: "/videos/vanguard-rush.mp4",
     speaker: "The Bloodlust",
     location: "The Red Sands",
     text: "The air screams as you lead the first wave into the bronze teeth of the Trojan defense.",
     choices: [{ text: "Enter the fray...", next: "the_vanguard_charge" }]
   },
   transition_strategy: {
     video: "/videos/strategy-survey.mp4",
     speaker: "The Insight",
     location: "The High Dunes",
     text: "The chaos of the landing settles into a readable map of steel and shadow.",
     choices: [{ text: "Gather your thoughts...", next: "the_shore" }]
   },
   the_vanguard_charge: {
     video: "/videos/achilles-combat.mp4",
     characterImg: "/images/achilles-bronze.png",
     speaker: "Achilles",
     location: "The Scaean Plain",
     text: "Through the dust, a man moves like a god—Achilles. 'So, the Fates finally sent their lightning bolt,' he sneers.",
     choices: [
       { text: "Challenge his arrogance", impact: { favor: "zeus" }, next: "cinematic_achilles_run" },
       { text: "Fight at his side", next: "transition_breach" }
     ]
   },
 
   cinematic_achilles_run: {
     video: "/videos/achilles-running.mp4", 
     speaker: "Achilles",
     location: "The Scaean Plain",
     text: "'THEN DIE LIKE THE MANKIND YOU CHERISH!' He breaks into a sprint, his spear leveled like a bolt of judgment.",
     choices: [{ text: "Brace yourself...", next: "cinematic_clash" }]
   },
 
   cinematic_clash: {
     video: "/videos/swords-clashing-initial.mp4",
     speaker: "The Spark",
     location: "The Point of Contact",
     text: "CLANG. Steel meets bronze. The force of his impact nearly buckles your knees. Your blades are locked, hissing with friction.",
     choices: [{ text: "HOLD THE LINE!", next: "transition_challenge" }]
   },
 
   transition_challenge: {
     isCombat: true,
     video: "/videos/achilles-standoff.mp4",
     vfxOverlay: "/videos/parry-sparks.mp4",
     speaker: "The Ego",
     location: "The Scaean Plain",
     text: "Achilles lunges. Time slows. React, or die.",
     choices: [] 
   },
 
   transition_breach: {
     video: "/videos/wall-assault.mp4",
     speaker: "The Storm",
     location: "The Trojan Gates",
     text: "Side by side, the Son of Thunder and the Son of Thetis become a whirlwind of bronze.",
     choices: [{ text: "Storm the gates!", next: "the_shore" }]
   },
 
   // --- PATH A: THE VICTOR'S JOURNEY ---
   outcome_stab: {
       video: "/videos/achilles-defeated.mp4",
       speaker: "Narrator",
       text: "You stood your ground. Your blade finds the gap in his legend. The Myrmidon King falls to one knee, the gold of his armor tarnished by the dust of his first defeat.",
       choices: [{ text: "Walk toward the Iron Coast", next: "the_victory_walk" }]
   },
   the_victory_walk: {
       video: "/videos/sunset-beach.mp4",
       speaker: "The Storm",
       location: "The Path to the Sea",
       text: "The adrenaline fades, replaced by the weight of your own mortality. You leave the screams of the battlefield behind for the cooling spray of the tide.",
       choices: [{ text: "Reach the water's edge", next: "the_shore" }]
   },
 
   // --- PATH B: THE FALLEN'S RESURRECTION ---
   outcome_beheaded: {
       video: "/videos/beheaded.mp4",
       speaker: "The Abyss",
       location: "The Void",
       text: "Too slow. The world tilts as your head leaves your shoulders. Darkness rushes in—cold, deep, and final.",
       choices: [{ text: "Let the darkness take you...", next: "the_river_styx" }]
   },
   the_river_styx: {
       video: "/videos/river-styx.mp4",
       characterImg: "/images/charon-ferryman.png",
       speaker: "Charon",
       location: "The Banks of the Styx",
       text: "A hooded figure maneuvers a skiff through the black water. 'The Son of Thunder is early,' he rasps. 'Give me a piece of your divinity, and I shall return you to the shore.'",
       choices: [
         { text: "Sacrifice power to return", impact: { divinity: -15, mortality: 10 }, next: "the_shore" },
         { text: "Refuse and fight the current", impact: { divinity: 5, mortality: -20 }, next: "the_shore" }
       ]
   },
 
   the_shore: {
     video: "/videos/troy-arrival.mp4",
     characterImg: "/images/nymph-echo.png",
     speaker: "Thetis",
     location: "The Iron Coast",
     text: "Whether you arrived by foot or by the tide of death, the sea does not care. A sea-nymph rises from the foam. 'The ocean remembers what the land forgets,' she whispers.",
     choices: [{ text: "Finish Prologue", next: "FINISH" }]
   },
 };
  // --- COMBAT LOGIC ---
  useEffect(() => {
    if (currentSceneKey === "transition_challenge") {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            handleChoice({ next: "outcome_beheaded" });
            return 0;
          }
          return prev - 0.1;
        });
      }, 100);

      const parryStart = setTimeout(() => setIsParryWindow(true), 1400);
      const parryEnd = setTimeout(() => setIsParryWindow(false), 1900);

      return () => {
        clearInterval(timer);
        clearTimeout(parryStart);
        clearTimeout(parryEnd);
      };
    }
  }, [currentSceneKey]);

  const startHold = () => {
    holdInterval.current = setInterval(() => {
      setHoldProgress((prev) => {
        if (prev >= 100) {
          clearInterval(holdInterval.current!);
          handleChoice({ next: "outcome_stab" });
          return 100;
        }
        return prev + 5;
      });
    }, 50);
  };

  const stopHold = () => {
    if (holdInterval.current) clearInterval(holdInterval.current);
    setHoldProgress(0);
  };

  // --- SCENE & VIDEO LOGIC ---
  useEffect(() => {
    if (!isClient) return;
    let i = 0;
    const fullText = story[currentSceneKey].text;
    setDisplayText("");
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 25);
    return () => clearInterval(interval);
  }, [currentSceneKey, isClient]);

  useEffect(() => {
    if (isClient && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {
        if (videoRef.current) videoRef.current.muted = true;
      });
    }
    setTimeLeft(3.0);
    setHoldProgress(0);
    setIsParryWindow(false);
  }, [currentSceneKey, isClient]);

  const handleChoice = (choice: any) => {
    setIsGlitching(true);
    setTimeout(() => {
      if (choice.impact) {
        if (choice.impact.favor) {
          setFavor((prev: any) => ({ ...prev, [choice.impact.favor]: prev[choice.impact.favor] + (choice.impact.divinity || 5) }))
        }
        setDivinity(prev => Math.min(100, prev + (choice.impact.divinity || 0)))
        setMortality(prev => Math.max(0, prev + (choice.impact.mortality || 0)))
      }
      if (choice.next === "FINISH") alert("PROLOGUE COMPLETE");
      else if (story[choice.next]) setCurrentSceneKey(choice.next);
      setIsGlitching(false);
    }, 400);
  };

  if (!isClient) return null;
  const scene = story[currentSceneKey];

  return (
    <div className="min-h-screen bg-[#080808] text-stone-200 font-serif overflow-hidden flex flex-col">
      {/* HEADER HUD */}
      <div className="h-20 border-b border-stone-900 flex items-center justify-between px-12 bg-black/60 backdrop-blur-2xl z-50">
        <div className="flex gap-10 items-center">
          <div className="space-y-1">
            <p className="text-[9px] uppercase tracking-[0.4em] text-stone-500">Divine Essence</p>
            <div className="w-32 h-1 bg-stone-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 shadow-[0_0_10px_#f59e0b] transition-all duration-1000" style={{ width: `${divinity}%` }} />
            </div>
          </div>
          <div className="h-8 w-px bg-stone-800" />
          <div className="flex gap-6 text-stone-400">
            <div className="flex items-center gap-2"><Wind className="w-3 h-3 text-sky-500" /> <span>{favor.zeus}</span></div>
            <div className="flex items-center gap-2"><Anchor className="w-3 h-3 text-blue-500" /> <span>{favor.poseidon}</span></div>
            <div className="flex items-center gap-2"><Skull className="w-3 h-3 text-red-700" /> <span>{favor.hades}</span></div>
          </div>
        </div>
      </div>

      <main className="relative flex-1 flex flex-col">
        {/* VIDEO LAYER */}
        <div className="absolute inset-0 z-0">
          <video ref={videoRef} key={currentSceneKey} autoPlay loop playsInline
            className={`w-full h-full object-cover brightness-[0.4] transition-transform duration-500 ${isGlitching ? 'scale-110 blur-sm' : 'scale-100'}`}
          >
            <source src={scene.video} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
        </div>

        {/* COMBAT OVERLAY */}
        {scene.isCombat && (
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center pointer-events-none">
            <div className="absolute inset-0 bg-red-950/20 animate-pulse" style={{ opacity: (3 - timeLeft) / 3 }} />
            <div className="relative flex flex-col items-center gap-12 pointer-events-auto">
              <div className="text-center">
                <span className="text-red-600 font-black tracking-[1.2em] uppercase text-[10px]">Fatal Choice</span>
                <div className="text-white text-6xl font-black italic tracking-tighter">0{timeLeft.toFixed(1)}s</div>
              </div>
              <div className="relative flex items-center justify-center">
                <div className={`absolute rounded-full border-2 transition-all duration-300 ${isParryWindow ? 'border-amber-400 w-56 h-56 scale-125 animate-ping' : 'border-stone-800 w-32 h-32'}`} />
                <svg className="absolute w-44 h-44 -rotate-90">
                  <circle cx="88" cy="88" r="82" stroke="#1c1917" strokeWidth="6" fill="transparent" />
                  <circle cx="88" cy="88" r="82" stroke="#b91c1c" strokeWidth="6" fill="transparent"
                    strokeDasharray={515} strokeDashoffset={515 - (515 * holdProgress) / 100}
                    className="transition-all duration-75"
                  />
                </svg>
                <button onMouseDown={startHold} onMouseUp={stopHold} onTouchStart={startHold} onTouchEnd={stopHold}
                  onClick={() => isParryWindow && handleChoice({ next: "outcome_stab" })}
                  className="relative z-10 w-24 h-24 bg-black border border-stone-800 rounded-full flex items-center justify-center active:scale-90 transition-all"
                >
                  <Zap className={`w-10 h-10 ${isParryWindow ? 'text-amber-400 animate-pulse' : 'text-stone-700'}`} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DIALOGUE LAYER */}
        {!scene.isCombat && (
          <div className="mt-auto relative z-20 p-12 lg:p-24">
            <div className="max-w-4xl space-y-10">
              <div className="space-y-3">
                <span className="text-amber-600 text-[11px] tracking-[0.8em] font-black uppercase block">{scene.speaker}</span>
                <p className="text-stone-500 text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 italic"><MapPin className="w-3 h-3" /> {scene.location}</p>
              </div>
              <div className="min-h-[140px]">
                <div className="text-2xl lg:text-5xl leading-tight text-white font-serif italic">"{displayText}"</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {scene.choices.map((choice: any, i: number) => (
                  <button key={i} onClick={() => handleChoice(choice)}
                    className="group relative p-6 bg-stone-900/30 border border-stone-800/50 hover:border-amber-600/50 hover:bg-amber-600/5 transition-all text-left"
                  >
                    <p className="text-[9px] uppercase tracking-widest text-stone-600 mb-2">Destiny 0{i + 1}</p>
                    <p className="text-sm tracking-widest text-stone-300 group-hover:text-amber-400">{choice.text}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}