/**
 * Prism Design System — Design Tokens
 *
 * This module is the ONLY place where raw visual values (hex colors, cell
 * spacing, timings) are allowed to live. Everything else in the CLI must
 * consume semantic values built on top of these tokens (see `./themes.ts`).
 *
 * Layering:
 *   tokens.ts  -> raw, brand-agnostic scales (this file)
 *   themes.ts  -> semantic mapping to the `ChatTheme` contract
 *   index.ts   -> public entrypoint for the design system
 *
 * Rules of thumb:
 *   - Never import a hex string from anywhere but this file.
 *   - Never add a one-off color to a component; add a semantic role instead.
 */

/**
 * Raw color scales.
 *
 * Scales run from lightest (low numbers) to darkest (high numbers), matching
 * the convention used by most modern design systems so the mapping stays
 * predictable when switching between light and dark modes.
 */
export const palette = {
  /** Brand violet — identity color, primary actions, user attribution. */
  brand: {
    50: '#F1EFFF',
    100: '#E2DEFF',
    200: '#C7BFFF',
    300: '#AAA0FF',
    400: '#8F82FF',
    500: '#7C6CFF',
    600: '#6350E6',
    700: '#4E3DBF',
    800: '#3A2C94',
    900: '#251C63',
  },

  /** Accent cyan — secondary emphasis, informational states, code accents. */
  accent: {
    50: '#E7FBFD',
    100: '#C6F5FA',
    200: '#93EBF3',
    300: '#63DFEB',
    400: '#4CD9E8',
    500: '#22C0D1',
    600: '#159AA9',
    700: '#107786',
    800: '#0C5762',
    900: '#083A42',
  },

  /** Neutral ink scale — text, surfaces, borders, chrome. */
  neutral: {
    0: '#FFFFFF',
    25: '#FAFBFD',
    50: '#F4F6FA',
    100: '#E7EAF1',
    200: '#CFD5E1',
    300: '#AEB6C7',
    400: '#8A93A8',
    500: '#666F85',
    600: '#4B5468',
    700: '#343B4B',
    800: '#232936',
    850: '#1A1F29',
    900: '#12151C',
    950: '#0A0C11',
  },

  /** Emerald — success, completed states, positive diffs. */
  success: {
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#3DDC97',
    500: '#16B57A',
    600: '#0E8F60',
    700: '#0A6B48',
  },

  /** Rose — errors, destructive actions, removed diffs. */
  danger: {
    200: '#FFC7CF',
    300: '#FF8FA0',
    400: '#FF5D73',
    500: '#E63E56',
    600: '#C22943',
    700: '#921E33',
  },

  /** Amber — warnings, validation issues, throttled states. */
  warning: {
    200: '#FFE3B8',
    300: '#FFCB7D',
    400: '#FFB454',
    500: '#F59524',
    600: '#CE7712',
    700: '#9A570B',
  },

  /** Sky — hyperlinks and external references. */
  sky: {
    200: '#C4E3FF',
    300: '#8FCBFF',
    400: '#63B3FF',
    500: '#3B95F5',
    600: '#2176D6',
    700: '#1859A3',
  },
} as const

/**
 * ANSI fallbacks for terminals without truecolor support (e.g. Terminal.app).
 * Keyed by the semantic role they stand in for.
 */
export const ansiFallback = {
  brandDark: 'magenta',
  brandLight: 'magenta',
  inkDark: 'white',
  inkLight: 'black',
} as const

/**
 * Spacing scale, expressed in terminal cells (not pixels).
 * Use these for padding/margin/gap instead of magic numbers.
 */
export const spacing = {
  none: 0,
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
  xl: 6,
  xxl: 8,
} as const

/**
 * Vertical rhythm for stacked blocks (messages, cards, banners).
 */
export const rhythm = {
  tight: 0,
  block: 1,
  section: 2,
} as const

/**
 * Motion durations in milliseconds for spinners, shimmers and transitions.
 */
export const motion = {
  instant: 0,
  fast: 90,
  base: 160,
  slow: 260,
  shimmer: 1200,
} as const

/**
 * Border weights available in a terminal. `radius` is emulated with rounded
 * box-drawing corners rather than real curvature.
 */
export const border = {
  weight: {
    none: 'none',
    hairline: 'single',
    strong: 'double',
  },
  radius: {
    sharp: 'square',
    rounded: 'rounded',
  },
} as const

export type Palette = typeof palette
export type Spacing = typeof spacing
