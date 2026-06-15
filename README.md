# AutoInspect AI — Car Damage Detection

> AI-powered vehicle damage detection and classification using ResNet50 deep learning, FastAPI, and Next.js 16. Built as a production-grade portfolio project.

---

## Overview

AutoInspect AI classifies vehicle damage from photos in real time. Upload any car image and the system returns the predicted damage category with inference latency in milliseconds, backed by a ResNet50 model with transfer learning.

**Live stack:**
- **ML Model** — ResNet50 (50 layers, 25.6M parameters) with ImageNet transfer learning
- **Backend API** — FastAPI + Uvicorn hosted on Hugging Face Spaces with Prometheus metrics
- **Frontend** — Next.js 16 + Tailwind CSS v4 + Framer Motion, deployed on Vercel

---

## Pages

### Home (`/`)
Animated landing page with floating gradient orbs, dot-grid background, staggered hero entrance, feature cards with hover glow, and a 3-step how-it-works section.

### Predict (`/predict`)
Drag-and-drop image upload with animated corner accents and live preview. Sends the image to `POST /predict`, then reveals results with animated latency bar and colour-coded damage badge.

### Dashboard (`/dashboard`)
Real-time monitoring that auto-refreshes every 30 seconds — API health, request/prediction totals, average latency, a Recharts bar chart of Prometheus metrics, and a full metrics table.

### About (`/about`)
Model architecture (ResNet50 stats), dataset classes with colour badges, animated tech-stack cards, and the end-to-end system pipeline diagram.

---

## Damage Classes

| Key | Display |
|---|---|
| `F_Breakage` | Front Breakage |
| `R_Breakage` | Rear Breakage |
| `Door_Dent` | Door Dent |
| `Glass_Shatter` | Glass Shatter |
| `Head_Lamp` | Head Lamp Damage |
| `Tail_Lamp` | Tail Lamp Damage |

---

## Tech Stack

| Layer | Technology |
|---|---|
| ML Model | ResNet50, PyTorch / TensorFlow, PIL / OpenCV |
| Backend | FastAPI, Uvicorn, Prometheus Client |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4, Framer Motion |
| Charts | Recharts |
| Icons | Lucide React |
| Fonts | Inter (sans) · JetBrains Mono (mono) |
| Hosting | Vercel (frontend) · Hugging Face Spaces (API) |

---

## Design System — Aurora Dark Theme

| Token | Value | Role |
|---|---|---|
| Background | `oklch(0.06 0.012 265)` | Deep space black |
| Primary | `oklch(0.63 0.27 284)` | Electric violet |
| Accent | `oklch(0.73 0.18 197)` | Cyan |
| Border | `oklch(0.20 0.015 265)` | Subtle separator |

**UI patterns used:**
- Glassmorphism cards — `backdrop-filter: blur` + semi-transparent bg
- Gradient text — violet → cyan on headings
- Glow shadows — `box-shadow` with primary color on hover/focus
- CSS animations — `float`, `orb-drift`, `shimmer`, `ping-slow`
- Framer Motion — staggered entrance, `whileInView`, `whileHover`, `AnimatePresence`

**Fully responsive** — mobile-first layout with `sm:` / `md:` / `lg:` breakpoints across all pages and components.

---

## Project Structure

```
car-damage-detection/
├── app/
│   ├── page.tsx            # Animated landing page
│   ├── predict/page.tsx    # Upload + classification flow
│   ├── dashboard/page.tsx  # Prometheus metrics dashboard
│   ├── about/page.tsx      # Model, dataset, tech stack
│   ├── layout.tsx          # Root layout with navbar
│   └── globals.css         # Aurora Dark theme + keyframe animations
├── components/
│   ├── navbar.tsx          # Glassmorphism nav, animated active pill, mobile menu
│   ├── upload-box.tsx      # Drag-drop upload with animated corner accents
│   ├── metric-card.tsx     # Metric card with entrance animation + hover glow
│   ├── loader.tsx          # Dual-ring spinner with pulsing dots
│   ├── status-dot.tsx      # Live/offline status with ping animation
│   └── ui/                 # shadcn/ui primitives
└── lib/
    ├── api.ts              # Axios client (predict, health, info, metrics)
    ├── parse-metrics.ts    # Prometheus text-format parser
    └── utils.ts            # cn() utility
```

---

## Local Development

**Prerequisites:** Node.js 18+, npm or pnpm

```bash
# Clone and install
git clone <repo-url>
cd car-damage-detection
npm install

# Configure backend URL
echo "NEXT_PUBLIC_API_URL=https://your-space.hf.space" > .env.local

# Start dev server (Turbopack)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | FastAPI backend base URL (e.g. `https://your-space.hf.space`) |

---

## API Endpoints (Backend)

| Method | Path | Description |
|---|---|---|
| `POST` | `/predict` | `multipart/form-data` image → `{ prediction, latency_ms }` |
| `GET` | `/health` | API health status |
| `GET` | `/info` | Model metadata (name, classes, framework) |
| `GET` | `/metrics` | Prometheus text-format metrics |

---

## Build & Deploy

```bash
npm run build   # Production build (Next.js + Turbopack)
npm run start   # Serve production output
npm run lint    # ESLint
```

**Deploy to Vercel:**
1. Push to GitHub
2. Import project in [vercel.com](https://vercel.com)
3. Add `NEXT_PUBLIC_API_URL` in project settings
4. Deploy — auto-deploys on every push

---

## License

MIT
