import { Country } from "@/types";

export const countries: Country[] = [
  // Europe
  { id: "FRA", name: "France", capital: "Paris", continent: "Europe", flag: "🇫🇷", population: 68000000, area: 551695, currency: "Euro", language: "French", funFact: "France is the most visited country in the world." },
  { id: "DEU", name: "Germany", capital: "Berlin", continent: "Europe", flag: "🇩🇪", population: 83000000, area: 357114, currency: "Euro", language: "German", funFact: "Germany has over 1,500 different types of beer." },
  { id: "GBR", name: "United Kingdom", capital: "London", continent: "Europe", flag: "🇬🇧", population: 67000000, area: 243610, currency: "Pound Sterling", language: "English", funFact: "The UK invented the World Wide Web." },
  { id: "ITA", name: "Italy", capital: "Rome", continent: "Europe", flag: "🇮🇹", population: 60000000, area: 301340, currency: "Euro", language: "Italian", funFact: "Italy has more UNESCO World Heritage Sites than any other country." },
  { id: "ESP", name: "Spain", capital: "Madrid", continent: "Europe", flag: "🇪🇸", population: 47000000, area: 505990, currency: "Euro", language: "Spanish", funFact: "Spain is the second largest country in the EU by area." },
  { id: "PRT", name: "Portugal", capital: "Lisbon", continent: "Europe", flag: "🇵🇹", population: 10000000, area: 92212, currency: "Euro", language: "Portuguese", funFact: "Portugal is one of the oldest nations in Europe, founded in 1143." },
  { id: "NLD", name: "Netherlands", capital: "Amsterdam", continent: "Europe", flag: "🇳🇱", population: 17000000, area: 41543, currency: "Euro", language: "Dutch", funFact: "The Netherlands has more bicycles than people." },
  { id: "CHE", name: "Switzerland", capital: "Bern", continent: "Europe", flag: "🇨🇭", population: 8700000, area: 41285, currency: "Swiss Franc", language: "German/French/Italian", funFact: "Switzerland has not been at war since 1815." },
  { id: "SWE", name: "Sweden", capital: "Stockholm", continent: "Europe", flag: "🇸🇪", population: 10000000, area: 450295, currency: "Swedish Krona", language: "Swedish", funFact: "Sweden has more McDonald's per capita than any other European country." },
  { id: "NOR", name: "Norway", capital: "Oslo", continent: "Europe", flag: "🇳🇴", population: 5400000, area: 385207, currency: "Norwegian Krone", language: "Norwegian", funFact: "Norway has the world's longest road tunnel at 24.5 km." },
  { id: "POL", name: "Poland", capital: "Warsaw", continent: "Europe", flag: "🇵🇱", population: 38000000, area: 312696, currency: "Złoty", language: "Polish", funFact: "Poland is home to the world's largest castle by land area." },
  { id: "UKR", name: "Ukraine", capital: "Kyiv", continent: "Europe", flag: "🇺🇦", population: 44000000, area: 603550, currency: "Hryvnia", language: "Ukrainian", funFact: "Ukraine is the largest country entirely within Europe." },
  { id: "GRC", name: "Greece", capital: "Athens", continent: "Europe", flag: "🇬🇷", population: 10000000, area: 131957, currency: "Euro", language: "Greek", funFact: "Greece has the longest coastline in Europe." },

  // Asia
  { id: "JPN", name: "Japan", capital: "Tokyo", continent: "Asia", flag: "🇯🇵", population: 125000000, area: 377975, currency: "Yen", language: "Japanese", funFact: "Japan has over 6,800 islands." },
  { id: "IND", name: "India", capital: "New Delhi", continent: "Asia", flag: "🇮🇳", population: 1400000000, area: 3287263, currency: "Rupee", language: "Hindi/English", funFact: "India is the world's largest democracy." },
  { id: "CHN", name: "China", capital: "Beijing", continent: "Asia", flag: "🇨🇳", population: 1400000000, area: 9596960, currency: "Yuan", language: "Mandarin", funFact: "China has the world's largest standing army." },
  { id: "KOR", name: "South Korea", capital: "Seoul", continent: "Asia", flag: "🇰🇷", population: 52000000, area: 100210, currency: "Won", language: "Korean", funFact: "South Korea has the fastest internet in the world." },
  { id: "IDN", name: "Indonesia", capital: "Jakarta", continent: "Asia", flag: "🇮🇩", population: 273000000, area: 1904569, currency: "Rupiah", language: "Indonesian", funFact: "Indonesia is the world's largest archipelago with over 17,000 islands." },
  { id: "SAU", name: "Saudi Arabia", capital: "Riyadh", continent: "Asia", flag: "🇸🇦", population: 35000000, area: 2149690, currency: "Riyal", language: "Arabic", funFact: "Saudi Arabia is the largest country in the world without a river." },
  { id: "TUR", name: "Turkey", capital: "Ankara", continent: "Asia", flag: "🇹🇷", population: 84000000, area: 783562, currency: "Lira", language: "Turkish", funFact: "Turkey is home to the city of Troy from Greek mythology." },
  { id: "PAK", name: "Pakistan", capital: "Islamabad", continent: "Asia", flag: "🇵🇰", population: 220000000, area: 881913, currency: "Rupee", language: "Urdu", funFact: "Pakistan is home to K2, the world's second highest mountain." },
  { id: "BGD", name: "Bangladesh", capital: "Dhaka", continent: "Asia", flag: "🇧🇩", population: 166000000, area: 147570, currency: "Taka", language: "Bengali", funFact: "Bangladesh has the world's largest river delta." },
  { id: "THA", name: "Thailand", capital: "Bangkok", continent: "Asia", flag: "🇹🇭", population: 70000000, area: 513120, currency: "Baht", language: "Thai", funFact: "Thailand is the only Southeast Asian country never colonized by Europeans." },
  { id: "VNM", name: "Vietnam", capital: "Hanoi", continent: "Asia", flag: "🇻🇳", population: 97000000, area: 331212, currency: "Dong", language: "Vietnamese", funFact: "Vietnam is the world's second largest exporter of coffee." },
  { id: "IRN", name: "Iran", capital: "Tehran", continent: "Asia", flag: "🇮🇷", population: 84000000, area: 1648195, currency: "Rial", language: "Persian", funFact: "Iran is home to one of the world's oldest civilizations." },

  // Africa
  { id: "EGY", name: "Egypt", capital: "Cairo", continent: "Africa", flag: "🇪🇬", population: 104000000, area: 1002450, currency: "Egyptian Pound", language: "Arabic", funFact: "Egypt is home to one of the Seven Wonders of the Ancient World." },
  { id: "ZAF", name: "South Africa", capital: "Pretoria", continent: "Africa", flag: "🇿🇦", population: 60000000, area: 1221037, currency: "Rand", language: "11 official languages", funFact: "South Africa has three capital cities." },
  { id: "NGA", name: "Nigeria", capital: "Abuja", continent: "Africa", flag: "🇳🇬", population: 211000000, area: 923768, currency: "Naira", language: "English", funFact: "Nigeria has the largest economy in Africa." },
  { id: "ETH", name: "Ethiopia", capital: "Addis Ababa", continent: "Africa", flag: "🇪🇹", population: 115000000, area: 1104300, currency: "Birr", language: "Amharic", funFact: "Ethiopia is the only African country that was never colonized." },
  { id: "KEN", name: "Kenya", capital: "Nairobi", continent: "Africa", flag: "🇰🇪", population: 54000000, area: 580367, currency: "Shilling", language: "Swahili/English", funFact: "Kenya is home to the Great Rift Valley." },
  { id: "TZA", name: "Tanzania", capital: "Dodoma", continent: "Africa", flag: "🇹🇿", population: 61000000, area: 945087, currency: "Shilling", language: "Swahili", funFact: "Tanzania is home to Mount Kilimanjaro, Africa's highest peak." },
  { id: "GHA", name: "Ghana", capital: "Accra", continent: "Africa", flag: "🇬🇭", population: 32000000, area: 238533, currency: "Cedi", language: "English", funFact: "Ghana was the first sub-Saharan African country to gain independence." },
  { id: "MAR", name: "Morocco", capital: "Rabat", continent: "Africa", flag: "🇲🇦", population: 37000000, area: 446550, currency: "Dirham", language: "Arabic/Berber", funFact: "Morocco is home to the world's oldest university, founded in 859 AD." },
  { id: "DZA", name: "Algeria", capital: "Algiers", continent: "Africa", flag: "🇩🇿", population: 44000000, area: 2381741, currency: "Dinar", language: "Arabic", funFact: "Algeria is the largest country in Africa." },

  // Americas
  { id: "USA", name: "United States", capital: "Washington D.C.", continent: "North America", flag: "🇺🇸", population: 331000000, area: 9833517, currency: "US Dollar", language: "English", funFact: "The US has the world's largest economy by nominal GDP." },
  { id: "CAN", name: "Canada", capital: "Ottawa", continent: "North America", flag: "🇨🇦", population: 38000000, area: 9984670, currency: "Canadian Dollar", language: "English/French", funFact: "Canada has the longest coastline of any country in the world." },
  { id: "MEX", name: "Mexico", capital: "Mexico City", continent: "North America", flag: "🇲🇽", population: 130000000, area: 1964375, currency: "Peso", language: "Spanish", funFact: "Mexico is home to the largest pyramid in the world by volume." },
  { id: "BRA", name: "Brazil", capital: "Brasília", continent: "South America", flag: "🇧🇷", population: 215000000, area: 8515767, currency: "Real", language: "Portuguese", funFact: "Brazil contains about 60% of the Amazon rainforest." },
  { id: "ARG", name: "Argentina", capital: "Buenos Aires", continent: "South America", flag: "🇦🇷", population: 45000000, area: 2780400, currency: "Peso", language: "Spanish", funFact: "Argentina is the 8th largest country in the world by area." },
  { id: "COL", name: "Colombia", capital: "Bogotá", continent: "South America", flag: "🇨🇴", population: 51000000, area: 1141748, currency: "Peso", language: "Spanish", funFact: "Colombia is the only country in South America with coasts on both the Pacific and Atlantic." },
  { id: "CHL", name: "Chile", capital: "Santiago", continent: "South America", flag: "🇨🇱", population: 19000000, area: 756102, currency: "Peso", language: "Spanish", funFact: "Chile is the longest country in the world from north to south." },
  { id: "PER", name: "Peru", capital: "Lima", continent: "South America", flag: "🇵🇪", population: 33000000, area: 1285216, currency: "Sol", language: "Spanish", funFact: "Peru is home to Machu Picchu and the ancient Inca Empire." },
  { id: "VEN", name: "Venezuela", capital: "Caracas", continent: "South America", flag: "🇻🇪", population: 28000000, area: 916445, currency: "Bolívar", language: "Spanish", funFact: "Venezuela is home to Angel Falls, the world's highest waterfall." },

  // Oceania
  { id: "AUS", name: "Australia", capital: "Canberra", continent: "Oceania", flag: "🇦🇺", population: 26000000, area: 7692024, currency: "Australian Dollar", language: "English", funFact: "Australia is the only country that is also a continent." },
  { id: "NZL", name: "New Zealand", capital: "Wellington", continent: "Oceania", flag: "🇳🇿", population: 5000000, area: 270467, currency: "New Zealand Dollar", language: "English/Māori", funFact: "New Zealand was the first country to give women the right to vote." },
];

export const getRandomCountry = (exclude: string[] = []): Country => {
  const pool = countries.filter(c => !exclude.includes(c.id));
  if (pool.length === 0) return countries[Math.floor(Math.random() * countries.length)];
  return pool[Math.floor(Math.random() * pool.length)];
};

export const getCountryById = (id: string): Country | undefined => {
  return countries.find(c => c.id === id);
};