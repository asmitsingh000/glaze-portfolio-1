# 🎨 DESIGN SYSTEM — Asmit Singh Portfolio

---

## 1. BRAND IDENTITY

**Name:** The Peak  
**Sect:** Unnamed (Asmit's sect — color identity: White, Gold, Emerald, Dark Forest)  
**Tagline:** *A living peak, still being shaped.*  
**Voice:** Confident. Mysterious. Honest. Never corporate.

---

## 2. COLOR SYSTEM

### 2.1 Sect Palette (Supreme + Classic base)

```css
:root {
  /* Core */
  --sect-void:       #050e08;   /* Deepest background — almost black-green */
  --sect-forest:     #0a1a0f;   /* Dark forest — primary bg */
  --sect-deep:       #1a4a2a;   /* Deep green — surface/card bg */
  --sect-emerald:    #50C878;   /* Emerald — primary accent */
  --sect-jade:       #3da85e;   /* Jade — secondary accent */
  --sect-gold:       #D4AF37;   /* Cultivation gold — highlight */
  --sect-gold-soft:  #e8cc6b;   /* Soft gold — glow, text highlight */
  --sect-white:      #F0F4F0;   /* Soft white — primary text */
  --sect-mist:       #b8c8bc;   /* Mist — secondary text */
  --sect-glow:       rgba(80, 200, 120, 0.15);  /* Emerald glow */
  --sect-gold-glow:  rgba(212, 175, 55, 0.15);  /* Gold glow */
}
```

### 2.2 Phase Color Arcs (Intro Cinematic)

```
MORTAL PHASE
  Background:  #1a1410  (dusty, dim)
  Character:   #8a7a6a  (muted tan/gray)
  Aura:        none
  World tone:  desaturated, cool shadow

FOUNDATION PHASE
  Background:  #0f1520  (midnight blue-black)
  Character:   #f0f0f0  (white emerging)
  Aura:        #D4AF37 + #ffffff  (gold + white)
  World tone:  brightening, energy lines

SUPREME / PATRIARCH PHASE
  Background:  #050e08  (sect void)
  Character:   #F0F4F0  (full white + gold trim)
  Aura:        #D4AF37 + #50C878  (gold + emerald)
  World tone:  full sect palette — lush, powerful
```

### 2.3 Minimalist Palette

```css
:root[data-mode="minimalist"] {
  --bg:         #fafaf9;
  --surface:    #f0efed;
  --border:     #e0ddd8;
  --text:       #1a1a18;
  --text-muted: #6b6860;
  --accent:     #2d5a3d;   /* Single muted green accent */
}
```

### 2.4 Classic Palette

```css
:root[data-mode="classic"] {
  --bg:         #0a1a0f;   /* sect-forest */
  --surface:    #1a4a2a;   /* sect-deep */
  --border:     #2a6a3a;
  --text:       #F0F4F0;   /* sect-white */
  --text-muted: #b8c8bc;   /* sect-mist */
  --accent:     #50C878;   /* sect-emerald */
  --gold:       #D4AF37;
}
```

---

## 3. TYPOGRAPHY

### 3.1 Font Stack

```css
/* Supreme + Classic — Display */
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&display=swap');
/* → Peak titles, character names, section headers */

/* Supreme + Classic — Body */
@import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');
/* → Content text, dialog boxes, descriptions */

/* Minimalist — Display */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

/* Minimalist — Body */
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap');

/* All modes — Code/Tech labels */
font-family: 'JetBrains Mono', monospace;
```

### 3.2 Type Scale

```css
--text-xs:   0.75rem;    /* 12px — labels, tags */
--text-sm:   0.875rem;   /* 14px — captions, metadata */
--text-base: 1rem;       /* 16px — body */
--text-lg:   1.125rem;   /* 18px — lead text */
--text-xl:   1.25rem;    /* 20px — card titles */
--text-2xl:  1.5rem;     /* 24px — section heads */
--text-3xl:  2rem;       /* 32px — page titles */
--text-4xl:  2.5rem;     /* 40px — hero */
--text-5xl:  3.5rem;     /* 56px — cinematic text */
```

---

## 4. ANIMATION TOKENS

```css
/* Timing */
--ease-smooth:  cubic-bezier(0.4, 0, 0.2, 1);
--ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-out:     cubic-bezier(0, 0, 0.2, 1);

/* Duration */
--dur-fast:    150ms;
--dur-normal:  300ms;
--dur-slow:    600ms;
--dur-cinematic: 1200ms;

/* Peak bob animation */
@keyframes peakBob {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-8px); }
}
/* Each peak gets different duration: 3s, 3.5s, 4s, 3.2s, 3.8s */

/* Gold particle drift */
@keyframes particleDrift {
  0%   { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
  10%  { opacity: 0.8; }
  90%  { opacity: 0.6; }
  100% { transform: translateY(-120vh) translateX(40px) rotate(360deg); opacity: 0; }
}

/* Typewriter (dialog boxes) */
/* Handled via JS — character by character append */
/* Speed: 35ms per character */

/* Aura pulse */
@keyframes auraPulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50%       { opacity: 1;   transform: scale(1.08); }
}
```

---

## 5. 3D WORLD VISUAL SPEC (Supreme)

### 5.1 Lighting Setup
```
AmbientLight:      #1a4a2a  intensity: 0.4   (base green fill)
HemisphereLight:   sky: #0a1a0f  ground: #1a4a2a  intensity: 0.6
DirectionalLight:  #D4AF37  intensity: 1.2  position: [10, 20, 5]  (gold sun)
PointLight (x5):   #50C878  intensity: 0.8  (one per peak, beneath it)
```

### 5.2 Peak Geometry
```
Base rock: Custom BufferGeometry (irregular hexagonal prism, jagged top)
Mid layer: Smaller rocks stacked, slight tilt
Top platform: Flat-ish area where Master stands
Size scale:
  Peak 0 (Center): 1.4x — tallest, most detailed
  Peak 1, 2:       1.0x
  Peak 3:          0.85x
  Peak 4:          1.1x — special forge treatment
```

### 5.3 Peak 4 Forge Effects
```
Glowing cracks: emissive material on crack geometry (gold + orange)
Scaffolding:    thin BoxGeometry frames around peak
Ember particles: Points system, rising upward, warm colors
Pulse glow:     PointLight beneath peak, pulsing intensity
Construction aura: Partial shield-like ring, transparent, rotating
```

### 5.4 Atmosphere
```
Fog: FogExp2  color: #050e08  density: 0.015
Stars/particles: 2000 points, random sphere distribution, tiny size
Gold drift particles: 150 points, slow upward drift
Sky: Dark gradient — #050e08 top → #0a1a0f horizon
```

---

## 6. CHIBI CHARACTER VISUAL SPEC

```
HEAD:    SphereGeometry(0.35) — slightly flattened Y
EYES:    2x SphereGeometry(0.06) — pure white + black iris dot
BODY:    BoxGeometry(0.4, 0.5, 0.3) — slightly rounded
ARMS:    2x CylinderGeometry — short, slightly angled down
LEGS:    2x CylinderGeometry — short, slightly apart
HAIR:    Stylized — varies per character (cone, sphere cluster, flat plate)

Material: MeshToonMaterial — cel-shading, no texture needed
Outline:  achieved via inverted hull mesh scaled 1.05x, black

Idle anim: gentle float (Y sine wave, amplitude 0.1, freq 1.5Hz)
Talk anim: slight lean toward user + hand raise
```

---

## 7. RPG DIALOG BOX SPEC

```
Visual:
  Background:  rgba(5, 14, 8, 0.92)
  Border:      2px solid var(--sect-gold)
  Corner:      sect sigil watermark (low opacity)
  Backdrop:    blur(8px)
  Border-radius: 4px (slightly square, not bubbly)
  
Layout:
  Top-left:    Character name (Cinzel font, gold color)
  Top-right:   Character portrait (chibi render or icon)
  Body:        Typewriter text (Crimson Pro, white)
  Bottom-right: "▶ Continue" button (appears after text completes)

Position:
  World view:  Bottom 10% of screen, centered, 80% width max
  Peak view:   Bottom of content area

Animation:
  Enter: slide up from bottom + fade in (300ms)
  Exit:  fade out (200ms)
```

---

## 8. SECT SIGIL

A decorative mark used as:
- Watermark in dialog boxes
- Header decoration in Classic mode
- Loading screen element
- Peak 0 (About) decorative element

**Design:** Stylized mountain peak inside a hexagonal border, with a small cultivation circle/orbit ring. Gold on dark background. SVG format.

---

## 9. RESPONSIVE BREAKPOINTS

```css
--mobile:  640px   /* Stack everything, simplified 3D */
--tablet:  1024px  /* Reduced peak complexity */
--desktop: 1280px  /* Full experience */
--wide:    1920px  /* Extended world view */
```

### Supreme Mode Mobile Strategy
- Full Supreme on desktop/tablet
- On mobile: 3D world with simplified geometry (lower poly)
- Dialog boxes become bottom sheets
- Touch: tap peaks to navigate (no hover states)
- Pinch to zoom in world view
