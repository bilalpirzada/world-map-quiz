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

  const isDragging = useRef(false);
  const mouseDownPos = useRef({ x: 0, y: 0 });
  const lastHoveredRef = useRef<{ id: string; name: string } | null>(null);

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

  const handleZoomIn = () => setZoom(z => Math.min(z * 1.5, 8));
  const handleZoomOut = () => setZoom(z => Math.max(z / 1.5, 1));
  const handleReset = () => {
    setZoom(1);
    setCenter([0, 20]);
  };

  return (
    <div
      className="w-full h-[280px] sm:h-[400px] lg:h-[500px]"
      style={{
        background: "#0a1628",
        borderRadius: "12px",
        position: "relative",
        touchAction: "none", // prevent browser pinch-zoom on the map
      }}
      onMouseDown={(e) => {
        if (e.button !== 0) return;
        mouseDownPos.current = { x: e.clientX, y: e.clientY };
        isDragging.current = false;
      }}
      onMouseMove={(e) => {
        const dx = Math.abs(e.clientX - mouseDownPos.current.x);
        const dy = Math.abs(e.clientY - mouseDownPos.current.y);
        if (dx > 5 || dy > 5) isDragging.current = true;
      }}
      onMouseUp={(e) => {
        if (e.button !== 0) return;
        if (!isDragging.current && interactive && onCountryClick && lastHoveredRef.current) {
          onCountryClick(lastHoveredRef.current.id, lastHoveredRef.current.name);
        }
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
          onMoveEnd={({ zoom: z, coordinates }) => {
            setZoom(z);
            setCenter(coordinates);
          }}
          minZoom={1}
          maxZoom={8}
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
                      lastHoveredRef.current = { id: geoId, name: geo.properties.name };
                      setTooltipContent(geo.properties.name);
                      setPosition({ x: e.clientX, y: e.clientY });
                      setShowTooltip(true);
                    }}
                    onMouseLeave={() => setShowTooltip(false)}
                    style={{
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
                      default: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {/* Zoom Controls */}
      <div className="absolute bottom-3 right-3 flex flex-col gap-1.5">
        <button
          onClick={handleZoomIn}
          className="w-8 h-8 flex items-center justify-center bg-[#0d1f35] border border-[#2d5a8e] rounded-lg text-white hover:bg-[#1e3a5f] active:scale-95 transition-all shadow-lg"
          aria-label="Zoom in"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="w-8 h-8 flex items-center justify-center bg-[#0d1f35] border border-[#2d5a8e] rounded-lg text-white hover:bg-[#1e3a5f] active:scale-95 transition-all shadow-lg"
          aria-label="Zoom out"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          onClick={handleReset}
          className="w-8 h-8 flex items-center justify-center bg-[#0d1f35] border border-[#2d5a8e] rounded-lg text-white hover:bg-[#1e3a5f] active:scale-95 transition-all shadow-lg"
          aria-label="Reset view"
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