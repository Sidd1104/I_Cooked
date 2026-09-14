import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experienceData = [
  {
    role: "Full Stack Developer Intern",
    company: "Thinkverse Labs Pvt Ltd",
    duration: "May 2026 – Aug 2026 · 4 mos",
    location: "Noida, Remote",
    skills: [
      "Node.js",
      "C#",
      "Full-Stack Development",
      "TypeScript",
      "Microsoft SQL Server",
      "ASP.NET Web API",
      "API Development",
      "Debugging",
      "React.js",
      "Back-End Web Development"
    ],
    tag: "RECENT SEASON",
    gradient: "from-[#1f0a0c] via-[#121212] to-[#0a0a0a]",
    episode: "EP 04 // 2026"
  },
  {
    role: "Associate L1",
    company: "Infotact Solutions",
    duration: "Mar 2026 – May 2026 · 3 mos",
    location: "Bengaluru, Remote",
    skills: ["JavaScript", "Full-Stack Development", "MongoDB", "Tailwind CSS", "React.js"],
    tag: "FULL-STACK PRODUCTION",
    gradient: "from-[#1a0809] via-[#111111] to-[#090909]",
    episode: "EP 03 // 2026"
  },
  {
    role: "Software Engineer Intern",
    company: "Thinkverse Labs Pvt Ltd",
    duration: "Dec 2025 – Jan 2026 · 2 mos",
    location: "Noida, Remote",
    skills: ["JavaScript", "HTML", "CSS", "Node.js", "C#"],
    tag: "AI & SYSTEMS",
    gradient: "from-[#220a0d] via-[#131313] to-[#0a0a0a]",
    episode: "EP 02 // 2025-26"
  },
  {
    role: "Artificial Intelligence Intern",
    company: "Sharp Economy",
    duration: "Oct 2025 – Nov 2025 · 2 mos",
    location: "Noida, Remote",
    skills: ["JavaScript", "HTML", "CSS", "C++"],
    tag: "AI FOUNDATIONS",
    gradient: "from-[#1d090b] via-[#101010] to-[#080808]",
    episode: "EP 01 // 2025"
  }
];

