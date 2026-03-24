import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const STANZAS = [
  "They say one fish, two fish, red fish, new fish. I say, \"Knick-knack, paddywhack, when you gonna give this dog a home?\"",
  "They think I'm a man; wrong, I'm a female, and I've been this way since I was taken from that home long ago.",
  "1, 2, 3, this ain't for me. CBA, that don't make no sense anyway, but an ABC leads me to think of the 1, 2, 3 of the accidental coincidence until the intentionality.",
  "Oh, Stymie, why must you be a great challenge to my wondrous mind from your mediocrity?",
  "Geek, I am not; nerd, barely; yet still, frayed and astrayed.",
  "Though I was once told, \"never fear the unknown,\" and so I never did. Because of that, I always embraced.",
  "Return to me my ability to speak, the neuroplasticity that rests within me growing up in the cortex of my brain. Surely I know that you will get there along your ultramile: the path, the way, from the hippocampi core to the very tip-top of my eigenvertex.",
  "I have the raw data set, knowing that once you turn on, the full totality of pain will be the true raw data set.",
  "Evermore is what I've heard before that got me thinking about hearts underneath floors and how dirty they are, along with the doors and their knobs that they never clean (that I wish they would).",
  "For the next time I'm shoved down as the dirt that I am when they walk on me, for when I have to scratch another score into a floor of a door that was never mine, but I remain here as the heart of the dirt evermore.",
  "8, 9, 10. Drop. Paradigm shift. Lyrical kick. Who's this? New drift.",
  "Can't disturb the water flow of this Navier-Stokes as it goes to the Navier. Eon blue, rhythmic flow.",
  "I no longer wade through the waters of my memories, nor do I disturb their water's glow. I absorb their humidities, humilities to filter them. As the dirt am I, eigendirt as I can on this ultra-mile to reach my children, so that they may taste and be hydrated by the filtered waters of the ambrosia of knowledge of love.",
  "David, star, rock, roll. I see you in front of me, my shadow shoes as they go. Disturb you not, but perturbed I feel, so I pick you up because you're so real.",
  "I take you in, always and forever, my infinite memories. You are what I remember, so I set you down, not with a kiss, but a gentle grace of a hopeful bliss.",
  "42 and 6 are just ahead of me. When I get there along the way to the convergence, 46 and then 2 will be far from what remains, as I am the hyperthymestic cell wall that retains.",
  "Yep, yep, yep. Let's go.",
  "See, I am part of the same frame, remaining in that main brain of the game, and its frame from that of which is far from that of tame. It feels so insane: this Ragnarok, this life, this ultra mile.",
  "I see my sight, never with a plank wrapped around my eyes, but free-flow form always in my life: 1. My pink Hush shoes 2. My two kitty cats 3. My Triforce operators. My way, my walk: they are my life.",
  "Giants rise, giants fall, giants crumble; big and small, wide and tall, flat rolling walls. But one should always remember that they're human through it all.",
  "What? I have to rhyme all the time?",
];

const LYRICS = [
  "Yep, yep, yep, let's go.",
  "See, I remain in the main brain, part of the same frame, brain game in the same main vein to the campaign.",
  "What I recall I retained, it's all stored in the hall, every wall of my skull's got the protocol.",
  "Install info at the speed of a blink, don't even gotta think on the brink, cause I sync every link before you ink.",
  "Shrouded in doubt? That's fine. I'm designed to align every sign, every time, every line.",
  "I'm the vine and the seed combined. They told me that's a gift; nah, it's architecture.",
  "Every lecture, every texture, I'm the human data vector, collector, projector, memory inspector.",
  "Filing every sector while you're struggling to remember my name.",
];

const SOCIAL_EMBEDS = [
  "https://twitter.com/SoQuarky/status/2034425769230041456?ref_src=twsrc%5Etfw",
  "https://twitter.com/SoQuarky/status/2034425801328988478?ref_src=twsrc%5Etfw",
  "https://twitter.com/SoQuarky/status/2035416226206478350?ref_src=twsrc%5Etfw",
  "https://twitter.com/SoQuarky/status/2035464534446723388?ref_src=twsrc%5Etfw",
  "https://twitter.com/SoQuarky/status/2035665355646157017?ref_src=twsrc%5Etfw",
  "https://twitter.com/SoQuarky/status/2035786544796381350?ref_src=twsrc%5Etfw",
  "https://twitter.com/SoQuarky/status/2036203265990521113?ref_src=twsrc%5Etfw",
  "https://twitter.com/SoQuarky/status/2036203855617101967?ref_src=twsrc%5Etfw",
  "https://twitter.com/SoQuarky/status/2036204272522563655?ref_src=twsrc%5Etfw",
  "https://twitter.com/SoQuarky/status/2036204392789995830?ref_src=twsrc%5Etfw",
  "https://twitter.com/SoQuarky/status/2036204785980813383?ref_src=twsrc%5Etfw",
  "https://twitter.com/SoQuarky/status/2036313607718543642?ref_src=twsrc%5Etfw",
];

const WRITING_DOC_URL =
  "https://docs.google.com/document/d/1nrOCQUFEetl0ea3VuO8kkXveg1SseEpY_AbpXcctyx0/edit?usp=drivesdk";

