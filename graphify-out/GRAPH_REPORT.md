# Graph Report - .  (2026-06-19)

## Corpus Check
- Large corpus: 225 files · ~1,152,440 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 308 nodes · 280 edges · 60 communities (45 shown, 15 thin omitted)
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 25 edges (avg confidence: 0.82)
- Token cost: 30,000 input · 900 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Dependencies & Build Config|Dependencies & Build Config]]
- [[_COMMUNITY_About Page Components|About Page Components]]
- [[_COMMUNITY_Brand Identity & App Shell|Brand Identity & App Shell]]
- [[_COMMUNITY_Home Page & App Routing|Home Page & App Routing]]
- [[_COMMUNITY_JS Compiler Config|JS Compiler Config]]
- [[_COMMUNITY_Intro, Navbar & Music|Intro, Navbar & Music]]
- [[_COMMUNITY_PWA Web Manifest|PWA Web Manifest]]
- [[_COMMUNITY_Projects & Work Pages|Projects & Work Pages]]
- [[_COMMUNITY_Contact Form|Contact Form]]
- [[_COMMUNITY_Manifest The Dichotomy|Manifest: The Dichotomy]]
- [[_COMMUNITY_Music Audio Store|Music Audio Store]]
- [[_COMMUNITY_Observer Effect Section|Observer Effect Section]]
- [[_COMMUNITY_Cost of Order Section|Cost of Order Section]]
- [[_COMMUNITY_Manifest Article|Manifest Article]]
- [[_COMMUNITY_Prisoner's Dilemma Section|Prisoner's Dilemma Section]]
- [[_COMMUNITY_Pareto Distribution Section|Pareto Distribution Section]]
- [[_COMMUNITY_Manifest Header|Manifest Header]]
- [[_COMMUNITY_Projects Data & Routes|Projects Data & Routes]]
- [[_COMMUNITY_Color Utilities|Color Utilities]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 17 edges
2. `yeqq Portfolio React App` - 5 edges
3. `index.html App Shell` - 5 edges
4. `scripts` - 4 edges
5. `useProjects()` - 4 edges
6. `prefersReducedMotion()` - 4 edges
7. `SEO Entry Points` - 4 edges
8. `SEO + OpenGraph Meta Tags` - 4 edges
9. `browserslist` - 3 edges
10. `useMusic()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `All-lowercase Copy` --semantically_similar_to--> `SEO + OpenGraph Meta Tags`  [INFERRED] [semantically similar]
  PRODUCT.md → index.html
- `Self-hosted Outfit Font Preload` --semantically_similar_to--> `Every Choice Is A Statement`  [INFERRED] [semantically similar]
  index.html → PRODUCT.md
- `yeqq Portfolio React App` --implements--> `Personal Portfolio Purpose`  [INFERRED]
  README.md → PRODUCT.md
- `Editorial Experimental Design Approach` --conceptually_related_to--> `Generic Creative Developer Anti-references`  [INFERRED]
  README.md → PRODUCT.md
- `main.jsx Module Entry` --conceptually_related_to--> `React 18 + Vite Stack`  [INFERRED]
  index.html → README.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **SEO Entry Point System** — readme_seo_entrypoints, index_html_meta_seo, robots_txt_sitemap_ref [INFERRED 0.85]
- **Voice Identity Markers** — product_bracket_notation, product_lowercase_copy, product_principle_voice_over_template [EXTRACTED 0.75]
- **Projects Data Flow** — readme_projects_data, readme_routes, readme_selected_projects [INFERRED 0.85]

## Communities (60 total, 15 thin omitted)

### Community 0 - "Dependencies & Build Config"
Cohesion: 0.06
Nodes (30): browserslist, development, production, dependencies, gsap, i18next, i18next-browser-languagedetector, lenis (+22 more)

### Community 1 - "About Page Components"
Cohesion: 0.10
Nodes (13): Aboutme(), Backstage(), cardAssets, DiscoverMe(), onAccentColor(), resolveColor(), HeroAbout(), ManifestHomePage() (+5 more)

### Community 2 - "Brand Identity & App Shell"
Cohesion: 0.09
Nodes (26): main.jsx Module Entry, SEO + OpenGraph Meta Tags, Self-hosted Outfit Font Preload, PWA Web App Manifest Link, index.html App Shell, Generic Creative Developer Anti-references, Bracket Notation Identity Marker, Intentional Quiet Precise Personality (+18 more)

### Community 3 - "Home Page & App Routing"
Cohesion: 0.11
Nodes (16): AboutmeHome, ContactHomePage, HomePage(), ManifestHomePage, PrinciplesSection, WelcomeSec, Works, LoadingPage() (+8 more)

### Community 4 - "JS Compiler Config"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, checkJs, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 5 - "Intro, Navbar & Music"
Cohesion: 0.15
Nodes (10): ManifestContent(), useMusic(), IntroSec(), prefersLightVideoLoad(), IntroTopBar(), BRAND, LANGUAGES, Navbar() (+2 more)

### Community 6 - "PWA Web Manifest"
Cohesion: 0.17
Nodes (11): background_color, description, display, icons, lang, name, orientation, scope (+3 more)

### Community 7 - "Projects & Work Pages"
Cohesion: 0.20
Nodes (6): useProjectCursor(), trProjects, useProjects(), WorkSinglePage(), ProjectsPage(), WorksHomePage()

### Community 8 - "Contact Form"
Cohesion: 0.27
Nodes (3): ContactForm(), FormContainer(), SuccessBox()

### Community 11 - "Music Audio Store"
Cohesion: 0.38
Nodes (5): emit(), getAudio(), isMusicPlaying(), listeners, toggleMusic()

### Community 14 - "Manifest Article"
Cohesion: 0.67
Nodes (3): ManifestArticle(), ORDER, pad()

### Community 20 - "Projects Data & Routes"
Cohesion: 1.00
Nodes (3): Projects Data src/utils/projects.js, Application Routes, Selected Projects Portfolio

## Knowledge Gaps
- **95 isolated node(s):** `target`, `module`, `moduleResolution`, `lib`, `jsx` (+90 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ManifestContent()` connect `Intro, Navbar & Music` to `Manifest: The Dichotomy`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **What connects `target`, `module`, `moduleResolution` to the rest of the system?**
  _99 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Dependencies & Build Config` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._
- **Should `About Page Components` be split into smaller, more focused modules?**
  _Cohesion score 0.09971509971509972 - nodes in this community are weakly interconnected._
- **Should `Brand Identity & App Shell` be split into smaller, more focused modules?**
  _Cohesion score 0.08923076923076922 - nodes in this community are weakly interconnected._
- **Should `Home Page & App Routing` be split into smaller, more focused modules?**
  _Cohesion score 0.10952380952380952 - nodes in this community are weakly interconnected._
- **Should `JS Compiler Config` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._