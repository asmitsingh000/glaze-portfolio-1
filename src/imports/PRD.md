# 📋 PRD — Asmit Singh Portfolio
**Product Requirements Document**  
Version: 2.0  
Author: Asmit Singh  
Status: Active Development

---

## 1. PRODUCT OVERVIEW

### 1.1 Vision
A portfolio website for Asmit Singh — web developer and game developer. Visitors choose between two complete visual experiences (Minimalist, Classic) from a style picker screen. A third option (Supreme) is teased but locked — it is being built in parallel and will ship when ready.

### 1.2 Delivery Strategy
**V1 (Current build):** Minimalist + Classic fully functional. Supreme shown as a teaser card only.  
**V2 (Future):** Supreme mode fully unlocked with R3F island world, UE5 cinematic, Peak Masters.

### 1.3 Target Users
- **Recruiters / Clients** → Minimalist — fast, clean, content-first
- **Design-conscious visitors** → Classic — dark sect aesthetic, rich visual
- **Fellow devs / gamers** → Supreme teaser intrigues them, notify for launch

---

## 2. STYLE PICKER SCREEN

### 2.1 Behavior
- This IS the landing page (`/`) — not a popup over content
- Full viewport screen, dark background
- Three style cards displayed
- Minimalist and Classic are selectable → navigate to their layouts
- Supreme card is NOT selectable — shows teaser state only
- Choice saved to localStorage (`asmit-style-mode`)
- On return visits: if mode already chosen → skip picker, load that mode directly
- Style switcher button always visible → re-opens picker

### 2.2 The Three Cards

#### MINIMALIST
```
State:    SELECTABLE
Preview:  White bg, thin serif "A.S.", single accent line
Label:    "Minimalist"
Sub:      "Signal over noise."
Desc:     "Clean layout. Fast. Content first."
Action:   Click → navigate to minimalist layout
```

#### CLASSIC
```
State:    SELECTABLE
Preview:  Dark forest bg, emerald accent, "Asmit Singh" in Cinzel
Label:    "Classic"
Sub:      "Dark. Refined. Intentional."
Desc:     "Sect colors. Rich visuals. The full story."
Action:   Click → navigate to classic layout
```

#### SUPREME
```
State:    LOCKED / TEASER
Label:    "Supreme"
Quote:    "Forged in silence. Revealed in time."
Visual:   Small R3F canvas embedded in card
          → Chibi (Patriarch) doing work animation — hammering/building
          → Dark void bg (#050e08), gold particle drift
          → Sect glow beneath character's feet
Cursor:   Default (not clickable)
Overlay:  Subtle dark veil — locked feel without text saying "locked"
Action:   None. Tooltip on hover: "The peak is being forged."
```

### 2.3 Supreme Chibi Animation (Card Only)
```
Canvas:     ~280×200px (card inner area)
Character:  Patriarch chibi — procedural Three.js geometry
Animation loop (~2s):
  → Arm raises (hammer upswing)
  → Arm falls (downstroke)
  → Gold spark particles emit at impact point
  → Character bobs slightly with effort
  → Repeat

Lighting:
  PointLight above: warm white, intensity 1.2
  PointLight below: #50C878 emerald, intensity 0.6 (sect glow on ground)

Particles:
  Impact sparks: 8-12 particles per hit, gold (#D4AF37), burst outward
  Ambient drift: 20 slow-rising emerald particles, always present

Performance:
  dpr: 1.0 (capped for card canvas)
  Only renders when card is in viewport (IntersectionObserver pause)
  frameloop="demand" between animations if possible
```

---

## 3. MINIMALIST MODE — FULL SPEC

### 3.1 Philosophy
Speed. Clarity. Every element earns its place.

### 3.2 Layout
```
[Sticky Nav]   name left, links right
[Hero]         name, title, one-liner
[About]        mortal→patriarch story, concise
[Skills]       tag grid
[Showcase]     project cards, 2-col
[Workshop]     ongoing + upcoming
[Realm]        Realm of Gaze teaser
[Contact]      form + socials
[Footer]       copyright + style switcher link
```

### 3.3 Visual Rules
```
Colors:
  bg:          #fafaf9
  surface:     #f0efed
  border:      #e0ddd8
  text:        #1a1a18
  text-muted:  #6b6860
  accent:      #2d5a3d

Typography:
  Display:  Playfair Display
  Body:     DM Mono

Animations:
  Scroll-triggered fade + translateY(16px) only
  No continuous motion, no glow, no particles
  prefers-reduced-motion: fully respected
```