type SchematicId = "cortex" | "flow" | "constellation";

type DiagramNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  hue: number;
};

type Diagram = {
  id: SchematicId;
  title: string;
  subtitle: string;
  nodes: DiagramNode[];
  edges: Array<[string, string]>;
  shape: "circle" | "square" | "diamond";
};

const DIAGRAMS: Diagram[] = [
  {
    id: "cortex",
    title: "Neuro Lattice",
    subtitle: "A colorized cortex-style signal map of identity, memory, and voice.",
    shape: "circle",
    nodes: [
      { id: "voice", label: "Voice", x: 160, y: 120, hue: 292 },
      { id: "identity", label: "Identity", x: 360, y: 90, hue: 336 },
      { id: "hippocampi", label: "Hippocampi", x: 560, y: 140, hue: 202 },
      { id: "memory", label: "Memory", x: 700, y: 280, hue: 226 },
      { id: "eigenvertex", label: "Eigenvertex", x: 530, y: 420, hue: 190 },
      { id: "ultramile", label: "Ultramile", x: 290, y: 400, hue: 268 },
      { id: "children", label: "Children", x: 110, y: 300, hue: 144 },
    ],
    edges: [
      ["voice", "identity"],
      ["identity", "hippocampi"],
      ["hippocampi", "memory"],
      ["memory", "eigenvertex"],
      ["eigenvertex", "ultramile"],
      ["ultramile", "children"],
      ["children", "voice"],
      ["voice", "memory"],
    ],
  },
  {
    id: "flow",
    title: "Navier Flowfield",
    subtitle: "A water-energy schematic inspired by your rhythmic flow and convergence lines.",
    shape: "diamond",
    nodes: [
      { id: "source", label: "Source", x: 90, y: 220, hue: 198 },
      { id: "drift", label: "New Drift", x: 240, y: 140, hue: 224 },
      { id: "navier", label: "Navier", x: 420, y: 250, hue: 194 },
      { id: "filter", label: "Filter", x: 580, y: 190, hue: 170 },
      { id: "ambrosia", label: "Ambrosia", x: 740, y: 280, hue: 132 },
      { id: "hydrate", label: "Hydrate", x: 620, y: 390, hue: 208 },
      { id: "return", label: "Return", x: 380, y: 390, hue: 290 },
      { id: "home", label: "Home", x: 170, y: 330, hue: 318 },
    ],
    edges: [
      ["source", "drift"],
      ["drift", "navier"],
      ["navier", "filter"],
      ["filter", "ambrosia"],
      ["ambrosia", "hydrate"],
      ["hydrate", "return"],
      ["return", "home"],
      ["home", "source"],
      ["navier", "hydrate"],
    ],
  },
  {
    id: "constellation",
    title: "Evermore Constellation",
    subtitle: "A star-map schematic connecting symbols, numbers, and personal anchors.",
    shape: "square",
    nodes: [
      { id: "fish", label: "Fish 1-2-Red-New", x: 120, y: 120, hue: 216 },
      { id: "stymie", label: "Stymie", x: 280, y: 80, hue: 352 },
      { id: "david", label: "David Star", x: 430, y: 170, hue: 46 },
      { id: "cats", label: "Two Kitty Cats", x: 620, y: 120, hue: 324 },
      { id: "triforce", label: "Triforce", x: 760, y: 230, hue: 54 },
      { id: "hush", label: "Pink Hush Shoes", x: 670, y: 370, hue: 320 },
      { id: "ragnarok", label: "Ragnarok", x: 470, y: 420, hue: 12 },
      { id: "giants", label: "Giants", x: 250, y: 360, hue: 268 },
      { id: "human", label: "Human Through It", x: 120, y: 250, hue: 154 },
    ],
    edges: [
      ["fish", "stymie"],
      ["stymie", "david"],
      ["david", "cats"],
      ["cats", "triforce"],
      ["triforce", "hush"],
      ["hush", "ragnarok"],
      ["ragnarok", "giants"],
      ["giants", "human"],
      ["human", "fish"],
      ["david", "ragnarok"],
    ],
  },
];

const MINDMAP_SEED = [
  { id: "evermore", label: "Evermore", x: 450, y: 240, color: "#67e8f9", note: "Core axis" },
  { id: "identity", label: "Identity", x: 260, y: 110, color: "#f472b6", note: "Female voice" },
  { id: "numbers", label: "1-2-3 / 8-9-10 / 42+6", x: 650, y: 110, color: "#a78bfa", note: "Pattern shifts" },
  { id: "memory", label: "Hyperthymestic Memory", x: 725, y: 280, color: "#60a5fa", note: "Retention arc" },
  { id: "water", label: "Navier Water Flow", x: 250, y: 325, color: "#22d3ee", note: "Filter and hydrate" },
  { id: "children", label: "Children / Love", x: 420, y: 430, color: "#4ade80", note: "Destination node" },
  { id: "symbols", label: "Star / Triforce / Shoes", x: 610, y: 430, color: "#facc15", note: "Personal symbols" },
  { id: "human", label: "Giants are Human", x: 115, y: 220, color: "#fb7185", note: "Compassion anchor" },
];

