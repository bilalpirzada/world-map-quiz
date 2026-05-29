"use client";

import { useState, useRef } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";

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

  return (
    <div
      style={{
        width: "100%",
        height: "500px",
        background: "#0a1628",
        borderRadius: "12px",
        position: "relative",
      }}
      onMouseDown={(e) => {
        mouseDownPos.current = { x: e.clientX, y: e.clientY };
        isDragging.current = false;
      }}
      onMouseMove={(e) => {
        const dx = Math.abs(e.clientX - mouseDownPos.current.x);
        const dy = Math.abs(e.clientY - mouseDownPos.current.y);
        if (dx > 5 || dy > 5) isDragging.current = true;
      }}
      onMouseUp={() => {
        console.log("div mouseup fired, dragging:", isDragging.current, "hovered:", lastHoveredRef.current);
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
        <ZoomableGroup zoom={1} minZoom={0.8} maxZoom={8}>
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
                    strokeWidth={0.5}
                    onMouseEnter={(e) => {
                      lastHoveredRef.current = { id: geoId, name: geo.properties.name };
                      setTooltipContent(geo.properties.name);
                      setPosition({ x: e.clientX, y: e.clientY });
                      setShowTooltip(true);
                    }}
                    onMouseLeave={() => {
                      setShowTooltip(false);
                    }}
                    style={{
                      hover: {
                        fill: interactive ? "#3b82f6" : getCountryColor(geoId),
                        stroke: "#60a5fa",
                        strokeWidth: 0.8,
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