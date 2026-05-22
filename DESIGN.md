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
  primary: '#0f172a'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#515f74'
  on-secondary: '#ffffff'
  secondary-container: '#d5e3fd'
  on-secondary-container: '#57657b'
  tertiary: '#0369a1'
  on-tertiary: '#ffffff'
  tertiary-container: '#001d32'
  on-tertiary-container: '#3d89c3'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  background: '#f8fafc'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display: "Inter, sans-serif"
  body: "Inter, sans-serif"
  mono: "ui-monospace, Cascadia Code, Source Code Pro, Menlo, Monaco, Consolas, monospace"
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
spacing:
  unit: 4px
  gutter: 24px
  margin: 32px
  container-max-width: 1280px
---

# Design System

## Overview
The AMP Prediction Portal uses an academic, high-reliability design system engineered for antimicrobial peptide (AMP) analysis. It prioritize information density and legibility over decorative elements, receding to let data and research findings take center stage.

**Creative North Star: "The Digital Laboratory"**

**Key Characteristics:**
- **Academic Minimalism**: Restrained palette and structured layouts.
- **Scientific Authority**: Clear typography and data-heavy interfaces.
- **Institutional Trust**: Foundation of deep navy and charcoal slate.

## Colors
The palette is built on institutional stability and functional transparency.

### Primary & Action
- **Primary (#0F172A):** Global navigation, primary headings, and high-emphasis components.
- **Secondary (#515F74):** Supporting UI elements, icons, and sub-headers.
- **Tertiary/Action (#0369A1):** Specialized "Science Blue" for interactive elements and success states.

### Surface & Semantic
- **Surface (#F7F9FB):** Container and card backgrounds.
- **Background (#F8FAFC):** Main application backdrop.
- **Error (#BA1A1A):** Validation failures and semantic error states.

## Typography
Inter is used across all levels for its systematic tone and exceptional legibility.

### Hierarchy
- **Display & Headline (Inter, 600-700):** Used sparingly for headings to maintain a clean architecture.
- **Body (Inter, 400-500):** Used for UI text and data interpretation.
- **Mono (System Mono):** Reserved for peptide sequences or amino acid strings to ensure character alignment.

### Rules
**The Alignment Rule.** For protein sequences or raw data values, always use monospaced fonts (`mono`) and ensure character-perfect alignment to prevent misinterpretation of scientific data.

## Elevation
Elevation is conveyed through tonal layering and borders rather than decorative shadows.

- **Planes:** Surfaces are distinguished by subtle background color shifts (e.g., sidebar vs. main content).
- **Borders:** Use 1px solid borders in a light slate color (#C6C6CD) to define sections.
- **Focus:** Shadows are only permitted on active "Modal" states, using a soft, diffused ambient shadow.

## Components

### Data Tables
- **High Density**: Tight vertical spacing (8px to 12px) to allow viewing more data.
- **Striped Rows**: Subtle alternating backgrounds for row tracking.
- **Sticky Headers**: Essential for large datasets.

### Input Forms
- **Top-aligned Labels**: Facilitates rapid scanning for expert users.
- **Focus State**: 2px solid tertiary blue border.

### Cards
- **Outlined**: Use 1px slate borders instead of shadows.
- **Dividers**: Separate card titles from content with a subtle hairline divider.

## Do's and Don'ts

### Do
- Use monospace for peptide sequences.
- Show confidence scores clearly.
- Maintain high information density for efficient workflows.
- Use right-aligned figures for numerical comparison.

### Don't
- Use generic AI "sparkle" icons or casual chatbots.
- Hide data behind unnecessary modals.
- Use low-contrast text on critical data points.
- Use "Notion-style" soft minimalism; maintain rigid, professional precision.