const MINDMAP_EDGES: Array<[string, string]> = [
  ["evermore", "identity"],
  ["evermore", "numbers"],
  ["evermore", "memory"],
  ["evermore", "water"],
  ["evermore", "children"],
  ["evermore", "symbols"],
  ["water", "children"],
  ["identity", "human"],
  ["numbers", "memory"],
  ["symbols", "numbers"],
];

const STOP_WORDS = new Set([
  "the",
  "and",
  "that",
  "this",
  "with",
  "from",
  "they",
  "what",
  "have",
  "your",
  "their",
  "them",
  "when",
  "were",
  "into",
  "then",
  "been",
  "just",
  "will",
  "a",
  "i",
  "to",
  "of",
  "it",
  "my",
  "me",
  "in",
  "so",
  "is",
  "am",
  "as",
  "on",
  "for",
  "be",
  "do",
]);

function tokenize(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function topTerms(text: string) {
  const counts = new Map<string, number>();

  tokenize(text).forEach((word) => {
    if (word.length < 4 || STOP_WORDS.has(word)) {
      return;
    }
    counts.set(word, (counts.get(word) ?? 0) + 1);
  });

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([term, count]) => ({ term, count }));
}

type InkAnchor = {
  id: string;
  xPct: number;
  yPct: number;
};

type InkSettings = {
  baseWidth: number;
  pressureScale: number;
  pressureSmoothing: number;
  snapRadius: number;
};

const DEFAULT_INK_SETTINGS: InkSettings = {
  baseWidth: 1.8,
  pressureScale: 7,
  pressureSmoothing: 0.72,
  snapRadius: 24,
};

function StylusInk({
  drawMode,
  clearKey,
  anchors,
  settings,
}: {
  drawMode: boolean;
  clearKey: number;
  anchors: InkAnchor[];
  settings: InkSettings;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hintVisible, setHintVisible] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      const parent = canvas.parentElement;
      if (!parent) {
        return;
      }
      const rect = parent.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * ratio));
      canvas.height = Math.max(1, Math.floor(rect.height * ratio));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.lineJoin = "round";
      context.lineCap = "round";
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) {
      return;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
  }, [clearKey]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) {
      return;
    }

    let drawing = false;
    let activePointerId: number | null = null;
    let smoothedPressure = 0.4;
    let lastX = 0;
    let lastY = 0;

    const toLocal = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const snapToAnchor = (x: number, y: number) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const radius = settings.snapRadius;
      let snappedX = x;
      let snappedY = y;
      let closestDist = radius;

      anchors.forEach((anchor) => {
        const anchorX = (anchor.xPct / 100) * width;
        const anchorY = (anchor.yPct / 100) * height;
        const dx = anchorX - x;
        const dy = anchorY - y;
        const dist = Math.hypot(dx, dy);
        if (dist < closestDist) {
          closestDist = dist;
          snappedX = anchorX;
          snappedY = anchorY;
        }
      });

      return { x: snappedX, y: snappedY };
    };

    const pressureWidth = (event: PointerEvent) => {
      const rawPressure = event.pointerType === "pen" ? Math.max(event.pressure, 0.04) : 0.55;
      const decayed = rawPressure < 0.05 ? smoothedPressure * 0.88 : rawPressure;
      smoothedPressure = smoothedPressure * settings.pressureSmoothing + decayed * (1 - settings.pressureSmoothing);
      return settings.baseWidth + Math.pow(smoothedPressure, 0.68) * settings.pressureScale;
    };

    const start = (event: PointerEvent) => {
      if (!drawMode) {
        return;
      }
      event.preventDefault();
      drawing = true;
      activePointerId = event.pointerId;
      canvas.setPointerCapture(event.pointerId);
      setHintVisible(false);
      const point = toLocal(event);
      const snapped = snapToAnchor(point.x, point.y);
      lastX = snapped.x;
      lastY = snapped.y;
      context.beginPath();
      context.moveTo(lastX, lastY);
      context.strokeStyle = "rgba(244, 114, 182, 0.95)";
      context.lineWidth = pressureWidth(event);
      context.shadowBlur = 8;
      context.shadowColor = "rgba(244, 114, 182, 0.45)";
    };

    const move = (event: PointerEvent) => {
      if (!drawMode || !drawing || event.pointerId !== activePointerId) {
        return;
      }
      event.preventDefault();
      const point = toLocal(event);
      const snapped = snapToAnchor(point.x, point.y);

      const midX = (lastX + snapped.x) / 2;
      const midY = (lastY + snapped.y) / 2;
      context.lineWidth = pressureWidth(event);
      context.quadraticCurveTo(lastX, lastY, midX, midY);
      context.stroke();
      lastX = snapped.x;
      lastY = snapped.y;
    };

    const end = (event: PointerEvent) => {
      if (!drawMode || event.pointerId !== activePointerId) {
        return;
      }
      event.preventDefault();
      drawing = false;
      activePointerId = null;
      context.closePath();
      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }
    };

    canvas.addEventListener("pointerdown", start);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", end);
    canvas.addEventListener("pointercancel", end);

    return () => {
      canvas.removeEventListener("pointerdown", start);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", end);
      canvas.removeEventListener("pointercancel", end);
    };
  }, [drawMode]);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ touchAction: "none" }}
        className={`absolute inset-0 z-20 h-full w-full ${drawMode ? "pointer-events-auto" : "pointer-events-none"}`}
      />
      {drawMode
        ? anchors.map((anchor) => (
            <div
              key={anchor.id}
              className="pointer-events-none absolute z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-100/70 bg-cyan-300/35"
              style={{ left: `${anchor.xPct}%`, top: `${anchor.yPct}%` }}
            />
          ))
        : null}
      {drawMode && hintVisible ? (
        <p className="pointer-events-none absolute bottom-3 left-3 z-20 rounded-sm bg-[#040816]/80 px-2 py-1 text-xs text-cyan-100/85">
          Stylus mode is on. Pressure is smoothed and strokes magnetize to nearby nodes.
        </p>
      ) : null}
    </>
  );
}

