import React, { useMemo } from 'react'

import { palette } from '../design-system'
import { LOGO, LOGO_SMALL, SHADOW_CHARS } from '../login/constants'
import { parseLogoLines } from '../login/utils'
import { IS_FREEBUFF } from '../utils/constants'
import { NEXORA_NAME, NEXORA_SHORT_NAME } from '../utils/brand'

interface UseLogoOptions {
  availableWidth: number
  applySheenToChar?: (char: string, charIndex: number, lineIndex: number) => React.ReactNode
  textColor?: string
  accentColor?: string
  blockColor?: string
  maxHeight?: number
}

interface LogoResult {
  component: React.ReactNode
  textBlock: string
}

export const useLogo = ({
  availableWidth,
  applySheenToChar,
  textColor,
  accentColor = palette.brand[400],
  blockColor = palette.neutral[0],
  maxHeight,
}: UseLogoOptions): LogoResult => {
  const ASCII_LOGO_LINES = 6
  const rawLogoString = useMemo(() => {
    if (maxHeight != null && maxHeight < ASCII_LOGO_LINES) {
      return IS_FREEBUFF ? NEXORA_SHORT_NAME : 'CODEBUFF'
    }
    if (availableWidth >= 70) return LOGO
    if (availableWidth >= 20) return LOGO_SMALL
    return IS_FREEBUFF ? NEXORA_SHORT_NAME : 'CODEBUFF'
  }, [availableWidth, maxHeight])

  const textBlock = useMemo(() => {
    if (rawLogoString === 'CODEBUFF' || rawLogoString === NEXORA_SHORT_NAME) return ''
    return parseLogoLines(rawLogoString)
      .map((line) => line.slice(0, availableWidth))
      .join('\n')
  }, [rawLogoString, availableWidth])

  const component = useMemo(() => {
    if (rawLogoString === 'CODEBUFF' || rawLogoString === NEXORA_SHORT_NAME) {
      const brandName = IS_FREEBUFF ? NEXORA_NAME : 'Codebuff'
      const forcedByHeight = maxHeight != null && maxHeight < ASCII_LOGO_LINES
      const displayText = availableWidth < 30 || forcedByHeight ? brandName : `${brandName} CLI`
      return (
        <text style={{ wrapMode: 'none' }}>
          <b>{textColor ? <span fg={textColor}>{displayText}</span> : <>{displayText}</>}</b>
        </text>
      )
    }

    const displayLines = parseLogoLines(rawLogoString).map((line) => line.slice(0, availableWidth))
    const defaultColorChar = (char: string, charIndex: number) => {
      if (char === ' ' || char === '\n') return <span key={charIndex}>{char}</span>
      if (char === '█') return <span key={charIndex} fg={blockColor}>{char}</span>
      return <span key={charIndex} fg={accentColor}>{char}</span>
    }

    return <>{displayLines.map((line, lineIndex) => (
      <text key={`logo-line-${lineIndex}`} style={{ wrapMode: 'none' }}>
        {line.split('').map((char, charIndex) => applySheenToChar
          ? applySheenToChar(char, charIndex, lineIndex)
          : defaultColorChar(char, charIndex))}
      </text>
    ))}</>
  }, [rawLogoString, availableWidth, applySheenToChar, textColor, accentColor, blockColor, maxHeight])

  return { component, textBlock }
}
