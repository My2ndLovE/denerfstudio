# DENERF AI Studio – Animated Landing Page PRD (Maggie‑Style)

> **Format:** Markdown PRD for AI code assistants (Codex, Claude Code, etc.)  
> **Goal:** Build a joyful, pastel, Maggie‑style animated landing page with full‑screen sections, scroll‑snap navigation, GSAP timelines, and optional Lottie animations.

---

## 1. Product Overview

DENERF AI Studio needs a **playful, colorful, Maggie‑style landing page** that also acts as a **portfolio piece** to showcase creative front‑end + animation skills.

Key characteristics:

- Full‑screen stacked sections (like slides)
- One scroll / swipe / “next” = move to next section and play a **2–4 second animation**
- Visual vibe strongly inspired by **maggie-app.com**:
  - Big, bold, rounded display font for headings
  - Friendly pill buttons with soft outlines and pastel fills
  - High‑saturation pastel backgrounds (mint green, baby blue, bubblegum pink, lemon yellow)
  - Cute rounded shapes (blobs, smiley faces, cards, badges)
- AI‑driven software studio messaging:
  - Fast MVP at low cost
  - AI as the main dev assistant
  - Product‑minded developers
  - Any tech stack, adaptable skills
  - Small but effective team
  - Work first, pay later

This document defines:

- Visual style & design tokens  
- Section‑by‑section UX + animation  
- JSON spec for AI agents  
- Lottie animation requirements  
- Implementation notes (React + Tailwind + GSAP)

---

## 2. Visual Style Guide

### 2.1 Colors (Pastel, Maggie‑Inspired)

Use a **bright, friendly pastel palette**:

- `mintGreen`: `#77F0A0` (main background option)
- `skyBlue`: `#8DEBFF`
- `bubblePink`: `#FFB6D5`
- `lemonYellow`: `#FFE86B`
- `creamWhite`: `#FFF8EC`
- `deepGreenText`: `#004D33` (for bold headlines)
- `darkTeal`: `#006666` (buttons / accents)
- `softGrayText`: `#555555`

Each section can use a different background color block (similar to maggie‑app layout).

### 2.2 Typography

- **Display font**: Chunky, rounded, bold. (e.g., “Baloo”, “Fredoka”, “Bubblegum Sans”, or any similar rounded display typeface)
  - Use for main headings and big numbers.
- **Body font**: Clean sans‑serif (e.g., “Inter”, “Nunito”, “DM Sans”).
  - Use for paragraphs, buttons, labels.

Font treatments:

- Headings: UPPERCASE or Title Case, tight line height, deep green color.
- Body: Soft gray text on cream or pastel backgrounds.

### 2.3 Buttons & Pills

Buttons should follow Maggie‑style:

- **Shape**: Fully rounded pill (border‑radius: 9999px)
- **Size**: Medium / large, plenty of horizontal padding
- **Primary Button Example**:
  - Background: `lemonYellow`
  - Border: 2px `deepGreenText`
  - Text: `deepGreenText`, bold
- **Secondary Button Example**:
  - Background: `creamWhite`
  - Border: 2px `deepGreenText`
  - Text: `deepGreenText`

Hover states: subtle scale‑up + shadow + slightly deeper color.

### 2.4 Iconography & Characters

- Use **simple, friendly mascot elements**:
  - Smiley faces within big rounded blobs (inspired by the giant half‑circle face in the screenshot)
  - Cute icons representing AI, code, lightning fast, etc.
- All shapes should be **rounded / soft**; avoid sharp corners.

---

## 3. Layout & Interaction

### 3.1 Page Structure

- Full height sections: `min-h-screen`
- Each section uses **scroll snap** or GSAP ScrollTrigger pinning:
  - Desktop: scroll wheel
  - Mobile: vertical swipe
- Optional floating **“Next” pill button** at bottom‑right.

### 3.2 Navigation Behavior

- **One scroll = one section**  
  Use GSAP ScrollTrigger or a full‑page scroll library, but keep control explicit in code.
- On entering a section:
  - Play the associated **2–4 sec GSAP timeline**.
- On leaving a section:
  - Pause/end at final state.
  - Re‑entering can either **replay** or **reverse and replay** (configurable).

---

## 4. Content & Messaging

Core messaging across sections:

1. Fast MVP delivery with minimal cost.
2. AI as main development tool (but human‑driven direction).
3. Product‑minded, not just coders.
4. Flexible with any tech stack.
5. Small but very efficient team.
6. AI as best assistant / toolbelt.
7. Work first, pay later (trust model).

---

## 5. Section‑By‑Section UX & Animation

There are **7 main sections**, each full screen, each with a unique animation style.

### Section 1 – HERO (Fast MVP, Zero Risk)

- **Background:** Mint green block, large yellow rounded rectangle card behind phones (similar to Maggie hero).
- **Content:**
  - Small pill label at top: “AI‑Driven Software Studio”
  - Big headline: “YOUR POCKET TEAM FOR SHIPPING MVPs FAST.”
  - Subcopy: Short explanation of fast MVP + zero‑risk “work first, pay later”.
  - Two pill buttons: “Book Free Demo”, “See How It Works”.
  - Floating tilted device mockups or app cards in the center.

**Animation (2–4s):**

1. 0–1s – Background gradient gently shifts; blobs fade in from edges.
2. 1–2s – Headline + subcopy slide up; pills pop in with small bounce.
3. 2–3.5s – Stack of tilted device mockups drops in from top and settles with overshoot.
4. End state – Idle: subtle floating of devices + tiny shimmer on primary button.

### Section 2 – “With DENERF You Can…” (AI Superpower)

- **Background:** Bubblegum pink rounded card on mint or cream background.
- **Content:**
  - Title: “WITH DENERF YOU CAN:”
  - Three rounded cards representing:
    - “Ship the right MVP”
    - “Use AI like a superpower”
    - “Skip the big agency overhead”
  - Underneath, little pill icons (like Maggie’s emojis).

**Animation (2–4s):**

1. 0–1s – Pink card slides up from bottom.
2. 1–2.5s – Three content cards rotate in from different angles, then straighten.
3. 2.5–3.5s – Emoji pills bounce lightly in sequence.
4. End state – Rounded cards subtly hover.

### Section 3 – Big Smiley Blob (Any Tech + Adaptability)

- **Background:** Giant circular / half‑circle blob with a simple face (eyes + smile), in sky blue.
- **Content:** Copy overlay above or below blob:
  - Headline: “WE ADAPT TO ANY TECH STACK YOU NEED.”
  - Subcopy: Short explanation of how AI + dev skill lets you adapt quickly.

**Animation (2–4s):**

1. 0–1s – Blob grows in from center (scale animation) with easing.
2. 1–2s – Face elements (eyes, smile) pop in one by one.
3. 2–3.5s – Small tech icons orbit the top of the blob briefly, then settle into positions.
4. End state – Blob gently breathing (scale 0.98–1 loop).

### Section 4 – “Parenting Should Feel Lighter” Analogy → “Projects Should Feel Lighter”

- **Background:** Cream white with faint shapes.
- **Content:**
  - Headline (bold green): “PROJECTS SHOULD FEEL LIGHTER.”
  - Subheading: “We act as your product team powered by AI, so you don’t have to manage a huge dev squad.”
  - Imagery: Team photo style or illustration of small team working happily.

**Animation (2–4s):**

1. 0–1s – Headline slides in from left with subtle stretch.
2. 1–2s – Subcopy fades in.
3. 2–3.5s – Team image card slides up with soft drop shadow, slight parallax on hover.
4. End state – Occasional subtle zoom/pan on the image.

### Section 5 – “Who Is DENERF For?”

- **Background:** Pink block similar to “Maggie is for every parent…” section.
- **Content:**
  - Headline: “DENERF IS FOR FOUNDERS WHO…”
  - Bullet or pill tags:
    - “Want MVPs shipped in days, not months”
    - “Are open to AI‑assisted workflows”
    - “Hate wasting budget”
  - CTA pill: “See Example Projects”.

**Animation (2–4s):**

1. 0–1s – Pink section card grows in from center.
2. 1–2s – Headline drops with bounce.
3. 2–3.5s – Pills animate in with staggered slide and rotation.
4. End state – Idle slight wobble on hover.

### Section 6 – AI Toolbelt (AI Is Our Best Assistant)

- **Background:** Mint or sky blue.
- **Content:**
  - Headline: “AI IS OUR BEST ASSISTANT.”
  - Circular composition with central project card and surrounding AI/tool icons.

**Animation (2–4s):**

1. 0–1s – Central card floats up from below.
2. 1–2.5s – Icons fly in from random sides and snap into a circular orbit.
3. 2.5–4s – Brief chain reaction: one icon glows, line travels to card, part of UI highlights.