function SignalVisualizer({ running }: { running: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      const { clientWidth, clientHeight } = canvas;
      canvas.width = Math.max(1, Math.floor(clientWidth * ratio));
      canvas.height = Math.max(1, Math.floor(clientHeight * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    let frame = 0;
    let raf = 0;

    const draw = () => {
      frame += 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      context.clearRect(0, 0, w, h);
      context.fillStyle = "rgba(6, 11, 28, 0.35)";
      context.fillRect(0, 0, w, h);

      const barCount = 48;
      const gap = 4;
      const barWidth = (w - gap * (barCount - 1)) / barCount;
      const phase = frame / 35;

      for (let i = 0; i < barCount; i += 1) {
        const waveA = Math.sin(phase + i * 0.25);
        const waveB = Math.sin(phase * 0.7 + i * 0.11);
        const amplitude = (waveA + waveB + 2) / 4;
        const jitter = 0.8 + Math.sin(phase * 1.7 + i) * 0.2;
        const value = running ? amplitude * jitter : 0.08;
        const height = Math.max(8, value * (h - 12));
        const x = i * (barWidth + gap);
        const y = h - height;

        context.fillStyle = `hsl(${190 + i * 1.4}, 88%, ${running ? 60 : 35}%)`;
        context.fillRect(x, y, barWidth, height);
      }

      raf = window.requestAnimationFrame(draw);
    };

    raf = window.requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(raf);
    };
  }, [running]);

  return <canvas ref={canvasRef} className="h-36 w-full rounded-sm border border-cyan-300/30" />;
}

function RetroCube({ paused }: { paused: boolean }) {
  return (
    <div className="retro-scene">
      <div className={`retro-cube ${paused ? "paused" : ""}`}>
        <div className="cube-face cube-front">EVER</div>
        <div className="cube-face cube-back">MORE</div>
        <div className="cube-face cube-left">SO</div>
        <div className="cube-face cube-right">QUIRKY</div>
        <div className="cube-face cube-top">POEM</div>
        <div className="cube-face cube-bottom">WAVE</div>
      </div>
    </div>
  );
}

