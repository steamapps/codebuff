import { palette } from '../design-system'

import type { BorderCharacters } from '@opentui/core'

/**
 * Dark text color for focused/inverted controls (dark label on the violet
 * `theme.primary` fill). The themes set `background: 'transparent'`, so it
 * can't be used as an inverted-text color — a transparent foreground on the
 * brand fill renders the label invisible. This near-black ink reads cleanly
 * on the brand fill in both the dark and light themes.
 */
export const INVERTED_CTA_FG = palette.neutral[950]

export const BORDER_CHARS: BorderCharacters = {
  topLeft: '╭',
  topRight: '╮',
  bottomLeft: '╰',
  bottomRight: '╯',
  horizontal: '─',
  vertical: '│',
  topT: '┬',
  bottomT: '┴',
  leftT: '├',
  rightT: '┤',
  cross: '┼',
}

/** Dashed border characters with rounded corners for ghost/ephemeral UI */
export const DASHED_BORDER_CHARS: BorderCharacters = {
  topLeft: '╭',
  topRight: '╮',
  bottomLeft: '╰',
  bottomRight: '╯',
  horizontal: '┄',
  vertical: '┆',
  topT: '┬',
  bottomT: '┴',
  leftT: '├',
  rightT: '┤',
  cross: '┼',
}

/** Square corner border for image cards (separate from the rounded default) */
export const IMAGE_CARD_BORDER_CHARS: BorderCharacters = {
  horizontal: '─',
  vertical: '│',
  topLeft: '┌',
  topRight: '┐',
  bottomLeft: '└',
  bottomRight: '┘',
  topT: '┬',
  bottomT: '┴',
  leftT: '├',
  rightT: '┤',
  cross: '┼',
}

/** Dashed border with rounded corners for proposal cards */
export const PROPOSAL_BORDER_CHARS: BorderCharacters = {
  topLeft: '╭',
  topRight: '╮',
  bottomLeft: '╰',
  bottomRight: '╯',
  horizontal: '┈',
  vertical: '┊',
  topT: '┬',
  bottomT: '┴',
  leftT: '├',
  rightT: '┤',
  cross: '┼',
}