### Section 7 – Trust & Numbers (Work First, Pay Later)

- **Background:** Cream or white.
- **Content:**
  - Big bold headline: “WORK FIRST. PAY LATER.”
  - Subcopy explaining trust model: pay only when happy with the demo/MVP.
  - Progress bar or steps diagram:
    1. Quick call
    2. AI‑assisted prototype
    3. MVP build
    4. Launch & pay
  - Final CTA pill: “Start Free Demo”.

**Animation (2–4s):**

1. 0–1s – Progress bar animates from 0% to 100%.
2. 1–2s – Each step badge pops in when the “progress” passes it.
3. 2–3s – “Pay later” card/label slides in with smile icon.
4. 3–4s – CTA buttons slide up and bounce slightly.

---

## 6. JSON Spec for AI Agents

This JSON describes the sections and animations in a compact, machine‑friendly format.

```json
{
  "project": "DENERF_Studio_Landing_MaggieStyle",
  "theme": "joyful_light_pastel",
  "scroll_behavior": "one_section_per_scroll",
  "sections": [
    {
      "id": "hero",
      "background": "mintGreen",
      "layout": "centered_hero_with_devices",
      "message": "Fast MVP, Zero Risk",
      "cta": ["Book Free Demo", "See How It Works"],
      "duration_sec": 4,
      "animation": [
        { "t": "0-1", "actions": ["bg_gradient_shift", "blobs_fade_in"] },
        { "t": "1-2", "actions": ["headline_slide_up", "ctas_pop_bounce"] },
        { "t": "2-3.5", "actions": ["devices_stack_drop_in"] }
      ]
    },
    {
      "id": "with_denerf_you_can",
      "background": "bubblePink_on_mint",
      "layout": "card_row",
      "message": "WITH DENERF YOU CAN:",
      "cards": ["Ship the right MVP", "Use AI like a superpower", "Skip the big agency overhead"],
      "duration_sec": 4,
      "animation": [
        { "t": "0-1", "actions": ["pink_card_slide_up"] },
        { "t": "1-2.5", "actions": ["feature_cards_spin_in"] },
        { "t": "2.5-3.5", "actions": ["emoji_pills_bounce"] }
      ]
    },
    {
      "id": "blob_any_tech",
      "background": "skyBlue_blob",
      "layout": "giant_blob_face",
      "message": "WE ADAPT TO ANY TECH STACK YOU NEED.",
      "duration_sec": 4,
      "animation": [
        { "t": "0-1", "actions": ["blob_scale_grow"] },
        { "t": "1-2", "actions": ["face_elements_pop_in"] },
        { "t": "2-3.5", "actions": ["tech_icons_orbit_blob"] }
      ]
    },
    {
      "id": "projects_feel_lighter",
      "background": "creamWhite",
      "layout": "headline_left_image_card",
      "message": "PROJECTS SHOULD FEEL LIGHTER.",
      "duration_sec": 4,
      "animation": [
        { "t": "0-1", "actions": ["headline_slide_left_in"] },
        { "t": "1-2", "actions": ["subcopy_fade_in"] },
        { "t": "2-3.5", "actions": ["team_image_slide_up"] }
      ]
    },
    {
      "id": "who_is_denerf_for",
      "background": "bubblePink",
      "layout": "headline_and_tag_pills",
      "message": "DENERF IS FOR FOUNDERS WHO…",
      "duration_sec": 4,
      "animation": [
        { "t": "0-1", "actions": ["section_card_scale_in"] },
        { "t": "1-2", "actions": ["headline_drop_bounce"] },
        { "t": "2-3.5", "actions": ["tag_pills_stagger_in"] }
      ]
    },
    {
      "id": "ai_toolbelt",
      "background": "mintGreen_or_skyBlue",
      "layout": "central_card_with_orbiting_icons",
      "message": "AI IS OUR BEST ASSISTANT.",
      "duration_sec": 4,
      "animation": [
        { "t": "0-1", "actions": ["central_card_float_up"] },
        { "t": "1-2.5", "actions": ["icons_fly_in_and_orbit"] },
        { "t": "2.5-4", "actions": ["tool_glow_chain_to_card"] }
      ]
    },
    {
      "id": "work_first_pay_later",
      "background": "creamWhite",
      "layout": "progress_flow_plus_cta",
      "message": "WORK FIRST. PAY LATER.",
      "duration_sec": 4,
      "animation": [
        { "t": "0-1", "actions": ["progress_bar_0_to_100"] },
        { "t": "1-2", "actions": ["steps_pop_in_on_progress"] },
        { "t": "2-3", "actions": ["pay_later_card_slide_in"] },
        { "t": "3-4", "actions": ["cta_slide_up_bounce"] }
      ]
    }
  ]
}
```

