"use client";

import { motion } from "framer-motion";

type Node = { x: number; y: number; r: number; color: string; delay: number };

const nodes: Node[] = [
  { x: 60, y: 90, r: 7, color: "#2F8F5B", delay: 0 },
  { x: 180, y: 40, r: 5, color: "#C9A15B", delay: 0.15 },
  { x: 300, y: 100, r: 9, color: "#12233D", delay: 0.3 },
  { x: 220, y: 190, r: 5, color: "#2F8F5B", delay: 0.45 },
  { x: 90, y: 210, r: 6, color: "#C9A15B", delay: 0.6 },
  { x: 340, y: 220, r: 6, color: "#2F8F5B", delay: 0.75 },
];

const edges: [number, number][] = [
  [0, 1],
  [1, 2],
  [0, 3],
  [3, 2],
  [3, 4],
  [2, 5],
];

export default function ConnectionGraphic({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-hidden="true"
    >
      {edges.map(([a, b], i) => {
        const from = nodes[a];
        const to = nodes[b];
        return (
          <motion.line
            key={i}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="#12233D"
            strokeOpacity={0.16}
            strokeWidth={1.5}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          />
        );
      })}

      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={n.r}
          fill={n.color}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: n.delay, ease: "backOut" }}
        >
          <animate
            attributeName="opacity"
            values="1;0.65;1"
            dur={`${3 + i * 0.4}s`}
            repeatCount="indefinite"
          />
        </motion.circle>
      ))}
    </svg>
  );
}
