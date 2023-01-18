const { ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
  let btnLogin = document.getElementById('btnLogin')
  btnLogin.addEventListener('click', () => {
    ipcRenderer.send('readFileCSV')
  })
})
