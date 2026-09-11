import { useEffect, useRef, useState } from "react";

const STAR_COUNT = 180;
const SHOOTING_STARS = 4;
const PETAL_COUNT = 18;
const MOTE_COUNT = 12;

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  delay: number;
}

interface Petal {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
  rotate: number;
}

interface Mote {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
}

const petalColors = [
  "#f9a8c9", "#f472b6", "#e879a0", "#c084fc",
  "#a855f7", "#fde68a", "#fb923c", "#f43f5e",
];

const tulips = [
  { x: 5, scale: 0.65, delay: 0.2, color: "#c084fc", accent: "#7c3aed", stemColor: "#4ade80" },
  { x: 12, scale: 0.5, delay: 0.6, color: "#f9a8c9", accent: "#ec4899", stemColor: "#22c55e" },
  { x: 20, scale: 0.8, delay: 0.9, color: "#a855f7", accent: "#6d28d9", stemColor: "#16a34a" },
  { x: 28, scale: 0.6, delay: 1.3, color: "#fb923c", accent: "#ea580c", stemColor: "#4ade80" },
  { x: 36, scale: 0.9, delay: 0.4, color: "#f472b6", accent: "#db2777", stemColor: "#22c55e" },
  { x: 44, scale: 1.0, delay: 0.0, color: "#c084fc", accent: "#9333ea", stemColor: "#16a34a" },
  { x: 52, scale: 0.85, delay: 0.7, color: "#fde68a", accent: "#f59e0b", stemColor: "#4ade80" },
  { x: 60, scale: 0.7, delay: 1.1, color: "#f9a8c9", accent: "#e879a0", stemColor: "#22c55e" },
  { x: 68, scale: 0.95, delay: 0.3, color: "#a855f7", accent: "#7c3aed", stemColor: "#16a34a" },
  { x: 76, scale: 0.6, delay: 0.8, color: "#f472b6", accent: "#be185d", stemColor: "#4ade80" },
  { x: 84, scale: 0.75, delay: 1.5, color: "#c084fc", accent: "#6d28d9", stemColor: "#22c55e" },
  { x: 91, scale: 0.55, delay: 0.5, color: "#fb923c", accent: "#dc2626", stemColor: "#16a34a" },
  { x: 96, scale: 0.7, delay: 1.0, color: "#f9a8c9", accent: "#ec4899", stemColor: "#4ade80" },
];

function TulipSVG({
  color,
  accent,
  stemColor,
  scale,
  delay,
}: {
  color: string;
  accent: string;
  stemColor: string;
  scale: number;
  delay: number;
}) {
  const stemH = 120 * scale;
  const bloomW = 52 * scale;
  const bloomH = 60 * scale;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        animation: `sway ${randomBetween(3, 5).toFixed(1)}s ease-in-out ${delay}s infinite`,
        transformOrigin: "bottom center",
      }}
    >
      {/* Bloom */}
      <div
        style={{
          width: bloomW,
          height: bloomH,
          animation: `bloomOpen 1.2s cubic-bezier(.22,1,.36,1) ${delay + 0.4}s forwards`,
          opacity: 0,
          transformOrigin: "bottom center",
          position: "relative",
        }}
      >
        <svg width={bloomW} height={bloomH} viewBox="0 0 52 60">
          {/* Left petal */}
          <ellipse cx="18" cy="38" rx="14" ry="26" fill={color} opacity="0.9" transform="rotate(-15 18 38)" />
          {/* Right petal */}
          <ellipse cx="34" cy="38" rx="14" ry="26" fill={color} opacity="0.9" transform="rotate(15 34 38)" />
          {/* Center petal */}
          <ellipse cx="26" cy="32" rx="11" ry="28" fill={accent} opacity="0.85" />
          {/* Inner glow */}
          <ellipse cx="26" cy="40" rx="7" ry="12" fill="rgba(255,255,255,0.2)" />
        </svg>
      </div>
      {/* Stem */}
      <div
        style={{
          width: 4 * scale,
          height: stemH,
          background: `linear-gradient(to bottom, ${stemColor}, #166534)`,
          borderRadius: 4,
          animation: `stemGrow 0.8s ease-out ${delay}s forwards`,
          opacity: 0,
          transformOrigin: "bottom",
        }}
      />
      {/* Leaf */}
      <div
        style={{
          position: "absolute",
          bottom: stemH * 0.35,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <svg
          width={30 * scale}
          height={18 * scale}
          viewBox="0 0 30 18"
          style={{
            animation: `bloomOpen 1s ease-out ${delay + 0.3}s forwards`,
            opacity: 0,
          }}
        >
          <ellipse cx="15" cy="9" rx="14" ry="8" fill={stemColor} opacity="0.8" />
        </svg>
      </div>
    </div>
  );
}