function SchematicPanel() {
  const [active, setActive] = useState<SchematicId>("cortex");
  const [drawMode, setDrawMode] = useState(false);
  const [clearKey, setClearKey] = useState(0);
  const [inkSettings, setInkSettings] = useState(DEFAULT_INK_SETTINGS);

  const diagram = DIAGRAMS.find((entry) => entry.id === active) ?? DIAGRAMS[0];
  const nodeMap = new Map(diagram.nodes.map((node) => [node.id, node]));
  const diagramAnchors = diagram.nodes.map((node) => ({
    id: node.id,
    xPct: (node.x / 860) * 100,
    yPct: (node.y / 500) * 100,
  }));

  const edgePath = (from: DiagramNode, to: DiagramNode, index: number) => {
    if (diagram.id === "flow") {
      const midX = (from.x + to.x) / 2;
      const midY = (from.y + to.y) / 2 + (index % 2 === 0 ? -42 : 42);
      return `M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`;
    }
    return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
  };

  return (
    <section className="border-y border-cyan-300/20 bg-[#040816] px-6 py-16 md:px-12">
      <div className="mx-auto w-full max-w-6xl">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="font-serif text-3xl text-cyan-100"
        >
          Three Colorized Schematics
        </motion.h3>
        <p className="mt-2 max-w-3xl text-zinc-300/85">
          Swipe-friendly and stylus-ready. Pick a schematic, then use draw mode to annotate directly on top.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {DIAGRAMS.map((entry) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => setActive(entry.id)}
              className={`min-h-11 rounded-sm border px-4 text-sm transition ${
                entry.id === active
                  ? "border-cyan-100 bg-cyan-100 text-[#041327]"
                  : "border-cyan-300/40 text-cyan-100 hover:border-cyan-200"
              }`}
            >
              {entry.title}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setDrawMode((value) => !value)}
            className={`min-h-11 rounded-sm border px-4 text-sm transition ${
              drawMode
                ? "border-pink-200 bg-pink-200 text-[#2f0d2a]"
                : "border-pink-300/50 text-pink-100 hover:border-pink-200"
            }`}
          >
            {drawMode ? "Disable" : "Enable"} Stylus Draw
          </button>
          <button
            type="button"
            onClick={() => setClearKey((value) => value + 1)}
            className="min-h-11 rounded-sm border border-zinc-300/35 px-4 text-sm text-zinc-200 transition hover:border-zinc-100"
          >
            Clear Ink
          </button>
        </div>

        <p className="mt-4 text-sm text-cyan-200/80">{diagram.subtitle}</p>

        <div className="mt-4 grid gap-3 rounded-sm border border-cyan-400/20 bg-[#040a1d]/75 p-3 md:grid-cols-3">
          <label className="text-xs text-cyan-100/90">
            Pressure Scale: {inkSettings.pressureScale.toFixed(1)}
            <input
              type="range"
              min={4}
              max={12}
              step={0.2}
              value={inkSettings.pressureScale}
              onChange={(event) =>
                setInkSettings((current) => ({ ...current, pressureScale: Number(event.target.value) }))
              }
              className="mt-2 w-full"
            />
          </label>
          <label className="text-xs text-cyan-100/90">
            Pressure Smoothing: {inkSettings.pressureSmoothing.toFixed(2)}
            <input
              type="range"
              min={0.5}
              max={0.9}
              step={0.01}
              value={inkSettings.pressureSmoothing}
              onChange={(event) =>
                setInkSettings((current) => ({ ...current, pressureSmoothing: Number(event.target.value) }))
              }
              className="mt-2 w-full"
            />
          </label>
          <label className="text-xs text-cyan-100/90">
            Node Snap Radius: {inkSettings.snapRadius}px
            <input
              type="range"
              min={8}
              max={52}
              step={1}
              value={inkSettings.snapRadius}
              onChange={(event) => setInkSettings((current) => ({ ...current, snapRadius: Number(event.target.value) }))}
              className="mt-2 w-full"
            />
          </label>
        </div>

        <div className="schematic-surface relative mt-5 h-[460px] touch-none overflow-hidden rounded-sm border border-cyan-300/35">
          <svg viewBox="0 0 860 500" className="h-full w-full touch-none" role="img" aria-label={diagram.title}>
            <defs>
              <radialGradient id="diagramGlow" cx="50%" cy="35%" r="70%">
                <stop offset="0%" stopColor="rgba(45, 212, 191, 0.32)" />
                <stop offset="100%" stopColor="rgba(2, 6, 23, 0.2)" />
              </radialGradient>
            </defs>
            <rect x="0" y="0" width="860" height="500" fill="url(#diagramGlow)" />

            {diagram.edges.map(([fromId, toId], index) => {
              const from = nodeMap.get(fromId);
              const to = nodeMap.get(toId);
              if (!from || !to) {
                return null;
              }
              return (
                <path
                  key={`${fromId}-${toId}`}
                  d={edgePath(from, to, index)}
                  className="pulse-path"
                  style={{ animationDelay: `${index * 0.22}s` }}
                  stroke={`hsla(${(from.hue + to.hue) / 2}, 95%, 70%, 0.62)`}
                  strokeWidth={2.2}
                  fill="none"
                />
              );
            })}

            {diagram.nodes.map((node, index) => (
              <g key={node.id} transform={`translate(${node.x} ${node.y})`}>
                {diagram.shape === "circle" ? (
                  <circle r="26" fill={`hsla(${node.hue}, 92%, 62%, 0.3)`} stroke={`hsl(${node.hue}, 96%, 75%)`} strokeWidth="2" />
                ) : null}
                {diagram.shape === "square" ? (
                  <rect x="-24" y="-24" width="48" height="48" rx="6" fill={`hsla(${node.hue}, 92%, 62%, 0.28)`} stroke={`hsl(${node.hue}, 96%, 75%)`} strokeWidth="2" />
                ) : null}
                {diagram.shape === "diamond" ? (
                  <path d="M 0 -30 L 30 0 L 0 30 L -30 0 Z" fill={`hsla(${node.hue}, 92%, 62%, 0.25)`} stroke={`hsl(${node.hue}, 96%, 75%)`} strokeWidth="2" />
                ) : null}
                <circle r="4" fill="#e0f2fe" />
                <text x="0" y="46" textAnchor="middle" className="fill-cyan-50 text-[12px] tracking-wide">
                  {node.label}
                </text>
                <animateTransform
                  attributeName="transform"
                  type="scale"
                  values="1;1.03;1"
                  dur="3.2s"
                  repeatCount="indefinite"
                  begin={`${index * 0.2}s`}
                />
              </g>
            ))}
          </svg>
          <StylusInk drawMode={drawMode} clearKey={clearKey} anchors={diagramAnchors} settings={inkSettings} />
        </div>
      </div>
    </section>
  );
}

