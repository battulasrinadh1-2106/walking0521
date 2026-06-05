import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Apple, Heart, Compass, Sparkles, Smile, ArrowRight, LogIn, UserPlus, Undo2 } from 'lucide-react';
// Removed Companion3D to center focus on professional biometrics presentation

interface SplashProps {
  onGetStarted: (mode: 'login' | 'register') => void;
}

export default function Splash({ onGetStarted }: SplashProps) {
  const [currentScreen, setCurrentScreen] = useState<'intro' | 'hub'>('intro');

  // Play a welcoming sound tone on mount
  useEffect(() => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.18);
      }
    } catch {}
  }, []);

  const triggerTransitionSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      }
    } catch {}
  };

  const handleNextScreen = () => {
    triggerTransitionSound();
    setCurrentScreen('hub');
  };

  const handleAuthRedirect = (mode: 'login' | 'register') => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.03, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      }
    } catch {}
    onGetStarted(mode);
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-slate-950 text-slate-100 px-6 py-10 overflow-hidden items-center selection:bg-emerald-500/30">
      
      {/* Soft Background Neon Orbs */}
      <div className="absolute top-[10%] left-[-20%] w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-20%] w-[500px] h-[500px] rounded-full bg-teal-500/5 blur-[140px] pointer-events-none" />

      {/* Header Bar */}
      <div className="w-full flex justify-between items-center max-w-lg z-15">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Apple className="w-5 h-5 text-slate-950 stroke-[2.5]" />
          </div>
          <span className="font-display font-extrabold text-xs tracking-wider bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent uppercase">
            HealthMate
          </span>
        </div>
        <div className="px-2.5 py-0.5 bg-slate-900 border border-slate-800 rounded-full text-[10px] font-mono text-emerald-450 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          ACTIVE STAGE
        </div>
      </div>

      {/* Interactive Onboarding Screens wrapper */}
      <AnimatePresence mode="wait">
        {currentScreen === 'intro' ? (
          
          /* ==================================================
             FIRST SCREEN (Walk In, Wave, Smile, Blink Onboarding Intro)
             ================================================== */
          <motion.div
            key="screen-introduction"
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -15 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="w-full max-w-lg bg-slate-900/40 border border-slate-850 p-6 md:p-8 rounded-3xl backdrop-blur-xl shadow-2xl relative z-20 text-center flex flex-col items-center my-auto space-y-6"
          >
            {/* High fidelity branding icon card */}
            <div className="w-full h-44 relative bg-slate-950/60 border border-slate-900/80 rounded-2xl p-6 overflow-hidden flex flex-col items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-teal-500/5 opacity-60 pointer-events-none" />
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500/15 to-teal-405/15 border border-emerald-500/25 flex items-center justify-center text-emerald-450 shadow-xl shadow-emerald-505/5 mb-3">
                <Apple className="w-8 h-8 text-emerald-400" />
              </div>
              <div className="text-[10px] uppercase font-mono tracking-widest font-bold text-slate-400">
                AI Health Assistant
              </div>
            </div>

            {/* Emotional and simple custom introducing headers */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-405 block">Meet Your Companion</span>
              <h1 className="font-display text-2xl md:text-3xl font-black tracking-tight text-slate-100">
                👋 Hi! I'm HealthMate.
              </h1>
              <p className="text-xs text-emerald-400 font-medium font-sans max-w-xs mx-auto">
                Your personal health companion. Let's start healthy choices together!
              </p>
            </div>

            {/* Explanation of purpose - emotional and simple criteria list */}
            <div className="w-full bg-slate-950/60 border border-slate-900 rounded-2xl p-4 text-left space-y-3">
              <span className="text-[9px] font-mono font-bold tracking-wider text-slate-500 uppercase block">I will help you:</span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 shrink-0 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-xs">🍎</div>
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-200 block">Food Choices</span>
                    <p className="text-[10px] text-slate-450 leading-snug">Make better food choices daily.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 shrink-0 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-xs">🚶</div>
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-200 block">Stay Active</span>
                    <p className="text-[10px] text-slate-450 leading-snug">Track steps & daily walk metrics.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 shrink-0 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-xs">💪</div>
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-200 block">Healthy Habits</span>
                    <p className="text-[10px] text-slate-450 leading-snug">Build habits designed to persist.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 shrink-0 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-xs">❤️</div>
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-200 block">Self Care</span>
                    <p className="text-[10px] text-slate-450 leading-snug">Take care of yourself every day.</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Glowing Action Trigger */}
            <div className="w-full pt-1">
              <motion.button
                id="splash-begin-journey-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNextScreen}
                className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-display font-black uppercase text-xs tracking-wider rounded-2xl shadow-lg shadow-emerald-500/15 cursor-pointer flex items-center justify-center gap-2 transition-all"
              >
                <span>✨ Let's Begin Our Journey</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </motion.button>
            </div>
          </motion.div>
        ) : (
          
          /* ==================================================
             SECOND SCREEN (Auth Hub, Sign In or Registered User Action)
             ================================================== */
          <motion.div
            key="screen-hub"
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -15 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="w-full max-w-lg bg-slate-900/40 border border-slate-850 p-6 md:p-8 rounded-3xl backdrop-blur-xl shadow-2xl relative z-20 text-center flex flex-col items-center my-auto space-y-6"
          >
            {/* High fidelity branding icon card */}
            <div className="w-full h-44 relative bg-slate-950/60 border border-slate-900/80 rounded-2xl p-6 overflow-hidden flex flex-col items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-teal-500/5 opacity-60 pointer-events-none" />
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500/15 to-teal-405/15 border border-emerald-500/25 flex items-center justify-center text-teal-400 shadow-xl shadow-teal-505/5 mb-3">
                <Heart className="w-8 h-8 text-teal-450 animate-pulse" />
              </div>
              <div className="text-[10px] uppercase font-mono tracking-widest font-bold text-slate-405">
                Ready to Synchronize
              </div>
            </div>

            {/* Beautiful greeting criteria text */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-teal-400 block">Gateway Entry</span>
              <h2 className="font-display text-2xl font-black tracking-tight text-slate-100">
                Welcome to HealthMate.
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-xs mx-auto">
                Let's create a healthier future together. Let's verify your credentials!
              </p>
            </div>

            {/* Split balanced triggers */}
            <div className="w-full grid grid-cols-2 gap-4">
              <motion.button
                id="splash-hub-login"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAuthRedirect('login')}
                className="py-3.5 px-4 bg-slate-950/90 hover:bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-2xl text-slate-200 font-display font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer transition-all"
                title="Log In"
              >
                <LogIn className="w-4 h-4 text-emerald-450" />
                <span>Login</span>
              </motion.button>

              <motion.button
                id="splash-hub-register"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAuthRedirect('register')}
                className="py-3.5 px-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/15 hover:to-teal-500/15 border border-emerald-500/20 hover:border-emerald-500/30 rounded-2xl text-emerald-400 font-display font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer transition-all"
                title="Create Account"
              >
                <UserPlus className="w-4 h-4 text-emerald-400" />
                <span>Register</span>
              </motion.button>
            </div>

            {/* Replay intro trigger */}
            <button
              onClick={() => {
                triggerTransitionSound();
                setCurrentScreen('intro');
              }}
              className="text-[10px] font-mono text-slate-500 hover:text-slate-400 flex items-center gap-1.5 transition-colors cursor-pointer bg-slate-950/25 py-1.5 px-3.5 border border-slate-900 rounded-lg mt-1"
            >
              <Undo2 className="w-3.5 h-3.5" />
              <span>Back to introduction tutorial</span>
            </button>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Cozy Footer Credits */}
      <div className="text-center z-10">
        <p className="text-[10px] text-slate-700 font-mono flex items-center justify-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-slate-700" />
          HealthMate • Your Loving Wellness Companion
        </p>
      </div>

    </div>
  );
}
