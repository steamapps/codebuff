/**
 * Prism Design System — Semantic Themes
 *
 * Maps raw tokens (`./tokens.ts`) onto the `ChatTheme` contract consumed by
 * every component in the CLI. This is the layer that gives the fork its own
 * visual identity: violet brand, cyan accent, cool ink neutrals.
 *
 * The `ChatTheme` shape is intentionally unchanged so no component needs to
 * be touched for the new identity to take effect.
 */

import { palette } from './tokens'

import type { ChatTheme, ThemeName } from '../types/theme-system'

const dark: ChatTheme = {
  name: 'dark',

  // Core semantic colors
  primary: palette.brand[400],
  secondary: palette.neutral[300],
  success: palette.success[400],
  error: palette.danger[400],
  warning: palette.warning[400],
  info: palette.accent[400],
  link: palette.sky[400],
  directory: palette.accent[300],

  // Neutral scale
  foreground: palette.neutral[50],
  background: 'transparent',
  muted: palette.neutral[400],
  border: palette.neutral[700],
  surface: palette.neutral[850],
  surfaceHover: palette.neutral[800],

  // Context-specific
  aiLine: palette.neutral[600],
  userLine: palette.brand[400],

  // Agent surfaces
  agentToggleHeaderBg: palette.brand[700],
  agentToggleExpandedBg: palette.brand[800],
  agentFocusedBg: palette.neutral[800],
  agentContentBg: palette.neutral[950],
  inputFg: palette.neutral[100],
  inputFocusedFg: palette.neutral[0],

  // Mode toggles
  modeFastBg: palette.accent[500],
  modeFastText: palette.accent[400],
  modeMaxBg: palette.danger[500],
  modeMaxText: palette.danger[400],
  modePlanBg: palette.brand[600],
  modePlanText: palette.brand[300],

  // Image card
  imageCardBorder: palette.neutral[600],

  // Markdown
  markdown: {
    codeBackground: palette.neutral[800],
    codeHeaderFg: palette.neutral[500],
    inlineCodeFg: palette.accent[300],
    codeTextFg: palette.neutral[100],
    headingFg: {
      1: palette.brand[300],
      2: palette.brand[400],
      3: palette.accent[300],
      4: palette.accent[400],
      5: palette.neutral[300],
      6: palette.neutral[400],
    },
    listBulletFg: palette.brand[400],
    blockquoteBorderFg: palette.brand[700],
    blockquoteTextFg: palette.neutral[200],
    dividerFg: palette.neutral[700],
    codeMonochrome: false,
    linkFg: palette.sky[400],
  },
}

const light: ChatTheme = {
  name: 'light',

  // Core semantic colors
  primary: palette.brand[600],
  secondary: palette.neutral[500],
  success: palette.success[600],
  error: palette.danger[500],
  warning: palette.warning[600],
  info: palette.accent[600],
  link: palette.sky[600],
  directory: palette.accent[700],

  // Neutral scale
  foreground: palette.neutral[900],
  background: 'transparent',
  muted: palette.neutral[500],
  border: palette.neutral[200],
  surface: palette.neutral[50],
  surfaceHover: palette.neutral[100],

  // Context-specific
  aiLine: palette.neutral[400],
  userLine: palette.brand[600],

  // Agent surfaces
  agentToggleHeaderBg: palette.brand[500],
  agentToggleExpandedBg: palette.brand[600],
  agentFocusedBg: palette.neutral[100],
  agentContentBg: palette.neutral[0],
  inputFg: palette.neutral[900],
  inputFocusedFg: palette.neutral[950],

  // Mode toggles
  modeFastBg: palette.accent[600],
  modeFastText: palette.accent[700],
  modeMaxBg: palette.danger[500],
  modeMaxText: palette.danger[600],
  modePlanBg: palette.brand[500],
  modePlanText: palette.brand[700],

  // Image card
  imageCardBorder: palette.neutral[300],

  // Markdown
  markdown: {
    codeBackground: palette.neutral[100],
    codeHeaderFg: palette.neutral[500],
    inlineCodeFg: palette.accent[700],
    codeTextFg: palette.neutral[900],
    headingFg: {
      1: palette.brand[700],
      2: palette.brand[600],
      3: palette.accent[700],
      4: palette.accent[600],
      5: palette.neutral[600],
      6: palette.neutral[500],
    },
    listBulletFg: palette.brand[600],
    blockquoteBorderFg: palette.brand[200],
    blockquoteTextFg: palette.neutral[700],
    dividerFg: palette.neutral[200],
    codeMonochrome: false,
    linkFg: palette.sky[600],
  },
}

/**
 * The complete set of Prism themes, keyed by mode.
 * Consumed by `utils/theme-system.ts` as the default theme source.
 */
export const prismThemes: Record<ThemeName, ChatTheme> = { dark, light }
