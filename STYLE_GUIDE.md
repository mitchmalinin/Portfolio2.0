# Portfolio Style Guide

## Design Philosophy
Terminal/retro aesthetic with monospace typography, dashed borders, and minimal color palette. Clean, utilitarian design inspired by command-line interfaces and early computing.

---

## Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Background | `#000000` | Page background, card backgrounds |
| Text Primary | `#FFFFFF` | Headlines, primary text |
| Text Secondary | `#666666` | Subtitles, descriptions |
| Text Muted | `#444444` | Labels, prefixes, metadata |
| Text Dim | `#333333` | Borders, dividers, inactive states |
| Accent | `#BEFE00` | Hover states, highlights, active elements |
| Accent Dim | `rgba(190, 254, 0, 0.3)` | Subtle accent backgrounds |

---

## Typography

### Font Family
- **Primary**: `Departure Mono` (monospace)
- **Fallback**: `monospace`

### Text Styles
```
Headlines:     uppercase, tracking-wide, text-white
Subtitles:     uppercase, text-[#666666]
Body:          uppercase, text-[#888888]
Labels:        uppercase, text-[#444444], text-xs/sm
Prefixes:      underscore prefix (_01, _02)
```

### Size Scale
- Hero name: `text-5xl md:text-7xl lg:text-8xl`
- Section titles: `text-4xl md:text-5xl lg:text-6xl`
- Card titles: `text-xl md:text-2xl`
- Body text: `text-base`
- Labels/meta: `text-xs` or `text-sm`

---

## Border System

### Border Style
- **Type**: Dashed (`border-dashed`)
- **Color**: `border-[#333333]`
- **Width**: `border` (1px)

### Hover State
- Border color changes to accent: `hover:border-[#BEFE00]`
- No glow effects on borders

---

## Cross Markers (+)

Used at section intersections to create a grid/blueprint aesthetic.

```css
.cross {
  position: absolute;
  color: #ffffff;
  font-size: 32px;
  font-family: 'Departure Mono', monospace;
  font-weight: bold;
  background: #000000;
  padding: 0 10px;
  z-index: 10;
}
```

### Placement
- Center of horizontal dividers between sections
- Use `.cross-center` for horizontal centering
- Use `.cross-top` or `.cross-bottom` for vertical positioning

---

## Component Patterns

### Section Structure
```jsx
<section id="section-name" className="relative">
  {/* Top border with cross */}
  <div className="relative">
    <span className="cross cross-center cross-top">+</span>
    <div className="h-line" />
  </div>

  <div className="section-padding">
    {/* Section label */}
    <p className="text-[#444444] text-sm uppercase tracking-widest mb-4">
      [SECTION_NAME]
    </p>

    {/* Section title */}
    <h2 className="text-4xl md:text-5xl lg:text-6xl uppercase tracking-wide mb-4">
      TITLE
    </h2>

    {/* Section description */}
    <p className="text-[#666666] text-base uppercase mb-16 max-w-xl">
      _DESCRIPTION TEXT HERE
    </p>

    {/* Content */}
  </div>
</section>
```

### Card Pattern
```jsx
<div className="border border-dashed border-[#333333] p-6 hover:border-[#555555] transition-colors">
  <p className="text-[#444444] text-xs mb-2">_01</p>
  <h4 className="text-lg uppercase mb-2">TITLE</h4>
  <p className="text-[#555555] text-sm uppercase">Description</p>
</div>
```

### Link Pattern (Bracketed)
```jsx
<a className="bracket-link uppercase text-base">
  [LINK_TEXT]
</a>
```

### Status Indicator
```jsx
<div className="inline-flex items-center gap-2">
  <span className="w-2 h-2 bg-[#BEFE00] rounded-full animate-pulse" />
  <span className="text-[#BEFE00] text-xs uppercase tracking-wider">
    STATUS_TEXT
  </span>
</div>
```

---

## Spacing

### Section Padding
```css
.section-padding {
  padding: 80px 24px;      /* mobile */
  padding: 120px 48px;     /* md */
  padding: 160px 96px;     /* lg */
}
```

### Common Gaps
- Between cards: `gap-px` with bg divider or `gap-4`
- Between text elements: `mb-2` to `mb-4`
- Between sections: `mb-10` to `mb-16`

---

## Interactive States

### Hover Effects (Allowed)
- Border color change: `border-[#333333]` → `border-[#555555]` or `border-[#BEFE00]`
- Text color change to accent (sparingly)
- Opacity changes

### Hover Effects (NOT Allowed)
- Box shadows / glow effects
- Text shadows / text glow
- Scale transforms on text
- Color transitions on large elements

---

## Animation Guidelines

### Allowed
- `transition-colors` for border/text color changes
- `animate-pulse` for status indicators only
- DecryptedText for hero text reveal
- Dock magnification animation

### Timing
- Standard transitions: `duration-200` or `duration-300`
- Use `ease` or `ease-out`

---

## Index Prefixes

Use underscore + zero-padded numbers for list items:
```
_01, _02, _03...
```

Implementation:
```jsx
<p className="text-[#444444] text-xs mb-2">
  _{String(index + 1).padStart(2, '0')}
</p>
```

---

## ASCII Art Style

For logos and decorative elements, use Unicode block characters:
```
███╗   ███╗
████╗ ████║
██╔████╔██║
██║╚██╔╝██║
██║ ╚═╝ ██║
╚═╝     ╚═╝
```

---

## Responsive Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| Default | < 768px | Mobile, single column |
| md | ≥ 768px | Tablet, 2 columns |
| lg | ≥ 1024px | Desktop, full layout |

---

## File Naming Conventions

- Components: `PascalCase.tsx`
- Sections: `components/sections/SectionName.tsx`
- UI elements: `components/ui/ComponentName.tsx`
- Utilities: `lib/utilityName.ts`