### 3.4 Sections

**Hero**
```
"Asmit Singh"  — Playfair Display, large
"Web Developer · Game Developer"
"Building The Peak — and the worlds within it."
[View Work ↓]  [Contact]  — ghost buttons
```

**About**
```
Mortal→patriarch story, short form
"No knowledge. No path. Just will."
Skills: accent-colored tag badges
```

**Showcase — "Hall of Creation"**
```
Project cards: title, description, stack tags, year, links
Hover: border color shift (no glow)
```

**Workshop — "The Forge"**
```
Ongoing: progress bar (CSS) + status badge
Upcoming: concept + planned date
```

**Realm of Gaze**
```
"The Magnum Opus — being forged."
Lore teaser, 2-3 lines
Engine: Unreal Engine 5
[Notify me when it launches] — email input
```

**Contact**
```
Form: Name, Email, Message, Send
Socials: GitHub, LinkedIn
Availability badge: "Open to opportunities"
```

---

## 4. CLASSIC MODE — FULL SPEC

### 4.1 Philosophy
Dark. Refined. The sect aesthetic — without 3D overhead.

### 4.2 Layout
```
[Top Nav]       sect styled, Cinzel font
[Hero]          full viewport, sect sigil, dramatic
[About]         mortal→patriarch, sect framing
[Skills]        "Cultivation Arts" grouping
[Showcase]      "Hall of Creation" rich cards
[Workshop]      "The Forge" gold accents
[Realm]         elevated full section
[Contact]       "The Messenger's Post"
[Footer]        sect sigil + copyright
```

### 4.3 Visual Rules
```
Colors: full sect palette (see DESIGN_SYSTEM.md)
  bg:      #0a1a0f
  surface: #1a4a2a
  text:    #F0F4F0
  accent:  #50C878
  gold:    #D4AF37

Typography:
  Display: Cinzel
  Body:    Crimson Pro

Animations:
  Scroll-triggered reveals (Intersection Observer, staggered)
  Hover: emerald card glow, gold nav underline
  Hero: sect sigil very slow rotation (CSS, continuous)
  Parallax: hero background shifts on scroll
```

### 4.4 Sections

**Hero**
```
Full viewport
Bg: dark forest gradient + faint CSS particle drift
Sect sigil: large, low opacity, behind text
"ASMIT SINGH" — Cinzel, gold
"Web Developer · Game Developer" — Cinzel, emerald
"A mortal who chose the path." — Crimson Pro, mist
[Explore The Peak ↓] — gold border button
```

**About**
```
Left: mortal→patriarch story
Right: sect identity — colors, values
"No knowledge. No path. Just will." — large gold pull quote
```

**Skills — "Cultivation Arts"**
```
Web Arts: Next.js, React, TypeScript, Three.js, R3F, Tailwind...
Realm Arts: Unreal Engine 5, Game Design...
Cinzel headers per group, emerald-bordered tags
```

**Showcase — "Hall of Creation"**
```
Rich cards: gradient thumbnail, Cinzel title, Crimson Pro desc
Stack: emerald badges, year in gold
Hover: card lifts, emerald border glow
```

**Workshop — "The Forge"**
```
Gold progress bars on ongoing projects
Pulsing active badge
Upcoming: dimmed, italic "planned"
Dark surface cards with gold trim
```

**Realm of Gaze**
```
Full-width dark section
"REALM OF GAZE" — Cinzel, emerald glow text-shadow
Lore teaser paragraph
Cultivation stage progress indicators
[Notify me] — gold button
```

**Contact — "The Messenger's Post"**
```
Sect quote: "Leave your words. They will be received."
Form: dark inputs, emerald focus, gold labels
Socials: emerald hover
```

---

## 5. SHARED REQUIREMENTS

| Requirement | Detail |
|-------------|--------|
| SEO | Title, description, OG image, canonical |
| Fonts | next/font, display: swap |
| Images | next/image for project screenshots |
| Forms | React Hook Form, validation, success state |
| Mobile | Both modes fully responsive |
| Performance | Minimalist > 90, Classic > 80 Lighthouse |
| Style switcher | Floating button, always visible, bottom-right |

---

## 6. OUT OF SCOPE — V1

- Supreme mode (routing, pages, content)
- UE5 cinematic integration
- R3F island world
- Peak Master dialog system
- Blog section
- CMS / backend

---

## 7. SUCCESS METRICS — V1

- Both modes work fully on desktop + mobile
- Supreme teaser creates curiosity
- Contact form sends
- Realm notify list captures emails
- Zero console errors in production
