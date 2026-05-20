import { useState, useCallback } from "react";
import { GameState, GameMode, Difficulty } from "@/types";
import { getRandomCountry } from "@/data/countries";

const initialState = (mode: GameMode, difficulty: Difficulty): GameState => ({
  mode,
  score: 0,
  streak: 0,
  lives: difficulty === "easy" ? 5 : difficulty === "medium" ? 3 : 1,
  currentQuestion: getRandomCountry(),
  answeredIds: [],
  isCorrect: null,
  difficulty,
});

export const useGameState = (mode: GameMode = "flag", difficulty: Difficulty = "medium") => {
  const [state, setState] = useState<GameState>(() => initialState(mode, difficulty));

  const submitAnswer = useCallback((answerId: string) => {
    setState(prev => {
      if (!prev.currentQuestion) return prev;

      const isCorrect = answerId === prev.currentQuestion.id;

      const newStreak = isCorrect ? prev.streak + 1 : 0;
      const streakBonus = newStreak > 0 && newStreak % 3 === 0 ? 50 : 0;
      const newScore = isCorrect
        ? prev.score + 100 + streakBonus
        : prev.score;
      const newLives = isCorrect ? prev.lives : prev.lives - 1;

      return {
        ...prev,
        isCorrect,
        score: newScore,
        streak: newStreak,
        lives: newLives,
        answeredIds: [...prev.answeredIds, prev.currentQuestion.id],
      };
    });
  }, []);

  const nextQuestion = useCallback(() => {
    setState(prev => ({
      ...prev,
      isCorrect: null,
      currentQuestion: getRandomCountry(prev.answeredIds),
    }));
  }, []);

  const resetGame = useCallback(() => {
    setState(initialState(mode, difficulty));
  }, [mode, difficulty]);

  const isGameOver = state.lives <= 0;

  return { state, submitAnswer, nextQuestion, resetGame, isGameOver };
};