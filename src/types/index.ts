export interface Country {
  id: string;          // ISO alpha-3 code e.g. "FRA"
  name: string;
  capital: string;
  continent: string;
  flag: string;        // emoji flag
  population: number;
  area: number;        // km²
  currency: string;
  language: string;
  funFact: string;
}

export type GameMode = "pin" | "flag" | "capital" | "stat";

export type Difficulty = "easy" | "medium" | "hard";

export interface GameState {
  mode: GameMode;
  score: number;
  streak: number;
  lives: number;
  currentQuestion: Country | null;
  answeredIds: string[];
  isCorrect: boolean | null;
  difficulty: Difficulty;
}