export default function App() {
  const [stars] = useState<Star[]>(() =>
    Array.from({ length: STAR_COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 70,
      size: randomBetween(1, 3.5),
      delay: Math.random() * 4,
      duration: randomBetween(2, 5),
      opacity: randomBetween(0.4, 1),
    }))
  );

  const [shootingStars] = useState<ShootingStar[]>(() =>
    Array.from({ length: SHOOTING_STARS }, (_, i) => ({
      id: i,
      x: randomBetween(5, 60),
      y: randomBetween(5, 30),
      delay: randomBetween(2, 14),
    }))
  );

  const [petals] = useState<Petal[]>(() =>
    Array.from({ length: PETAL_COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: randomBetween(8, 18),
      delay: Math.random() * 10,
      duration: randomBetween(6, 14),
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      rotate: Math.random() * 360,
    }))
  );

  const [motes] = useState<Mote[]>(() =>
    Array.from({ length: MOTE_COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: randomBetween(50, 90),
      delay: Math.random() * 8,
      duration: randomBetween(4, 9),
    }))
  );

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="size-full relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #050318 0%, #0d0533 25%, #1a0a4e 45%, #2d1060 60%, #4a1055 75%, #6b1a5a 88%, #3d2040 100%)",
        fontFamily: "'Crimson Pro', serif",
      }}
    >
      {/* Stars */}
      {stars.map((s) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background: s.size > 2.5 ? "#fffde7" : "#ffffff",
            boxShadow: s.size > 2.5 ? `0 0 ${s.size * 3}px rgba(255,253,200,0.8)` : "none",
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            opacity: s.opacity,
          }}
        />
      ))}

      {/* Shooting stars */}
      {shootingStars.map((ss) => (
        <div
          key={ss.id}
          style={{
            position: "absolute",
            left: `${ss.x}%`,
            top: `${ss.y}%`,
            width: 80,
            height: 1.5,
            background: "linear-gradient(to right, transparent, rgba(255,253,200,0.9), transparent)",
            borderRadius: 2,
            animation: `shoot 1.2s ease-out ${ss.delay}s infinite`,
            opacity: 0,
          }}
        />
      ))}

      {/* Nebula / mist layers */}
      {[
        { top: "15%", left: "10%", w: 320, h: 120, color: "rgba(120,60,180,0.08)" },
        { top: "25%", left: "55%", w: 280, h: 100, color: "rgba(80,30,160,0.07)" },
        { top: "5%", left: "40%", w: 200, h: 80, color: "rgba(180,80,160,0.06)" },
      ].map((nb, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: nb.top,
            left: nb.left,
            width: nb.w,
            height: nb.h,
            borderRadius: "50%",
            background: nb.color,
            filter: "blur(30px)",
            animation: `cloudDrift ${8 + i * 3}s ease-in-out ${i * 2}s infinite`,
          }}
        />
      ))}

      {/* Moon */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          right: "15%",
          width: 110,
          height: 110,
          borderRadius: "50%",
          background: "radial-gradient(circle at 38% 35%, #fffde7 0%, #fff3b0 40%, #fde68a 70%, #f59e0b 100%)",
          boxShadow: "0 0 60px 20px rgba(255,240,180,0.3), 0 0 120px 60px rgba(255,220,100,0.15)",
          animation: "moonGlow 4s ease-in-out infinite, drift 12s ease-in-out infinite",
        }}
      >
        {/* Moon craters */}
        <div style={{ position: "absolute", top: "25%", left: "30%", width: 14, height: 14, borderRadius: "50%", background: "rgba(200,160,0,0.18)" }} />
        <div style={{ position: "absolute", top: "55%", left: "55%", width: 9, height: 9, borderRadius: "50%", background: "rgba(200,160,0,0.15)" }} />
        <div style={{ position: "absolute", top: "38%", left: "60%", width: 6, height: 6, borderRadius: "50%", background: "rgba(200,160,0,0.12)" }} />
      </div>

      {/* Moon halo ring */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          right: "15%",
          width: 110,
          height: 110,
          borderRadius: "50%",
          border: "1px solid rgba(255,240,180,0.15)",
          transform: "scale(1.5)",
          transformOrigin: "center",
          animation: "shimmer 4s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "8%",
          right: "15%",
          width: 110,
          height: 110,
          borderRadius: "50%",
          border: "1px solid rgba(255,240,180,0.08)",
          transform: "scale(2)",
          transformOrigin: "center",
          animation: "shimmer 4s ease-in-out infinite 1s",
        }}
      />

      {/* Floating petals */}
      {petals.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: "-5%",
            width: p.size,
            height: p.size * 1.4,
            borderRadius: "50% 50% 50% 0",
            background: p.color,
            opacity: 0.85,
            filter: "blur(0.5px)",
            animation: `floatPetal ${p.duration}s ease-in-out ${p.delay}s infinite`,
            transform: `rotate(${p.rotate}deg)`,
            boxShadow: `0 0 6px ${p.color}60`,
          }}
        />
      ))}

      {/* Magic motes / fireflies */}
      {motes.map((m) => (
        <div
          key={m.id}
          style={{
            position: "absolute",
            left: `${m.x}%`,
            top: `${m.y}%`,
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "#fde68a",
            boxShadow: "0 0 8px 2px rgba(253,230,138,0.8)",
            animation: `moteFloat ${m.duration}s ease-out ${m.delay}s infinite`,
          }}
        />
      ))}

      {/* Ground gradient */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "38%",
          background: "linear-gradient(to top, #0f0a1a 0%, #1a0d2e 40%, transparent 100%)",
          zIndex: 2,
        }}
      />

      {/* Tulip row */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "42%",
          display: "flex",
          alignItems: "flex-end",
          zIndex: 3,
        }}
      >
        {tulips.map((t, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${t.x}%`,
              bottom: 0,
              transform: "translateX(-50%)",
            }}
          >
            <TulipSVG
              color={t.color}
              accent={t.accent}
              stemColor={t.stemColor}
              scale={t.scale}
              delay={t.delay}
            />
          </div>
        ))}

        {/* Grass blades */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 40, overflow: "hidden" }}>
          {Array.from({ length: 40 }, (_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                bottom: 0,
                left: `${i * 2.5 + Math.random()}%`,
                width: 2 + Math.random() * 2,
                height: 20 + Math.random() * 25,
                background: `linear-gradient(to top, #166534, ${Math.random() > 0.5 ? "#4ade80" : "#22c55e"})`,
                borderRadius: "2px 2px 0 0",
                transform: `rotate(${(Math.random() - 0.5) * 20}deg)`,
                transformOrigin: "bottom center",
              }}
            />
          ))}
        </div>
      </div>

      {/* Message card */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 10,
          textAlign: "center",
          maxWidth: 520,
          padding: "0 24px",
          animation: visible ? "fadeInUp 1.6s cubic-bezier(.22,1,.36,1) 2s forwards" : "none",
          opacity: 0,
        }}
      >
        {/* Decorative line */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, justifyContent: "center" }}>
          <div style={{ height: 1, width: 60, background: "linear-gradient(to right, transparent, rgba(253,230,138,0.6))" }} />
          <div style={{ fontSize: 18, color: "#fde68a", animation: "heartbeat 2s ease-in-out infinite" }}>✦</div>
          <div style={{ height: 1, width: 60, background: "linear-gradient(to left, transparent, rgba(253,230,138,0.6))" }} />
        </div>

        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "clamp(13px, 2vw, 16px)",
            color: "rgba(253,230,138,0.8)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            marginBottom: 12,
            fontWeight: 300,
          }}
        >
          Para ti, siempre
        </p>

        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "clamp(32px, 6vw, 58px)",
            color: "#ffffff",
            lineHeight: 1.15,
            marginBottom: 20,
            textShadow: "0 0 40px rgba(192,132,252,0.6), 0 2px 20px rgba(0,0,0,0.8)",
            fontWeight: 600,
          }}
        >
          Siempre serás<br />la más bonita
        </h1>

        <div
          style={{
            height: 1,
            background: "linear-gradient(to right, transparent, rgba(192,132,252,0.5), rgba(249,168,201,0.5), transparent)",
            marginBottom: 20,
          }}
        />

        <p
          style={{
            fontFamily: "'Crimson Pro', serif",
            fontSize: "clamp(16px, 2.5vw, 20px)",
            color: "rgba(255,255,255,0.75)",
            lineHeight: 1.8,
            fontWeight: 300,
            fontStyle: "italic",
            marginBottom: 8,
          }}
        >
          Como los tulipanes que florecen bajo la luna,<br />
          tu belleza ilumina cada noche oscura.<br />
          En cada estrella encuentro tu nombre,<br />
          en cada pétalo, tu sonrisa.
        </p>

        {/* Decorative bottom */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 20, justifyContent: "center" }}>
          <div style={{ height: 1, width: 40, background: "linear-gradient(to right, transparent, rgba(249,168,201,0.5))" }} />
          <div style={{ fontSize: 14, color: "#f9a8c9" }}>🌷</div>
          <div style={{ fontSize: 14, color: "#fde68a" }}>✦</div>
          <div style={{ fontSize: 14, color: "#c084fc" }}>🌷</div>
          <div style={{ height: 1, width: 40, background: "linear-gradient(to left, transparent, rgba(249,168,201,0.5))" }} />
        </div>
      </div>

      {/* Name tag */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 24,
          zIndex: 20,
          animation: "fadeInUp 1.2s cubic-bezier(.22,1,.36,1) 3s forwards",
          opacity: 0,
        }}
      >
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: "italic",
          fontSize: "clamp(11px, 1.4vw, 14px)",
          letterSpacing: "0.25em",
          color: "rgba(253,230,138,0.55)",
          textTransform: "uppercase",
          margin: 0,
          lineHeight: 1,
        }}>para</p>
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: "italic",
          fontSize: "clamp(18px, 2.8vw, 26px)",
          color: "rgba(255,255,255,0.88)",
          textShadow: "0 0 20px rgba(192,132,252,0.5)",
          margin: "2px 0 0",
          letterSpacing: "0.06em",
          fontWeight: 600,
          lineHeight: 1,
        }}>Ursula Peña</p>
        <div style={{ height: 1, width: "100%", background: "linear-gradient(to right, rgba(249,168,201,0.5), transparent)", marginTop: 6 }} />
      </div>

      {/* Vignette overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(2,1,20,0.6) 100%)",
          pointerEvents: "none",
          zIndex: 8,
        }}
      />
    </div>
  );
}