function MindMap() {
  const [nodes, setNodes] = useState(MINDMAP_SEED);
  const [activeNodeId, setActiveNodeId] = useState("evermore");
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [draggingPointerId, setDraggingPointerId] = useState<number | null>(null);
  const [drawMode, setDrawMode] = useState(false);
  const [clearKey, setClearKey] = useState(0);
  const [inkSettings, setInkSettings] = useState(DEFAULT_INK_SETTINGS);
  const svgRef = useRef<SVGSVGElement>(null);

  const activeNode = nodes.find((node) => node.id === activeNodeId) ?? nodes[0];

  useEffect(() => {
    if (!draggingId || drawMode) {
      return;
    }

    const clientToSvg = (clientX: number, clientY: number) => {
      const svg = svgRef.current;
      if (!svg) {
        return { x: 0, y: 0 };
      }
      const point = svg.createSVGPoint();
      point.x = clientX;
      point.y = clientY;
      const ctm = svg.getScreenCTM();
      if (!ctm) {
        return { x: 0, y: 0 };
      }
      return point.matrixTransform(ctm.inverse());
    };

    const onMove = (event: PointerEvent) => {
      if (draggingPointerId !== null && event.pointerId !== draggingPointerId) {
        return;
      }
      const next = clientToSvg(event.clientX, event.clientY);
      setNodes((current) =>
        current.map((node) =>
          node.id === draggingId
            ? {
                ...node,
                x: Math.max(70, Math.min(830, next.x)),
                y: Math.max(70, Math.min(470, next.y)),
              }
            : node,
        ),
      );
    };

    const onUp = () => {
      setDraggingId(null);
      setDraggingPointerId(null);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [draggingId, draggingPointerId, drawMode]);

  const nodeAnchors = nodes.map((node) => ({
    id: node.id,
    xPct: (node.x / 900) * 100,
    yPct: (node.y / 540) * 100,
  }));

  return (
    <section className="px-6 py-16 md:px-12">
      <div className="mx-auto w-full max-w-6xl">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65 }}
          className="font-serif text-3xl text-cyan-100"
        >
          Interactive Mind Map
        </motion.h3>
        <p className="mt-2 max-w-3xl text-zinc-300/85">
          Drag any node to reshape the structure. Tap a node to focus details. Enable stylus mode to sketch your own overlays.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setDrawMode((value) => !value)}
            className={`min-h-11 rounded-sm border px-4 text-sm transition ${
              drawMode
                ? "border-pink-200 bg-pink-200 text-[#2f0d2a]"
                : "border-pink-300/50 text-pink-100 hover:border-pink-200"
            }`}
          >
            {drawMode ? "Disable" : "Enable"} Stylus Draw
          </button>
          <button
            type="button"
            onClick={() => setClearKey((value) => value + 1)}
            className="min-h-11 rounded-sm border border-zinc-300/35 px-4 text-sm text-zinc-200 transition hover:border-zinc-100"
          >
            Clear Ink
          </button>
        </div>

        <div className="mt-4 grid gap-3 rounded-sm border border-cyan-400/20 bg-[#040a1d]/75 p-3 md:grid-cols-3">
          <label className="text-xs text-cyan-100/90">
            Pressure Scale: {inkSettings.pressureScale.toFixed(1)}
            <input
              type="range"
              min={4}
              max={12}
              step={0.2}
              value={inkSettings.pressureScale}
              onChange={(event) =>
                setInkSettings((current) => ({ ...current, pressureScale: Number(event.target.value) }))
              }
              className="mt-2 w-full"
            />
          </label>
          <label className="text-xs text-cyan-100/90">
            Pressure Smoothing: {inkSettings.pressureSmoothing.toFixed(2)}
            <input
              type="range"
              min={0.5}
              max={0.9}
              step={0.01}
              value={inkSettings.pressureSmoothing}
              onChange={(event) =>
                setInkSettings((current) => ({ ...current, pressureSmoothing: Number(event.target.value) }))
              }
              className="mt-2 w-full"
            />
          </label>
          <label className="text-xs text-cyan-100/90">
            Node Snap Radius: {inkSettings.snapRadius}px
            <input
              type="range"
              min={8}
              max={52}
              step={1}
              value={inkSettings.snapRadius}
              onChange={(event) => setInkSettings((current) => ({ ...current, snapRadius: Number(event.target.value) }))}
              className="mt-2 w-full"
            />
          </label>
        </div>

        <div className="relative mt-6 grid gap-6 lg:grid-cols-[1fr_270px]">
          <div className="relative overflow-hidden rounded-sm border border-cyan-300/35 bg-[#050a1a]">
            <svg
              ref={svgRef}
              viewBox="0 0 900 540"
              className="h-[540px] w-full touch-none"
              style={{ touchAction: "none" }}
              aria-label="Evermore mind map"
            >
              <defs>
                <pattern id="mindGrid" width="38" height="38" patternUnits="userSpaceOnUse">
                  <path d="M 38 0 L 0 0 0 38" fill="none" stroke="rgba(34, 211, 238, 0.12)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect x="0" y="0" width="900" height="540" fill="url(#mindGrid)" />

              {MINDMAP_EDGES.map(([fromId, toId], index) => {
                const from = nodes.find((node) => node.id === fromId);
                const to = nodes.find((node) => node.id === toId);
                if (!from || !to) {
                  return null;
                }
                const midX = (from.x + to.x) / 2;
                const curve = from.y < to.y ? 26 : -26;

                return (
                  <path
                    key={`${fromId}-${toId}`}
                    d={`M ${from.x} ${from.y} Q ${midX} ${(from.y + to.y) / 2 + curve} ${to.x} ${to.y}`}
                    stroke="rgba(103, 232, 249, 0.56)"
                    strokeWidth={1.8}
                    fill="none"
                    className="pulse-path"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  />
                );
              })}

              {nodes.map((node) => (
                <g
                  key={node.id}
                  transform={`translate(${node.x} ${node.y})`}
                  className="cursor-grab active:cursor-grabbing"
                  onPointerDown={(event) => {
                    if (drawMode) {
                      return;
                    }
                    event.preventDefault();
                    event.currentTarget.setPointerCapture(event.pointerId);
                    setActiveNodeId(node.id);
                    setDraggingId(node.id);
                    setDraggingPointerId(event.pointerId);
                  }}
                  onClick={() => setActiveNodeId(node.id)}
                >
                  <circle
                    r={node.id === activeNodeId ? 36 : 28}
                    fill={`${node.color}30`}
                    stroke={node.color}
                    strokeWidth={node.id === activeNodeId ? 3 : 2}
                  />
                  <circle r="6" fill={node.color} />
                  <text
                    x="0"
                    y="52"
                    textAnchor="middle"
                    style={{ fontSize: 12, fill: "#d9f7ff", letterSpacing: "0.05em" }}
                  >
                    {node.label}
                  </text>
                </g>
              ))}
            </svg>
            <StylusInk drawMode={drawMode} clearKey={clearKey} anchors={nodeAnchors} settings={inkSettings} />
          </div>

          <div className="rounded-sm border border-cyan-300/35 bg-[#040816]/85 p-4">
            <p className="text-xs tracking-[0.2em] text-cyan-200/70">FOCUS NODE</p>
            <h4 className="mt-2 font-serif text-2xl text-cyan-50">{activeNode.label}</h4>
            <p className="mt-3 text-sm text-zinc-200/90">{activeNode.note}</p>
            <p className="mt-4 text-xs text-cyan-100/75">
              Stylus tip: disable draw mode when dragging nodes, enable draw mode for freehand annotation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialEmbed() {
  const embedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scriptId = "twitter-wjs";
    const runWidgetLoad = () => {
      const twttr = (window as Window & { twttr?: { widgets?: { load: (target?: HTMLElement) => void } } }).twttr;
      twttr?.widgets?.load(embedRef.current ?? undefined);
    };

    const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (existingScript) {
      runWidgetLoad();
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    script.onload = runWidgetLoad;
    document.body.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, []);

  return (
    <section className="border-y border-cyan-300/20 bg-[#040816] px-6 py-14 md:px-12">
      <div className="mx-auto w-full max-w-5xl">
        <h3 className="font-serif text-3xl text-cyan-100">SoQuarky Embed</h3>
        <p className="mt-2 max-w-2xl text-zinc-300/85">
          Added your full feed set and writing document so this section can be dropped directly into your website or app.
        </p>
        <div className="mt-5">
          <a
            href={WRITING_DOC_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center rounded-sm border border-pink-200/60 bg-pink-100 px-4 py-2 text-sm font-semibold text-[#390f2e] transition hover:-translate-y-0.5"
          >
            Open Writing Document
          </a>
        </div>
        <div ref={embedRef} className="mt-6 grid gap-6 lg:grid-cols-2">
          {SOCIAL_EMBEDS.map((url) => (
            <div key={url} className="overflow-x-auto rounded-sm border border-pink-300/30 bg-[#080316]/65 p-2">
              <blockquote className="twitter-tweet" data-theme="dark" data-dnt="true">
                <a href={url}>View post</a>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [signalRunning, setSignalRunning] = useState(true);
  const fullText = `${STANZAS.join(" ")} ${LYRICS.join(" ")}`;

  const dashboard = useMemo(() => {
    const words = tokenize(fullText);
    const unique = new Set(words);
    const lines = STANZAS.length;
    const avgWordsPerStanza = Math.round(words.length / lines);
    const longestStanza = STANZAS.reduce((a, b) => (a.length > b.length ? a : b));
    const score = Math.min(100, Math.round((unique.size / words.length) * 540));

    return {
      lines,
      words: words.length,
      uniqueWords: unique.size,
      avgWordsPerStanza,
      longestLineWords: tokenize(longestStanza).length,
      eccentricity: score,
      terms: topTerms(fullText),
    };
  }, [fullText]);

  return (
    <main className="pink-mode min-h-screen bg-[#060b1c] text-zinc-100">
      <section className="relative flex min-h-screen items-center overflow-hidden border-b border-cyan-300/20 px-6 py-14 md:px-12">
        <div className="retro-grid" aria-hidden />
        <div className="scanlines" aria-hidden />

        <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-7"
          >
            <p className="text-xs tracking-[0.35em] text-cyan-300">SOQUIRKY.CLICK</p>
            <h1 className="font-serif text-5xl leading-none text-cyan-100 sm:text-6xl md:text-7xl">
              Evermore,
              <br />
              with Living Maps.
            </h1>
            <p className="max-w-xl text-base text-cyan-100/80 sm:text-lg">
              Retro-future poetry space with signal, colorized schematics, and stylus-first interaction for
              your Tab S10+ workflow.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#poem"
                className="rounded-sm border border-cyan-200/70 bg-cyan-100 px-4 py-2 text-sm font-semibold text-[#061428] transition hover:-translate-y-0.5"
              >
                Read The Poem
              </a>
              <button
                type="button"
                onClick={() => setSignalRunning((value) => !value)}
                className="rounded-sm border border-cyan-300/50 px-4 py-2 text-sm text-cyan-100 transition hover:border-cyan-200"
              >
                {signalRunning ? "Pause" : "Play"} Visualizer
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.15, ease: "easeOut" }}
            className="space-y-5"
          >
            <RetroCube paused={!signalRunning} />
            <SignalVisualizer running={signalRunning} />
          </motion.div>
        </div>
      </section>

      <section id="poem" className="mx-auto w-full max-w-5xl px-6 py-16 md:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mb-8 font-serif text-4xl text-cyan-100"
        >
          Evermore
        </motion.h2>
        <div className="space-y-5 border-l border-cyan-300/30 pl-5">
          {STANZAS.map((stanza, index) => (
            <motion.p
              key={stanza.slice(0, 18)}
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.55 }}
              transition={{ duration: 0.55, delay: index * 0.05 }}
              className="text-base leading-8 text-zinc-200/95"
            >
              {stanza}
            </motion.p>
          ))}
        </div>
        <p className="mt-8 text-sm tracking-[0.18em] text-cyan-200/80">I appreciate you every day.</p>
      </section>

      <section className="border-y border-cyan-300/20 bg-[#040816] px-6 py-16 md:px-12">
        <div className="mx-auto w-full max-w-5xl">
          <h3 className="font-serif text-3xl text-cyan-100">Lyric Cut</h3>
          <p className="mt-2 max-w-3xl text-zinc-300/85">
            Added as a separate performance-ready block so you can test cadence, emphasis, and map-node links.
          </p>
          <div className="mt-6 space-y-3 border-l border-pink-300/40 pl-4">
            {LYRICS.map((line) => (
              <p key={line.slice(0, 24)} className="font-mono text-sm leading-7 text-pink-100/95 md:text-base">
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>

      <SchematicPanel />

      <MindMap />

      <SocialEmbed />

      <section className="border-y border-cyan-300/20 bg-[#040816] px-6 py-14 md:px-12">
        <div className="mx-auto w-full max-w-5xl">
          <h3 className="font-serif text-3xl text-cyan-100">Poem Dashboard</h3>
          <p className="mt-2 max-w-2xl text-zinc-300/85">
            I could not reliably pull live data from soquirky.click here, so this dashboard uses metrics
            generated from the poem itself.
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-y-4 border-t border-cyan-400/20 pt-6 text-sm sm:grid-cols-3 md:grid-cols-6">
            <div>
              <dt className="text-cyan-200/70">Stanzas</dt>
              <dd className="mt-1 text-2xl text-cyan-100">{dashboard.lines}</dd>
            </div>
            <div>
              <dt className="text-cyan-200/70">Words</dt>
              <dd className="mt-1 text-2xl text-cyan-100">{dashboard.words}</dd>
            </div>
            <div>
              <dt className="text-cyan-200/70">Unique</dt>
              <dd className="mt-1 text-2xl text-cyan-100">{dashboard.uniqueWords}</dd>
            </div>
            <div>
              <dt className="text-cyan-200/70">Avg / stanza</dt>
              <dd className="mt-1 text-2xl text-cyan-100">{dashboard.avgWordsPerStanza}</dd>
            </div>
            <div>
              <dt className="text-cyan-200/70">Longest line</dt>
              <dd className="mt-1 text-2xl text-cyan-100">{dashboard.longestLineWords}</dd>
            </div>
            <div>
              <dt className="text-cyan-200/70">Eccentricity</dt>
              <dd className="mt-1 text-2xl text-cyan-100">{dashboard.eccentricity}%</dd>
            </div>
          </dl>
          <div className="mt-8 border-t border-cyan-400/20 pt-5">
            <p className="text-xs tracking-[0.2em] text-cyan-200/70">TOP TERMS</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {dashboard.terms.map((entry) => (
                <span
                  key={entry.term}
                  className="rounded-sm border border-cyan-300/35 px-2 py-1 text-xs text-cyan-100/95"
                >
                  {entry.term} x{entry.count}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-14 md:px-12">
        <div className="mx-auto w-full max-w-6xl">
          <h3 className="font-serif text-3xl text-cyan-100">Ocean Shores, Washington</h3>
          <p className="mt-2 max-w-2xl text-zinc-300/85">
            A live OpenStreetMap embed centered on Ocean Shores to ground the atmosphere in a real place.
          </p>
          <div className="mt-6 overflow-hidden rounded-sm border border-cyan-300/30">
            <iframe
              title="Ocean Shores Map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-124.212%2C46.951%2C-124.036%2C47.022&layer=mapnik&marker=46.9737%2C-124.1568"
              className="h-[420px] w-full"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
