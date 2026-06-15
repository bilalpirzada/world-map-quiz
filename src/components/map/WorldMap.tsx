"use client";

import { useState, useRef } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { Plus, Minus, RotateCcw } from "lucide-react";

const GEO_URL = "/countries-110m.json";

interface WorldMapProps {
  correctId?: string;
  wrongId?: string;
  onCountryClick?: (id: string, name: string) => void;
  interactive?: boolean;
}

export const WorldMap = ({
  correctId,
  wrongId,
  onCountryClick,
  interactive = true,
}: WorldMapProps) => {
  const [tooltipContent, setTooltipContent] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState<[number, number]>([0, 20]);

  // Track whether the last interaction was a drag (pan) vs a tap/click
  const dragMoved = useRef(false);

  const getCountryColor = (geoId: string) => {
    if (correctId && geoId === correctId) return "#22c55e";
    if (wrongId && geoId === wrongId) return "#ef4444";
    return "#1e3a5f";
  };

  const getStrokeColor = (geoId: string) => {
    if (correctId && geoId === correctId) return "#16a34a";
    if (wrongId && geoId === wrongId) return "#dc2626";
    return "#2d5a8e";
  };

  const handleZoomIn = () => setZoom((z) => Math.min(z * 1.5, 8));
  const handleZoomOut = () => setZoom((z) => Math.max(z / 1.5, 1));
  const handleReset = () => {
    setZoom(1);
    setCenter([0, 20]);
  };

  return (
    <div className="relative w-full h-full">
      {/* Map area */}
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a1628",
          borderRadius: "12px",
          position: "relative",
          touchAction: "none",
          overflow: "hidden",
        }}
      >
        <ComposableMap
          projection="geoNaturalEarth1"
          width={800}
          height={500}
          projectionConfig={{ scale: 140 }}
          style={{ width: "100%", height: "100%" }}
        >
          <ZoomableGroup
            zoom={zoom}
            center={center}
            minZoom={1}
            maxZoom={8}
            filterZoomEvent={(event) => {
  const e = event as unknown as Event;
  // Allow mouse drag (pan) and touch drag, block wheel/dblclick/pinch zoom
  if (e.type === "wheel" || e.type === "dblclick") return false;
  if (e.type === "touchstart" || e.type === "touchmove") {
    return (e as TouchEvent).touches?.length === 1;
  }
  return true;
}}
            onMoveStart={() => {
              dragMoved.current = false;
            }}
            onMove={() => {
              // Any move event while dragging marks this as a pan, not a click
              dragMoved.current = true;
            }}
            onMoveEnd={({ zoom: z, coordinates }) => {
              setZoom(z);
              setCenter(coordinates);
            }}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const geoId = String(geo.id);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={getCountryColor(geoId)}
                      stroke={getStrokeColor(geoId)}
                      strokeWidth={0.5 / zoom}
                      onMouseEnter={(e) => {
                        setTooltipContent(geo.properties.name);
                        setPosition({ x: e.clientX, y: e.clientY });
                        setShowTooltip(true);
                      }}
                      onMouseLeave={() => setShowTooltip(false)}
                      onClick={() => {
                        // Ignore the click that immediately follows a pan/drag
                        if (dragMoved.current) {
                          dragMoved.current = false;
                          return;
                        }
                        if (interactive && onCountryClick) {
                          onCountryClick(geoId, geo.properties.name);
                        }
                      }}
                      style={{
                        default: {
                          outline: "none",
                        },
                        hover: {
                          fill: interactive ? "#3b82f6" : getCountryColor(geoId),
                          stroke: "#60a5fa",
                          strokeWidth: 0.8 / zoom,
                          outline: "none",
                          cursor: interactive ? "pointer" : "default",
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
      </div>

      {/* Zoom Controls */}
<div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 flex flex-col gap-1 sm:gap-1.5 z-20">
        <button
          onClick={handleZoomIn}
          className="w-8 h-8 flex items-center justify-center bg-[#0d1f35] border border-[#2d5a8e] rounded-lg text-white hover:bg-[#1e3a5f] active:scale-95 transition-all shadow-lg"
          aria-label="Zoom in"
          type="button"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="w-8 h-8 flex items-center justify-center bg-[#0d1f35] border border-[#2d5a8e] rounded-lg text-white hover:bg-[#1e3a5f] active:scale-95 transition-all shadow-lg"
          aria-label="Zoom out"
          type="button"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          onClick={handleReset}
          className="w-8 h-8 flex items-center justify-center bg-[#0d1f35] border border-[#2d5a8e] rounded-lg text-white hover:bg-[#1e3a5f] active:scale-95 transition-all shadow-lg"
          aria-label="Reset view"
          type="button"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div
          style={{
            position: "fixed",
            left: position.x + 12,
            top: position.y - 28,
            background: "#111827",
            color: "white",
            padding: "2px 8px",
            borderRadius: "6px",
            fontSize: "12px",
            pointerEvents: "none",
            zIndex: 999,
          }}
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );
};