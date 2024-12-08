"use client";
import { useRef, useEffect, useCallback } from "react";

const connections = [
  { from: "input-0", to: "input-1" },
  { from: "output-1", to: "input-2" },
  { from: "output-2", to: "input-4" },
  { from: "output-4", to: "input-5" },
  { from: "output-5", to: "input-3" },
  { from: "output-3", to: "input-6" },
];

const getCurvedLinePoints = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const isSamePlane = Math.abs(y2 - y1) < 50;

  if (distance < 150) {
    return [x1, y1, x1, y1, x2, y2, x2, y2];
  }

  let curviness;
  let curveDirection;

  //For semicircle
  if (isSamePlane && distance < 300) {
    const radius = distance / 2;
    const midX = (x1 + x2) / 2;
    const midY = y1 + radius;

    return [x1, y1, midX - radius, midY, midX + radius, midY, x2, y2];
  } else {
    if (distance < 300) {
      curviness = 0.3;
      curveDirection = dy > 0 ? 1 : -1;
    } else {
      curviness = 0.2;
      curveDirection = 1;
    }

    const perpDx = -dy * curviness * curveDirection;
    const perpDy = dx * curviness * curveDirection;
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;

    const cp1X = midX - perpDx;
    const cp1Y = midY - perpDy;
    const cp2X = midX + perpDx;
    const cp2Y = midY + perpDy;

    return [x1, y1, cp1X, cp1Y, cp2X, cp2Y, x2, y2];
  }
};

const ConnectionLines: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  //   const [dimensions, setDimensions] = useState({
  //     width: window.innerWidth,
  //     height: window.innerHeight,
  //   });

  const createCircle = (x: number, y: number) => {
    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    circle.setAttribute("cx", (x + 2).toString());
    circle.setAttribute("cy", (y + 2).toString());
    circle.setAttribute("r", "5");
    circle.setAttribute("fill", "rgba(0, 0, 255)");
    return circle;
  };

  const renderlines = useCallback(() => {
    if (svgRef.current) {
      const svg = svgRef.current;
      svg.innerHTML = ""; // Clear previous lines

      connections.forEach(({ from, to }) => {
        const fromContainer = document.getElementById(from);
        const toContainer = document.getElementById(to);

        if (fromContainer && toContainer) {
          const fromRect = fromContainer.getBoundingClientRect();
          const toRect = toContainer.getBoundingClientRect();

          const fromX = fromRect.left + fromRect.width / 2;
          const fromY = fromRect.top + fromRect.height / 2;
          const toX = toRect.left + toRect.width / 2;
          const toY = toRect.top + toRect.height / 2;

          const [x1, y1, cp1X, cp1Y, cp2X, cp2Y, x2, y2] = getCurvedLinePoints(
            fromX,
            fromY,
            toX,
            toY
          );

          const line = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
          );
          line.setAttribute(
            "d",
            `M${x1 + 2},${y1 + 2} C${cp1X},${cp1Y} ${cp2X},${cp2Y} ${x2 + 2},${
              y2 + 2
            }`
          );
          line.setAttribute("fill", "none");
          line.setAttribute("stroke", "rgba(135, 206, 250, 0.5)"); // Sky Blue with 50% opacity
          line.setAttribute("stroke-width", "8"); // Thicker line
          line.setAttribute("stroke-linecap", "round"); // Rounded line ends
          //circles at the beginning and end of the line
          svg.appendChild(createCircle(x1, y1));
          svg.appendChild(createCircle(x2, y2));

          svg.appendChild(line);
        }
      });
    }
  }, []);

  useEffect(() => {
    renderlines();
  }, [renderlines]);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 pointer-events-none w-screen h-screen overflow-visible"
    />
  );
};

export default ConnectionLines;
