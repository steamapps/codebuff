import type { ChatMessage } from '../types/chat'

export type AdProvider = 'gravity' | 'carbon' | 'zeroclick'
export type AdSurface = 'waiting_room' | 'cli_chat'

export type AdResponse = {
  adText: string
  title: string
  cta: string
  url: string
  favicon: string
  clickUrl: string
  impUrl: string
  provider?: AdProvider
  impressionIds?: string[]
  credits?: number
}

export type GravityAdState = {
  ads: AdResponse[] | null
  responseAds: Record<string, AdResponse[]>
  requestResponseAds: (messageId: string, count: number) => void
  isLoading: boolean
  recordClick: (ad: AdResponse) => void
  recordImpression: (ad: AdResponse) => void
}

/** Compatibility no-op. Nexora never requests, rotates, renders, or records
 * advertising, but the public hook shape remains so the chat renderer and
 * existing session flows do not change. */
export const useGravityAd = (): GravityAdState => ({
  ads: null,
  responseAds: {},
  requestResponseAds: () => {},
  isLoading: false,
  recordClick: () => {},
  recordImpression: () => {},
})

export function isAnswerMessage(m: ChatMessage): boolean {
  return !m.parentId && m.variant === 'ai' && m.id.startsWith('ai-')
}

export function isInlineAdEligibleAnswer(m: ChatMessage): boolean {
  return isAnswerMessage(m) && m.metadata?.allowInlineAds === true
}

export function claimAdImpression(impressionsFired: Set<string>, impUrl: string): boolean {
  if (impressionsFired.has(impUrl)) return false
  impressionsFired.add(impUrl)
  return true
}
