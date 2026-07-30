/**
 * Utility functions for the login screen component
 */

import { palette, rhythm, spacing } from '../design-system'

/**
 * Calculates the relative luminance of a hex color to determine if it's light or dark mode
 */
export function isLightModeColor(hexColor: string): boolean {
  if (!hexColor) return false

  const hex = hexColor.replace('#', '')
  if (hex.length < 6) {
    return false
  }

  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5
}

/**
 * Formats a URL for display by wrapping it at logical breakpoints
 */
export function formatUrl(url: string, maxWidth?: number): string[] {
  if (!maxWidth || maxWidth <= 0 || url.length <= maxWidth) {
    return [url]
  }

  const lines: string[] = []
  let remaining = url

  while (remaining.length > 0) {
    if (remaining.length <= maxWidth) {
      lines.push(remaining)
      break
    }

    // Try to break at a logical point (after /, ?, &, =)
    let breakPoint = maxWidth
    for (let i = maxWidth - 1; i > maxWidth - 20 && i > 0; i--) {
      if (['/', '?', '&', '='].includes(remaining[i])) {
        breakPoint = i + 1
        break
      }
    }

    lines.push(remaining.substring(0, breakPoint))
    remaining = remaining.substring(breakPoint)
  }

  return lines
}

/**
 * Determines the color for a character based on its position relative to the sheen
 * Block characters use blockColor, shadow/border characters animate to the brand accent
 * @param accentColor - The accent color to use for the sheen effect (typically theme.primary)
 * @param blockColor - The color for solid block characters (light ink for dark mode, dark ink for light mode)
 * @param isReversing - Whether the sheen is in the reverse (unfill) phase
 */
export function getSheenColor(
  char: string,
  charIndex: number,
  sheenPosition: number,
  logoColor: string,
  shadowChars: Set<string>,
  accentColor: string = palette.brand[400],
  blockColor: string = palette.neutral[0],
  isReversing: boolean = false,
): string {
  // Block characters use the specified block color
  if (char === '█') {
    return blockColor
  }

  // Only apply sheen to shadow/border characters
  if (!shadowChars.has(char)) {
    return logoColor
  }

  if (isReversing) {
    // Reverse phase: characters behind the sheen return to logoColor
    if (charIndex <= sheenPosition) {
      return logoColor
    }
    // Characters ahead of the sheen stay accent color
    return accentColor
  } else {
    // Forward phase: characters at or behind the sheen get the accent color
    if (charIndex <= sheenPosition) {
      return accentColor
    }
    // Characters ahead of the sheen remain original color
    return logoColor
  }
}

/**
 * Parses the logo string into individual lines
 */
export function parseLogoLines(logo: string): string[] {
  return logo.split('\n').filter((line) => line.length > 0)
}

/**
 * Calculates responsive layout dimensions based on terminal size
 */
export function calculateResponsiveLayout(
  terminalWidth: number,
  terminalHeight: number,
) {
  // Responsive breakpoints based on terminal height
  const isVerySmall = terminalHeight < 15 // Minimal UI
  const isSmall = terminalHeight >= 15 && terminalHeight < 20 // Compact UI
  const isMedium = terminalHeight >= 20 && terminalHeight < 30 // Standard UI
  const isLarge = terminalHeight >= 30 // Spacious UI

  // Responsive breakpoints based on terminal width
  const isNarrow = terminalWidth < 60

  // Spacing comes from the Prism scale rather than inline magic numbers.
  const containerPadding = isVerySmall ? spacing.none : spacing.xs
  const headerMarginTop = rhythm.tight
  const headerMarginBottom = isVerySmall ? rhythm.tight : rhythm.block
  const sectionMarginBottom = isVerySmall ? rhythm.tight : rhythm.block
  const contentMaxWidth = Math.max(
    10,
    Math.min(terminalWidth - (containerPadding * 2 + 4), 80),
  )

  const maxUrlWidth = Math.min(terminalWidth - 10, 100)

  return {
    isVerySmall,
    isSmall,
    isMedium,
    isLarge,
    isNarrow,
    containerPadding,
    headerMarginTop,
    headerMarginBottom,
    sectionMarginBottom,
    contentMaxWidth,
    maxUrlWidth,
  }
}
