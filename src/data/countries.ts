import { Country } from "@/src/types";

export const countries: Country[] = [
  {
    id: "FRA", name: "France", capital: "Paris", continent: "Europe",
    flag: "🇫🇷", population: 68000000, area: 551695,
    currency: "Euro", language: "French",
    funFact: "France is the most visited country in the world."
  },
  {
    id: "BRA", name: "Brazil", capital: "Brasília", continent: "South America",
    flag: "🇧🇷", population: 215000000, area: 8515767,
    currency: "Real", language: "Portuguese",
    funFact: "Brazil contains about 60% of the Amazon rainforest."
  },
  {
    id: "JPN", name: "Japan", capital: "Tokyo", continent: "Asia",
    flag: "🇯🇵", population: 125000000, area: 377975,
    currency: "Yen", language: "Japanese",
    funFact: "Japan has over 6,800 islands."
  },
  {
    id: "USA", name: "United States", capital: "Washington D.C.", continent: "North America",
    flag: "🇺🇸", population: 331000000, area: 9833517,
    currency: "US Dollar", language: "English",
    funFact: "The US has the world's largest economy by nominal GDP."
  },
  {
    id: "EGY", name: "Egypt", capital: "Cairo", continent: "Africa",
    flag: "🇪🇬", population: 104000000, area: 1002450,
    currency: "Egyptian Pound", language: "Arabic",
    funFact: "Egypt is home to one of the Seven Wonders of the Ancient World."
  },
  {
    id: "AUS", name: "Australia", capital: "Canberra", continent: "Oceania",
    flag: "🇦🇺", population: 26000000, area: 7692024,
    currency: "Australian Dollar", language: "English",
    funFact: "Australia is the only country that is also a continent."
  },
  {
    id: "IND", name: "India", capital: "New Delhi", continent: "Asia",
    flag: "🇮🇳", population: 1400000000, area: 3287263,
    currency: "Rupee", language: "Hindi/English",
    funFact: "India is the world's largest democracy."
  },
  {
    id: "ZAF", name: "South Africa", capital: "Pretoria", continent: "Africa",
    flag: "🇿🇦", population: 60000000, area: 1221037,
    currency: "Rand", language: "11 official languages",
    funFact: "South Africa has three capital cities."
  },
  {
    id: "CAN", name: "Canada", capital: "Ottawa", continent: "North America",
    flag: "🇨🇦", population: 38000000, area: 9984670,
    currency: "Canadian Dollar", language: "English/French",
    funFact: "Canada has the longest coastline of any country in the world."
  },
  {
    id: "ARG", name: "Argentina", capital: "Buenos Aires", continent: "South America",
    flag: "🇦🇷", population: 45000000, area: 2780400,
    currency: "Peso", language: "Spanish",
    funFact: "Argentina is the 8th largest country in the world by area."
  },
];

export const getRandomCountry = (exclude: string[] = []): Country => {
  const pool = countries.filter(c => !exclude.includes(c.id));
  return pool[Math.floor(Math.random() * pool.length)];
};

export const getCountryById = (id: string): Country | undefined => {
  return countries.find(c => c.id === id);
};