import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Footprints, 
  Apple, 
  User, 
  ArrowRight, 
  Activity, 
  Flame, 
  TrendingUp, 
  Scale, 
  ChevronRight,
  Sparkles,
  Search,
  Compass
} from 'lucide-react';
import { UserProfile } from '../types';

interface HomeTabProps {
  steps: number;
  stepGoal: number;
  sensorActive: boolean;
  bmiClassification: string;
  setActiveTab: (tab: 'home' | 'food' | 'steps' | 'profile') => void;
  authUser: any;
  profile: UserProfile;
  waterIntake: number;
  setWaterIntake: React.Dispatch<React.SetStateAction<number>>;
}

export default function HomeTab({
  steps,
  stepGoal,
  sensorActive,
  bmiClassification,
  setActiveTab,
  authUser,
  profile,
}: HomeTabProps) {

  // Computed Calories from steps (0.04 kcal per step is standard)
  const caloriesBurned = useMemo(() => {
    return Math.round(steps * 0.04);
  }, [steps]);

  // Dynamic Time-of-Day Welcoming Greeting
  const greetingKey = useMemo(() => {
    const userName = authUser?.name || 'Friend';
    try {
      const hrs = new Date().getHours();
      if (hrs >= 5 && hrs < 12) return `Good Morning, ${userName} 👋`;
      if (hrs >= 12 && hrs < 17) return `Good Afternoon, ${userName} 👋`;
      if (hrs >= 17 && hrs < 22) return `Good Evening, ${userName} 👋`;
      return `Welcome back, ${userName} 👋`;
    } catch {
      return `Welcome, ${userName} 👋`;
    }
  }, [authUser]);

  // Professional health assistant message based on medical/clinical BMI ranges
  const medicalAdvocation = useMemo(() => {
    if (bmiClassification === 'Healthy') {
      return "Your BMI is in the optimal range. Maintaining regular low-impact pacing and clean-label hydration keeps your metabolic rate balanced.";
    }
    if (bmiClassification === 'Overweight' || bmiClassification === 'Obesity') {
      return "To support gentle caloric deficit, explore fiber-rich foods and high-protein suggestions. Small, steady increases in step counts form lifelong changes.";
    }
    if (bmiClassification === 'Underweight') {
      return "To foster lean muscle mass building, consider complex carbs and quality proteins like Greek yogurts, eggs, and nutrient-dense fats.";
    }
    return "Check our biometrics and search healthy food alternatives to support your active routine today.";
  }, [bmiClassification]);

  // Live BMI calculation
  const calculatedBmi = useMemo(() => {
    if (!profile.height || !profile.weight) return 0;
    return Math.round((profile.weight / Math.pow(profile.height / 100, 2)) * 10) / 10;
  }, [profile]);

  return (
    <div className="space-y-6 pb-6 select-none animate-in fade-in slide-in-from-bottom-2 duration-300">
      
      {/* 1. WELCOME MESSAGE SECTION */}
      <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-3xl relative overflow-hidden backdrop-blur-md">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/[0.02] to-transparent pointer-events-none" />
        <div className="space-y-2 text-left relative z-10">
          <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-emerald-450 bg-emerald-500/10 px-3 py-1 rounded-full inline-flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
            Active Wellness Session
          </span>
          <h1 className="font-display text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
            {greetingKey}
          </h1>
          <p className="text-xs md:text-sm text-slate-400 max-w-2xl leading-relaxed">
            {medicalAdvocation}
          </p>
        </div>
      </div>

      {/* Grid: 2. BMI SUMMARY & HEALTH STATUS (Left Container) & 3. TODAY'S ACTIVITY SUMMARY (Right Container) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* 2. BMI SUMMARY & HEALTH STATUS COLUMN (7 Columns) */}
        <div className="lg:col-span-7 bg-slate-900/40 border border-slate-800/80 p-6 rounded-3xl flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/[0.015] filter blur-2xl rounded-full pointer-events-none" />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-850 pb-3">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase block">Daily Biometrics</span>
                <h3 className="font-display text-base font-bold text-slate-200">BMI Summary & Health Status</h3>
              </div>
              <Activity className="w-5 h-5 text-emerald-450 opacity-80" />
            </div>

            {/* Central Score Block */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center py-2">
              <div className="text-center sm:text-left space-y-1.5">
                <div className="flex items-baseline justify-center sm:justify-start gap-2">
                  <span className="text-5xl font-mono font-extrabold text-white tracking-tight">
                    {calculatedBmi}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-widest">Index</span>
                </div>
                
                <div className="inline-block mt-1">
                  <span className={`text-xs font-bold tracking-wider uppercase font-mono px-3.5 py-1.5 rounded-full border ${
                    bmiClassification === 'Healthy' 
                      ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400' 
                      : 'bg-amber-500/5 border-amber-500/20 text-amber-400'
                  }`}>
                    {bmiClassification} Zone
                  </span>
                </div>
              </div>

              {/* Physical Parameters List */}
              <div className="bg-slate-950/40 border border-slate-850 p-4 rounded-2xl grid grid-cols-2 gap-3 font-mono text-[11px] text-slate-400">
                <div className="space-y-0.5">
                  <span className="text-slate-500 uppercase text-[9px] block">Weight</span>
                  <span className="font-bold text-slate-250 block">{profile.weight} kg</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-slate-500 uppercase text-[9px] block">Height</span>
                  <span className="font-bold text-slate-250 block">{profile.height} cm</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-slate-500 uppercase text-[9px] block">Age / Gender</span>
                  <span className="font-bold text-slate-250 block capitalize">{profile.age}y / {profile.gender}</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-slate-500 uppercase text-[9px] block">Activity level</span>
                  <span className="font-bold text-teal-400 block capitalize truncate">{profile.activityLevel}</span>
                </div>
              </div>
            </div>

            {/* Clinical Slider Bar Gauge */}
            <div className="space-y-2 pt-2">
              <div className="w-full h-2.5 bg-slate-950 rounded-full flex overflow-hidden p-[1.5px] border border-slate-850/80">
                <div className="flex-1 bg-teal-500/30 rounded-l-full" title="Underweight" />
                <div className="flex-1 bg-emerald-505 border-x border-slate-950" title="Healthy Range" />
                <div className="flex-1 bg-amber-500/30" title="Overweight" />
                <div className="flex-1 bg-rose-500/25 rounded-r-full" title="Obesity" />
              </div>
              <div className="flex justify-between text-[9px] font-mono text-slate-500">
                <span className="flex flex-col items-start">
                  <span>Underweight</span>
                  <span className="font-bold text-slate-600">&lt; 18.5</span>
                </span>
                <span className="flex flex-col items-center">
                  <span className="text-emerald-400">Healthy</span>
                  <span className="font-bold text-slate-600">18.5 - 24.9</span>
                </span>
                <span className="flex flex-col items-center">
                  <span>Overweight</span>
                  <span className="font-bold text-slate-600">25.0 - 29.9</span>
                </span>
                <span className="flex flex-col items-end">
                  <span>Obese</span>
                  <span className="font-bold text-slate-600">30.0+</span>
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-850 pt-3 text-[10px] text-slate-500 font-mono mt-4">
            BMI values computed using metric formula • Standard clinical classifications
          </div>
        </div>

        {/* 3. TODAY'S ACTIVITY SUMMARY (5 Columns) */}
        <div className="lg:col-span-5 bg-slate-900/40 border border-slate-800/80 p-6 rounded-3xl flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/[0.015] filter blur-2xl rounded-full pointer-events-none" />

          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-850 pb-3">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#10b981] uppercase block">Steps Tracker</span>
                <h3 className="font-display text-base font-bold text-slate-200">Today's Activity Summary</h3>
              </div>
              <Footprints className="w-5 h-5 text-emerald-400 opacity-85" />
            </div>

            {/* Circular step completion visualization helper */}
            <div className="flex flex-col items-center justify-center py-2">
              <div className="relative w-36 h-36 flex items-center justify-center bg-slate-950/40 rounded-full border border-slate-850/65 shadow-inner">
                
                {/* Clean SVG Circle Gauge */}
                <svg className="w-full h-full transform -rotate-90 p-1.5 absolute">
                  <circle 
                    cx="72" 
                    cy="72" 
                    r="62" 
                    className="stroke-slate-850 fill-none" 
                    strokeWidth="7"
                  />
                  <circle 
                    cx="72" 
                    cy="72" 
                    r="62" 
                    className="stroke-emerald-500 fill-none stroke-linecap-round filter drop-shadow-[0_0_2px_rgba(16,185,129,0.3)]"
                    strokeWidth="7"
                    strokeDasharray={2 * Math.PI * 62}
                    strokeDashoffset={2 * Math.PI * 62 * (1 - Math.min(1.0, steps / stepGoal))}
                  />
                </svg>

                <div className="text-center z-10">
                  <span className="text-2xl font-mono font-extrabold text-white leading-none">
                    {steps.toLocaleString()}
                  </span>
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mt-0.5">
                    / {stepGoal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Calories and goals list details */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-slate-950/60 p-3.5 border border-slate-850 rounded-2xl">
                <div className="text-[9px] font-mono font-bold tracking-widest text-slate-500 uppercase">Est. Burned</div>
                <div className="text-base font-mono font-bold text-slate-250 mt-1 flex items-center justify-center gap-1">
                  <Flame className="w-4 h-4 text-orange-450" />
                  {caloriesBurned} <span className="text-[10px] text-slate-500 font-sans">kcal</span>
                </div>
              </div>

              <div className="bg-slate-950/60 p-3.5 border border-slate-850 rounded-2xl">
                <div className="text-[9px] font-mono font-bold tracking-widest text-slate-500 uppercase">Streak status</div>
                <div className="text-base font-mono font-bold text-emerald-400 mt-1 flex items-center justify-center gap-1 font-display">
                  Active
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setActiveTab('steps')}
            className="w-full mt-4 py-2 bg-slate-950 hover:bg-slate-950/80 border border-slate-850 rounded-xl text-[11px] font-mono font-bold tracking-wider uppercase text-slate-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Open Pedometer Dashboard</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          </button>
        </div>

      </div>

      {/* QUICK ACCESS BLOCK GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
        
        {/* 4. QUICK ACCESS TO FOOD SEARCH */}
        <div 
          onClick={() => setActiveTab('food')}
          className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-3xl hover:border-emerald-500/20 cursor-pointer group transition-all relative overflow-hidden flex flex-col justify-between"
        >
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 opacity-20" />
          
          <div className="flex gap-4 items-start pb-4">
            <div className="w-11 h-11 shrink-0 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-lg shadow-sm">
              <Search className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="space-y-1 text-left">
              <h4 className="font-display font-bold text-sm text-slate-200 group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                <span>Quick Food Search</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </h4>
              <p className="text-xs text-slate-400 leading-normal">
                Analyze suitability and macro parameters of 50+ localized dishes. Confirm if you can Eat, Limit, or Avoid options instantly.
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-between font-mono text-[9px] font-bold text-slate-500 border-t border-slate-850/80 pt-3">
            <span>SUITABILITY CHECKER</span>
            <span className="text-emerald-400 group-hover:underline">TRY NOW &rarr;</span>
          </div>
        </div>

        {/* 5. QUICK ACCESS TO DIET PLAN */}
        <div 
          onClick={() => setActiveTab('food')}
          className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-3xl hover:border-teal-500/20 cursor-pointer group transition-all relative overflow-hidden flex flex-col justify-between"
        >
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-teal-500 to-cyan-400 opacity-20" />
          
          <div className="flex gap-4 items-start pb-4">
            <div className="w-11 h-11 shrink-0 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 text-lg shadow-sm">
              <Apple className="w-5 h-5 text-teal-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="space-y-1 text-left">
              <h4 className="font-display font-bold text-sm text-slate-200 group-hover:text-teal-400 transition-colors flex items-center gap-1.5">
                <span>Personalized Diet suggestions</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </h4>
              <p className="text-xs text-slate-400 leading-normal">
                Review profile-adaptive dietitian blueprints optimized directly for your active BMI score class ({bmiClassification}).
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between font-mono text-[9px] font-bold text-slate-500 border-t border-slate-850/80 pt-3">
            <span>BIO-DIETARY PLAN</span>
            <span className="text-teal-400 group-hover:underline">VIEW MEALS &rarr;</span>
          </div>
        </div>

      </div>

    </div>
  );
}
