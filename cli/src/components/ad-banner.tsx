import React from 'react'

import type { AdResponse } from '../hooks/use-gravity-ad'

/** Advertising is intentionally disabled in Nexora. Kept as a compatibility
 * surface so existing render paths remain stable while no banner is mounted. */
export const AD_CARD_HEIGHT = 0
export const INLINE_AD_CARD_HEIGHT = 0

export const extractDomain = (url: string): string => {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

export function getAdDisplayLabel(ad: Pick<AdResponse, 'title' | 'url'>) {
  const url = ad.url.trim()
  return url
    ? { text: extractDomain(url), variant: 'domain' as const }
    : { text: ad.title.trim(), variant: 'title' as const }
}

export function getInlineAdLayout(ad: Pick<AdResponse, 'adText' | 'title' | 'url'>) {
  return { title: ad.title.trim(), description: ad.adText.trim(), label: '' }
}

export const AdCard: React.FC = () => null
export const SingleAdBanner: React.FC = () => null
export const ChoiceAdBanner: React.FC = () => null
