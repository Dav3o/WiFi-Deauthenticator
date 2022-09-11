/* eslint-disable import/no-extraneous-dependencies */

/*
* Preload file that exposes APIs for the backend communication.
*/

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('API', {
  getNetworkInterfaceControllers: () => ipcRenderer.invoke('initializeInterfaces'),
  updateInterfaceSelection: (iface) => ipcRenderer.invoke('updateInterfaceSelection', iface),
  updateInterfaceMac: (randomized) => ipcRenderer.invoke('updateInterfaceMac', randomized),
  updateBandSelection: (bandValues) => ipcRenderer.invoke('updateBandSelection', bandValues),
  startScanning: () => ipcRenderer.invoke('startScanning'),
  getAccessPoints: () => ipcRenderer.invoke('getAccessPoints'),
});

contextBridge.exposeInMainWorld('MSG', {
  openMessageBox: (message) => ipcRenderer.invoke('openMessageBox', message),
});