---

## 7. Lottie Animation Requirements

If using Lottie, define small reusable JSON animations:

### 7.1 Lottie Asset List

1. **`ai_brain_network.json`**
   - Pulsing network of nodes/lines.
   - Colors: mint, sky blue, dark teal.
   - Loop: slow continuous pulse.
   - Used in: AI toolbelt section, AI superpower overlays.

2. **`floating_blobs_background.json`**
   - Several soft blobs slowly drifting.
   - Loop: 10–20s.
   - Used as subtle background layer for hero and “with DENERF you can” section.

3. **`progress_bar_fill.json`**
   - Horizontal bar filling from 0 to 100 with playful easing.
   - May expose “progress” as a parameter (or export multiple variants).
   - Used in trust section.

4. **`orbiting_icons.json`**
   - Icons orbit around a central circle.
   - Loop: 6–8s, can be triggered/paused via code.
   - Used in blob & AI toolbelt sections.

5. **`emoji_bounce.json`**
   - Simple face/emoticon bouncing on y‑axis with squash and stretch.
   - Loop: 2–3s, used under cards.

### 7.2 Example Prompt for Lottie Designer / AI Tool

> Create a Lottie JSON animation of soft pastel blobs floating in the background, Maggie‑style. The blobs should be rounded, with no outlines, using mint green, sky blue, bubblegum pink, and lemon yellow. Motion should be slow and smooth, with a gentle parallax effect. Duration 10 seconds, loop seamlessly.

> Create a Lottie JSON animation of a cute AI brain network: rounded nodes connected by curved lines, gently pulsing and glowing. Use a sky blue base with mint highlights and a dark teal outline. Duration 4 seconds, loop seamlessly.

---

## 8. React + Tailwind + GSAP Skeleton

Example structure for a single section timeline:

```tsx
// SectionHero.tsx
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SectionHero() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: false,
          pin: true
        }
      });

      tl.to(".hero-blobs", { opacity: 1, duration: 1, ease: "power2.out" })
        .from(".hero-heading", { y: 40, opacity: 0, duration: 0.8 }, "-=0.4")
        .from(".hero-ctas", { y: 30, opacity: 0, duration: 0.8, stagger: 0.1 }, "-=0.5")
        .from(".hero-devices", { y: -80, rotation: -8, opacity: 0, duration: 1.2, ease: "back.out(1.7)" });

    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="min-h-screen snap-start bg-mintGreen flex flex-col items-center justify-center px-4"
    >
      {/* content */}
    </section>
  );
}
```

---

## 9. Acceptance Criteria

- **Visual**
  - [ ] Pastel Maggie‑style blocks for each section.
  - [ ] Chunky rounded display font for headings.
  - [ ] Pill buttons styled consistently, with hover states.

- **Animation**
  - [ ] Each section has a unique 2–4 second entry animation.
  - [ ] Animations are smooth (target 60fps on modern devices).
  - [ ] Lottie animations, if used, load asynchronously and do not block main thread.

- **Interaction**
  - [ ] Scroll snap or ScrollTrigger pinning: one scroll per section.
  - [ ] “Next” button scrolls to the next section smoothly.
  - [ ] Mobile swipe works comfortably and respects section snapping.

- **Performance**
  - [ ] Lighthouse performance score ≥ 85 on desktop.
  - [ ] Bundle size reasonable; images and Lottie compressed.
  - [ ] No blocking scripts on initial load above the fold.

---

## 10. Notes for AI Assistants (Codex / Claude Code)

- Use this PRD + JSON spec as **source of truth**.
- Maintain the **Maggie‑like visual language**:
  - Pastel color blocks
  - Happy blob shapes
  - Chunky heading fonts
  - Pill buttons
- When generating code:
  - Keep layout mobile‑first.
  - Use Tailwind utility classes.
  - Factor animations into reusable hooks or helpers per section.
- When generating assets:
  - Use the Lottie prompts and color tokens defined here.
