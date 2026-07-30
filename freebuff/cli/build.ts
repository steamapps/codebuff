#!/usr/bin/env bun

/** Nexora build wrapper for the existing free-only CLI variant. */
import { spawnSync } from 'child_process'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..', '..')
const version = process.argv[2]

if (!version) {
  console.error('Usage: bun freebuff/cli/build.ts <version>')
  process.exit(1)
}

console.log(`Building Nexora v${version}...`)

const result = spawnSync('bun', ['cli/scripts/build-binary.ts', 'nexora', version], {
  cwd: repoRoot,
  stdio: 'inherit',
  env: { ...process.env, FREEBUFF_MODE: 'true' },
})

if (result.status !== 0) {
  console.error('Nexora build failed')
  process.exit(result.status ?? 1)
}

console.log(`Nexora v${version} built successfully`)
