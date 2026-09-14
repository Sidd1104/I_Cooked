import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const node1Ref = useRef(null);
  const node2Ref = useRef(null);
  const marker1Ref = useRef(null);
  const marker2Ref = useRef(null);
  const cgpaBadgeRef = useRef(null);
  const cgpaNumberRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ctx = gsap.context(() => {
      // 1. HORIZONTAL TRACK DRAW-IN ANIMATION
      if (trackRef.current) {
        gsap.fromTo(
          trackRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.5,
            ease: "power3.inOut",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: trackRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // 2. TIMELINE NODES / CARDS ENTRANCE
      const nodes = [node1Ref.current, node2Ref.current];
      gsap.fromTo(
        nodes,
        {
          opacity: 0,
          y: 40,
          scale: 0.95,
          filter: "blur(6px)"
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.25,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // 3. MILESTONE TRACK MARKERS POP-IN
      const markers = [marker1Ref.current, marker2Ref.current];
      gsap.fromTo(
        markers,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.3,
          ease: "back.out(2.5)",
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // 4. NETFLIX MATCH SCORE CGPA COUNT-UP ANIMATION (0 to 8.54)
      if (cgpaBadgeRef.current && cgpaNumberRef.current) {
        gsap.fromTo(
          cgpaBadgeRef.current,
          { scale: 0.7, opacity: 0, rotation: -8 },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.8,
            ease: "back.out(1.8)",
            scrollTrigger: {
              trigger: cgpaBadgeRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );

        const counterObj = { val: 0 };
        gsap.to(counterObj, {
          val: 8.54,
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cgpaBadgeRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          onUpdate: () => {
            if (cgpaNumberRef.current) {
              cgpaNumberRef.current.textContent = counterObj.val.toFixed(2);
            }
          }
        });
      }

      // 5. SUBTLE 3D TILT ON HOVER FOR CARDS
      const handleMouseMove = (e, card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const tiltX = (y - centerY) / 25;
        const tiltY = -(x - centerX) / 35;

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
          duration: 0.5,
          ease: "power3.out"
        });
      };

      [node1Ref.current, node2Ref.current].forEach((card) => {
        if (!card) return;
        const moveListener = (e) => handleMouseMove(e, card);
        const leaveListener = () => handleMouseLeave(card);
        card.addEventListener('mousemove', moveListener);
        card.addEventListener('mouseleave', leaveListener);
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#050505] text-white py-28 px-6 md:px-12 select-none overflow-hidden"
    >
      {/* Background Cinematic Crimson Ambient Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-red-600/10 rounded-full blur-[170px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-red-950/15 rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-red-600/40 text-xs font-mono uppercase tracking-widest text-white shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
            <span className="text-red-500 font-bold">EPISODE 06</span>
            <span className="text-white/40">|</span>
            <span>THE ORIGIN STORY</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
            ACADEMIC RECORD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-600 to-red-700 drop-shadow-[0_0_30px_rgba(229,9,20,0.4)]">
              FOUNDATION & GROWTH.
            </span>
          </h2>

          <p className="text-white/60 text-xs md:text-sm font-light leading-relaxed max-w-xl">
            A chronological roadmap tracing the foundational schooling and undergraduate computer science discipline that built the bedrock for production engineering and AI systems.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* UNIQUE HORIZONTAL ACADEMIC TIMELINE / ROADMAP */}
        {/* ========================================================================= */}
        <div className="relative w-full pt-12 pb-8">

          {/* 1. Connecting Track Rail & Progress Beam (Desktop & Tablet) */}
          <div className="hidden md:block relative w-full mb-16 px-16">
            {/* Background Static Rail */}
            <div className="w-full h-[3px] bg-white/10 rounded-full relative overflow-hidden">
              {/* Animated GSAP ScaleX Track Beam */}
              <div
                ref={trackRef}
                className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-red-600 via-rose-500 to-red-600 rounded-full shadow-[0_0_15px_#E50914] origin-left will-change-transform"
              />
            </div>

            {/* Milestone Node Marker 1 (Kendriya Vidyalaya) */}
            <div
              ref={marker1Ref}
              className="absolute left-[20%] top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-[#0a0a0a] border-2 border-red-600 flex items-center justify-center shadow-[0_0_20px_rgba(229,9,20,0.8)] group-hover:scale-125 transition-transform duration-300">
                <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-red-500 font-bold bg-black/90 px-2.5 py-0.5 rounded border border-red-600/30">
                MILESTONE 01
              </span>
            </div>

            {/* Central Transition Indicator */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d0d0d] border border-white/15 text-[10px] font-mono text-white/50 tracking-wider shadow-lg">
              <span>TWELVE-YEAR TRANSITION</span>
              <span className="text-red-500">→</span>
            </div>

            {/* Milestone Node Marker 2 (GL Bajaj) */}
            <div
              ref={marker2Ref}
              className="absolute left-[80%] top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-[#0a0a0a] border-2 border-red-600 flex items-center justify-center shadow-[0_0_20px_rgba(229,9,20,0.8)] group-hover:scale-125 transition-transform duration-300">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_#E50914]" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-red-500 font-bold bg-black/90 px-2.5 py-0.5 rounded border border-red-600/30 animate-pulse">
                CURRENT MILESTONE
              </span>
            </div>
          </div>

          {/* 2. Chronological Milestone Nodes Container (Left to Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative z-10">

            {/* ------------------------------------------------------------- */}
            {/* NODE 1: KENDRIYA VIDYALAYA (2011 - 2023) */}
            {/* ------------------------------------------------------------- */}
            <div
              ref={node1Ref}
              className="relative p-8 md:p-10 rounded-[28px] bg-gradient-to-br from-[#18090a] via-[#101010] to-[#080808] border border-white/10 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:border-red-600/60 hover:shadow-[0_25px_60px_rgba(229,9,20,0.22)] transition-all duration-500 group overflow-hidden will-change-transform flex flex-col justify-between"
            >
              {/* Dynamic Interactive Mouse Spotlight */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                style={{
                  background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(229,9,20,0.18), transparent 70%)'
                }}
              />

              {/* Top Accent Stripe */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent group-hover:w-48 transition-all duration-500" />

              {/* Card Header */}
              <div className="relative z-10 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-500 px-2.5 py-0.5 rounded bg-red-600/10 border border-red-600/25">
                      FOUNDATIONAL TENURE
                    </span>
                    <span className="text-xs font-mono text-white/40">
                      EP 01 // 2011 – 2023
                    </span>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/15 text-xs font-mono text-red-400 font-bold tracking-wide">
                    2011 – 2023
                  </span>
                </div>

                <div className="space-y-1 pt-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-white/50 block">
                    Curriculum Level
                  </span>
                  <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight group-hover:text-red-500 transition-colors duration-300">
                    Schooling
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-base md:text-lg text-white/90 font-medium">
                  <span className="text-white font-bold">Kendriya Vidyalaya</span>
                  <span className="text-white/30">•</span>
                  <span className="text-xs font-mono text-white/60">12-Year Tenure (Class 1 – 12)</span>
                </div>
              </div>

              {/* Card Mid: Academic Merit Rating Pill */}
              <div className="relative z-10 my-8">
                <div className="p-4 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-between group-hover:border-red-600/30 transition-colors">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block">
                      Graduation Standing
                    </span>
                    <span className="text-sm font-semibold text-white/90">
                      Overall Assessment
                    </span>
                  </div>

                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600/15 border border-red-600/40 text-red-400 font-mono shadow-[0_0_15px_rgba(229,9,20,0.25)]">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-sm font-black tracking-wider text-white">Grade: A</span>
                  </div>
                </div>
              </div>

              {/* Card Footer: Foundational Pillars */}
              <div className="relative z-10 pt-4 border-t border-white/10 space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-white/40 block">
                  Core Foundations Cultivated:
                </span>
                <div className="flex flex-wrap gap-2">
                  {["Science & Mathematics", "Analytical Logic", "Computer Foundations", "Discipline"].map((pill, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-mono text-white/80 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg group-hover:border-red-600/30 transition-colors"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Corner Red Accent Dot */}
              <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-red-600 group-hover:shadow-[0_0_12px_#E50914] transition-all" />
            </div>

            {/* ------------------------------------------------------------- */}
            {/* NODE 2: GL BAJAJ INSTITUTE OF MANAGEMENT (2024 - 2027) */}
            {/* WITH LARGE PROMINENT NETFLIX MATCH-SCORE BADGE */}
            {/* ------------------------------------------------------------- */}
            <div
              ref={node2Ref}
              className="relative p-8 md:p-10 rounded-[28px] bg-gradient-to-br from-[#220a0d] via-[#121212] to-[#0a0a0a] border border-red-600/40 backdrop-blur-2xl shadow-[0_20px_60px_rgba(229,9,20,0.2)] hover:border-red-500 hover:shadow-[0_30px_80px_rgba(229,9,20,0.35)] transition-all duration-500 group overflow-hidden will-change-transform flex flex-col justify-between"
            >
              {/* Dynamic Interactive Mouse Spotlight */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                style={{
                  background: 'radial-gradient(450px circle at var(--mouse-x) var(--mouse-y), rgba(229,9,20,0.25), transparent 70%)'
                }}
              />

              {/* Top Crimson Accent Stripe */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent group-hover:w-64 transition-all duration-500" />

              {/* Card Header */}
              <div className="relative z-10 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-400 px-2.5 py-0.5 rounded bg-red-600/20 border border-red-500/40 shadow-[0_0_10px_rgba(229,9,20,0.3)]">
                      UNDERGRADUATE SPECIALIZATION
                    </span>
                    <span className="text-xs font-mono text-white/40">
                      EP 02 // 2024 – 2027
                    </span>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-red-600/10 border border-red-500/30 text-xs font-mono text-red-400 font-bold tracking-wide">
                    Aug 2024 – May 2027
                  </span>
                </div>

                <div className="space-y-1 pt-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-white/50 block">
                    Degree Program
                  </span>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight group-hover:text-red-500 transition-colors duration-300">
                    Bachelor of Computer Applications (BCA)
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-2 md:gap-3 text-base md:text-lg text-white/90 font-medium">
                  <span className="text-white font-bold">GL Bajaj Institute of Management</span>
                  <span className="text-white/30">•</span>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-red-400 font-semibold">
                    3rd Year, 5th Semester
                  </span>
                </div>
              </div>

              {/* ======================================================= */}
              {/* PROMINENT NETFLIX RATING / MATCH-SCORE CGPA BADGE */}
              {/* ======================================================= */}
              <div className="relative z-10 my-8">
                <div
                  ref={cgpaBadgeRef}
                  className="relative p-6 rounded-2xl bg-gradient-to-r from-black/90 via-[#180a0c] to-black/90 border-2 border-red-600/60 shadow-[0_0_35px_rgba(229,9,20,0.45)] flex flex-col sm:flex-row items-center justify-between gap-5 group-hover:border-red-500 transition-all duration-300"
                >
                  {/* Left: Netflix Match Status */}
                  <div className="space-y-1 text-center sm:text-left">
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-red-600/20 text-[10px] font-mono font-bold uppercase tracking-widest text-red-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                      ACADEMIC MATCH SCORE
                    </div>
                    <h4 className="text-lg font-black text-white tracking-tight">
                      CUMULATIVE PERFORMANCE
                    </h4>
                    <p className="text-xs text-white/60 font-light font-mono">
                      Current Standing: 3rd Year, 5th Semester
                    </p>
                  </div>

                  {/* Right: Giant Animated Count-Up Rating Badge */}
                  <div className="shrink-0 flex items-center gap-3 px-5 py-3 rounded-2xl bg-black/80 border border-red-500/50 shadow-[0_0_25px_rgba(229,9,20,0.4)]">
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex items-baseline gap-1">
                        <span
                          ref={cgpaNumberRef}
                          className="text-4xl md:text-5xl font-black text-white font-mono tracking-tight drop-shadow-[0_0_20px_rgba(229,9,20,0.8)]"
                        >
                          0.00
                        </span>
                        <span className="text-sm font-black text-red-500 font-mono">/ 10</span>
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-red-400 font-extrabold">
                        CGPA
                      </span>
                    </div>

                    <div className="w-[1px] h-10 bg-white/15 mx-1" />

                    <div className="flex flex-col text-[10px] font-mono uppercase tracking-wider text-white/70">
                      <span className="text-red-400 font-bold">TOP TIER</span>
                      <span>EXCELLENCE</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer: Undergrad Technical Disciplines */}
              <div className="relative z-10 pt-4 border-t border-white/10 space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-white/40 block">
                  Core Engineering & CS Pillars:
                </span>
                <div className="flex flex-wrap gap-2">
                  {["Data Structures & Algorithms", "Database Systems (SQL)", "Full-Stack Web Dev", "OOP Architecture"].map((pill, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-mono text-white/80 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg group-hover:border-red-600/40 group-hover:bg-red-600/10 group-hover:text-white transition-all"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Corner Red Accent Dot */}
              <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-red-600 group-hover:shadow-[0_0_15px_#E50914] group-hover:scale-125 transition-all" />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Education;
