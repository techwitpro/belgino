# Belgino Restaurant — Modern Fine Dining Landing Page

A modern, high-performance, and visually captivating restaurant landing page built with **Next.js 16 (App Router & Turbopack)**, **Tailwind CSS v4**, **GSAP (ScrollTrigger)**, and **Lenis Smooth Scroll**. Exactly cloned and designed from the Figma specification with pixel-perfect precision, rich micro-interactions, and award-winning creative animations.

![Belgino Preview](/public/images/special-signature-dish.png)

---

## 🌟 Key Highlights & Design Fidelity

- **100% Figma Clone**: Faithfully replicates the authentic visual architecture, typography, grid alignments, spacing, and image assets from the [Figma Design File](https://www.figma.com/design/FnHE2mmi2zeqOJa4Dm8ri5/Techwitpro-Website-2.0?node-id=6683-10387).
- **Custom Typography**: Powered by Google's **Oswald** typeface across all display headlines, labels, and copy (`--font-oswald`, weights 300–700).
- **Curated Color Tokens**:
  - `Brand Cream`: `#F6FAE1` (Primary Warm Canvas)
  - `Brand Dark`: `#17191C` (Luxury Charcoal)
  - `Brand Lime`: `#E8FC81` (Vibrant Accent & Active Indicators)
  - `Brand Sage`: `#C7CDA9` (Pill Navigation Header)
  - `Brand Sage Light`: `#DEE3C5` (Active Category Tabs & Highlighted Cards)
  - `Brand Espresso`: `#291F1A` (Rich Typography & Borders)
  - `Brand Input Dark`: `#202310` (Card Fields & Contrast Blocks)
- **42 Authentic High-Resolution Assets**: All vectors, SVG logos, reviewer avatars, and dish photos extracted directly from the Figma canvas.

---

## 🎭 Award-Winning Creative Animations

Every interaction has been tuned for a tactile, responsive, and deeply satisfying feel:

1. **Lenis Inertia Scrolling**: Silky smooth wheel scrolling synced with `gsap.ticker` at 60fps with zero lag (`lagSmoothing(0)`).
2. **Kinetic 3D Typography Reveal**: Hero headline words reveal in 3D perspective (`rotateX` + `yPercent`) with punchy `power3.out` curves and zero sluggish delay.
3. **Hero Mouse Parallax & Float**: Left and right artisan badges float continuously and dynamically track mouse movement with smooth parallax depth.
4. **Infinite Marquee with Scroll Velocity Skew**: Continuous horizontal showcase of popular dishes with velocity-driven dynamic skew (`skewX`), interactive spotlight glow, and hover elevation.
5. **Magnetic Spring Buttons**: CTA buttons pull magnetically toward the cursor on hover with elastic spring-back (`elastic.out(1, 0.4)`) and two-tier text slide marquees.
6. **Kinetic Category Switcher**: Seamless switching between `BREAKFAST`, `LUNCH`, and `DINNER` triggers an Apple-grade blur-settle cascade (`blur(3px) -> blur(0px)`) with a rhythmic 0.035s item stagger.
7. **Interactive 3D Card Tilts**: Mouse hover on the *Our Story* card, *Opening Hours* card, and *Testimonial* cards smoothly tilts them in 3D space (`perspective: 900px`, `rotateX`, `rotateY`).
8. **Dynamic Schedule Drawing**: Dotted leader lines in the Opening Hours schedule automatically draw in (`scaleX: 0 -> 1`) when scrolled into view.
9. **Live Operating Hours Radar**: Real-time operating calculation displaying a live pulsing green radar beacon for `● Open Now`.
10. **Showstopper Panoramic Curtain Reveal**: The full-width banquet image dynamically expands from a rounded inset curtain (`clipPath: inset(4% 3% round 24px)`) to full bleed (`inset(0px round 0px)`) with parallax depth on scroll.
11. **One-Tap Reservation Chips**: Quick guest selection pills (`1 Guest`, `2 Guests`, `4 Guests`, `6 Guests`, `8+ Party`) with instant form sync, focus glow rings, and simulated booking confirmation receipt generation (`BEL-XXXXXX`).

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **Next.js** | `16.4.3` | App Router, Turbopack, Fast Refresh, Static Generation |
| **React** | `19.3.0` | React Server Components & Client Hooks |
| **Tailwind CSS** | `4.3.3` | Inline Theme Configuration, JIT Engine |
| **GSAP** | `3.15.0` | High-performance ScrollTrigger and timeline animations |
| **Lenis** | `1.3.27` | Smooth hardware-accelerated scroll physics |
| **TypeScript** | `5.x` | Strict type safety across all components |
| **pnpm** | `12.x` | Fast, deterministic dependency management |

---

## 📁 Project Structure

```bash
belgino/
├── app/
│   ├── favicon.ico          # Multi-size legacy/browser favicon
│   ├── icon.svg             # Modern high-DPI SVG favicon with Belgino "B" monogram
│   ├── apple-icon.svg       # Apple Touch icon
│   ├── globals.css          # Tailwind CSS v4 @theme inline tokens & keyframes
│   ├── layout.tsx           # Root layout, Oswald font, and SEO metadata
│   └── page.tsx             # Main single-page application orchestrator
├── components/
│   ├── Navbar.tsx           # Floating pill nav, progress bar, magnetic CTAs
│   ├── Hero.tsx             # 3D headline reveal, mouse parallax, food marquee
│   ├── MenuSection.tsx      # Category tabs, kinetic blur reveal, dish modal
│   ├── AboutSection.tsx     # 3D gyro tilt cards, dynamic dotted lines, radar
│   ├── DrinksSection.tsx    # Growing divider, drink dialog, panoramic curtain reveal
│   ├── TestimonialsSection.tsx # Verified review cards with 3D tilt & carousel
│   ├── ReservationSection.tsx  # Quick guest chips, ambient card, receipt receipt
│   ├── ReservationModal.tsx    # Global popup reservation dialog
│   ├── Footer.tsx           # Infinite gallery strip, navigation links, back-to-top
│   └── SmoothScroll.tsx     # Lenis provider synced with GSAP ticker
├── public/
│   ├── favicon.svg          # Public scalable SVG favicon
│   ├── favicon.png          # High-resolution PNG favicon
│   ├── favicon.ico          # Fallback ICO icon
│   └── images/              # 42 Authentic restaurant assets exported from Figma
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v20.0.0` or later
- **pnpm**: `v9.0.0` or later (or npm / yarn)

### 1. Clone & Install Dependencies
```bash
git clone <repository-url>
cd belgino
pnpm install
```

### 2. Run Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
pnpm build
pnpm start
```
Compiles and optimizes static pages with Turbopack in under 1 second.

---

## 🎨 Design Tokens & Customization

The design tokens are defined in `app/globals.css` using Tailwind CSS v4's native `@theme inline` block:

```css
@theme inline {
  --font-oswald: var(--font-oswald);
  --color-brand-cream: #F6FAE1;
  --color-brand-dark: #17191C;
  --color-brand-green: #0F2419;
  --color-brand-brown: #291F1A;
  --color-brand-lime: #E8FC81;
  --color-brand-sage: #C7CDA9;
  --color-brand-sage-light: #DEE3C5;
  --color-brand-offwhite: #FEF9F5;
  --color-brand-muted: #8A8A87;
  --color-brand-input-bg: #202310;
}
```

---

## 📄 License

Crafted for **Belgino Restaurant**. All designs, branding, and assets belong to their respective owners.
