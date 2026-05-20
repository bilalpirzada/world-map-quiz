"use client";

import { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface WorldMapProps {
  highlightId?: string;        // ISO numeric id to highlight (question country)
  correctId?: string;          // flash green on correct
  wrongId?: string;            // flash red on wrong
  onCountryClick?: (id: string, name: string) => void;
  interactive?: boolean;
}

export const WorldMap = ({
  highlightId,
  correctId,
  wrongId,
  onCountryClick,
  interactive = true,
}: WorldMapProps) => {
  const [tooltipContent, setTooltipContent] = useState("");
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  const getCountryColor = (geoId: string) => {
    if (correctId && geoId === correctId) return "#22c55e";   // green
    if (wrongId && geoId === wrongId) return "#ef4444";       // red
    if (highlightId && geoId === highlightId) return "#f59e0b"; // amber - question
    return "#1e3a5f";                                          // default navy
  };

  const getStrokeColor = (geoId: string) => {
    if (correctId && geoId === correctId) return "#16a34a";
    if (wrongId && geoId === wrongId) return "#dc2626";
    if (highlightId && geoId === highlightId) return "#d97706";
    return "#2d5a8e";
  };

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#0a1628]">
      {/* Ocean background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] to-[#0d2137]" />

      <ComposableMap
        projection="geoMercator"
        style={{ width: "100%", height: "100%" }}
      >
        <ZoomableGroup zoom={1} minZoom={1} maxZoom={8}>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const geoId = geo.id;
                const isInteractive = interactive;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => {
                      if (isInteractive && onCountryClick) {
                        onCountryClick(String(geoId), geo.properties.name);
                      }
                    }}
                    onMouseEnter={(e) => {
                      setTooltipContent(geo.properties.name);
                      setPosition({ x: e.clientX, y: e.clientY });
                      setShowTooltip(true);
                    }}
                    onMouseLeave={() => setShowTooltip(false)}
                    style={{
                      default: {
                        fill: getCountryColor(String(geoId)),
                        stroke: getStrokeColor(String(geoId)),
                        strokeWidth: 0.5,
                        outline: "none",
                        transition: "fill 0.3s ease",
                      },
                      hover: {
                        fill: isInteractive ? "#3b82f6" : getCountryColor(String(geoId)),
                        stroke: "#60a5fa",
                        strokeWidth: 0.8,
                        outline: "none",
                        cursor: isInteractive ? "pointer" : "default",
                      },
                      pressed: {
                        fill: "#1d4ed8",
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {/* Tooltip */}
      {showTooltip && (
        <div
          className="fixed z-50 px-2 py-1 text-xs text-white bg-gray-900 rounded shadow-lg pointer-events-none"
          style={{ left: position.x + 12, top: position.y - 28 }}
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );
};