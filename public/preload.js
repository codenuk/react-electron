const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  checkStatus: () => ipcRenderer.invoke('checkStatus'),
  getAllString: () => ipcRenderer.invoke('getAllString'),
  insertString: (values) => ipcRenderer.invoke('insertString', values),
})
