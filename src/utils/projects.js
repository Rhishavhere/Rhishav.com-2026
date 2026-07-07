/** @typedef {{ title: string, desc: string }} ProjectHighlight */
/** @typedef {{ file: string, isWide?: boolean }} ProjectImage */

/**
 * Rhishav project data.
 * Images/banners reuse yeqq placeholder assets until Rhishav replaces them.
 * No client-metric "achievement numbers" — use highlights[] instead.
 */

const works = [
  {
    id: 1,
    index: "01",
    slug: "meikai",
    project_name: "meikai",
    tagline: "the web, reimagined — a minimal native browser",
    context: "founder project",
    role: "founder & engineer",
    type: "desktop browser",
    tech: "tauri, rust, react, typescript, webview2",
    tags: ["founder", "browser", "open-source"],
    github: "https://github.com/Rhishavhere/Meikai-Tauri-v1-opensourced",
    website: "https://meikai.rhishav.com",
    year: "2024",
    desc: "meikai is a browser i founded — minimal, native, built on tauri. panel, dock, and minipanel modes explore a different interaction model than chrome tabs. the open-source tauri v1 is a reference build; the full agentic browser lives at meikai.rhishav.com.",
    challenge:
      "browsers are heavy. i wanted something native to the os — frameless, fast, transformable — that still felt like a real browsing surface, not a demo shell.",
    approach:
      "tauri 2 + system webview2 for rendering. three window modes (panel launcher, floating dock, expanded minipanel) with rust-backed window orchestration and a react ui layer. bookmarks, multi-window, smart url bar.",
    impact:
      "shipped a working native browser experiment and open-sourced the tauri foundation. evolved into a proprietary agentic browser — same vision, deeper product.",
    highlights: [
      {
        title: "transformable window modes",
        desc: "panel, dock, and minipanel — one app, three interaction paradigms.",
      },
      {
        title: "native webview stack",
        desc: "no bundled chromium. system webview2 on windows, webkit on linux, near-instant startup.",
      },
      {
        title: "tauri 2 + rust backend",
        desc: "window management, navigation, and ipc commands in rust; react 19 + vite on the frontend.",
      },
    ],
    features: [
      "panel / dock / minipanel modes",
      "multi-window browsing",
      "bookmarks tray",
      "smart url bar",
      "frameless custom chrome",
    ],
    link: "/projects/meikai",
    banner: "skynotech-website",
    asset: "/assets/projects/skynotech-website",
    images: [
      { file: "1.webp", isWide: true },
      { file: "2.webp", isWide: false },
      { file: "3.webp", isWide: false },
      { file: "4.webp", isWide: false },
    ],
  },
  {
    id: 2,
    index: "02",
    slug: "frescava",
    project_name: "frescava",
    tagline: "a photo editing studio — design-first creative tooling",
    context: "founder project",
    role: "founder & engineer",
    type: "creative application",
    tech: "react, typescript, canvas, electron",
    tags: ["founder", "design"],
    github: null,
    website: null,
    year: "2024",
    desc: "frescava is a photo editing studio i founded — built for people who care about how editing feels, not just what filters exist. design and implementation from the same hands.",
    challenge:
      "most editing tools are either pro-grade and intimidating or mobile-simple and limiting. i wanted a studio that respected visual craft without enterprise bloat.",
    approach:
      "design-first product architecture: fast canvas interactions, intentional ui density, and a workflow that keeps the image central — not the toolbar.",
    impact:
      "a founder product that proves the same eye behind this portfolio builds creative tools, not just dev infrastructure.",
    highlights: [
      {
        title: "studio-grade ux",
        desc: "editing flows designed around how creatives actually move — not feature checklists.",
      },
      {
        title: "founder-built end to end",
        desc: "product vision, interface, and implementation from one person.",
      },
    ],
    features: [
      "photo editing workspace",
      "non-destructive workflow",
      "design-first ui",
    ],
    link: "/projects/frescava",
    banner: "skynotech",
    asset: "/assets/projects/skynotech",
    images: [
      { file: "1.webp", isWide: true },
      { file: "2.webp", isWide: false },
      { file: "3.webp", isWide: false },
    ],
  },
  {
    id: 3,
    index: "03",
    slug: "blueberry",
    project_name: "blueberry",
    tagline: "agentic browser — vision-first control, routines, research",
    context: "open source",
    role: "creator",
    type: "electron browser",
    tech: "electron, typescript, react, playwright, llm apis",
    tags: ["agent", "browser", "open-source"],
    github: "https://github.com/Rhishavhere/blueberry",
    website: null,
    year: "2025",
    desc: "blueberry is an electron browser where you give an agent a goal in plain english and it takes over — screenshots, clicks, reads pages, writes research reports. routines let you save and schedule agent tasks. mini dock mode runs agents from a floating hud.",
    challenge:
      "browser agents break on dom changes, verbose llm output, and the gap between 'demo' and something you'd open daily. i needed vision-first control that survives real sites.",
    approach:
      "dual prompt modes (blind → vision on demand), json repair for malformed agent steps, real input events (not dom-simulated clicks), react-aware typing injection, and a full report pipeline after research runs.",
    impact:
      "extracted into surfex sdk — same agent core, packaged for any app. blueberry is the full browser product surface.",
    highlights: [
      {
        title: "vision-first agent loop",
        desc: "blind planning until the agent calls see — then pixel-coordinate clicks on screenshots.",
      },
      {
        title: "routines + scheduler",
        desc: "save successful agent runs, schedule hourly/daily/weekly, headless execution in background.",
      },
      {
        title: "research report pipeline",
        desc: "agent saves pages → dedicated llm writes structured markdown → in-browser report viewer with toc.",
      },
      {
        title: "mini dock mode",
        desc: "compact floating pill for search or agent runs without the full browser window.",
      },
    ],
    features: [
      "browser control agent",
      "redesign agent (live dom mutation)",
      "scheduled routines",
      "report generation",
      "mini dock + headless agent",
    ],
    link: "/projects/blueberry",
    banner: "balikesir-istihdam-ofisi",
    asset: "/assets/projects/balikesir-istihdam-ofisi",
    images: [
      { file: "1.webp", isWide: true },
      { file: "2.webp", isWide: false },
      { file: "3.webp", isWide: false },
      { file: "4.webp", isWide: false },
      { file: "5.webp", isWide: false },
    ],
  },
  {
    id: 4,
    index: "04",
    slug: "surfex-sdk",
    project_name: "surfex sdk",
    tagline: "agentic browser automation — vision-first, self-healing, byom",
    context: "open source",
    role: "creator",
    type: "typescript sdk",
    tech: "typescript, vercel ai sdk, playwright",
    tags: ["agent", "browser", "open-source"],
    github: "https://github.com/Rhishavhere/surfex-sdk",
    website: "https://www.npmjs.com/package/@surfex-ai/sdk",
    year: "2025",
    desc: "surfex is an npm sdk — give it a goal and a model, it navigates, clicks, reads, and reports. vision-first clicks survive dom redesigns. bring your own model via vercel ai sdk. driver-agnostic: playwright included, puppeteer or custom chromium forks supported.",
    challenge:
      "browser automation is brittle — selectors break, llms hallucinate actions, and research agents need citation without the main loop getting distracted.",
    approach:
      "native vision mode with auto-screenshots, json repair + coercion pass on bad llm output, separate report-writer llm for markdown synthesis, and a six-method BrowserDriver interface.",
    impact:
      "published as @surfex-ai/sdk on npm. powers e2e testing, autonomous research, and dynamic spa scraping with one plain-english goal string.",
    highlights: [
      {
        title: "bring your own model",
        desc: "claude, gpt-4o, gemini — any vercel ai sdk provider. you own keys and costs.",
      },
      {
        title: "self-healing output",
        desc: "malformed json triggers a coercion pass, not a crash.",
      },
      {
        title: "auto research reports",
        desc: "secondary llm compiles saved pages into cited markdown documents.",
      },
    ],
    features: [
      "goal-driven agent.run()",
      "playwright driver included",
      "custom driver interface",
      "onEvent streaming",
      "mid-run stop()",
    ],
    link: "/projects/surfex-sdk",
    banner: "balikesir-etkinlik",
    asset: "/assets/projects/balikesir-etkinlik",
    images: [
      { file: "1.webp", isWide: true },
      { file: "2.webp", isWide: false },
      { file: "3.webp", isWide: false },
    ],
  },
  {
    id: 5,
    index: "05",
    slug: "twigs",
    project_name: "twigs",
    tagline: "one memory. every ai. — cross-ai memory sync layer",
    context: "open source",
    role: "creator",
    type: "memory infrastructure",
    tech: "typescript, fastify, postgres, pgvector, mcp",
    tags: ["agent", "infra", "open-source"],
    github: "https://github.com/Rhishavhere/twigs.ai",
    website: null,
    year: "2025",
    desc: "twigs is a hosted memory graph plus open mcp server so claude, cursor, and other mcp clients share the same persistent context. one memory layer across every ai tool you use.",
    challenge:
      "every ai client has its own memory silo. context you build in cursor doesn't follow you to claude desktop — and vice versa.",
    approach:
      "fastify api with postgres + pgvector embeddings, mcp server with twigs_inject / twigs_add / twigs_update tools, next.js dashboard for api keys and memory management.",
    impact:
      "connective tissue across ai tools — memory that persists and syncs instead of resetting per session.",
    highlights: [
      {
        title: "mcp-native",
        desc: "stdio mcp server — drop into cursor or claude desktop config.",
      },
      {
        title: "vector memory graph",
        desc: "postgres + pgvector + openai embeddings for semantic recall.",
      },
      {
        title: "dashboard + api keys",
        desc: "signup, key management, memory list, custom system prompt export.",
      },
    ],
    features: [
      "memory graph api",
      "twigs-mcp server",
      "next.js dashboard",
      "pgvector search",
    ],
    link: "/projects/twigs",
    banner: "yakin-kart",
    asset: "/assets/projects/yakin-kart",
    images: [
      { file: "1.webp", isWide: true },
      { file: "2.webp", isWide: false },
      { file: "3.webp", isWide: false },
    ],
  },
  {
    id: 6,
    index: "06",
    slug: "ozen",
    project_name: "ozen",
    tagline: "near-invisible os layer for local ai — @ozen anywhere",
    context: "open source",
    role: "creator",
    type: "desktop overlay",
    tech: "electron, react, tailwind, ollama, groq",
    tags: ["agent", "systems"],
    github: "https://github.com/Rhishavhere/ozen",
    website: null,
    year: "2025",
    desc: "ozen is not an app you go to — it's a fluid layer at your cursor. type @ozen in any text field, the panel spawns right there. local-first via ollama, semantic memory via membrain, esc to vanish without breaking flow.",
    challenge:
      "using ai means leaving your app, opening a browser, switching context. the cognitive gap between action and knowledge is too wide.",
    approach:
      "electron multi-window orchestration: the orb (ambient cursor tracker), the panel (floating overlay at cursor), the hub (settings + memory graph). @ozen global trigger, shift+enter on selection.",
    impact:
      "ai that appears where you are and disappears without friction — private, local, and context-aware.",
    highlights: [
      {
        title: "contextual @ozen trigger",
        desc: "global detection spawns the input bar under your cursor in any app.",
      },
      {
        title: "membrain semantic memory",
        desc: "persistent spatial knowledge graph across sessions.",
      },
      {
        title: "local-first",
        desc: "ollama gemma3:1b default — data stays on your machine.",
      },
    ],
    features: [
      "global @ozen hotkey",
      "selection + shift+enter",
      "upward panel expansion",
      "semantic memory graph",
      "orb ambient indicator",
    ],
    link: "/projects/ozen",
    banner: "bapka-website",
    asset: "/assets/projects/bapka-website",
    images: [
      { file: "1.webp", isWide: true },
      { file: "2.webp", isWide: false },
      { file: "4.webp", isWide: false },
    ],
  },
  {
    id: 7,
    index: "07",
    slug: "zingx",
    project_name: "zingx",
    tagline: "homelab-in-a-pocket os — boots usb, runs in ram",
    context: "systems experiment",
    role: "creator",
    type: "portable os",
    tech: "buildroot, tauri, svelte, ollama, linux",
    tags: ["systems", "infra"],
    github: "https://github.com/Rhishavhere/Zingx",
    website: null,
    year: "2025",
    desc: "zingx is a personal homelab that fits in your pocket — boots from usb, runs entirely in ram, terminal + internet by default. tauri + svelte ui for daily dev; buildroot for the actual os image.",
    challenge:
      "homelab setups are tied to hardware at home. i wanted something portable — plug in, boot, have a full linux environment with ai and a ui shell.",
    approach:
      "buildroot external tree for boot chain (initramfs → squashfs), tauri shell with terminal/browser/dock modes, ollama integration for on-device inference, luks vault partition roadmap.",
    impact:
      "personal computing infrastructure you carry — part of the same stack as ozen, amber desktop, and onecloud.",
    highlights: [
      {
        title: "usb boot chain",
        desc: "buildroot image flashes to usb — boot anywhere, run in ram.",
      },
      {
        title: "tauri daily ui",
        desc: "terminal, browser, dock modes — develop on windows, deploy to os.",
      },
      {
        title: "local ai in the image",
        desc: "ollama + gemma3:1b baked into the homelab pocket vision.",
      },
    ],
    features: [
      "buildroot boot",
      "tauri + svelte shell",
      "usb flash scripts",
      "ollama integration",
    ],
    link: "/projects/zingx",
    banner: "askida-fatura",
    asset: "/assets/projects/askida-fatura",
    images: [
      { file: "1.webp", isWide: true },
      { file: "2.webp", isWide: false },
      { file: "3.webp", isWide: false },
    ],
  },
  {
    id: 8,
    index: "08",
    slug: "onecloud",
    project_name: "onecloud",
    tagline: "personal cloud server — monitor, control, and chat with your devices",
    context: "infrastructure",
    role: "creator",
    type: "backend api",
    tech: "python, flask, cloudflare tunnel, gemini",
    tags: ["systems", "infra"],
    github: "https://github.com/Rhishavhere/onecloud",
    website: null,
    year: "2024",
    desc: "onecloud is the backend for a personal cloud — real-time system metrics, remote screenshots, live desktop streaming, shutdown/reboot control, and an ai chat endpoint that knows your machine state. exposed via cloudflare tunnel, no open ports.",
    challenge:
      "monitoring and controlling your own devices remotely usually means vpn complexity, open ports, or trusting a third-party rmm tool.",
    approach:
      "flask api per platform (windows + fedora linux), token auth, cloudflare tunnel for secure outbound-only access, gemini ai chat with optional screenshot context, pairs with mydesk.app frontend dashboard.",
    impact:
      "personal infrastructure you own — homelab visibility and control from anywhere.",
    highlights: [
      {
        title: "cloudflare tunnel",
        desc: "no open ports, tls by default, accessible behind nat.",
      },
      {
        title: "full system api",
        desc: "cpu, memory, disk, processes, battery, temperature, screenshots, livestream.",
      },
      {
        title: "ai device chat",
        desc: "gemini endpoint with optional screenshot for contextual machine queries.",
      },
    ],
    features: [
      "system metrics api",
      "remote screenshot",
      "mjpeg livestream",
      "remote mouse/keyboard",
      "gemini ai chat",
    ],
    link: "/projects/onecloud",
    banner: "can-dostlar",
    asset: "/assets/projects/can-dostlar",
    images: [
      { file: "1.webp", isWide: true },
      { file: "2.webp", isWide: false },
      { file: "3.webp", isWide: false },
    ],
  },
];

export default works;
