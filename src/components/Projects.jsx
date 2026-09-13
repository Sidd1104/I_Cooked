import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    title: "DiligenceOS",
    episode: "S01 E01",
    match: "99%",
    category: "AI & LegalTech Architecture",
    problem: "Manual due-diligence research on corporate filings is slow and impossible to trace back to source pages.",
    detail: "Real-time token-streamed answers with exact PDF page citations, across hard multi-tenant data isolation.",
    tags: ["Python", "TypeScript", "RAG", "pgvector", "Celery/Redis", "Claude Sonnet 4.6"],
    live: "https://diligenceos-fawn.vercel.app",
    github: "https://github.com/Sidd1104/DiligenceOS"
  },
  {
    title: "Kharcha",
    episode: "S01 E02",
    match: "98%",
    category: "Real-Time FinTech System",
    problem: "Splitting group expenses (hostel/PG/trip) usually needs far more transactions than necessary to settle up.",
    detail: "Greedy minimum-cash-flow algorithm collapses messy cross-payments into the minimum number of settlement transactions.",
    tags: ["Next.js", "React", "Node.js", "Express", "Socket.IO", "PostgreSQL"],
    live: "https://kharcha.site",
    github: "https://github.com/Sidd1104/Kharcha"
  },
  {
    title: "DocuMind",
    episode: "S01 E03",
    match: "97%",
    category: "Document Intelligence",
    problem: "Personal documents are scattered and hard to search or reason over, with AI tools prone to hallucination.",
    detail: "100% grounded answers via strict prompt guardrails, with automatic dual-LLM failover.",
    tags: ["Next.js", "React", "Prisma", "SQLite/PostgreSQL", "Claude + Gemini"],
    status: "IN PROGRESS",
    live: null,
    github: "https://github.com/Sidd1104/DocuMind"
  },
  {
    title: "Real-Time Productivity Manager",
    episode: "S01 E04",
    match: "98%",
    category: "Distributed Collaboration",
    problem: "Task prioritization and team sync usually lag behind actual deadline pressure.",
    detail: "Dynamic priority scoring by deadline/overdue status, with MongoDB aggregation pipeline analytics.",
    tags: ["MERN", "Redux Toolkit", "Socket.io", "JWT + bcrypt"],
    live: "https://real-time-productivity-manager.vercel.app",
    github: "https://github.com/Sidd1104/real-time-productivity-manager"
  },
  {
    title: "AI-AGENT",
    episode: "S01 E05",
    match: "96%",
    category: "Workflow Automation",
    problem: "Manual cross-app task management wastes time without automation.",
    detail: "Connects and automates workflows across multiple apps via Zapier integration.",
    tags: ["HTML", "CSS", "JavaScript", "Zapier"],
    live: "https://sidd-aiagent.vercel.app",
    github: "https://github.com/Sidd1104/AI-AGENT"
  },
  {
    title: "DualMind AI",
    episode: "S01 E06",
    match: "99%",
    category: "Multimodal AI Suite",
    problem: "Content creators and learners need separate tools for image captioning and quiz-building.",
    detail: "Two AI tools — image captioning and quiz generation — unified in one seamless app.",
    tags: ["Next.js", "Tailwind CSS", "Gemini AI"],
    live: "https://sidd-ai-dual-app.vercel.app",
    github: "https://github.com/Sidd1104/SIDD_AI_DUAL.APP"
  }
];

