# 🎬 Netflix-Themed Cinematic Developer Portfolio

<div align="center">

![Netflix Portfolio Banner](https://img.shields.io/badge/Cinematic-Portfolio_v2.0-E50914?style=for-the-badge&logo=netflix&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP_3-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

**An immersive, cinema-grade personal portfolio inspired by Netflix's UI/UX, engineered with modern interactive web technologies.**

[Features](#-key-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Project Structure](#-project-structure) • [Episodes & Sections](#-portfolio-episodes--sections) • [License](#-license)

</div>

---

## 🌟 Overview

The **Netflix Developer Portfolio** transforms traditional portfolio presentations into an interactive, streaming-platform narrative. Structured like a high-production original series, it guides recruiters, engineers, and collaborators through technical milestones, featured projects ("Blockbusters"), and engineering expertise with cinematic fidelity.

---

## ✨ Key Features

- **🔴 Signature Netflix Preloader**: Authentic "N" ribbon intro animation with branded audio-visual presence.
- **✨ Physics-Driven Custom Cursor & Spotlight**: Smooth interactive cursor that leaves dynamic light beams and reacts dynamically across every interactive element.
- **🎴 3D Hologram Tilt Card**: Hero section with interactive mouse-tracked 3D tilt, glare reflections, and real-time lighting physics.
- **🍱 Bento Grid Architecture**: Episode 01 layout organizing background, technical pillars, and achievements in an intuitive modular format.
- **🎞️ Blockbuster Project Showcase**: Streaming-style catalog for full-stack platforms, cloud infrastructure, AI models, and algorithmic problem-solving projects.
- **⚡ Ultra-Smooth GSAP & Framer Motion Flow**: ScrollTrigger-driven transitions, stagger effects, and parallax text movement.
- **📱 Responsive & Cross-Device Optimized**: Seamlessly scales from desktop ultra-wide displays down to mobile screens.

---

## 🛠️ Tech Stack

| Domain | Technologies & Libraries |
| :--- | :--- |
| **Frontend Framework** | [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/) |
| **Styling & Design System** | [Tailwind CSS v4](https://tailwindcss.com/) with custom Netflix color palette (`#E50914`, `#050505`, `#141414`) |
| **Physics & Animations** | [GSAP 3](https://greensock.com/gsap/) (ScrollTrigger, quickTo, Timelines), [Framer Motion 12](https://www.framer.com/motion/) |
| **Icons & Media** | Custom SVG assets, dynamic gradients, and radial lighting shaders |
| **Tooling & Linter** | ESLint 10, PostCSS, Git |

---

## 🚀 Getting Started

Follow these steps to set up and run the portfolio locally:

### Prerequisites

- **Node.js**: v18.0.0 or higher recommended
- **npm**: v9.0.0 or higher (or Yarn / pnpm)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Sidd1104/Main_Portfolio.git
   cd Main_Portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:5173/](http://localhost:5173/) to explore the live portfolio.

### Build for Production

```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory ready for deployment on Vercel, Netlify, Render, or GitHub Pages.

---

## 📂 Project Structure

```text
├── public/                  # Static assets & icons
├── src/
│   ├── assets/              # Portfolio graphics, portraits, and media
│   ├── components/          # Modular portfolio sections
│   │   ├── NetflixPreloader.jsx   # Ta-Dum cinematic splash intro
│   │   ├── CustomCursor.jsx       # Global glowing cursor & mouse light
│   │   ├── Hero.jsx               # Netflix hero header with 3D tilt card
│   │   ├── About.jsx              # Episode 01: Synopsis & Bento Grid
│   │   ├── Expertise.jsx          # Episode 02: Core Engineering Pillars
│   │   ├── Skills.jsx             # Episode 03: Interactive Tech Stacks
│   │   ├── Projects.jsx           # Episode 04: Featured Blockbusters
│   │   ├── Contact.jsx            # Episode 05: Season Finale Contact Form
│   │   └── Footer.jsx             # Credits, metadata & navigation
│   ├── App.jsx              # Main application orchestration
│   ├── App.css              # Custom styling & keyframe animations
│   ├── index.css            # Tailwind CSS directives & root tokens
│   └── main.jsx             # React DOM entrypoint
├── eslint.config.js         # ESLint configuration
├── vite.config.js           # Vite build configuration
├── package.json             # Project dependencies & scripts
└── README.md                # Project documentation
```

---

## 📺 Portfolio Episodes & Sections

- **Intro**: Signature Netflix Preloader with cinematic ribbon transition.
- **Hero**: Top 1% developer headline, dynamic scrolling marquee, and 3D interactive credential card.
- **Episode 01 — Synopsis**: Background, academic foundations, and engineering journey.
- **Episode 02 — Expertise**: Deep-dive into Full-Stack Architecture, Artificial Intelligence, and Distributed Systems.
- **Episode 03 — Technical Arsenal**: Categorized skill matrices (Frontend, Backend, AI/ML, DevOps, Algorithmic Problem Solving).
- **Episode 04 — Featured Blockbusters**: Interactive project cards highlighting key architectures, live demos, and tech stacks.
- **Episode 05 — Season Finale**: Interactive contact portal with parallax typography and direct message dispatch.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