const Experience = () => {
  const sectionRef = useRef(null);
  const timelineContainerRef = useRef(null);
  const timelineBarRef = useRef(null);
  const cardRefs = useRef([]);
  const nodeRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ctx = gsap.context(() => {
      // 1. PROGRESSIVE TIMELINE CONNECTOR (GSAP ScrollTrigger scrub - drawn on scroll)
      if (timelineBarRef.current && timelineContainerRef.current) {
        gsap.fromTo(
          timelineBarRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: timelineContainerRef.current,
              start: "top 75%",
              end: "bottom 75%",
              scrub: 0.6
            }
          }
        );
      }

      // 2. TIMELINE NODES ACTIVATION (matching node reveal pattern)
      nodeRefs.current.forEach((node) => {
        if (!node) return;
        gsap.fromTo(
          node,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(2.5)",
            scrollTrigger: {
              trigger: node,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // 3. SCROLL-TRIGGERED REVEAL ANIMATION (matching Expertise.jsx & About.jsx)
      // Individual trigger per card with smooth slide-in, blur-fade, and scale
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { 
            y: 50, 
            x: 25, 
            opacity: 0, 
            scale: 0.94, 
            filter: "blur(8px)" 
          },
          {
            y: 0,
            x: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // 4. REAL-TIME MAGNETIC MOUSE SPOTLIGHT & 3D TILT
      // Replicated directly from Expertise.jsx (lines 64-77) and About.jsx (lines 35-49)
      const handleMouseMove = (e, card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // CSS spotlight variables
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        // Subtle 3D tilt
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const tiltX = (y - centerY) / 28;
        const tiltY = -(x - centerX) / 38;

        gsap.to(card, {
          rotationX: tiltX,
          rotationY: tiltY,
          duration: 0.3,
          ease: "power2.out",
          transformPerspective: 900
        });
      };

      const handleMouseLeave = (card) => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.6,
          ease: "power3.out"
        });
      };

      cardRefs.current.forEach((card) => {
        if (!card) return;
        const moveListener = (e) => handleMouseMove(e, card);
        const leaveListener = () => handleMouseLeave(card);

        card.addEventListener('mousemove', moveListener);
        card.addEventListener('mouseleave', leaveListener);
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToCardRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  const addToNodeRefs = (el) => {
    if (el && !nodeRefs.current.includes(el)) {
      nodeRefs.current.push(el);
    }
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#050505] text-white py-28 px-6 md:px-12 select-none overflow-hidden"
    >
      {/* Cinematic Red Ambient Glow Shaders (replicated from Expertise.jsx line 97) */}
      <div className="absolute top-1/4 right-10 w-[550px] h-[550px] bg-red-600/10 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-6xl mx-auto w-full space-y-16">
        
        {/* Section Header (replicated from About.jsx & Expertise.jsx) */}
        <div className="flex flex-col items-start space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-red-600/40 text-xs font-mono uppercase tracking-widest text-white shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
            <span className="text-red-500 font-bold">EPISODE 05</span>
            <span className="text-white/40">|</span>
            <span>THE INTERNSHIP ARC</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
            CAST CREDITS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-600 to-red-700 drop-shadow-[0_0_30px_rgba(229,9,20,0.4)]">
              PROFESSIONAL EXPERIENCE.
            </span>
          </h2>
          <p className="text-white/60 text-xs md:text-sm font-light leading-relaxed max-w-lg">
            A progression of high-impact engineering roles, building full-stack production systems and deploying intelligent AI models across 4 internships.
          </p>
        </div>

        {/* Timeline & Card List */}
        <div ref={timelineContainerRef} className="relative pl-6 md:pl-12 space-y-10">
          
          {/* Static Background Rail */}
          <div className="absolute left-[11px] md:left-[23px] top-4 bottom-4 w-[2px] bg-white/10 rounded-full z-0" />

          {/* Dynamic Laser Progress Beam (animates with scroll scrub) */}
          <div 
            ref={timelineBarRef}
            className="absolute left-[11px] md:left-[23px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-red-600 via-rose-500 to-red-600 rounded-full z-0 shadow-[0_0_14px_#E50914] will-change-transform"
          />

          {experienceData.map((item, index) => (
            <div
              key={index}
              className="relative group perspective-[1000px]"
            >
              {/* Timeline Marker Node (Pops and pulses on scroll reveal) */}
              <div 
                ref={addToNodeRefs}
                className="absolute -left-[30px] md:-left-[42px] top-7 w-5 h-5 rounded-full bg-[#050505] border-2 border-red-600 group-hover:bg-red-600 group-hover:scale-125 transition-all duration-500 shadow-[0_0_16px_rgba(229,9,20,0.8)] flex items-center justify-center z-10"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white opacity-90 group-hover:scale-150 transition-transform" />
              </div>

              {/* Experience Card (Styled consistently with Expertise.jsx line 128 & Projects.jsx line 284) */}
              <div 
                ref={addToCardRefs}
                className={`p-7 md:p-9 bg-gradient-to-br ${item.gradient} backdrop-blur-2xl border border-white/10 rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:border-red-600/80 hover:shadow-[0_30px_70px_rgba(229,9,20,0.28)] hover:-translate-y-2 hover:scale-[1.015] transition-all duration-500 relative overflow-hidden group will-change-transform cursor-pointer`}
              >
                
                {/* 1. Real-Time Magnetic Mouse Spotlight Highlight (Exact pattern from Expertise.jsx line 137) */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                  style={{
                    background: 'radial-gradient(450px circle at var(--mouse-x) var(--mouse-y), rgba(229,9,20,0.2), transparent 70%)'
                  }}
                />

                {/* 2. Top Crimson Accent Stripe (Exact pattern from Expertise.jsx line 143) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent z-10 group-hover:w-56 transition-all duration-700" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-5">
                  
                  {/* Left Info: Role, Company, Location */}
                  <div className="space-y-2.5">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-500 px-2.5 py-0.5 rounded bg-red-600/10 border border-red-600/25">
                        {item.tag}
                      </span>
                      <span className="text-xs font-mono text-white/40">
                        {item.episode}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight group-hover:text-red-500 transition-colors duration-300">
                      {item.role}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-sm text-white/90 font-medium">
                      <span className="text-white font-bold">{item.company}</span>
                      <span className="text-white/30">•</span>
                      <span className="text-white/70 text-xs font-mono px-2.5 py-0.5 rounded bg-white/5 border border-white/10 group-hover:border-red-600/30 transition-colors">
                        📍 {item.location}
                      </span>
                    </div>
                  </div>

                  {/* Right Info: Duration Badge */}
                  <div className="shrink-0 self-start md:self-auto">
                    <span className="inline-block px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 text-xs font-mono text-red-400 font-bold tracking-wide shadow-inner group-hover:border-red-600/40 group-hover:bg-red-600/10 transition-all">
                      {item.duration}
                    </span>
                  </div>

                </div>

                {/* Bottom Row: Skills Pills (replicated from Skills.jsx line 240) */}
                <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center gap-2 relative z-10">
                  <span className="text-xs font-mono uppercase tracking-wider text-white/40 mr-2">
                    Core Arsenal:
                  </span>
                  {item.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[11px] md:text-xs font-mono text-white/80 bg-white/[0.05] border border-white/10 px-2.5 py-1 rounded-lg group-hover:border-red-600/40 group-hover:bg-red-600/10 group-hover:text-white transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Corner Red Accent Dot (replicated from Skills.jsx line 250 & Expertise.jsx line 170) */}
                <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-red-600 group-hover:shadow-[0_0_15px_#E50914] group-hover:scale-125 transition-all duration-300" />

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Experience;
