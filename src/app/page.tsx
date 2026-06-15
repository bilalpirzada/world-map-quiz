import { GameController } from "@/components/game/GameController";

export default function Home() {
  return (
    <main className="h-screen overflow-hidden bg-[#060f1e] p-2 sm:p-4 flex flex-col">
      <div className="max-w-4xl mx-auto h-full w-full flex flex-col min-h-0">

        {/* Header */}
        <div className="text-center py-1 sm:py-2 shrink-0">
          <h1 className="text-xl sm:text-3xl font-bold text-white tracking-tight">
            🌍 GeoQuest
          </h1>
          <p className="text-gray-400 text-[11px] sm:text-sm mt-0.5">
            Click the correct country on the map
          </p>
        </div>

        {/* Game */}
        <div className="flex-1 min-h-0 pb-1 sm:pb-2">
          <GameController />
        </div>

      </div>
    </main>
  );
}