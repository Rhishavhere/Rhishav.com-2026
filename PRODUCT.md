# Rhishav.com — Product Document

> **Version:** 0.5 · July 2026  
> **Status:** Active transformation (yeqq → rhshv)  
> **Domain:** [rhishav.com](https://rhishav.com)  
> **Handle:** `[rhshv]` (also acceptable: `[rhish]`, `[rhishav]`)  
> **Collaboration model:** Rhishav owns copy, visuals, and creative direction. Agent owns code, structure, and implementation.

---

## 0. What This Document Is

This is the **single source of truth** for the Rhishav.com portfolio transformation. It describes:

- What we are building and why
- What we are keeping from the original yeqq portfolio
- What we are changing, adding, or inventing
- How Rhishav's identity, work, and voice differ from the source
- A phased roadmap with explicit migration debt

Refer back to this document before every major change. Update it when decisions are made.

---

## 0.1 Development Conventions

| Convention | Rule |
|------------|------|
| **CSS** | **Tailwind strictly** for all new work. Existing CSS Modules stay as-is — convert gradually only when touching a component. |
| **Images** | Keep Yunus's assets as placeholders until Rhishav replaces them manually. Do not remove `/assets/yunus-emre-korkmaz/*` yet. Update `alt` text to Rhishav. |
| **Copy** | Placeholders OK — Rhishav iterates on text in collaboration. |
| **Handle** | `[rshv]` sitewide for brand/wordmark. Full name `[Rhishav Dhali]` OK in welcome/greeting. |

---

## 1. Origin & Intent

### 1.1 Lineage

This codebase began as **[yeqq](https://yeqq.com.tr)** — Yunus Emre Korkmaz's portfolio. It is a masterclass in:

- **Perspective design** — large empty white fields, typography as architecture, restraint as confidence
- **Scroll-driven storytelling** — Lenis smooth scroll, GSAP ScrollTrigger, pinned narrative sequences
- **The manifesto as product** — not a blog sidebar, but an interactive essay woven into the site itself
- **Voice as identity** — bracket notation, all-lowercase copy, terse philosophy, bilingual EN/TR

Rhishav is **deeply inspired** by this work. The goal is **not** a direct A→B content swap. It is a **transformation**: same visual grammar and interaction craft, different soul.

### 1.2 What Success Looks Like

A visitor lands on rhishav.com and within 3 seconds understands:

> This person builds things you can see and use — agents, browsers, products — with real taste and technical depth. They're a founder who ships. This site itself is the proof.

Success metrics (qualitative, not analytics-driven):

- A startup founder or early engineer thinks: *this is exactly who I'd want on the team*
- Someone reaches out because the site made them *feel* something — not because of a keyword match
- A peer bookmarks the manifesto section
- A recruiter remembers `[rshv]` after one scroll **without clicking a single link**
- Rhishav is proud to share the URL without caveats

**Home page rule:** A visitor who never leaves `/` should still experience the site's beauty — identity, work, thinking, and craft. Full pages (`/manifest`, `/projects`, `/about-me`) are the deep cuts, not prerequisites.

### 1.3 What We Are NOT Building

- A generic "AI engineer portfolio" with gradient blobs and chatbot demos
- A backend-engineer résumé that hides everything behind APIs
- A case-study factory with identical grid cards
- A LinkedIn export dressed in nice fonts
- A clone of yeqq with swapped names
- An art portfolio disguised as a dev site *(art lives at the end — see §4.5)*

---

## 2. Identity — Who Is Rhishav

### 2.1 Core Identity

| Dimension | Rhishav |
|-----------|---------|
| **Name** | Rhishav Dhali |
| **Handle** | `[rshv]` (primary), `[rhishav]`, `[rhish]` (acceptable variants) |
| **Role** | Software engineer & founder — builds AI agents, applications, and products people actually see and use |
| **Mindset** | **Design-first**, like Yunus — not the engineer who hides behind the stack. Cares about what sits on top: visuals, presentation, the felt experience |
| **Founder** | Founded **Meikai** (browser) and **Frescava** (photo editing studio) |
| **Nerd domains** | Computer science, physics, mathematics, psychology — interests that inform thinking, not labels to perform |
| **Hidden influence** | Visual artist — paints, makes 3D worlds and visuals. This shapes how software is built (creative freedom), but is **not** what the site leads with |
| **Trait** | Adapts to anything — skills, scenarios, constraints |
| **Vibe** | Internet kid. Gen Z. Modern. Fun. Humour. The kind of hire a today-standard startup actually wants |

### 2.2 Positioning Statement

> Rhishav is a design-first software engineer and founder. He builds AI agents, browsers, and products — things that sit on top of visuals and presentation, not behind them. He founded Meikai and Frescava, ships a lot of open source, and thinks deeply about software, CS, maths, and psychology. The art in him shapes how he builds, but this site is a builder's portfolio, not an art job pitch. It should feel like the internet: sharp, alive, a little funny, unmistakably now.

### 2.3 Contrast with yeqq — What's Shared vs Different

Rhishav and Yunus share more than the table below might suggest. Both are design-first builders who care about whitespace, typography, and the manifesto as product. The transformation is about **whose story, whose work, whose voice** — not about Rhishav being a different *kind* of builder.

| Dimension | yeqq (Yunus) | rshv (Rhishav) |
|-----------|--------------|----------------|
| **Builder type** | Frontend & UI/UX designer who codes | Design-first software engineer & founder who codes |
| **What they ship** | Municipal platforms, startup products (Skynotech) | AI agents, browsers, OS experiments, open source |
| **Founder story** | Skynotech, Istanbul | Meikai (browser), Frescava (photo studio) |
| **Manifesto lens** | Aesthetics, entropy, rationality — through design | Software, CS fundamentals, maths, psychology — Rhishav's own thoughts *(topics TBD by Rhishav; see §4.4)* |
| **Visual identity** | Quiet craftsperson | Quiet craftsperson **+ internet-native energy, humour, Gen Z warmth** |
| **Art** | Not featured | Exists in Rhishav — influences the work silently; **only surfacing at the very end** (showcase or `/art`) |
| **Hire signal** | "This designer-engineer has taste" | "This founder-engineer ships, has taste, and I'd want them in my startup" |

### 2.4 Brand Personality

**Primary (inherited from yeqq):** Intentional. Quiet. Precise. Not minimal by laziness — minimal by conviction.

**Secondary (Rhishav-specific):** Free. Fun. Cool. Nerd. Modern. A little unserious on the surface, serious underneath. Internet-native.

**The hire test:** Would a sharp, design-aware startup founder or early engineer look at this site and think — *yeah, this person gets it*? That's the bar.

**Voice markers:**
- Bracket notation: `[rshv]`, `[principles]`, `[thought]`, `[works]`
- All-lowercase copy (both EN and any future locales)
- Terse philosophy — say less, mean more
- Humour and warmth where it fits — Gen Z directness, not corporate polish
- First-person, direct, no corporate speak
- **No forced nerd performance** — don't name-drop physics/maths to sound smart; let interests show through honest writing

**Anti-references:**
- Generic creative-developer portfolios (particle backgrounds, 4-column case-study grids)
- Backend-engineer portfolios with zero visual craft
- Inter/Outfit used without intention *(Outfit stays — it's already embedded in the design system)*
- Awwwards editorial lane clones (display serif + mono labels + ruled separators)
- "AI wrapper" landing pages with gradient orbs and "Powered by GPT" badges
- Résumé sites that explain instead of demonstrate
- **Forced metaphor copy** — "tech debt is thermodynamics", "git branches are quantum states". If the concept isn't actually that thing, don't pretend it is *(see §4.4)*

---

## 3. Users & Context

### 3.1 Primary Audiences

| Audience | What they want | What convinces them |
|----------|----------------|---------------------|
| **Startup founders / early engineers** | Can this person ship *and* have taste? | Meikai/Frescava story, agent projects, site craft itself |
| **Software & AI engineers** | Is this person technically serious? | Open source, architecture choices, manifesto depth |
| **Design-aware recruiters** | Memorable, not templated | Above-fold clarity, whitespace, motion, humour |
| **Creative directors** | Do they have an eye? | The site IS the proof — not an art portfolio pitch |
| **Peer builders** | Inspiration, ideas | Manifesto, experimental projects (Blueberry, Ozen, Zingx) |

### 3.2 Usage Context

- **Desktop-first** — the manifesto pin sequence, marquee hover, and DiscoverMe canvas assume pointer + scroll
- **Mobile** — must remain functional and readable; some interactives degrade gracefully
- **Mid-meeting phone pull-up** — recruiter glances at `/` or `/projects` for 30 seconds
- **Deep read** — engineer spends 20 minutes in `/manifest` and one case study

---

## 4. Information Architecture

### 4.1 Route Map

```
/                    → Home (scroll narrative)
/about-me            → Extended bio + interactives
/manifest            → Interactive philosophy (pinned scroll)
/manifest/:slug      → Long-form essay per concept
/projects            → Filterable project grid
/projects/:slug      → Individual case study
/contact-me          → Contact form + links
/art                 → Visual art & 3D showcase (NEW — planned)
*                    → 404
```

### 4.2 Home Page Philosophy — The Complete First Impression

The home page (`/`) is **not a landing strip** that points elsewhere. It is the primary experience. Visitors should not have to hunt through nav, buttons, or routes to discover what makes this site special.

**Problem with a sparse home:** Large whitespace is part of the design — but emptiness between *thin* sections makes the page feel hollow. The fix is not less space; it is **more breathing room between richer sections**, each giving a real taste of something bigger.

**Principle: home = tasting menu, routes = full meal**

| Full page | Home gives (mini version) |
|-----------|---------------------------|
| `/about-me` | Welcome greeting, philosophy blurb, `[now]` snapshot, link to full story |
| `/projects` | Featured works grid (6) with header, one-liner context, "see all" |
| `/manifest` | Interactive thought section — multiple topics, expandable copy, CTA to full manifesto |
| `/manifest/:slug` | Topic teasers preview the essay themes; full prose lives on route |
| `/contact-me` | Contact invitation + interactive word cloud |
| `/art` | Quiet finale gateway *(planned)* |

**What a single scroll through `/` must deliver:**
1. **Who** — `[rshv]`, name, one-line identity
2. **How they think** — philosophy blurb + principles + manifest topics (not just a button to `/manifest`)
3. **What they build** — project cards with visual proof
4. **Who they are right now** — `[now]` backstage snapshot
5. **How to reach them** — contact section
6. **The craft itself** — motion, typography, whitespace, interactions — the site demonstrates skill while you scroll

**Anti-pattern:** A hero + one sentence + "view projects" + footer. That forces exploration. We do the opposite — **show first, link second**. CTAs go to *deeper* versions, not *first* versions.

### 4.2.1 Home Scroll Narrative (Current → Target)

| # | Section | Component | Status | Target depth on home |
|---|---------|-----------|--------|----------------------|
| 0 | Opening signature | `SignatureIntro` | Done | Particle `[rshv]` → hero handoff |
| 1 | Hero | `IntroSec` | Done | Marquee, portrait, uptime, music |
| 2 | Greeting | `WelcomeSec` | Done | Name, one-liner, portrait |
| 3 | Philosophy blurb | `AboutmeHome` | Done | Scroll-scrubbed thesis + story link |
| 4 | **`[now]` snapshot** | `HomeNowStrip` *(new)* | **WIP** | 5 backstage items — taste of about page |
| 5 | Selected works | `Works` | **done** | 6 projects + layout picker + see all |
| 6 | Principles | `PrinciplesSection` | Done | Full principles list visible |
| 7 | Thought / manifesto | `ManifestHomePage` | **WIP** | 5 topics, interactive accordion — manifesto taste on home |
| 8 | Contact invitation | `ContactHomePage` | Done | Word cloud + CTA |
| 9 | **Art finale** | `ArtShowcase` *(planned)* | Pending | Quiet gateway at end |

**Section spacing (rhythm):**

| Breakpoint | Gap between sections | Rationale |
|------------|---------------------|-----------|
| Desktop (>1024px) | `22vh` | Generous pause — each section lands before the next |
| Tablet (≤1024px) | `14vh` | Was `0vh` — sections were stacking without breath |
| Mobile (≤600px) | `10vh` | Tighter but still separated |

Spacing is set on `HomePage` container. Individual sections keep their internal `py` for content breathing room.

### 4.2.2 Home Enrichment Backlog (In Progress)

Priority order for making home self-contained:

- [x] Increase inter-section whitespace (`22vh` / `14vh` / `10vh`)
- [x] Works section header + subtitle + "see all" link
- [x] `[now]` strip on home (`HomeNowStrip`)
- [x] Expand manifest home topics (5 from manifesto themes)
- [ ] Manifest home: optional mini visual — e.g. white square motif, topic count, or single-line panel preview
- [ ] Founder one-liner under welcome (Meikai / Frescava mention inline)
- [x] Project cards → Rhishav projects (Phase 2) — story layout
- [ ] Art showcase finale (Phase 4)
- [ ] Optional: inline manifest panel preview (one interactive beat from `/manifest` without full pin sequence)

### 4.3 About Page Sections

| Section | Keep structure? | Content change |
|---------|-----------------|----------------|
| `HeroAbout` — photo carousel | Yes | Rhishav photos |
| `Aboutme` — `[who am i]` | Yes | Founder + engineer story — Meikai, Frescava, design-first |
| `WhatIDo` — services | Yes | AI agents, products, interfaces — design and code as one job |
| `SelectedWorks` | Yes | Rhishav project links |
| `DiscoverMe` — canvas mini-game | Yes *(fun/nerd fit)* | Rewrite card copy for Rhishav's workflow |
| `Techstack` — icon grid | Yes | Rhishav's stack (see §7.3) |
| `Backstage` — `[now]` | Yes | Rhishav's current life |
| `ManifestHomePage` | Yes | Updated topic teasers |

### 4.4 Manifesto — Transformation Strategy

**Keep:** The pinned scroll architecture, interactive panels, side nav, article deep-links, GSAP pin/dwell system. The manifesto format is yeqq's greatest asset — an interactive blog, not a sidebar link.

**Transform:** The *essays and voice* — from Yunus's design philosophy to Rhishav's thoughts on software, CS, maths, psychology. The interactives stay unless a topic genuinely changes.

#### How to Think About Topics (Important)

**Do not** do a 1:1 remapping of yeqq concepts into "Rhishav but physics/CS edition." That produces forced, cliché copy — entropy becomes "tech debt is thermodynamics", pareto becomes "Big-O", choice becomes "git branches." It sounds AI-generated because it is performing a translation instead of expressing a belief.

**Instead:**

1. **Start from what Rhishav actually thinks about** — software fundamentals, theory, the beauty of maths, psychology of building, decisions, trust, loss, observation. Topics must be *honest*, not *clever*.
2. **Keep a yeqq topic if it IS that topic.** Entropy is entropy. The prisoner's dilemma is the prisoner's dilemma. Pareto is pareto. These aren't "design concepts" — they're real ideas. Rhishav can rewrite the essay in his voice without renaming the panel.
3. **Change a topic only when Rhishav's thinking diverges** — not to fill a physics quota.
4. **The interactive must match the concept.** If the panel is about pareto, the distribution viz stays. Don't rebrand the viz to "complexity" while showing a power law — that's misrepresentation.
5. **Placeholders are fine.** Agent can scaffold structure; Rhishav rewrites all prose in iterations.

#### Content Guidelines

| Rule | Example |
|------|---------|
| **Fundamentals over flex** | Write about what choice actually costs — not "git branches as quantum superposition" |
| **If it isn't that, don't say it is** | Don't call loss aversion "breaking prod" unless the essay is genuinely about that |
| **Interests inform, not decorate** | Physics/maths/psychology appear when they're the subject — not as seasoning on every paragraph |
| **Interactive blog tone** | First-person, exploratory, willing to sit with an idea — like yeqq's essays, but Rhishav's brain |
| **Humour welcome** | Gen Z directness, internet cadence — but not at the expense of the idea |

#### Structural Arc (Preserve yeqq's Rhythm)

The yeqq sequence has a narrative shape that works: **origin → laws of the world → perception → self → other → closure.** Keep this rhythm. Individual topic names inside it are Rhishav's to decide.

```
[ opening ]  →  [ how the world works ]  →  [ how we see it ]  →  [ the self ]  →  [ the other ]  →  [ what remains ]
```

Current yeqq panels for reference (interactives already built):

| # | Panel | Interactive | Notes |
|---|-------|-------------|-------|
| 0 | white | Malevich square, wordmark | Opening — origin, blankness, what's worth carrying |
| 1 | entropy | Particle order/disorder | May stay as entropy — rewrite essay only |
| 2 | pareto | Power-law distribution | May stay as pareto — rewrite essay only |
| 3 | observer | Quantum observation | May stay as observer — rewrite essay only |
| 4 | dichotomy | Rational vs emotional | Topic name/essay TBD by Rhishav |
| 5 | choice | Five doors | May stay as choice — rewrite essay only |
| 6 | loss | Loss aversion curve | May stay as loss — rewrite essay only |
| 7 | dilemma | Trust/betray game | May stay as dilemma — rewrite essay only |
| 8 | remains | Closing white + contact | Closure — likely stays structurally |

> **Rhishav owns the final topic list and all essay copy.** The table above is scaffolding, not a spec. Some panels may keep yeqq's name and interactive; some may get new names if Rhishav's thinking goes somewhere else. What must not happen: renaming for the sake of rebranding.

#### Manifest Home Teaser (3 topics)

Placeholder until Rhishav writes them. Pull from whichever three manifesto essays feel most inviting — not a separate invented list. Current yeqq teasers (aesthetics / entropy / rationality) will be replaced when Rhishav's essays exist.

### 4.5 Art Showcase — The Quiet Finale

**Purpose:** Rhishav is a visual artist — paints, makes 3D worlds and environments. This matters because it **shapes how he builds software** (creative freedom, eye for composition, patience with craft). It is **not** what this site is primarily about, and Rhishav is **not** looking for art jobs.

**Visibility rule:** No explicit art references anywhere on the site until the very end. The main narrative (home, about, projects, manifesto) talks about building, founding, agents, products. Art is the reveal — not the pitch.

**Placement options:**
- **Option A:** Final section on home scroll, after contact — a quiet `[art]` or `[elsewhere]` gateway
- **Option B:** Separate `/art` route linked subtly from the finale — keeps the main site clean

**Design direction (when built):**
- Same whitespace discipline as the rest of the site
- Large imagery, minimal chrome, lightbox
- Optional 3D viewer for environment pieces
- Sparse copy — let the work breathe. No "hire me as an artist" framing
- Tone: *this is part of who i am, not what i'm selling*

**Rhishav provides:** Art assets, 3D exports/scenes, titles, optional captions.  
**Agent builds:** Section component, layout, lightbox, lazy loading, reduced-motion fallbacks.

---

## 5. Design System — Preserve & Evolve

### 5.1 What We Keep (Non-Negotiable)

These are the visual essentials Rhishav explicitly wants preserved:

| Element | Implementation | Why |
|---------|----------------|-----|
| **Large white space** | `98vw` content widths, `10vh` section gaps, hero `60vh` square | Breathing room = confidence |
| **Typography as architecture** | Outfit body + Geist Sans marquee + fluid `clamp(12px, 0.85vw, 72px)` | Scale and rhythm |
| **Monochrome base** | `--wb50` → `--wb950` gray scale | Quiet ground |
| **Accent bursts** | Random color pills on cursor/hover (`colors.js`) | Playful contrast on restraint |
| **Bracket notation** | `[section]` labels throughout | Identity marker |
| **All-lowercase** | All user-facing copy | Voice consistency |
| **Scroll craft** | Lenis + GSAP ScrollTrigger + custom eases (`hop`, `butter`) | Feel |
| **Signature intro** | Particle text → hero handoff | Opening ritual |
| **Marquee hero** | Dual-layer Geist marquee with hover speed/reverse | Kinetic identity |
| **Footer reveal** | Main scrolls over sticky footer | Depth |
| **Island navbar** | Floating morph menu with i18n + music | Navigation craft |
| **Reduced motion** | `prefers-reduced-motion` in CSS + JS | Accessibility |

### 5.2 Color Tokens

Source: `src/styles/variables.css`

- **Primary UI:** `--wb*` grayscale
- **Accent families:** yellow (`--main-color*`), orange, red, pink, purple, blue, green — full 50–950 scales
- **Usage rule:** Monochrome default. Color appears on interaction (hover pills, accent moments, project tags) — never as background wallpaper.

### 5.3 Typography Roles

| Role | Font | Usage |
|------|------|-------|
| Body / UI | **Outfit** (self-hosted woff2) | All prose, buttons, nav |
| Marquee / display | **Geist Sans** | Intro marquee, large kinetic text |
| Mono / pixel | **Geist Mono / Pixel variants** | Code hints, nerdy accents *(use sparingly)* |

### 5.4 Motion Contract

| Pattern | Tool | Reduced motion behavior |
|---------|------|-------------------------|
| Smooth scroll | Lenis | Native scroll |
| Scroll-linked reveals | GSAP ScrollTrigger | Instant show |
| Text split reveals | AnimatedSplit / SplitType | No stagger |
| Manifest pin | GSAP pin + scrub | Render all panels, no pin |
| Marquee | GSAP ticker | Static |
| Intro particles | Canvas animation | Skip or static frame |

### 5.5 Design Principles

1. **Every choice is a statement.** Fonts, spacing, motion, copy — all deliberate.
2. **Restraint is not emptiness.** Monochrome earns confidence when contrast moments land precisely.
3. **Show, don't explain.** The site is the portfolio. Interactions prove craft.
4. **Voice over template.** Brackets, lowercase, terse philosophy — deepen, never dilute.
5. **The visitor decides in 3 seconds.** Above-the-fold must answer who and why.
6. **Nerd is not noise.** Playfulness comes from personality and interactions, not from forced metaphor stacks.
7. **Art informs, it doesn't headline.** Creative background shapes the work silently until the finale.

---

## 6. Project Portfolio

### 6.1 Rhishav's Work — Project Inventory

Based on GitHub analysis + founder context. Rhishav to confirm ordering, featured status, and case study depth.

#### Founded Products

| Product | What it is | Featured? | Case study depth |
|---------|------------|-----------|------------------|
| **[Meikai](https://github.com/Rhishavhere)** *(browser)* | Rhishav's browser — parent context for Blueberry, Surfex | ★ Primary | Deep — flagship founder story |
| **[Frescava](https://github.com/Rhishavhere)** *(photo studio)* | Photo editing studio | ★ Primary | Medium — founder + design-first proof |

> Rhishav to provide: GitHub URLs, screenshots, founding story copy for Meikai and Frescava.

#### Open Source & Experiments

| Project | Tagline | Category | Featured? | Case study depth |
|---------|---------|----------|-----------|------------------|
| **[Blueberry](https://github.com/Rhishavhere/blueberry)** | Agentic browser — vision-first control, routines, research reports | `agent` · `browser` · `electron` | ★ Primary | Deep |
| **[Surfex SDK](https://github.com/Rhishavhere/surfex-sdk)** | Agentic browser automation SDK — vision-first, self-healing, BYOM | `agent` · `sdk` · `open-source` | ★ Primary | Deep |
| **[Twigs.ai](https://github.com/Rhishavhere/twigs.ai)** | Cross-AI memory sync — MCP server + memory graph | `agent` · `memory` · `infra` | ★ Primary | Deep |
| **[Ozen](https://github.com/Rhishavhere/ozen)** | Near-invisible OS layer for local AI — `@ozen` anywhere | `agent` · `desktop` · `electron` | Secondary | Medium |
| **[Zingx](https://github.com/Rhishavhere/Zingx)** | Homelab-in-a-pocket OS — boots USB, runs RAM, terminal + AI | `systems` · `os` · `homelab` | Secondary | Medium |
| **[OneCloud](https://github.com/Rhishavhere/onecloud)** | Personal cloud server — device monitoring, remote control, AI chat | `infra` · `backend` · `api` | Secondary | Medium |
| **[Amber Desktop](https://github.com/Rhishavhere/Amber-Desktop)** | Custom Hyprland desktop environment for Fedora | `systems` · `linux` · `dotfiles` | Tertiary | Light |

**Ecosystem story (for copy, not forced):**
- Meikai → Blueberry → Surfex SDK — *browser vision, extracted and productized*
- Frescava — *design-first product, visual craft*
- Ozen + Zingx + Amber — *personal computing stack*
- Twigs — *memory layer across AI tools*
- OneCloud + mydesk.app — *personal infrastructure*

### 6.2 Project Filter Tags (Replace yeqq Tags)

**Remove:** `municipal`, `startup`, `dashboard`, `uiux`, `webapp`, `mobile`

**Add:**

| Tag | Label | Projects |
|-----|-------|----------|
| `all` | all | — |
| `founder` | founded | Meikai, Frescava |
| `agent` | agents | Blueberry, Surfex, Twigs, Ozen |
| `systems` | systems | Zingx, Amber, OneCloud |
| `open-source` | open source | Surfex, Twigs, Blueberry |
| `browser` | browser | Meikai, Blueberry, Surfex |
| `infra` | infrastructure | OneCloud, Twigs, Zingx |

Rhishav may add/remove tags as the portfolio grows.

### 6.3 Case Study Structure

`WorkPage` (`src/pages/project/WorkPage.jsx`) — Tailwind, editorial layout:

```
context / role / type / tech / year
overview → challenge → approach → impact
highlights[] (title + desc — no metric numbers)
features[] (bullet list)
screenshots (lightbox gallery)
github + live links
next project link
```

**Removed:** yeqq-style `achievements` with bold client metrics. Rhishav projects use `highlights[]` instead.

**Default role:** `"founder & engineer"` (project-specific overrides in `projects.js`).

**Screenshot assets:** Rhishav to provide `/public/assets/projects/{slug}/*.webp`. Until then, yeqq placeholder banners/assets are mapped per project.

### 6.4 Projects Showcase Layout

**Story layout** (`StoryCard`) — editorial collage inspired by magazine spreads: overlapping images, asymmetric placement, strong typographic hierarchy. Used on `/projects` and home `Works`.

### 6.5 Home Works Grid

Shows **6 projects** (slice in `Works.jsx` via `ProjectsShowcase`). All 8 in `projects.js`:

1. Meikai
2. Frescava
3. Blueberry
4. Surfex SDK
5. Twigs
6. Ozen
7. Zingx
8. OneCloud

---

## 7. Content & Voice

### 7.1 Copy Ownership

| Content | Owner | Agent role |
|---------|-------|------------|
| Bio, story, `[now]` | Rhishav | Wire into locales |
| Principles list | Rhishav | Wire into locales |
| Manifesto essays | Rhishav | Structure + interactive shells |
| Project descriptions | Rhishav | Data model + page template |
| Marquee keywords | Rhishav | Already partially updated in EN |
| Art titles/captions | Rhishav | Layout + lightbox |
| SEO meta descriptions | Collaborate | Implement in `index.html` |
| Turkish locale | — | **Dropped.** EN-only until pre-launch alt locales |

### 7.2 Voice Guidelines

**Do:**
- Write like you think out loud — internet cadence, Gen Z directness
- Be funny when it's natural, not when it's trying to be relatable
- Keep sentences short; one idea per line in hero sections
- Use brackets for identity and section labels: `[rshv]`, `[works]`, `[thought]`
- Let design-first and founder energy show through what you built, not adjectives

**Don't:**
- Say "passionate about" or "leveraging synergies"
- Over-explain what the site already demonstrates
- Write manifesto essays that read like Medium posts or AI slop
- Force physics/CS metaphors onto unrelated concepts *(see §4.4)*
- Mention art anywhere before the finale section
- Use title case anywhere

### 7.3 Tech Stack Display (`Techstack.jsx`)

Replace yeqq's 18 design-dev icons with Rhishav's stack. Proposed icons:

**Languages:** Python, TypeScript, JavaScript, Rust *(if applicable)*  
**Frontend:** React, Svelte, Tailwind CSS  
**Backend:** Fastify, Flask, Node.js  
**AI/ML:** OpenAI API, Ollama, Vercel AI SDK, MCP  
**Systems:** Linux, Electron, Tauri, Buildroot, Hyprland  
**Tools:** Git, Docker, Cloudflare, Postgres, Supabase  
**Creative:** Figma, Blender *(internal — not featured prominently; art is end-only)*  

Rhishav to confirm final list and icon assets.

### 7.4 Principles (Placeholder — Rhishav to Refine)

Direction: design-first builder + founder, not CS textbook axioms.

```
[principles]
- say less, tell more
- if people can't see it, it didn't ship
- simplicity is the hardest work
- every detail is an intention
- build things that feel inevitable
```

### 7.5 Intro Marquee Keywords (Placeholder)

Direction — builder, founder, modern, fun. **No art keywords** (art is end-only).

```
• building • agents • meikai • design • software • founder • open source • the internet • ships
```

### 7.6 Uptime Clock

`IntroTopBar.jsx` shows elapsed time since a fixed origin datetime.

- **Current:** May 17, 2004 at 2:30 PM (yeqq's origin — likely birthdate)
- **Action:** Rhishav to provide personal origin moment (birthdate, first line of code, first agent shipped, etc.)

---

## 8. Technical Foundation

### 8.1 Stack (Unchanged)

| Layer | Technology |
|-------|------------|
| Framework | React 18.3 |
| Routing | react-router-dom 6 |
| Build | Vite 7 |
| CSS | Tailwind CSS 4 + CSS Modules |
| Animation | GSAP 3.12 + ScrollTrigger, Lenis 1.3 |
| i18n | i18next + react-i18next |
| Typography | Outfit (self-hosted), Geist (npm) |
| Text FX | split-type |

**No backend.** Contact form is frontend-only (verify current submission target). Projects are a JS module, not a CMS.

### 8.2 Key Files Reference

| Purpose | Path |
|---------|------|
| Routes | `src/App.jsx` |
| Home flow | `src/pages/home/HomePage.jsx` |
| Intro hero | `src/pages/home/intro/IntroSec.jsx` |
| Manifest arc | `src/pages/manifest/content/ManifestContent.jsx` |
| Projects data | `src/utils/projects.js` |
| i18n copy | `src/locales/en.json` only — **ignore `tr.json`** until pre-launch locale swap |
| Design tokens | `src/styles/variables.css` |
| SEO | `index.html` |
| Navbar | `src/layouts/navbar/Navbar.jsx` |
| Footer | `src/layouts/footer/Footer.jsx` |

### 8.3 Package Identity

- **Current package name:** `yeqq-portfolio`
- **Target:** `rhishav-portfolio` or `rshv-com`

---

## 9. Migration Debt — yeqq Remnants

Explicit checklist of what still belongs to the original portfolio. Track completion here.

### 9.1 Critical (Identity & Trust)

| Item | File(s) | Current | Target |
|------|---------|---------|--------|
| Footer wordmark | `Footer.jsx` | `[yeqq]` | `[rshv]` |
| Footer signature | `en.json` | "designed & built by yunus emre korkmaz" | "designed & built by rhishav dhali" |
| Entropy wordmark | `CostOfOrder.jsx` | `[yeqq]` | `[rshv]` |
| Meta description | `index.html` | Yunus bio | Rhishav bio |
| JSON-LD Person | `index.html` | Yunus Emre Korkmaz | Rhishav Dhali |
| Twitter meta | `index.html` | yeqq.com.tr | rhishav.com |
| Contact email | `ContactPage.jsx`, `index.html` | ynsmrkrkmzz@gmail.com | Rhishav's email |
| Social links | `Footer.jsx`, `ContactPage.jsx` | @1yunusewre, yeqqv2 | Rhishav's handles |
| Package name | `package.json` | yeqq-portfolio | rhishav-portfolio |

### 9.2 Content (Narrative)

| Item | File(s) | Action |
|------|---------|--------|
| Bio / story | `en.json` `aboutmePage` | Rewrite for Rhishav |
| What I do | `whatIDo` keys | Design-first founder — agents, products, interfaces |
| `[now]` section | `now` keys | Rhishav's current life |
| Welcome portrait | `WelcomeSec.jsx` | `/assets/rhishav/*` |
| About photos | `HeroAbout.jsx`, `WhatIDo.jsx` | Rhishav assets |
| All 9 projects | `projects.js` | Replace with Rhishav projects |
| Projects header | `projects.header_desc` | Agent/AI/systems framing |
| Turkish locale | `tr.json` | **Frozen — do not maintain.** Remove before launch; replace with Shakespearean EN + lolcat (pre-launch) |
| Form placeholder | `en.json` | Rhishav name |
| DiscoverMe cards | `discover.cards` | Rhishav workflow copy |
| Manifesto articles | `manifesto.articles.*` | Rhishav essays (9 articles) |
| Manifesto panel copy | component locales + inline | Rhishav rewrites essays; keep interactives unless topic changes |

### 9.3 Assets

| Item | Action |
|------|--------|
| `/assets/yunus-emre-korkmaz/*` | Remove after Rhishav assets added |
| `/assets/me/back.webp` | Confirm final hero image |
| `/assets/projects/*` | Replace all with Rhishav project screenshots |
| `/og-image.png` | New OG image for Rhishav |
| `/logo.svg`, favicons | Rebrand to `[rshv]` if desired |
| Ambient audio | Keep or replace — Rhishav's choice |

### 9.4 Code Hygiene

| Item | File | Action |
|------|------|--------|
| SignatureIntro gate | `HomePage.jsx` | Restore sessionStorage when visuals finalized |
| Navbar aria-label | `Navbar.jsx` | `"rshv, home"` |
| SignatureIntro comments | `SignatureIntro.jsx` | Update yeqq references |
| Graphify artifacts | `graphify-out/*` | Remove or regenerate |

---

## 10. Accessibility & Inclusion

- **WCAG AA minimum** — contrast, focus states, skip link (already present)
- **Reduced motion** — implemented; maintain for all new sections including Art showcase
- **Keyboard navigation** — island navbar ESC/Tab trap; extend to new interactives
- **i18n** — EN only during development. **Do not edit `tr.json`** — Turkish is yeqq legacy and will be removed. Pre-launch alt languages (TBD): Shakespearean English + lolcat.
- **Alt text** — Rhishav to provide for all new imagery
- **Screen reader** — decorative elements use `aria-hidden`; interactive panels need labels

---

## 11. SEO & Meta

### 11.1 Target Meta

```html
<title>hi, i am [ rhishav ]</title>
<meta name="description" content="rhishav dhali [rshv] — design-first software engineer & founder. built meikai, frescava, ai agents, and things that ship." />
<meta property="og:title" content="Rhishav — [rshv]" />
<meta property="og:description" content="software as something you can see and use." />
<meta property="og:url" content="https://rhishav.com/" />
<meta property="og:image" content="https://rhishav.com/og-image.png" />
```

### 11.2 JSON-LD Person (Target)

```json
{
  "@type": "Person",
  "name": "Rhishav Dhali",
  "alternateName": "rhshv",
  "url": "https://rhishav.com/",
  "jobTitle": "Software Engineer & Founder",
  "knowsAbout": ["AI Agents", "Software Engineering", "Product Design", "Browsers", "Open Source"],
  "sameAs": ["https://github.com/Rhishavhere"]
}
```

Rhishav to provide: email, social URLs, final description.

---

## 12. Phased Roadmap

### Phase 0 — Foundation
- [x] Fork/adapt yeqq codebase
- [x] Initial identity surfaces (title, navbar brand, signature intro, partial EN)
- [x] Geist font integration for marquee
- [x] Hero image path (`/assets/me/back.webp`)
- [x] This PRODUCT.md document
- [x] Align on handle: `[rshv]` sitewide

### Phase 1 — Identity Sweep
- [x] Replace all yeqq/Yunus references (§9.1)
- [x] Update SEO/meta/JSON-LD (§11)
- [x] Portrait + about photos — Yunus assets as placeholder, Rhishav alt text
- [x] Rewrite EN locale: welcome, bio, whatIDo, now, principles
- [x] ~~Rewrite TR locale~~ — skipped; `tr.json` frozen (remove pre-launch)
- [ ] Update uptime clock origin — mechanical date placeholder; Rhishav to set `ORIGIN` in `IntroTopBar.jsx`
- [x] Package rename → `rhishav-portfolio`
- [x] Contact email placeholder → `hello@rhishav.com` (Rhishav to confirm)

### Phase 1.5 — Home Page Enrichment *(active)*
- [x] Home page philosophy documented (§4.2)
- [x] Inter-section spacing increase
- [x] Works section header + see all
- [x] `[now]` strip on home
- [ ] Expand manifest home topics + visual preview
- [ ] Founder inline mention in welcome area
- [ ] Per-section content depth pass (ongoing with Rhishav)

### Phase 2 — Projects
- [x] Define project data model entries (§6.1) — 8 projects in `projects.js`
- [x] New filter tags (founder, agent, browser, systems, open-source)
- [x] Story layout for projects showcase (`StoryCard`)
- [x] Revamp `ProjectsPage`, home `Works`, `WorkPage` slug pages
- [x] Remove yeqq achievement metrics → `highlights[]` + `features[]`
- [x] Update `SelectedWorks` featured links (meikai, frescava, blueberry)
- [x] Locale labels (`workSingle.labels`) — EN only; `tr.json` frozen
- [ ] Rhishav provides screenshots per project (yeqq placeholders still mapped)
- [ ] Rhishav copy pass / manual tweaks
- [ ] Pick default layout; remove picker if desired — **done: story only**

### Phase 3 — Manifesto Transformation
- [ ] Rhishav decides which panels keep yeqq topics vs new names (§4.4)
- [ ] Rhishav writes/refines 9 long-form essays — placeholders OK initially
- [ ] Update wordmarks (`[rshv]`), panel copy, article locales
- [ ] Update manifest home teaser topics (pull from real essays, not invented list)
- [ ] Update side nav labels only if topic names change

### Phase 4 — Art & 3D Showcase
- [ ] Rhishav curates art/3D pieces
- [ ] Build `ArtShowcase` home section
- [ ] Lightbox + optional 3D viewer
- [ ] Optional `/art` route

### Phase 5 — Polish & Launch
- [ ] Restore SignatureIntro sessionStorage gate
- [ ] Performance pass (lazy images, chunk sizes)
- [ ] OG image + favicon rebrand
- [ ] Remove Turkish (`tr.json`) + wire alt locales (Shakespearean EN, lolcat) — pre-launch only
- [ ] Final copy review
- [ ] Deploy rhishav.com

### Phase 6 — Experimentation (Ongoing)
- [ ] New manifesto topics as Rhishav's thinking evolves
- [ ] Additional projects
- [ ] Interactive experiments (nerd Easter eggs, physics sims, etc.)
- [ ] Music/ambient identity
- [ ] Blog/thought integration beyond manifesto articles

---

## 13. Collaboration Workflow

### 13.1 Division of Labor

| Rhishav | Agent |
|---------|-------|
| Bio, story, philosophy copy | Component implementation |
| Project descriptions & metrics | Route/section structure |
| Photos, art, 3D assets | Animation & interaction code |
| Manifesto essays | Interactive panel engineering |
| Creative direction & feedback | i18n wiring, SEO plumbing |
| Final approval on all copy | Bug fixes, accessibility, performance |

### 13.2 Iteration Rhythm

1. **Discuss** — ideas, inspirations, references (this chat + future sessions)
2. **Spec** — update this PRODUCT.md when decisions are made
3. **Build** — agent implements code changes in focused PRs/commits
4. **Content pass** — Rhishav drops copy/assets into agreed locale keys or files
5. **Review** — both evaluate against §5 design principles and §2 brand personality
6. **Experiment** — try things, revert what doesn't feel like rshv

### 13.3 Decision Log

Record major decisions here as they're made:

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-07-07 | Transform, don't convert | Preserve yeqq's visual craft; replace soul with Rhishav's |
| 2026-07-07 | Design-first, like Yunus | Rhishav builds what people see — not a hidden backend engineer |
| 2026-07-07 | Founder story: Meikai + Frescava | Core identity alongside open source |
| 2026-07-07 | Art informs silently until finale | Not an art portfolio; art shapes software as creative freedom |
| 2026-07-07 | No forced physics/CS metaphor remapping | Manifesto topics must be honest, not translated yeqq→physics |
| 2026-07-07 | Gen Z / internet-native voice | Fun, humour, modern — startup hire energy |
| 2026-07-07 | `[rshv]` handle sitewide | Brand wordmark, navbar, signature intro, manifest panels |
| 2026-07-07 | Tailwind for new work only | Existing CSS Modules converted gradually |
| 2026-07-07 | Yunus assets as image placeholders | Rhishav replaces manually when ready |
| 2026-07-07 | Home = complete first impression | Show manifest, works, now on `/` — routes are deeper cuts, not gates |
| 2026-07-07 | More inter-section whitespace | `22vh` desktop, `14vh` tablet — breath between richer sections |
| 2026-07-07 | No Turkish — EN only for now | Do not edit `tr.json`; pre-launch: Shakespearean EN + lolcat |
| TBD | Final manifesto topic list & essays | Rhishav to write — placeholders OK until then |
| TBD | Uptime clock origin date | Rhishav to provide personal moment |
| TBD | Art finale: home section vs `/art` route | Rhishav to decide placement |

---

## 14. Open Questions for Rhishav

These block or inform upcoming work. Answer when ready — no rush on all at once.

1. **Handle consistency:** `[rshv]` everywhere, or mix with `[rhishav]` / `[rhish]`?
2. **Meikai & Frescava:** GitHub URLs, founding dates, screenshots, one-liner descriptions?
3. **Location & `[now]`:** Where are you based? What goes in the backstage snapshot?
4. **Uptime clock origin:** What datetime should the elapsed-time clock count from?
5. **Alt locales (pre-launch):** Shakespearean English + lolcat — details TBD at the end.
6. **Contact:** Email, social links (GitHub, X, LinkedIn, etc.)?
7. **Art finale:** Home section gateway, separate `/art` page, or both? How many pieces for v1?
8. **Manifesto essays:** Which yeqq panels keep their name vs get replaced? (Interactives mostly stay)
9. **Featured 6 on home:** Meikai, Frescava, Blueberry, Twigs, Ozen, Zingx — good?
10. **Principles & marquee:** Refine placeholders in §7.4–7.5?
11. **Ambient music:** Keep yeqq's ambient track or replace?
12. **Case study priority:** Which 3 projects get full write-ups first?
13. **DiscoverMe mini-game:** Keep with new copy, or different interactive?

---

## 15. Inspiration Board

Sources to reference during experimentation (Rhishav to add):

- **yeqq.com.tr** — origin; whitespace, manifesto, typography, design-first builder energy
- **Meikai / Frescava / Blueberry** — founder proof; things that ship and sit on visuals
- Manifesto essays Rhishav actually wants to write — not a topic translation table
- *(Add links, screenshots, and notes here as the project evolves)*

---

## Appendix A — Locale Key Map

Quick reference for where copy lives in `src/locales/en.json`:

| Key | Section | Page |
|-----|---------|------|
| `intro.*` | Marquee, clock | Home hero |
| `welcome.*` | Greeting, name, description | Home |
| `aboutHome.*` | Philosophy blurb | Home |
| `worksHome.*` | Project grid cursor words | Home |
| `principles.*` | Values list | Home |
| `manifest.*` | Thought teaser | Home + About |
| `contactHome.*` | Contact invitation | Home |
| `heroAbout.*` | About hero | About |
| `aboutmePage.*` | Bio | About |
| `whatIDo.*` | Services | About |
| `discover.*` | Canvas mini-game | About |
| `selectedWorks.*` | Curated links | About |
| `techstackAbout.*` | Stack title | About |
| `now.*` | Backstage snapshot | About |
| `projects.*` | Projects index | Projects |
| `workSingle.*` | Case study labels | Project detail |
| `manifesto.*` | Full manifesto + articles | Manifest |
| `contactPage.*` | Contact page | Contact |
| `footer.*` | Footer links + signature | Global |

---

## Appendix B — Component Tree (Home)

```
HomePage
├── SignatureIntro          → particle [rshv] → onComplete
├── IntroSec                → hero: marquee, portrait, clock, music
└── (after intro)           → gap: 22vh / 14vh / 10vh between sections
    ├── WelcomeSec          → greeting + portrait + one-liner
    ├── AboutmeHome         → philosophy blurb + story link
    ├── HomeNowStrip        → [now] backstage snapshot (mini about)
    ├── Works               → header + 6 project cards + see all
    ├── PrinciplesSection   → [principles] full list
    ├── ManifestHomePage    → thought topics accordion + manifest CTA
    ├── ContactHomePage     → floating words + CTA
    └── ArtShowcase         → (planned) quiet art finale
```

---

*Last updated: July 7, 2026 (v0.5) · Maintained by Rhishav + Agent*
