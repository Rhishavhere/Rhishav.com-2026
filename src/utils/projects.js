const works = [
  // -------------------------------
  // 1 — Skynotech Smart Site Systems
  // -------------------------------
  {
    id: 1,
    project_name: "skynotech | iot smart site management platform",
    company_name: "skynotech",
    role: "frontend developer & ui/ux designer",
    name: "skynotech | iot smart site management platform",
    // Fixed desc: added 'waste' and made it more outcome-focused.
    desc: "an iot-based, full-scope site management platform. it minimized waste, labor, and lack of control by providing real-time monitoring and control capabilities for critical residential infrastructure, including garden irrigation, lighting, and pool systems, all from a single hub.",
    challenge:
      "residential site teams needed a single interface for physical infrastructure that was normally fragmented across manual controls, separate devices, and delayed field checks.",
    approach:
      "i designed and built a dashboard-first workflow around real-time status, quick remote actions, and clear device grouping so technical teams could understand and control the system without extra training.",
    impact:
      "the mvp connected 80+ iot devices and turned routine operational checks into a faster remote-control workflow with measurable efficiency gains.",
    achievements: [
      {
        number: "2",
        title: "months to full mvp",
        desc: "delivered a fully functional mvp in 2 months. leveraged the speed of firebase and react/next.js to establish real-time communication between physical iot boards and the web application.",
      },
      {
        number: "80+", // Combined 30+ and 50+ into '80+'.
        title: "iot devices managed",
        desc: "enabled the integration and centralized control of 30+ iot irrigation units and 50+ smart lighting devices across two major residential complexes.",
      },
      {
        // Used a numeric value in the number field (estimated efficiency increase).
        number: "25%",
        title: "operational efficiency increase",
        desc: "implemented instant remote control via mqtt/firebase. this rapid response capability reduced dependency on manual labor, prevented waste, and boosted overall operational efficiency by 25%.",
      },
    ],
    link: "/projects/skynotech-smart-site-systems",
    asset: "/assets/projects/skynotech",
    banner: "skynotech",
    type: "web application",
    tech: "react, next.js, firebase, mqtt, figma",
    tags: ["startup", "webapp", "uiux", "dashboard", "iot"],
    images: [
      { file: "1.webp", isWide: true },
      { file: "2.webp", isWide: false },
      { file: "3.webp", isWide: false },
      { file: "4.webp", isWide: false },
      { file: "5.webp", isWide: false },
      { file: "6.webp", isWide: false },
      { file: "7.webp", isWide: false },
    ],
  },

  // ----------------------------------------------------
  // 2 — Skynotech | Corporate Brand & Web Presence
  // ----------------------------------------------------
  {
    id: 2,
    project_name: "skynotech | corporate brand & web presence",
    company_name: "skynotech",
    role: "frontend developer & ui/ux designer",
    name: "skynotech | corporate brand & web presence",
    desc: "designed and developed the official corporate website, establishing a new brand image to reflect skynotech's technological leadership. the site registered the visual language (logo, icons, design system) which i created.",
    challenge:
      "skynotech needed a corporate presence that could explain a technical iot product clearly while also making the new brand feel credible and scalable.",
    approach:
      "i created the visual identity, interface system, and front-end implementation together so the website, product ui, icons, and brand language could feel like one ecosystem.",
    impact:
      "the result became the public face of the company and established a consistent design system for both the corporate site and the main platform.",
    achievements: [
      {
        number: "96",
        title: "lighthouse performance score",
        // Highlighted Next.js usage and optimization.
        desc: "achieved a 96+ lighthouse score for performance by optimizing frontend assets and leveraging next.js for a fast user experience.",
      },
      {
        number: "100%",
        title: "design system implementation",
        // Highlighted consistency between the app and website.
        desc: "created and implemented a scalable component library and design system, ensuring a 100% consistent and responsive visual language across both the corporate site and the main iot platform.",
      },
      {
        number: "1",
        title: "brand identity creation",
        // Highlighted brand identity creation.
        desc: "spearheaded the complete visual identity, including logo design, iconography, and establishing the unified design principles for the new market image.",
      },
    ],
    link: "/projects/skynotech-smart-site-systems-website",
    banner: "skynotech-website",
    asset: "/assets/projects/skynotech-website",
    type: "corporate website",
    tech: "next.js, figma",
    tags: ["startup", "webapp", "uiux", "brand-identity", "design-system"],
    images: [
      { file: "1.webp", isWide: true },
      { file: "2.webp", isWide: false },
      { file: "3.webp", isWide: false },
      { file: "4.webp", isWide: false },
      { file: "5.webp", isWide: false },
      { file: "6.webp", isWide: false },
    ],
  },

  // -------------------------------------------------------------------------
  // 3 — Balıkesir | High-Performance Digital Employment Platform
  // -------------------------------------------------------------------------
  {
    project_name: "balıkesir digital employment platform",
    company_name: "balıkesir metropolitan municipality",
    role: "frontend developer & ui/ux designer",
    name: "balıkesir digital employment platform",
    desc: "a high-performance municipal employment platform designed for speed and accessibility. the project’s hyper-optimized ui/ux ensures citizens can quickly access job listings and employers can post vacancies efficiently.",
    challenge:
      "citizens and employers were moving through a slow, paper-heavy employment process where application tracking and candidate matching were hard to follow.",
    approach:
      "i focused the interface on speed, accessible flows, clear job discovery, employer posting, application tracking, and pdf cv generation for public-service use at scale.",
    impact:
      "the platform collected 12,291 resumes, supported 428 businesses, and helped the municipality move a critical public workflow into a faster digital channel.",
    achievements: [
      {
        number: "30%",
        title: "process speed increase",
        // Highlighted the paper-to-digital transition.
        desc: "digitalization of the paper-based application process resulted in a 30% increase in overall hiring and application process speed, benefiting both citizens and employers.",
      },
      {
        number: "12,291",
        title: "resumes & applications",
        // Incorporated quantitative results.
        desc: "enabled the digital collection of 12,291 resumes, 428 registered businesses, and facilitated 5,324 candidate referrals, proving the system's high adoption rate.",
      },
      {
        number: "94",
        title: "lighthouse accessibility score",
        // Highlighted accessibility and social impact.
        desc: "achieved a 94+ accessibility score, ensuring that critical public services—such as self-tracking application status and generating pdf cvs—are fully accessible to all citizens.",
      },
      {
        number: "0.8s",
        title: "core web vitals optimized",
        // Consolidated technical metrics under a single heading.
        desc: "optimized core web vitals, achieving 0.8s fcp, 210ms tbt, and an extremely stable 0.002 cls score, making job searching seamless and fast.",
      },
    ],
    link: "/projects/balikesir-istihdam-ofisi",
    asset: "/assets/projects/balikesir-istihdam-ofisi",
    banner: "balikesir-istihdam-ofisi",
    type: "web application",
    tech: "react, javascript, figma",
    tags: ["municipal", "webapp", "uiux", "high-performance", "accessibility"],
    images: [
      { file: "1.webp", isWide: true },
      { file: "2.webp", isWide: false },
      { file: "3.webp", isWide: false },
      { file: "4.webp", isWide: false },
      { file: "5.webp", isWide: false },
    ],
  },

  // ----------------------------------------------------
  // 4 — Balıkesir | Modern Youth Event Mobile Hub
  // ----------------------------------------------------
  {
    id: 4,
    project_name: "balıkesir | event app",
    company_name: "balıkesir metropolitan municipality",
    role: "frontend developer & ui/ux designer",
    name: "balıkesir | event app",
    desc: "a dedicated react native mobile application providing instant notifications and real-time listings for youth-focused events (concerts, theatre, cinema). it transitioned the municipality's image from institutional to a modern, accessible, and cool brand for young users.",
    challenge:
      "youth events were scattered across social media and institutional announcements, making discovery unreliable for the audience that needed fast mobile updates.",
    approach:
      "i designed a mobile-first event hub with a more energetic visual language, simple categories, and notification-ready flows for concerts, theatre, cinema, and local activities.",
    impact:
      "the app created a central event touchpoint for a 100k+ youth audience and helped the municipality speak with a more modern digital voice.",
    achievements: [
      {
        number: "40+",
        title: "screens & ui/ux design",
        desc: "designed over 40 distinct screens in figma, developing a unique, modern, and engaging visual language that successfully moved away from the municipality’s traditional corporate aesthetic.",
      },
      {
        number: "100k+",
        title: "targeted user reach",
        desc: "targeted an audience of 100,000+ young citizens, creating a centralized digital space for social events that was previously unavailable outside of decentralized social media channels.",
      },
      {
        number: "100%",
        title: "real-time system implementation",
        desc: "achieved 100% implementation of the instant notification system via react native, providing real-time updates (concerts, movies, etc.) and addressing the challenge of poor social event communication.",
      },
    ],
    link: "/projects/balikesir-etkinlik",
    asset: "/assets/projects/balikesir-etkinlik",
    banner: "balikesir-etkinlik",
    type: "mobile application",
    tech: "react native, figma",
    tags: ["municipal", "mobile", "uiux", "react-native", "youth-focus"],
    images: [
      { file: "1.webp", isWide: true },
      { file: "2.webp", isWide: false },
      { file: "3.webp", isWide: false },
      { file: "4.webp", isWide: true },
      { file: "5.webp", isWide: false },
      { file: "6.webp", isWide: false },
      { file: "7.webp", isWide: true },
      { file: "8.webp", isWide: false },
      { file: "9.webp", isWide: false },
      { file: "10.webp", isWide: true },
      { file: "11.webp", isWide: false },
      { file: "12.webp", isWide: false },
      { file: "13.webp", isWide: true },
      { file: "14.webp", isWide: false },
      { file: "15.webp", isWide: false },
    ],
  },

  // ----------------------------------------------------
  // 5 — Yakın Kart | Social Financial Assistance App
  // ----------------------------------------------------

  {
    id: 5,
    project_name: "yakın kart | social financial assistance app",
    company_name: "balıkesir metropolitan municipality",
    role: "frontend developer & ui/ux designer",
    name: "yakın kart | social financial assistance app",
    // Updated description: focus on financial support and management.
    desc: "a social municipal platform that digitizes financial support management for citizens in need. it provides users with a reliable, transparent hub to track their monthly assistance funds and manage their usage.",
    challenge:
      "citizens receiving financial assistance needed a transparent way to understand balance, usage, and support status without depending on unclear offline communication.",
    approach:
      "i shaped the ux around trust: balance visibility, expense review, simple inquiry, and calm mobile flows that make sensitive financial support feel understandable.",
    impact:
      "the product supported 12,101 citizens and made monthly assistance easier to track through a clearer self-service mobile experience.",
    achievements: [
      {
        number: "12,101",
        title: "citizens supported",
        // Direct social impact and quantitative data.
        desc: "provided direct financial support to 12,101 citizens via monthly 1000₺ cash assistance, establishing a critical digital lifeline for the community.",
      },
      {
        number: "100%",
        title: "real-time balance & tracking",
        // Transparency and ease of management through UI/UX design.
        desc: "developed pages for citizens to instantly check their current balance and review expenses. this feature allowed users 100% transparency, empowering them to categorize and manage their budget easily.",
      },
      {
        number: "1",
        title: "single-click query system",
        // Ease of use and reliability.
        desc: "implemented a simplified 'single-click query' function within the app, significantly improving the trust and usability of the platform for all financial and social assistance inquiries.",
      },
    ],
    link: "/projects/yakin-kart",
    asset: "/assets/projects/yakin-kart",
    banner: "yakin-kart",
    type: "mobile application",
    tech: "react native, figma",
    tags: [
      "municipal",
      "mobile",
      "uiux",
      "financial-management",
      "social-impact",
    ],
    images: [
      { file: "1.webp", isWide: true },
      { file: "2.webp", isWide: false },
      { file: "3.webp", isWide: false },
      { file: "4.webp", isWide: false },
      { file: "5.webp", isWide: false },
    ],
  },

  // -------------------------------
  // 6 — BAPKA Official Website
  // -------------------------------
  {
    id: 6,
    project_name: "bapka corporate website & information hub",
    company_name: "balıkesir planning and development agency",
    role: "frontend developer & ui/ux designer",
    // Updated name: highlighted success and corporate image.
    name: "bapka corporate website & information hub",
    // Updated desc: combined design and growth goals.
    desc: "a completely redesigned corporate website aimed at establishing a strong online presence and driving organic traffic. the project involved creating the entire design language and optimizing the platform for search engines.",
    challenge:
      "bapka needed a more useful public information hub that could surface reports, announcements, and institutional content without feeling slow or buried.",
    approach:
      "i redesigned the information architecture, homepage hierarchy, and visual system with seo, readability, and content discovery as the main constraints.",
    impact:
      "the redesign helped drive 43% monthly seo growth and brought 600+ organic visitors in the first 28 days.",
    achievements: [
      {
        number: "43%",
        title: "monthly seo growth",
        desc: "achieved a 43% monthly increase in seo traffic via speed optimization, structured data implementation, and targeted social media management for announcements.",
      },
      {
        number: "600+",
        title: "organic visitors in 28 days",
        desc: "gained over 600 organic visitors in the first 28 days by focusing on technical seo and strategic use of high-value keywords within the content architecture.",
      },
      {
        number: "1.618",
        title: "major redesign & architecture",
        desc: "led the complete site redesign, improving citizen engagement by redesigning the homepage according to the golden ratio principle and strategically highlighting key reports and announcements.",
      },
    ],
    link: "/projects/bapka-website",
    asset: "/assets/projects/bapka-website",
    banner: "bapka",
    type: "corporate website",
    tech: "react, javascript, figma",
    tags: ["municipal", "webapp", "uiux", "seo", "content-strategy"],
    images: [
      { file: "1.webp", isWide: true },
      { file: "2.webp", isWide: false },
      { file: "3.webp", isWide: false },
      { file: "4.webp", isWide: false },
      { file: "5.webp", isWide: false },
      { file: "6.webp", isWide: false },
      { file: "7.webp", isWide: false },
    ],
  },

  // ----------------------------------------------------
  // 7 — Askıda Fatura | Social Solidarity Platform
  // ----------------------------------------------------

  {
    id: 7,
    project_name: "askıda fatura | social solidarity platform",
    company_name: "balıkesir metropolitan municipality",
    role: "frontend developer & ui/ux designer",
    name: "askıda fatura | social solidarity platform",
    desc: "a mobile platform developed with react native that facilitates anonymous social solidarity by enabling citizens to pay essential utility bills (electricity, water, gas) for those in financial need.",
    challenge:
      "a solidarity product has to make giving feel safe while protecting the dignity and privacy of people who need help.",
    approach:
      "i simplified the flow around three essential bill categories and designed anonymity into the interface by showing only the information needed to complete a donation.",
    impact:
      "the application turned a sensitive assistance flow into a clear mobile experience built around trust, privacy, and fast action.",
    achievements: [
      {
        number: "100%",
        title: "anonymous & trustworthy design",
        desc: "ensured 100% anonymity for both donors and recipients by displaying only the bill amount and category (electricity, water, gas), fostering trust and participation in the solidarity system.",
      },
      {
        number: "3",
        title: "simplified bill categories",
        desc: "simplified the donor experience by limiting the display of bills to three essential categories (electricity, water, gas), making the payment process clear and fast.",
      },
      {
        number: "3+",
        title: "intuitive ux flows",
        desc: "designed intuitive user flows for key operations (leaving a bill, querying a bill, payment), minimizing friction and ensuring ease of use for citizens needing assistance.",
      },
    ],
    link: "/projects/askida-fatura",
    asset: "/assets/projects/askida-fatura",
    banner: "askida-fatura",
    type: "mobile application",
    tech: "react native, figma",
    tags: ["municipal", "mobile", "uiux", "social-impact", "react-native"],
    images: [
      { file: "1.webp", isWide: true },
      { file: "2.webp", isWide: false },
      { file: "3.webp", isWide: false },
      { file: "4.webp", isWide: false },
      { file: "5.webp", isWide: false },
    ],
  },

  // ----------------------------------------------------
  // 8 — Can Dostlar | Safe Animal Adoption Platform
  // ----------------------------------------------------
  {
    id: 8,
    project_name: "can dostlar | safe animal adoption platform",
    company_name: "balıkesir metropolitan municipality",
    role: "frontend developer & ui/ux designer",
    name: "can dostlar | safe animal adoption platform",
    desc: "a react native mobile application designed to ensure the safe and transparent rehoming of stray animals. the platform focuses on human-centered adoption processes to create lasting bonds between citizens and animals.",
    challenge:
      "adoption flows needed to feel warm and simple without losing the structure required for safe, responsible animal rehoming.",
    approach:
      "i designed profile details, application steps, and approval flow around transparency so citizens could make informed decisions before visiting the shelter.",
    impact:
      "the app created a reusable social-welfare pattern inside the municipality's mobile ecosystem while making adoption information easier to understand.",
    achievements: [
      {
        number: "3",
        title: "structured vetting process",
        // Achievement: 3-step critical flow for safe and ethical adoption.
        desc: "designed a 3-step critical adoption flow (online application → shelter visit/bonding → final approval) to ensure safe rehoming and facilitate the human-animal bond.",
      },
      {
        number: "5+",
        title: "transparent animal profiles",
        // Achievement: Display of key data points (age, weight, gender, etc.) from the detail page.
        desc: "developed a ui/ux that transparently presents 5+ vital data points for each animal, including age, weight, and personality, supporting responsible and informed adoption decisions.",
      },
      {
        number: "1",
        title: "unified mobile ecosystem",
        // Achievement: The contribution to the scalable, municipal app ecosystem.
        desc: "contributed to the development of the municipality's unified mobile ecosystem (5+ apps), showcasing the ability to deliver consistent, scalable, and reusable social welfare solutions across multiple react native applications.",
      },
    ],
    link: "/projects/can-dostlar",
    asset: "/assets/projects/can-dostlar",
    banner: "can-dostlar",
    type: "mobile application",
    tech: "react native, figma",
    tags: ["municipal", "mobile", "uiux", "social-impact", "animal-welfare"],
    images: [
      { file: "1.webp", isWide: true },
      { file: "2.webp", isWide: false },
      { file: "3.webp", isWide: false },
      { file: "4.webp", isWide: false },
      { file: "5.webp", isWide: false },
    ],
  },

  // -------------------------------
  // 9 — Balıkesir Eczane App
  // -------------------------------
  {
    id: 9,
    project_name: "balıkesir | pharmacy finder",
    company_name: "balıkesir metropolitan municipality",
    role: "frontend developer & ui/ux designer",
    name: "balıkesir | pharmacy finder",
    desc: "a critical mobile application providing real-time, location-based guidance to on-duty pharmacies. the ux prioritizes speed and clarity for citizens seeking urgent medical access.",
    challenge:
      "people looking for an on-duty pharmacy are often stressed, mobile, and time-constrained, so the interface had to remove every nonessential step.",
    approach:
      "i designed the flow around emergency ux: nearby pharmacy, distance, and navigation access within as few taps as possible.",
    impact:
      "the application made urgent pharmacy discovery faster and more reliable through location-based, real-time information.",
    achievements: [
      {
        number: "2",
        title: "quick-access navigation flow",
        desc: "designed the 'emergency ux' to enable citizens to find the nearest on-duty pharmacy and initiate navigation (yol tarifi al) within a maximum of 2 taps from opening the app.",
      },
      {
        number: "100%",
        title: "real-time location & distance",
        desc: "implemented a real-time system that calculates and displays the precise distance (e.g., 88m) between the user and the pharmacy, ensuring 100% location accuracy for time-critical services.",
      },
      {
        number: "24/7",
        title: "high-availability api integration",
        desc: "established a 24/7 high-availability system by integrating a central api for real-time updating of on-duty pharmacy schedules, providing reliable information during emergency hours.",
      },
    ],
    link: "/projects/balikesir-eczane",
    asset: "/assets/projects/balikesir-eczane",
    banner: "balikesir-eczane",
    type: "mobile application",
    tech: "react native, figma",
    tags: ["municipal", "mobile", "uiux", "emergency-service", "maps"],
    images: [
      { file: "1.webp", isWide: true },
      { file: "2.webp", isWide: false },
      { file: "3.webp", isWide: false },
      { file: "4.webp", isWide: false },
      { file: "5.webp", isWide: false },
    ],
  },
];

export default works;
