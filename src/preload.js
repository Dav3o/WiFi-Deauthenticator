const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('API', {
  getNetworkInterfaceControllers: () => ipcRenderer.invoke('initializeInterfaces'),
  updateInterfaceSelection: (interface) => ipcRenderer.invoke('updateInterfaceSelection', interface),
  updateInterfaceMac: (randomized) => ipcRenderer.invoke('updateInterfaceMac', randomized),
  updateBandSelection: (bandValues) => ipcRenderer.invoke('updateBandSelection', bandValues),
  getAccessPoints: () => ipcRenderer.invoke('getAccessPoints')
})

contextBridge.exposeInMainWorld('MSG', {
  openMessageBox: (message) => ipcRenderer.invoke('openMessageBox', message)
})