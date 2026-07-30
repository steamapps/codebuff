const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('nexoraDesktop', {
  onOutput: (callback) => ipcRenderer.on('cli:output', (_event, data) => callback(data)),
  onExit: (callback) => ipcRenderer.on('cli:exit', (_event, data) => callback(data)),
  write: (data) => ipcRenderer.send('cli:input', data),
  resize: (cols, rows) => ipcRenderer.send('cli:resize', { cols, rows }),
  chooseProject: () => ipcRenderer.invoke('project:choose'),
})
