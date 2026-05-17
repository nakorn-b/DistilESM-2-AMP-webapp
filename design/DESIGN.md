---
name: Scientific Precision System
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45464d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#515f74'
  on-secondary: '#ffffff'
  secondary-container: '#d5e3fd'
  on-secondary-container: '#57657b'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#001d32'
  on-tertiary-container: '#3d89c3'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#d5e3fd'
  secondary-fixed-dim: '#b9c7e0'
  on-secondary-fixed: '#0d1c2f'
  on-secondary-fixed-variant: '#3a485c'
  tertiary-fixed: '#cde5ff'
  tertiary-fixed-dim: '#94ccff'
  on-tertiary-fixed: '#001d32'
  on-tertiary-fixed-variant: '#004b74'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
  code-sm:
    fontFamily: monospace
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin: 32px
  container-max-width: 1280px
---

## Brand & Style
The design system is engineered for high-stakes scientific environments, specifically antimicrobial peptide (AMP) prediction and analysis. The brand personality is authoritative, clinical, and precise, mirroring the rigor of a peer-reviewed publication. 

The visual style follows a **Modern Corporate** aesthetic with a lean toward **Academic Minimalism**. It prioritizes information density and legibility over decorative elements. By utilizing a restrained palette and structured layouts, the UI recedes to let the data and research findings take center stage, evoking the feeling of a high-end institutional portal.

## Colors
The palette is built on a foundation of "Deep Navy" and "Charcoal Slate" to communicate stability and institutional trust. 

- **Primary (#0F172A):** Used for global navigation, primary headings, and high-emphasis components.
- **Secondary (#334155):** Reserved for supporting UI elements, icons, and sub-headers.
- **Tertiary/Action (#0369A1):** A specialized "Science Blue" used exclusively for interactive elements, links, and success states to guide the researcher’s eye.
- **Neutral/Background (#F8FAFC):** A clean, cool-toned white that reduces eye strain during long periods of data analysis.

The color mode is strictly `light` to maintain the "ink-on-paper" readability associated with scientific journals.

## Typography
The design system utilizes **Inter** across all levels for its exceptional legibility and neutral, systematic tone. 

- **Hierarchy:** Use bold weights (600-700) sparingly for headings to create a clear information architecture.
- **Data Display:** For protein sequences or amino acid strings, use a monospaced font fallback (`code-sm`) to ensure character alignment and prevent misinterpretation of scientific data.
- **Labels:** Use the `label-md` style for table headers and form labels, utilizing uppercase and slight letter-spacing to distinguish them from content.

## Layout & Spacing
This design system employs a **Fixed Grid** model for desktop to ensure data visualizations and tables remain predictable and readable. 

- **Grid:** A 12-column system with a 24px gutter. 
- **Density:** The layout favors a higher information density than consumer apps. Vertical spacing between table rows and form fields should be tight (8px to 12px) to allow researchers to view more data without scrolling.
- **Breakpoints:** 
    - Desktop: 1280px container.
    - Tablet: Fluid width with 24px margins.
    - Mobile: Fluid width with 16px margins; complex tables should transition to horizontal scroll or card-based views.

## Elevation & Depth
Depth is conveyed through **Low-Contrast Outlines** and **Tonal Layers** rather than shadows. This minimizes visual noise and maintains the "flat" professional feel of a research document.

- **Planes:** Surfaces are distinguished by subtle background color shifts (e.g., a slightly darker gray for the sidebar vs. the main content area).
- **Borders:** Use 1px solid borders in a light slate color (#E2E8F0) to define sections and cards.
- **Focus:** Shadows are only permitted on active "Modal" states, using a very soft, diffused ambient shadow (0px 4px 20px rgba(15, 23, 42, 0.08)).

## Shapes
The design system utilizes **Soft (0.25rem)** roundedness. This provides a modern touch while maintaining the structural integrity and professional discipline of a scientific tool. Sharp corners (0px) are used for internal elements within data tables to maintain a grid-like precision.

## Components

### Data Tables
Tables are the core of the experience. They must feature:
- **Striped Rows:** Subtle alternating backgrounds for row tracking.
- **Sticky Headers:** Essential for large datasets.
- **Numerical Alignment:** Monospaced, right-aligned figures for direct comparison.

### Input Forms
- **Top-aligned Labels:** Facilitates rapid scanning.
- **Validation:** Clear, inline error messages in a semantic "Danger" red, accompanied by an icon.
- **Focus State:** 2px solid tertiary blue border.

### Cards
- **Outlined:** No shadows; use 1px slate borders.
- **Headered:** Separate the card title from the content with a subtle hairline divider.

### Informational Sections
- **Callouts:** Use tinted backgrounds (e.g., light blue tint for "Information", light amber for "Caution") to highlight critical research notes or system status updates.