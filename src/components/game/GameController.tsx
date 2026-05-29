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

// ISO alpha-3 to numeric map (subset for our dataset)
const ALPHA3_TO_NUMERIC: Record<string, string> = {
  FRA: "250", BRA: "076", JPN: "392", USA: "840",
  EGY: "818", AUS: "036", IND: "356", ZAF: "710",
  CAN: "124", ARG: "032",
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
    setFeedbackId(numericId);
    setFeedbackMessage(
      isCorrect
        ? `✅ Correct! That's ${state.currentQuestion?.name}!`
        : `❌ Wrong! That was ${name}. The answer was ${state.currentQuestion?.name}.`
    );

    submitAnswer(alpha3);

    setTimeout(() => {
      setFeedbackId(null);
      setIsCorrectFeedback(null);
      setFeedbackMessage("");
      nextQuestion();
    }, 2000);
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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-center py-3 px-4 bg-[#0d1f35] border border-[#1e3a5f] rounded-xl"
          >
            <p className="text-gray-400 text-sm mb-1">Click the country on the map</p>
            <p className="text-4xl mb-1">{state.currentQuestion.flag}</p>
            <p className="text-white font-bold text-xl">{state.currentQuestion.name}</p>
            <p className="text-gray-400 text-sm">Capital: {state.currentQuestion.capital}</p>
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
            className={`text-center py-2 px-4 rounded-xl font-semibold text-sm ${
              isCorrectFeedback
                ? "bg-green-900/50 text-green-300 border border-green-700"
                : "bg-red-900/50 text-red-300 border border-red-700"
            }`}
          >
            {feedbackMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map */}
      <div className="flex-1 min-h-0">
        <WorldMap
          // highlightId={undefined}
          // correctId={isCorrectFeedback === true ? feedbackId ?? undefined : undefined}
          // wrongId={isCorrectFeedback === false ? feedbackId ?? undefined : undefined}
          // onCountryClick={handleCountryClick}
          // interactive={state.isCorrect === null}
        />
      </div>

    </div>
  );
};