const Projects = () => {
  const containerRef = useRef(null);
  const folderBackRef = useRef(null);
  const folderFrontRef = useRef(null);
  const cardsRef = useRef([]);
  const mobileCardsRef = useRef([]);
  const mobileCarouselRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Set initial origins (Centered in viewport)
      gsap.set([folderBackRef.current, folderFrontRef.current], { 
        xPercent: -50, 
        yPercent: -50 
      });
      gsap.set(folderFrontRef.current, { transformOrigin: "bottom center" });
      
      // Clean 2-row x 3-column grid arrangement for exactly 6 cards
      const getGridPos = (index) => ({
        row: Math.floor(index / 3),
        col: index % 3
      });

      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          rotation: gsap.utils.random(-6, 6),
          scale: 0.85,
          x: 0,
          y: 0,
        });
      });

      let mm = gsap.matchMedia();

      mm.add({
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)"
      }, (context) => {
        let { isDesktop, isMobile } = context.conditions;

        if (isDesktop) {
          let floatTween;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 50%", 
              end: "bottom 50%",
              toggleActions: "play reverse play reverse",
              onEnter: () => { if (floatTween) floatTween.kill(); },
              onEnterBack: () => { if (floatTween) floatTween.kill(); },
              onLeave: () => { if (floatTween) floatTween.kill(); },
              onLeaveBack: () => { if (floatTween) floatTween.kill(); }
            },
            onComplete: () => {
              floatTween = gsap.to(cardsRef.current, {
                y: "+=10",
                rotation: "+=0.8",
                duration: 3.5,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
                stagger: { amount: 1.2, from: "random" }
              });
            }
          });

          // 1. Folder opens with smooth rotation
          tl.to(folderFrontRef.current, {
            rotationX: -130,
            duration: 1.2,
            ease: "power3.inOut"
          });

          // 2. Cards rise up collectively out of the folder
          tl.to(cardsRef.current, {
            y: -140,
            scale: 0.9,
            zIndex: 70,
            duration: 0.6,
            stagger: 0.04,
            ease: "back.out(1.2)"
          }, "-=0.6");

          // 3. Cards spread out into a clean 2x3 blockbuster grid
          tl.to(cardsRef.current, {
            x: (i) => {
              const w = Math.max(...cardsRef.current.map(c => c?.offsetWidth || 0)) || 360;
              const gap = 36;
              const { col } = getGridPos(i);
              return (col - 1) * (w + gap);
            },
            y: (i) => {
              const h = Math.max(...cardsRef.current.map(c => c?.offsetHeight || 0)) || 290;
              const gap = 36;
              const { row } = getGridPos(i);
              return (row - 0.5) * (h + gap);
            },
            rotation: () => gsap.utils.random(-2, 2),
            scale: 1,
            duration: 1.4,
            stagger: { amount: 0.4, from: "center" },
            ease: "expo.out"
          }, "-=0.2")
          .to([folderBackRef.current, folderFrontRef.current], {
            opacity: 0.35,
            duration: 0.8
          }, "-=1.0");
        }

        if (isMobile) {
          const cardW = window.innerWidth * 0.8;
          const gap = 20;
          
          mobileCardsRef.current.forEach((card, i) => {
            if (!card) return;
            gsap.set(card, {
              x: -(i * (cardW + gap)), 
              y: 0,
              scale: 0.4,
              opacity: 0,
              rotation: gsap.utils.random(-15, 15)
            });
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 60%",
            }
          });

          tl.to(folderFrontRef.current, {
            rotationX: -130,
            duration: 0.8,
            ease: "power3.inOut"
          });

          tl.to(mobileCardsRef.current, {
            y: -100,
            opacity: 1,
            scale: 0.85,
            duration: 0.6,
            stagger: 0.05,
            ease: "back.out(1.2)"
          }, "-=0.4");

          tl.to(mobileCardsRef.current, {
            x: 0,
            y: 0,
            rotation: 0,
            scale: (i) => i === 0 ? 1 : 0.92,
            opacity: (i) => i === 0 ? 1 : 0.5,
            duration: 0.8,
            stagger: 0.08,
            ease: "expo.out",
            onComplete: () => {
              if (mobileCarouselRef.current) {
                mobileCarouselRef.current.style.overflowX = 'auto';
                mobileCarouselRef.current.style.pointerEvents = 'auto';
              }
            }
          }, "-=0.2");
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={containerRef} className="bg-[#0b0b0b] min-h-[100svh] md:min-h-[170vh] relative font-sans overflow-x-clip text-white w-full flex items-center justify-center py-24 md:py-40 select-none">
      
      {/* Top Episode 04 Badge */}
      <div className="absolute top-8 md:top-12 left-6 md:left-12 z-20 pointer-events-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-red-600/40 text-xs font-mono uppercase tracking-widest text-white shadow-2xl">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
          <span className="text-red-500 font-bold">EPISODE 04</span>
          <span className="text-white/40">|</span>
          <span>FEATURED PROJECTS</span>
        </div>
      </div>

      {/* Background Netflix Cinematic Title Watermark */}
      <div className="absolute top-10 left-0 w-full flex items-start justify-center pointer-events-none z-0">
        <h1 className="text-[14vw] sm:text-[17vw] md:text-[20vw] font-black text-white/[0.03] tracking-tighter leading-none whitespace-nowrap uppercase">
          ORIGINALS
        </h1>
      </div>

      {/* Ambient Crimson Glow behind folder */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] bg-red-600/15 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Main Perspective Container */}
      <div className="mt-12 relative w-full max-w-7xl h-full flex items-center justify-center perspective-[2000px] z-10">
        
        {/* Origin Container */}
        <div className="relative w-0 h-0 transform-style-3d">
          
          {/* Folder Back */}
          <div 
            ref={folderBackRef}
            className="absolute w-[85vw] md:w-[32vw] max-w-[380px] aspect-video bg-[#141414] rounded-[24px] border border-red-600/40 shadow-[0_20px_50px_rgba(229,9,20,0.25)] flex items-center justify-center"
            style={{ zIndex: 5 }}
          >
            <div className="absolute -top-6 left-6 w-32 h-8 bg-[#1f1f1f] rounded-t-xl border-t border-red-600/30" />
            <div className="relative z-10 text-red-600 font-mono font-black text-2xl tracking-widest uppercase opacity-60">
              ARCHIVE_SLOTS
            </div>
          </div>

          {/* Desktop Project Cards (2 rows x 3 cols) */}
          {projectsData.map((project, i) => (
            <div 
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="hidden md:block absolute w-[82vw] md:w-[32vw] max-w-[380px] h-[310px] will-change-transform"
              style={{ zIndex: 10 + i }}
            >
              <div className="w-full h-full rounded-[24px] overflow-hidden border border-white/15 bg-[#141414]/95 backdrop-blur-2xl shadow-[0_25px_50px_rgba(0,0,0,0.9)] transition-all duration-500 group hover:scale-[1.03] hover:border-red-600 hover:shadow-[0_35px_80px_rgba(229,9,20,0.35)] hover:-translate-y-2 relative z-10 p-6 flex flex-col justify-between">
                
                {/* Top Card Header */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-red-500 bg-red-600/10 px-2.5 py-1 rounded border border-red-600/20">
                    {project.episode}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-red-400 font-bold">{project.match} Match</span>
                    <span className="text-[10px] font-mono border border-white/30 px-1 text-white/70">HD</span>
                  </div>
                </div>

                {/* Middle Title & Description */}
                <div className="space-y-1.5 my-auto">
                  <h3 className="text-xl font-black text-white tracking-tight group-hover:text-red-500 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-xs text-white/80 font-light leading-snug line-clamp-2">
                    {project.problem}
                  </p>
                  <p className="text-[11px] text-red-400 font-mono leading-snug line-clamp-2 pt-0.5">
                    {project.detail}
                  </p>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1 pt-2 border-t border-white/10">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-mono text-white/70 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bottom Action Links */}
                <div className="flex items-center justify-between pt-3 mt-1 border-t border-white/10 relative z-20">
                  <div className="flex items-center gap-2">
                    {project.live ? (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-[11px] font-mono font-bold tracking-wider uppercase transition-all shadow-md hover:scale-105 pointer-events-auto"
                      >
                        <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        Live Demo
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-mono font-bold tracking-widest uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                        {project.status || 'IN PROGRESS'}
                      </span>
                    )}

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[11px] font-mono font-bold tracking-wider transition-all hover:scale-105 pointer-events-auto"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        GitHub
                      </a>
                    )}
                  </div>

                  {/* Red Glowing Corner Accent */}
                  <div className="w-2 h-2 rounded-full bg-red-600 group-hover:shadow-[0_0_15px_#E50914] transition-all" />
                </div>
              </div>
            </div>
          ))}

          {/* Folder Front Flap */}
          <div 
            ref={folderFrontRef}
            className="absolute w-[85vw] md:w-[32vw] max-w-[380px] aspect-video pointer-events-none will-change-transform"
            style={{ zIndex: 60 }}
          >
            <div className="absolute bottom-0 w-full h-[85%] bg-[#1c1c1c] rounded-b-[24px] rounded-t-md shadow-[0_-5px_20px_rgba(0,0,0,0.8)] flex flex-col justify-end p-6 border-t border-red-600/40">
              <div className="w-20 h-1.5 bg-white/20 rounded-full mx-auto mb-2" />
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Swipeable Carousel */}
      <div 
        ref={mobileCarouselRef}
        className="md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-auto py-12 flex items-center gap-6 px-[12.5vw] pointer-events-none z-[100] snap-x snap-mandatory overflow-x-hidden hide-scrollbar"
      >
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
        {projectsData.map((project, i) => (
          <div 
            key={`mob-${i}`}
            ref={el => mobileCardsRef.current[i] = el}
            className="shrink-0 w-[80vw] sm:w-[340px] min-h-[300px] snap-center will-change-transform relative z-10 pointer-events-auto"
          >
            <div className="w-full h-full rounded-[24px] overflow-hidden border border-white/15 bg-[#141414] p-6 flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.9)]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold tracking-widest text-red-500 bg-red-600/10 px-2 py-0.5 rounded">
                  {project.episode}
                </span>
                <span className="text-xs font-mono text-red-400 font-bold">{project.match} Match</span>
              </div>
              <div className="space-y-1.5 my-2">
                <h3 className="text-lg font-black text-white">{project.title}</h3>
                <p className="text-xs text-white/80 font-light line-clamp-2">{project.problem}</p>
                <p className="text-[11px] text-red-400 font-mono leading-tight pt-0.5">{project.detail}</p>
              </div>
              <div className="flex flex-wrap gap-1 pt-2 border-t border-white/10">
                {project.tags.slice(0, 4).map((tag, tIdx) => (
                  <span key={tIdx} className="text-[10px] font-mono text-white/60 bg-white/5 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 pt-3 mt-1 border-t border-white/10">
                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-[11px] font-mono font-bold uppercase"
                  >
                    Live Demo
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-mono font-bold uppercase">
                    {project.status || 'IN PROGRESS'}
                  </span>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 text-white text-[11px] font-mono font-bold"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Projects;