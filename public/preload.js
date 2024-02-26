const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  checkStatus: () => ipcRenderer.invoke('checkStatus'),
  intitialSetup: () => ipcRenderer.invoke('intitialSetup'),
  getAllContacts: () => ipcRenderer.invoke('getAllContacts'),
  insertContacts: (values) => ipcRenderer.invoke('insertContacts', values),
})
