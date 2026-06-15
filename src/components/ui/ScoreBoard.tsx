"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, Zap, Trophy, Target } from "lucide-react";

interface ScoreBoardProps {
  score: number;
  streak: number;
  lives: number;
  totalAnswered: number;
  maxLives: number;
}

export const ScoreBoard = ({
  score,
  streak,
  lives,
  totalAnswered,
  maxLives,
}: ScoreBoardProps) => {
  return (
  <div className="shrink-0 grid grid-cols-2 sm:flex sm:items-center sm:justify-between gap-2 sm:gap-0 w-full px-2 sm:px-4 py-2 sm:py-3 bg-[#0d1f35] border border-[#1e3a5f] rounded-xl">

    {/* Score */}
    <div className="flex items-center gap-1.5 sm:gap-2">
      <Trophy className="text-yellow-400 w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
      <div>
        <p className="text-[10px] sm:text-xs text-gray-400 leading-none">Score</p>
        <AnimatePresence mode="wait">
          <motion.p
            key={score}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-sm sm:text-lg font-bold text-white leading-none"
          >
            {score.toLocaleString()}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>

    {/* Streak */}
    <div className="flex items-center gap-1.5 sm:gap-2">
      <Zap className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 ${streak >= 3 ? "text-orange-400" : "text-gray-500"}`} />
      <div>
        <p className="text-[10px] sm:text-xs text-gray-400 leading-none">Streak</p>
        <AnimatePresence mode="wait">
          <motion.p
            key={streak}
            initial={{ scale: 1.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-sm sm:text-lg font-bold leading-none ${
              streak >= 3 ? "text-orange-400" : "text-white"
            }`}
          >
            {streak}🔥
          </motion.p>
        </AnimatePresence>
      </div>
    </div>

    {/* Answered */}
    <div className="flex items-center gap-1.5 sm:gap-2">
      <Target className="text-blue-400 w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
      <div>
        <p className="text-[10px] sm:text-xs text-gray-400 leading-none">Answered</p>
        <p className="text-sm sm:text-lg font-bold text-white leading-none">{totalAnswered}</p>
      </div>
    </div>

    {/* Lives */}
    <div className="flex items-center gap-1.5 sm:gap-2">
      <div>
        <p className="text-[10px] sm:text-xs text-gray-400 leading-none mb-1">Lives</p>
        <div className="flex gap-1">
          {Array.from({ length: maxLives }).map((_, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{
                scale: i < lives ? 1 : 0.7,
                opacity: i < lives ? 1 : 0.25,
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Heart
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                fill={i < lives ? "#ef4444" : "none"}
                stroke={i < lives ? "#ef4444" : "#6b7280"}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>

  </div>
);
};