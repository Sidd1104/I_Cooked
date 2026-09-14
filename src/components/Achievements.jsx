import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const academicAchievements = [
  {
    title: "BCA Academic Topper — Batch 24-27",
    category: "RANK #1 MERIT",
    metric: "RANK 1",
    detail: "Consistently recognized as the premier academic topper across the Bachelor of Computer Applications cohort at GL Bajaj Institute of Management.",
    tag: "SCHOLASTIC HONOR",
    icon: (
      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
      </svg>
    )
  },
  {
    title: "8.54 CGPA (5th Semester)",
    category: "DISTINCTION RECORD",
    metric: "8.54 / 10",
    detail: "Maintained an exemplary cumulative grade point average across advanced data structures, database architectures, and core software engineering disciplines.",
    tag: "ACADEMIC EXCELLENCE",
    icon: (
      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    )
  }
];

const technicalAchievements = [
  {
    title: "300+ GitHub Contributions",
    category: "OPEN SOURCE COMMITMENT",
    metric: "300+ COMMITS",
    detail: "High-cadence engineering output across public and enterprise repositories, building scalable microservices, AI pipelines, and React architectures.",
    tag: "CODE ARSENAL",
    icon: (
      <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="4" strokeWidth="2" />
        <line x1="1.05" y1="12" x2="7" y2="12" strokeWidth="2" />
        <line x1="17.01" y1="12" x2="22.96" y2="12" strokeWidth="2" />
      </svg>
    )
  },
  {
    title: "6 Production-Grade Projects Shipped",
    category: "DEPLOYED ARCHITECTURES",
    metric: "6 APPS LIVE",
    detail: "Designed, engineered, and shipped 6 production systems including DocuMind AI, SplitSphere group finance, and real-time collaboration platforms.",
    tag: "SYSTEMS LAUNCHED",
    icon: (
      <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    title: "Cisco CCNA Certified",
    category: "NETWORK INFRASTRUCTURE",
    metric: "CISCO CCNA",
    detail: "Formally certified in enterprise routing protocols, switching architectures, IP services, cybersecurity fundamentals, and network programmability.",
    tag: "INDUSTRY CREDENTIAL",
    icon: (
      <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: "4 Internships Completed",
    category: "INDUSTRY PRODUCTION",
    metric: "4x INTERN",
    detail: "Delivered production software across Thinkverse Labs, Infotact Solutions, and Sharp Economy, mastering full-stack React, Node.js, C#, and AI modeling.",
    tag: "COMMERCIAL IMPACT",
    icon: (
      <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" strokeWidth="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" strokeWidth="2" />
      </svg>
    )
  }
];

const certificationAchievements = [
  {
    title: "AI and Prompt Engineering Bootcamp",
    issuer: "GL Bajaj Institute of Management",
    date: "Sep 2025",
    category: "PROMPT ENG & GENAI",
    status: "CERTIFIED"
  },
  {
    title: "Front End Web Development Training",
    issuer: "GL Bajaj Institute of Management",
    date: "Apr 2025",
    category: "FRONT-END ARCHITECTURE",
    status: "VERIFIED"
  },
  {
    title: "Cisco Certified Network Associate Cyber Ops (CCNA)",
    issuer: "Cisco Networking Academy",
    date: "Sep 2025",
    category: "CYBER OPS & NETWORKS",
    status: "OFFICIAL"
  },
  {
    title: "Building GenAI Applications with MongoDB",
    issuer: "MongoDB",
    date: "Sep 2025",
    category: "VECTOR SEARCH & GENAI",
    status: "CREDENTIAL"
  }
];

const Achievements = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ctx = gsap.context(() => {
      // Grab all achievement card wrappers across all 3 panels
      const cardWrappers = section.querySelectorAll('.achievement-card-wrapper');

      cardWrappers.forEach((wrapper, index) => {
        const card = wrapper.querySelector('.achievement-card');
        const lock = wrapper.querySelector('.achievement-lock-overlay');
        const unlocked = wrapper.querySelector('.achievement-unlocked-badge');
        const glow = wrapper.querySelector('.achievement-glow');
        const shine = wrapper.querySelector('.achievement-shine');

        // Set initial 3D locked state
        gsap.set(card, {
          rotateY: 85,
          scale: 0.9,
          opacity: 0.35,
          filter: "grayscale(100%) brightness(0.55)",
          transformOrigin: "center center"
        });
        gsap.set(lock, { opacity: 1, scale: 1 });
        gsap.set(unlocked, { opacity: 0, scale: 0.5 });
        gsap.set(glow, { opacity: 0 });
        gsap.set(shine, { xPercent: -130, opacity: 0 });

        // Staggered Unlock sequence triggered on scroll into view
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          delay: (index % 3) * 0.12 + Math.floor(index / 3) * 0.08
        });

        // a) 3D Flip reveal from rotateY 85deg to 0deg
        tl.to(card, {
          rotateY: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power3.out"
        })
        // e) Subtle elastic scale bounce (0.9 -> 1.05 -> 1.0)
        .to(card, {
          scale: 1.04,
          duration: 0.35,
          ease: "back.out(2.2)"
        }, "-=0.55")
        .to(card, {
          scale: 1.0,
          duration: 0.25,
          ease: "power2.out"
        }, "-=0.15")
        // b) Remove grayscale/dim filter & swap lock with unlocked badge
        .to(card, {
          filter: "grayscale(0%) brightness(1)",
          duration: 0.4,
          ease: "power2.out"
        }, "-=0.4")
        .to(lock, {
          opacity: 0,
          scale: 0.5,
          duration: 0.2
        }, "-=0.45")
        .to(unlocked, {
          opacity: 1,
          scale: 1,
          duration: 0.35,
          ease: "back.out(2.5)"
        }, "-=0.3")
        // c) Brief red glow pulse around card
        .fromTo(glow,
          { opacity: 0, scale: 0.96 },
          { opacity: 0.9, scale: 1.03, duration: 0.25, ease: "power2.out" },
          "-=0.35"
        )
        .to(glow, {
          opacity: 0,
          scale: 1.01,
          duration: 0.45,
          ease: "power2.in"
        }, "+=0.05")
        // d) Diagonal loot-box shine sweep across card
        .fromTo(shine,
          { xPercent: -130, opacity: 1 },
          { xPercent: 230, opacity: 0, duration: 0.85, ease: "power2.inOut" },
          "-=0.6"
        );

        // Magnetic mouse hover spotlight on card
        const handleMouseMove = (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
        };

        card.addEventListener('mousemove', handleMouseMove);
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#050505] text-white py-28 px-6 md:px-12 select-none overflow-hidden"
    >
      {/* Cinematic Red Ambient Glow Shaders */}
      <div className="absolute top-1/4 left-10 w-[550px] h-[550px] bg-red-600/10 rounded-full blur-[170px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[160px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-red-600/40 text-xs font-mono uppercase tracking-widest text-white shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
            <span className="text-red-500 font-bold">EPISODE 07</span>
            <span className="text-white/40">|</span>
            <span>HALL OF FAME</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
            ACHIEVEMENTS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-600 to-red-700 drop-shadow-[0_0_30px_rgba(229,9,20,0.4)]">
              RECOGNITION & IMPACT.
            </span>
          </h2>

          <p className="text-white/60 text-xs md:text-sm font-light leading-relaxed max-w-xl">
            A verified hall of fame chronicling academic distinction, certified network architecture credentials, and real-world engineering accomplishments.
          </p>
        </div>

        {/* 3-Panel Responsive Grid (3 Columns on Desktop, Stacked Single Column on Mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">

          {/* ========================================================================= */}
          {/* PANEL 1 — ACADEMIC EXCELLENCE */}
          {/* ========================================================================= */}
          <div className="flex flex-col space-y-5">
            
            {/* Panel Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-500 px-2 py-0.5 rounded bg-red-600/10 border border-red-600/30">
                  TIER 01 // UNIVERSITY
                </span>
                <h3 className="text-xl md:text-2xl font-black text-white tracking-tight pt-1">
                  ACADEMIC EXCELLENCE
                </h3>
              </div>
              <span className="text-xs font-mono text-white/40">2 VERIFIED</span>
            </div>

            {/* Academic Achievement Cards */}
            <div className="flex flex-col gap-5">
              {academicAchievements.map((item, index) => (
                <div
                  key={index}
                  className="achievement-card-wrapper relative perspective-[1200px]"
                >
                  {/* Glowing Outline Pulse Effect on Unlock */}
                  <div className="achievement-glow absolute -inset-0.5 rounded-[24px] bg-gradient-to-r from-red-600 via-rose-500 to-red-600 opacity-0 pointer-events-none blur-md z-0" />

                  {/* 3D Flipping Card Container */}
                  <div
                    className="achievement-card relative p-6 md:p-7 rounded-[22px] bg-gradient-to-br from-[#1d0a0c] via-[#121212] to-[#0a0a0a] border border-white/10 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:border-red-600/60 transition-colors duration-300 overflow-hidden transform-gpu will-change-transform flex flex-col justify-between min-h-[240px]"
                  >
                    {/* Real-Time Magnetic Mouse Spotlight */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                      style={{
                        background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(229,9,20,0.18), transparent 70%)'
                      }}
                    />

                    {/* Top Crimson Accent Stripe */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent z-10" />

                    {/* Diagonal Loot-Box Unlock Shine Sweep */}
                    <div
                      className="achievement-shine absolute inset-0 pointer-events-none z-30 opacity-0 rounded-[22px]"
                      style={{
                        background: 'linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.4) 45%, rgba(229,9,20,0.6) 50%, rgba(255,255,255,0.4) 55%, transparent 80%)'
                      }}
                    />

                    {/* Locked State Overlay Badge */}
                    <div className="achievement-lock-overlay absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 border border-white/20 text-white/50 text-[10px] font-mono uppercase tracking-widest z-20">
                      <svg className="w-3 h-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeWidth="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeWidth="2" />
                      </svg>
                      <span>LOCKED</span>
                    </div>

                    {/* Unlocked State Badge (Checkmark / Star) */}
                    <div className="achievement-unlocked-badge absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-600/20 border border-red-500/50 text-red-400 text-[10px] font-mono font-bold uppercase tracking-widest z-20 shadow-[0_0_15px_rgba(229,9,20,0.4)]">
                      <svg className="w-3.5 h-3.5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>UNLOCKED</span>
                    </div>

                    {/* Card Content */}
                    <div className="relative z-10 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-red-600/10 border border-red-600/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(229,9,20,0.2)]">
                          {item.icon}
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-400 block">
                            {item.category}
                          </span>
                          <span className="text-[11px] font-mono text-white/40">
                            {item.tag}
                          </span>
                        </div>
                      </div>

                      <h4 className="text-lg md:text-xl font-black text-white tracking-tight leading-snug hover:text-red-500 transition-colors">
                        {item.title}
                      </h4>

                      <p className="text-xs text-white/70 font-light leading-relaxed">
                        {item.detail}
                      </p>
                    </div>

                    {/* Card Bottom Official Standing */}
                    <div className="relative z-10 pt-3 mt-3 border-t border-white/10 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                        Official Standing:
                      </span>
                      <span className="px-2.5 py-0.5 rounded-lg bg-red-600/15 border border-red-600/40 text-xs font-mono font-bold text-red-400 shadow-[0_0_12px_rgba(229,9,20,0.3)]">
                        {item.metric}
                      </span>
                    </div>

                    {/* Corner Accent Dot */}
                    <div className="absolute bottom-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_8px_#E50914]" />
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* ========================================================================= */}
          {/* PANEL 2 — TECHNICAL MILESTONES */}
          {/* ========================================================================= */}
          <div className="flex flex-col space-y-5">
            
            {/* Panel Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-500 px-2 py-0.5 rounded bg-red-600/10 border border-red-600/30">
                  TIER 02 // PRODUCTION
                </span>
                <h3 className="text-xl md:text-2xl font-black text-white tracking-tight pt-1">
                  TECHNICAL MILESTONES
                </h3>
              </div>
              <span className="text-xs font-mono text-white/40">4 VERIFIED</span>
            </div>

            {/* Technical Milestone Cards Grid */}
            <div className="flex flex-col gap-4">
              {technicalAchievements.map((item, index) => (
                <div
                  key={index}
                  className="achievement-card-wrapper relative perspective-[1200px]"
                >
                  {/* Glowing Outline Pulse Effect on Unlock */}
                  <div className="achievement-glow absolute -inset-0.5 rounded-[20px] bg-gradient-to-r from-red-600 via-rose-500 to-red-600 opacity-0 pointer-events-none blur-md z-0" />

                  {/* 3D Flipping Card Container */}
                  <div
                    className="achievement-card relative p-4 md:p-4.5 rounded-[18px] bg-gradient-to-br from-[#19090b] via-[#111111] to-[#080808] border border-white/10 backdrop-blur-2xl shadow-[0_15px_35px_rgba(0,0,0,0.85)] hover:border-red-600/60 transition-colors duration-300 overflow-hidden transform-gpu will-change-transform flex flex-col justify-between"
                  >
                    {/* Real-Time Magnetic Mouse Spotlight */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                      style={{
                        background: 'radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), rgba(229,9,20,0.18), transparent 70%)'
                      }}
                    />

                    {/* Top Crimson Accent Stripe */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent z-10" />

                    {/* Diagonal Loot-Box Unlock Shine Sweep */}
                    <div
                      className="achievement-shine absolute inset-0 pointer-events-none z-30 opacity-0 rounded-[18px]"
                      style={{
                        background: 'linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.4) 45%, rgba(229,9,20,0.6) 50%, rgba(255,255,255,0.4) 55%, transparent 80%)'
                      }}
                    />

                    {/* Locked State Overlay Badge */}
                    <div className="achievement-lock-overlay absolute top-3.5 right-3.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/80 border border-white/20 text-white/50 text-[9px] font-mono uppercase tracking-widest z-20">
                      <svg className="w-2.5 h-2.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeWidth="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeWidth="2" />
                      </svg>
                      <span>LOCKED</span>
                    </div>

                    {/* Unlocked State Badge (Checkmark / Star) */}
                    <div className="achievement-unlocked-badge absolute top-3.5 right-3.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-600/20 border border-red-500/50 text-red-400 text-[9px] font-mono font-bold uppercase tracking-widest z-20 shadow-[0_0_10px_rgba(229,9,20,0.35)]">
                      <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>UNLOCKED</span>
                    </div>

                    {/* Card Content Top */}
                    <div className="relative z-10 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-red-600/10 border border-red-600/30 flex items-center justify-center shrink-0">
                          {item.icon}
                        </div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-400">
                          {item.category}
                        </span>
                      </div>

                      <h4 className="text-sm md:text-base font-bold text-white tracking-tight leading-snug">
                        {item.title}
                      </h4>

                      <p className="text-xs text-white/65 font-light leading-relaxed">
                        {item.detail}
                      </p>
                    </div>

                    {/* Card Content Bottom */}
                    <div className="relative z-10 pt-2.5 mt-2 border-t border-white/10 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                        Metric:
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/15 text-[10px] font-mono font-bold text-red-400">
                        {item.metric}
                      </span>
                    </div>

                    {/* Corner Accent Dot */}
                    <div className="absolute bottom-2 right-2 w-1 h-1 rounded-full bg-red-600 shadow-[0_0_6px_#E50914]" />
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* ========================================================================= */}
          {/* PANEL 3 — CERTIFICATIONS (Compact Text/Badge Grid) */}
          {/* ========================================================================= */}
          <div className="flex flex-col space-y-5">
            
            {/* Panel Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-500 px-2 py-0.5 rounded bg-red-600/10 border border-red-600/30">
                  TIER 03 // CREDENTIALS
                </span>
                <h3 className="text-xl md:text-2xl font-black text-white tracking-tight pt-1">
                  CERTIFICATIONS
                </h3>
              </div>
              <span className="text-xs font-mono text-white/40">4 VERIFIED</span>
            </div>

            {/* Certification Compact Badge / Rows */}
            <div className="flex flex-col gap-4">
              {certificationAchievements.map((item, index) => (
                <div
                  key={index}
                  className="achievement-card-wrapper relative perspective-[1200px]"
                >
                  {/* Glowing Outline Pulse Effect on Unlock */}
                  <div className="achievement-glow absolute -inset-0.5 rounded-[18px] bg-gradient-to-r from-red-600 via-rose-500 to-red-600 opacity-0 pointer-events-none blur-sm z-0" />

                  {/* 3D Flipping Compact Badge Container */}
                  <div
                    className="achievement-card relative p-4 rounded-[16px] bg-gradient-to-br from-[#160a0c] via-[#101010] to-[#080808] border border-white/10 backdrop-blur-2xl shadow-[0_15px_30px_rgba(0,0,0,0.8)] hover:border-red-600/60 transition-colors duration-300 overflow-hidden transform-gpu will-change-transform flex flex-col justify-between"
                  >
                    {/* Real-Time Magnetic Mouse Spotlight */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                      style={{
                        background: 'radial-gradient(280px circle at var(--mouse-x) var(--mouse-y), rgba(229,9,20,0.16), transparent 70%)'
                      }}
                    />

                    {/* Top Crimson Accent Stripe */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-[1.5px] bg-gradient-to-r from-transparent via-red-600 to-transparent z-10" />

                    {/* Diagonal Loot-Box Unlock Shine Sweep */}
                    <div
                      className="achievement-shine absolute inset-0 pointer-events-none z-30 opacity-0 rounded-[16px]"
                      style={{
                        background: 'linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.4) 45%, rgba(229,9,20,0.6) 50%, rgba(255,255,255,0.4) 55%, transparent 80%)'
                      }}
                    />

                    {/* Locked State Overlay Badge */}
                    <div className="achievement-lock-overlay absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/80 border border-white/20 text-white/50 text-[9px] font-mono uppercase tracking-widest z-20">
                      <svg className="w-2.5 h-2.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeWidth="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeWidth="2" />
                      </svg>
                      <span>LOCKED</span>
                    </div>

                    {/* Unlocked State Badge (Checkmark / Star) */}
                    <div className="achievement-unlocked-badge absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-600/20 border border-red-500/50 text-red-400 text-[9px] font-mono font-bold uppercase tracking-widest z-20 shadow-[0_0_10px_rgba(229,9,20,0.35)]">
                      <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>UNLOCKED</span>
                    </div>

                    {/* Compact Badge Content */}
                    <div className="relative z-10 space-y-1.5 pr-14">
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-red-400 block">
                        {item.category}
                      </span>
                      <h4 className="text-xs md:text-sm font-bold text-white tracking-tight leading-snug hover:text-red-500 transition-colors">
                        {item.title}
                      </h4>
                    </div>

                    {/* Issuer + Date Row (Smaller/muted below) */}
                    <div className="relative z-10 pt-2.5 mt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                      <span className="text-white/75 font-medium truncate max-w-[170px]">
                        {item.issuer}
                      </span>
                      <span className="text-red-400/90 font-semibold shrink-0">
                        {item.date}
                      </span>
                    </div>

                    {/* Corner Accent Dot */}
                    <div className="absolute bottom-2 right-2 w-1 h-1 rounded-full bg-red-600 shadow-[0_0_6px_#E50914]" />
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Achievements;
