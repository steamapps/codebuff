const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('node:path')
const fs = require('node:fs')
const os = require('node:os')
const pty = require('node-pty')

let mainWindow
let terminal

const repoRoot = path.resolve(__dirname, '..', '..')
const projectDir = process.env.NEXORA_PROJECT_DIR || repoRoot
const bunCommand = process.env.NEXORA_BUN_PATH || (process.platform === 'win32' ? 'bun.exe' : 'bun')

function send(channel, payload) {
  if (mainWindow && !mainWindow.isDestroyed()) mainWindow.webContents.send(channel, payload)
}

function startCli() {
  const args = [path.join(repoRoot, 'cli', 'src', 'index.tsx'), '--cwd', projectDir]
  terminal = pty.spawn(bunCommand, args, {
    name: 'xterm-256color',
    cols: 120,
    rows: 38,
    cwd: projectDir,
    env: { ...process.env, FREEBUFF_MODE: 'true', FORCE_COLOR: '1' },
  })

  terminal.onData((data) => send('cli:output', data))
  terminal.onExit(({ exitCode, signal }) => send('cli:exit', { exitCode, signal }))
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1120,
    height: 760,
    minWidth: 720,
    minHeight: 480,
    backgroundColor: '#0A0C11',
    title: 'Nexora',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  })

  mainWindow.loadFile(path.join(__dirname, 'renderer.html'))
  mainWindow.on('closed', () => {
    if (terminal) terminal.kill()
    mainWindow = null
  })
  startCli()
}

app.whenReady().then(() => {
  ipcMain.on('cli:input', (_event, value) => {
    if (terminal && typeof value === 'string') terminal.write(value)
  })

  ipcMain.on('cli:resize', (_event, { cols, rows }) => {
    if (!terminal) return
    const nextCols = Math.max(40, Math.min(240, Number(cols) || 120))
    const nextRows = Math.max(12, Math.min(100, Number(rows) || 38))
    terminal.resize(nextCols, nextRows)
  })

  ipcMain.handle('project:choose', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
      title: 'Choisir le dossier du projet',
      properties: ['openDirectory'],
      defaultPath: projectDir,
    })
    return result.canceled ? null : result.filePaths[0]
  })

  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
