# Studio — Boutique Creative Agency

A high-performance, single-page scroll-animated landing page built with React, GSAP, Framer Motion, and Three.js.

## Features
- **GSAP ScrollTrigger**: Complex counter-parallax logic and horizontal scroll-jacking.
- **Framer Motion**: Smooth entry animations and micro-interactions.
- **Three.js**: Custom WebGL 15,000 particle starfield with depth-scroll camera manipulation. 
- **Lenis Smooth Scroll**: Buttery 60fps scrolling interpolated seamlessly with the GSAP ticker.
- **Magnetic Custom Cursor**: Custom cursor with `mix-blend-mode: difference` and spring-physics trailing.

## Tech Stack
- React / Vite
- GSAP + ScrollTrigger
- Framer Motion
- Three.js
- Lenis
- CSS Modules / Custom Properties

## Local Development
```bash
npm install
npm run dev
```

## Production Build
```bash
npm run build
```
Note: The output will be inside the `dist` directory, which can be deployed to Vercel or Netlify instantly.
