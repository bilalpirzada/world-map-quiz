"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
//import { WorldMap } from "@/components/map/WorldMap";
import { ScoreBoard } from "@/components/ui/ScoreBoard";
import { useGameState } from "@/hooks/useGameState";
import { countries } from "@/data/countries";

import dynamic from "next/dynamic";

const WorldMap = dynamic(
  () => import("@/components/map/WorldMap").then(mod => mod.WorldMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full bg-[#0a1628] rounded-xl">
        <p className="text-gray-400 animate-pulse">Loading map...</p>
      </div>
    ),
  }
);

const ALPHA3_TO_NUMERIC: Record<string, string> = {
  // Europe
  FRA: "250", DEU: "276", GBR: "826", ITA: "380", ESP: "724",
  PRT: "620", NLD: "528", CHE: "756", SWE: "752", NOR: "578",
  POL: "616", UKR: "804", GRC: "300",
  // Asia
  JPN: "392", IND: "356", CHN: "156", KOR: "410", IDN: "360",
  SAU: "682", TUR: "792", PAK: "586", BGD: "50", THA: "764",
  VNM: "704", IRN: "364",
  // Africa
  EGY: "818", ZAF: "710", NGA: "566", ETH: "231", KEN: "404",
  TZA: "834", GHA: "288", MAR: "504", DZA: "12",
  // Americas
  USA: "840", CAN: "124", MEX: "484", BRA: "76", ARG: "32",
  COL: "170", CHL: "152", PER: "604", VEN: "862",
  // Oceania
  AUS: "36", NZL: "554",
};

export const GameController = () => {
  const { state, submitAnswer, nextQuestion, resetGame, isGameOver } =
    useGameState("flag", "medium");

  const [feedbackId, setFeedbackId] = useState<string | null>(null);
  const [isCorrectFeedback, setIsCorrectFeedback] = useState<boolean | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const currentNumericId = state.currentQuestion
    ? ALPHA3_TO_NUMERIC[state.currentQuestion.id]
    : undefined;

  const handleCountryClick = (numericId: string, name: string) => {
   
    if (state.isCorrect !== null) return; // already answered

    // find alpha3 from numeric
    const alpha3 = Object.entries(ALPHA3_TO_NUMERIC).find(
      ([, v]) => v === numericId
    )?.[0];

  

    if (!alpha3) return; // clicked a country not in our dataset

   const isCorrect = alpha3 === state.currentQuestion?.id;
setIsCorrectFeedback(isCorrect);
setFeedbackMessage(
  isCorrect
    ? `✅ Correct! That's ${state.currentQuestion?.name}!`
    : `❌ Wrong! That was ${name}. The answer was ${state.currentQuestion?.name}.`
);

if (isCorrect) {
  // flash the correct country green
  setFeedbackId(ALPHA3_TO_NUMERIC[state.currentQuestion!.id]);
} else {
  // flash the clicked country red
  setFeedbackId(numericId);
}

submitAnswer(alpha3);

setTimeout(() => {
  setFeedbackId(null);
  setIsCorrectFeedback(null);
  setFeedbackMessage("");
  nextQuestion();
}, 3000);
  };


  const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) {
  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-gray-400 animate-pulse text-lg">Loading map...</p>
    </div>
  );
}


  if (isGameOver) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-6 text-white">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <p className="text-6xl mb-4">🌍</p>
          <h2 className="text-3xl font-bold mb-2">Game Over!</h2>
          <p className="text-gray-400 mb-1">Final Score</p>
          <p className="text-5xl font-bold text-yellow-400">
            {state.score.toLocaleString()}
          </p>
          <p className="text-gray-400 mt-2">
            {state.answeredIds.length} countries answered
          </p>
        </motion.div>
        <button
          onClick={resetGame}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold transition-colors"
        >
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full gap-4">

      {/* Scoreboard */}
      <ScoreBoard
        score={state.score}
        streak={state.streak}
        lives={state.lives}
        totalAnswered={state.answeredIds.length}
        maxLives={3}
      />

      {/* Question Card */}
      <AnimatePresence mode="wait">
        {state.currentQuestion && (
         <motion.div
  key={state.currentQuestion.id}
  initial={{ opacity: 0, y: -10, scale: 0.95 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  exit={{ opacity: 0, y: 10, scale: 0.95 }}
  className="text-center py-4 px-4 bg-[#0d1f35] border border-[#1e3a5f] rounded-xl relative overflow-hidden"
>
  {/* Continent badge */}
  <span className="absolute top-3 right-3 text-xs px-2 py-1 rounded-full bg-[#1e3a5f] text-blue-300 font-medium">
    {state.currentQuestion.continent}
  </span>

  <p className="text-gray-400 text-sm mb-2">Click the country on the map</p>

  <motion.p
    className="text-6xl mb-2 drop-shadow-lg"
    initial={{ rotate: -10, scale: 0.5 }}
    animate={{ rotate: 0, scale: 1 }}
    transition={{ type: "spring", stiffness: 200, damping: 12 }}
  >
    {state.currentQuestion.flag}
  </motion.p>

  <p className="text-white font-bold text-2xl tracking-wide">{state.currentQuestion.name}</p>
  <p className="text-gray-400 text-sm mt-1">Capital: {state.currentQuestion.capital}</p>
</motion.div>
        )}
      </AnimatePresence>

      {/* Feedback Message */}
    <AnimatePresence>
  {feedbackMessage && (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`text-center py-3 px-4 rounded-xl font-semibold text-sm ${
        isCorrectFeedback
          ? "bg-green-900/50 text-green-300 border border-green-700"
          : "bg-red-900/50 text-red-300 border border-red-700"
      }`}
    >
      <p>{feedbackMessage}</p>
      {state.currentQuestion && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xs mt-2 text-gray-300 italic"
        >
          💡 {state.currentQuestion.funFact}
        </motion.p>
      )}
    </motion.div>
  )}
</AnimatePresence>

      {/* Map */}
      <div className="flex-1 min-h-0">
        <WorldMap
          // highlightId={undefined}
           correctId={isCorrectFeedback === true ? feedbackId ?? undefined : undefined}
           wrongId={isCorrectFeedback === false ? feedbackId ?? undefined : undefined}
           onCountryClick={handleCountryClick}
           interactive={state.isCorrect === null}
        />
      </div>

    </div>
  );
};