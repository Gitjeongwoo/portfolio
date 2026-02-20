# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static portfolio site for web publisher Park Jeong Woo. No build tools, no package manager — pure HTML/CSS/JS.

## Running Locally

Open `index.html` directly in a browser, or use any static file server:

```bash
# Python
python -m http.server 8080

# Node (if available)
npx serve .
```

There are no build, lint, or test commands.

## Architecture

### Entry Point
`index.html` — single-page portfolio with five sections: `#main_sec`, `#about_sec`, `#project_sec`, `#list_sec`, `#contact_sec`.

### CSS Structure
`assets/css/style.css` is the sole stylesheet linked in HTML; it imports the others in order:
- `reset.css` — baseline reset
- `font.css` — all font declarations (Google Fonts CDN, local `woff2/PretendardVariable.woff2`, KakaoBigSans via CDN)
- `scroll.css` — scroll animation utility classes (`.ani.x_Left`, `.ani.y_Bottom`, `.ani.cover`, etc.) that transition when `.moving` is added
- `index.css` — all section-specific styles with responsive breakpoints at 1024px, 768px, 540px

### JavaScript
Scripts load at the bottom of `index.html` in this order:
1. `assets/js/jquery-3.7.1.min.js` (local)
2. GSAP + ScrollTrigger (CDN)
3. `assets/js/scroll.js` — jQuery scroll listener that adds `.moving` to `.ani` elements when they enter the viewport
4. `assets/js/index.js` — custom cursor tracking, GSAP-pinned project sections with video entrance animations, and mouse-follow image effect on `.list` items

### Animation System
Two separate systems work in parallel:
- **CSS scroll animations** (`scroll.css` + `scroll.js`): elements with `.ani` class get `.moving` added on scroll, triggering CSS transitions with optional delay classes (`.delay02`–`.delay10`)
- **GSAP ScrollTrigger** (`index.js`): `.sec` elements in `#project_sec` are pinned (`pinSpacing: false`) and each project video animates in using scrub. `markers: true` is active — remove this before production.

### Notable Details
- Custom cursor: `.cursor` div uses `mix-blend-mode: difference`; shrinks on hover over `a, button, .list, [href]`
- `Splitting()` is called in `index.js` but Splitting.js is not included in `index.html` — this will silently fail unless added
- `#ui_sec` (UIUX Design) and the lense/clock blocks are commented out in `index.html`
- `#list_sec` project entries currently use placeholder content and links
