import { GameController } from "@/components/game/GameController";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#060f1e] p-4">
      <div className="max-w-4xl mx-auto h-screen flex flex-col">

        {/* Header */}
        <div className="text-center py-4">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            🌍 GeoQuest
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Click the correct country on the map
          </p>
        </div>

        {/* Game */}
        <div className="flex-1 min-h-0 pb-4">
          <GameController />
        </div>

      </div>
    </main>
  );
}