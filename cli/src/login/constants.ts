import { env } from '@codebuff/common/env'
import { IS_FREEBUFF } from '../utils/constants'

export const WEBSITE_URL = env.NEXT_PUBLIC_CODEBUFF_APP_URL

// Local auth is opt-in only. A generic dev environment must not silently point
// the free variant at localhost, because the public CLI is expected to connect
// to Freebuff's hosted auth service.
const USE_LOCAL_FREEBUFF_AUTH = process.env.FREEBUFF_LOCAL_DEV === 'true'
const NEXORA_WEB_URL = USE_LOCAL_FREEBUFF_AUTH
  ? 'http://localhost:3002'
  : (env.NEXT_PUBLIC_FREEBUFF_APP_URL ?? 'https://freebuff.com')

export const LOGIN_WEBSITE_URL = IS_FREEBUFF ? NEXORA_WEB_URL : WEBSITE_URL

const LOGO_CODEBUFF = `
  ██████╗ ██████╗ ██████╗ ███████╗██████╗ ██╗   ██╗███████╗███████╗
 ██╔════╝██╔═══██╗██╔══██╗██╔════╝██╔══██╗██║   ██║██╔════╝██╔════╝
 ██║     ██║   ██║██║  ██║█████╗  ██████╔╝██║   ██║█████╗  █████╗
 ██║     ██║   ██║██║  ██║██╔══╝  ██╔══██╗██║   ██║██╔══╝  ██╔══╝
 ╚██████╗╚██████╔╝██████╔╝███████╗██████╔╝╚██████╔╝██║     ██║
  ╚═════╝ ╚═════╝ ╚══════╝╚═════╝ ╚═════╝ ╚═════╝ ╚═╝     ╚═╝
`

const LOGO_SMALL_CODEBUFF = `
  ██████╗ ██████╗
 ██╔════╝ ██╔══██╗
 ██║      ██████╔╝
 ██║      ██╔══██╗
 ╚██████╗ ██████╔╝
  ╚═════╝ ╚═════╝
`

const LOGO_NEXORA = `
 ███╗   ██╗███████╗██╗  ██╗ ██████╗ ██████╗  █████╗
 ████╗  ██║██╔════╝╚██╗██╔╝██╔═══██╗██╔══██╗██╔══██╗
 ██╔██╗ ██║█████╗   ╚███╔╝ ██║   ██║██████╔╝███████║
 ██║╚██╗██║██╔══╝   ██╔██╗ ██║   ██║██╔══██╗██╔══██║
 ██║ ╚████║███████╗██╔╝ ██╗╚██████╔╝██║  ██║██║  ██║
 ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝
`

const LOGO_SMALL_NEXORA = `
 ███╗   ██╗
 ████╗  ██║
 ██╔██╗ ██║
 ██║╚██╗██║
 ██║ ╚████║
 ╚═╝  ╚═══╝
`

export const LOGO = IS_FREEBUFF ? LOGO_NEXORA : LOGO_CODEBUFF
export const LOGO_SMALL = IS_FREEBUFF ? LOGO_SMALL_NEXORA : LOGO_SMALL_CODEBUFF

export const SHADOW_CHARS = new Set(['╚', '═', '╝', '║', '╔', '╗', '╠', '╣', '╦', '╩', '╬'])

export const DEFAULT_TERMINAL_HEIGHT = 24
export const MODAL_VERTICAL_MARGIN = 2
export const MAX_MODAL_BASE_HEIGHT = 22
export const WARNING_BANNER_HEIGHT = 3
export const SHEEN_WIDTH = 5
export const SHEEN_STEP = 2
export const SHEEN_INTERVAL_MS = 150
