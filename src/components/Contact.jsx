import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// =========================================================================
// FORMSPREE CONFIGURATION:
// To enable real email delivery, create a free form endpoint at https://formspree.io/
// and replace "YOUR_FORM_ID" below with your actual Formspree form ID (e.g. "xpzgkbyw").
// =========================================================================
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

const Contact = () => {
  const ref = useRef(null);
  
  // React Form State tracking
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    permission: false
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Parallax translation for the big background text
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "20%"]);

  // Handle input changes dynamically
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
    // Reset any previous error when user resumes editing
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  // Handle form submission via Formspree POST
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.permission) {
      setStatus('error');
      setErrorMessage("Please accept the contact permission checkbox before sending.");
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          message: formData.message
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ firstName: '', lastName: '', email: '', message: '', permission: false });
      } else {
        const data = await response.json().catch(() => ({}));
        setStatus('error');
        setErrorMessage(
          data?.errors?.[0]?.message || 
          "Transmission could not be completed. Please verify your Formspree endpoint ID or reach out directly at SIDDMJ07@GMAIL.COM."
        );
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage("Network error during transmission. Please try again or email directly at SIDDMJ07@GMAIL.COM.");
    }
  };

  return (
    <section ref={ref} id="contact" className="bg-[#0b0b0b] w-full min-h-screen relative overflow-hidden flex items-end pt-32 pb-0 border-t border-white/10 select-none">
      
      {/* Background Cinematic Red Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/15 rounded-full blur-[160px] pointer-events-none z-0"></div>

      {/* Huge Background Parallax Netflix Watermark Text */}
      <motion.div 
        style={{ y }}
        className="absolute top-0 left-0 w-full h-full flex flex-col justify-start items-center overflow-hidden pointer-events-none z-0 pt-16 md:pt-12 opacity-10"
      >
        <h1 
          className="text-[25vw] leading-[0.75] font-black text-red-600 uppercase tracking-tighter select-none scale-y-[1.6] origin-top"
          style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif" }}
        >
          CONTACT
        </h1>
      </motion.div>

      {/* Form Card Overlay */}
      <div className="relative z-10 w-full flex justify-end items-end">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-[#141414]/95 backdrop-blur-2xl border-t border-l border-white/15 w-full md:w-[90%] lg:w-[82%] p-8 md:p-16 text-white flex flex-col justify-between rounded-tl-[3rem] shadow-[0_-25px_60px_rgba(0,0,0,0.9)] relative overflow-hidden"
        >
          {/* Subtle internal top crimson highlight glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-90"></div>

          {/* Episode Badge & Direct Contact Channels */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 md:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-red-600/10 border border-red-600/30 text-xs font-mono uppercase tracking-widest text-red-500 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span>
              <span>EPISODE 08 | GET IN TOUCH</span>
            </div>

            {/* Direct Contact Channels */}
            <div className="flex flex-wrap items-center gap-5 text-xs font-mono text-white/60">
              <a 
                href="mailto:SIDDMJ07@GMAIL.COM" 
                className="hover:text-red-500 transition-colors uppercase tracking-wider flex items-center gap-1.5"
              >
                <span className="text-red-500 font-bold">EMAIL:</span>
                <span className="text-white/80 hover:text-red-400">SIDDMJ07@GMAIL.COM</span>
              </a>
              <span className="text-white/20 hidden sm:inline">&bull;</span>
              <a 
                href="https://linkedin.com/in/siddhant-mohan-jha" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-red-500 transition-colors uppercase tracking-wider flex items-center gap-1"
              >
                <span className="text-white/80 hover:text-red-400">LinkedIn</span>
                <span className="text-red-500">//</span>
              </a>
              <span className="text-white/20 hidden sm:inline">&bull;</span>
              <a 
                href="https://github.com/Sidd1104" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-red-500 transition-colors uppercase tracking-wider flex items-center gap-1"
              >
                <span className="text-white/80 hover:text-red-400">GitHub</span>
                <span className="text-red-500">//</span>
              </a>
            </div>
          </div>

          {/* Inline Feedback States (Success / Error) */}
          {status === 'success' && (
            <div className="mb-8 p-4 rounded-xl bg-red-600/15 border border-red-600/40 text-white flex items-center justify-between gap-4 shadow-[0_0_20px_rgba(229,9,20,0.2)]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-600/30 border border-red-500/50 flex items-center justify-center shrink-0 text-red-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-mono font-bold uppercase tracking-wider text-red-400">
                    TRANSMISSION SUCCESSFUL // SIGNAL DISPATCHED
                  </p>
                  <p className="text-xs text-white/80 font-light">
                    Thank you! Your message has been routed. I'll get back to you shortly.
                  </p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setStatus('idle')}
                className="text-[11px] font-mono uppercase tracking-widest text-white/60 hover:text-white underline underline-offset-4 shrink-0 transition-colors"
              >
                Send Another
              </button>
            </div>
          )}

          {status === 'error' && (
            <div className="mb-8 p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-white flex items-center justify-between gap-4 shadow-[0_0_20px_rgba(229,9,20,0.15)]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center shrink-0 text-red-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-mono font-bold uppercase tracking-wider text-red-400">
                    TRANSMISSION NOTICE
                  </p>
                  <p className="text-xs text-white/80 font-light">
                    {errorMessage || "Submission error. Please email directly at SIDDMJ07@GMAIL.COM."}
                  </p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setStatus('idle')}
                className="text-white/40 hover:text-white text-lg px-1 transition-colors"
                aria-label="Dismiss notice"
              >
                &times;
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-12 md:gap-16 w-full">
            <div className="flex flex-col md:flex-row gap-12 md:gap-20 w-full">
              
              {/* Left Column */}
              <div className="flex-1 flex flex-col gap-10">
                <div className="relative">
                  <input 
                    type="text" 
                    id="firstName" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name" 
                    required
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-lg focus:outline-none focus:border-red-600 transition-colors placeholder-white/40 font-medium rounded-none text-white"
                  />
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    id="lastName" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name" 
                    required
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-lg focus:outline-none focus:border-red-600 transition-colors placeholder-white/40 font-medium rounded-none text-white"
                  />
                </div>
                <div className="relative">
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address" 
                    required
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-lg focus:outline-none focus:border-red-600 transition-colors placeholder-white/40 font-medium rounded-none text-white"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="flex-1 flex flex-col">
                <div className="relative h-full flex flex-col">
                  <textarea 
                    id="message" 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Type your message here..." 
                    required
                    className="w-full h-full min-h-[140px] bg-transparent border-b border-white/20 pb-3 text-lg focus:outline-none focus:border-red-600 transition-colors placeholder-white/40 font-medium resize-none rounded-none text-white"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row gap-12 mt-4 pt-6 border-t border-white/10">
              {/* Left text */}
              <div className="flex-1 flex items-start gap-4 text-sm font-light text-white/70">
                <input 
                  type="checkbox" 
                  id="permission" 
                  checked={formData.permission}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 rounded-sm border-white/30 bg-transparent text-red-600 focus:ring-0 focus:ring-offset-0 cursor-pointer" 
                  style={{ accentColor: "#E50914" }}
                />
                <label htmlFor="permission" className="cursor-pointer max-w-[280px] leading-snug">
                  I give permission to contact me at this email address.
                </label>
              </div>

              {/* Right text & button */}
              <div className="flex-1 flex flex-col gap-8 text-xs text-white/50 font-light">
                <p className="leading-relaxed max-w-[400px]">
                  This site is protected by security protocols and industry-standard privacy guidelines.
                </p>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6">
                  <p className="max-w-[250px] leading-relaxed">
                    Ready to start a project or collaboration? Send a direct signal.
                  </p>
                  
                  <button 
                    type="submit" 
                    disabled={status === 'submitting'}
                    className={`px-8 py-3.5 rounded bg-red-600 text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all duration-300 group whitespace-nowrap shadow-[0_0_20px_rgba(229,9,20,0.6)] ${
                      status === 'submitting' ? 'opacity-60 cursor-not-allowed' : 'hover:bg-red-700 hover:scale-105'
                    }`}
                  >
                    {status === 'submitting' ? (
                      <>
                        <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" stroke="currentColor"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>

        </motion.div>
      </div>
    </section>
  );
};

export default Contact;