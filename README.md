## How to start with Eletron React

- Install package
  ```
  npm install electron-is-dev
  npm install concurrently
  npm install electron
  npm install electron-builder
  npm install wait-on
  ```

- Create file `public/electron.js` for convert web to desktop application
  ```js
  // Modules to control application life and create native browser window
  const { app, BrowserWindow, ipcMain } = require('electron')
  const path = require('path')
  const url = require('url')
  const isDev = require('electron-is-dev')
  
  const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        enableRemoteModule: true,
        preload: path.join(__dirname, 'preload.js'),
        icon: path.join(__dirname, 'favicon.ico'),
        devTools: isDev ? true : false,
      },
    })
  
    // and load the index.html of the app.
    const appURL = app.isPackaged
      ? url.format({
          pathname: path.join(__dirname, 'index.html'),
          protocol: 'file:',
          slashes: true,
        })
      : 'http://localhost:3000'
    mainWindow.loadURL(appURL)
  
    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
  }
  
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', () => {
    createWindow()
  })
  
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  
  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.
  ```

- If you want to connecting whatever in hardware you can use medthod contextBridge, ipcRenderer and ipcMain
for connect between website with comport, file in local or serialNumber computor.
  - Create file `public/preload.js`
    ```js
    const { contextBridge, ipcRenderer } = require('electron')
  
    contextBridge.exposeInMainWorld('electronAPI', {
      checkStatus: () => ipcRenderer.invoke('checkStatus'),
    })
    ```
  - Add some line in file `public/electron.js`
    ```js
    const { checkStatus } = require('./services/status')
  
    ipcMain.handle('checkStatus', checkStatus)
    ```
  - Create file `public/services/status.js` for keep function `checkStatus` 
    ```js
    const checkStatus = async () => {
    try {
        return 'Hello'
      } catch (err) {
        console.error(err)
        return false
      }
    }
    
    module.exports = { checkStatus }
    ```

- If you want to connect create small database in electron app
  - Install additional package
    ```bash
    npm install sqlite3
    ```
  - Create file `public/database.db` for keep data.
  - After Create use DBeaver program open that file and create table and column.
  - Add some line file `public/preload.js`
    ```js
    const { contextBridge, ipcRenderer } = require('electron')
  
    contextBridge.exposeInMainWorld('electronAPI', {
      checkStatus: () => ipcRenderer.invoke('checkStatus'),
      getAllString: () => ipcRenderer.invoke('getAllString'),
      insertString: (values) => ipcRenderer.invoke('insertString', values),
    })
    ```
  - Update file `public/electron.js`
    ```js
    const { insertString, getAllString } = require('./services/database')
  
    ipcMain.handle('insertString', insertString)
    ipcMain.handle('getAllString', getAllString)
    ```
  - Create file `public/services/database.js`
    ```js
    const sqlite3 = require('sqlite3').verbose()
    const path = require('path')
    
    const insertString = async values => {
      // const { id } = values
    
      let db = new sqlite3.Database(path.join(__dirname, '../database.db'))
      
      // insert one row into the langs table
      db.run(`INSERT INTO test(id) VALUES(?)`, ['ASDASDASD'], function (err) {
        if (err) {
          return console.log(err.message)
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`)
      })
    
      // close the database connection
      db.close()
    }
    
    const getAllString = async () => {
      // open the database
      let db = new sqlite3.Database(path.join(__dirname, '../database.db'))
      console.log(db)
    
      let sql = `SELECT * FROM test`
    
      console.log(sql)
    
      db.all(sql, [], (err, rows) => {
        if (err) {
          console.log(err)
          throw err
        }
        rows.forEach(row => {
          console.log(row)
        })
      })
    
      // close the database connection
      db.close()
    }
    
    module.exports = { getAllString, insertString }
    ```
- Run local
  ```bash
  npm run electron:start # For Start in local
  ```

- Build for install
  - setup package.json for build format install to OS.
    ```json
    "scripts": {
       "electron:package:mac": "npm run build && electron-builder -m -c.extraMetadata.main=build/electron.js", // For build file .dmg. used it install to macOS
       "electron:package:win": "npm run build && electron-builder -w -c.extraMetadata.main=build/electron.js", // For build file .exe. used it install to winOS
       "electron:package:linux": "npm run build && electron-builder -l -c.extraMetadata.main=build/electron.js"
     },
    "build": {
       "appId": "com.electron.myapp",
       "productName": "My Electron App",
       "files": [
         "build/**/*",
         "node_modules/**/*"
       ],
       "directories": {
         "buildResources": "public"
       },
       "mac": {
         "target": "dmg"
       },
       "win": {
         "target": "nsis"
       },
       "linux": {
         "target": "deb"
       }
     },
    ```

 Ref: https://www.electronjs.org/
 Ref: https://www.sqlitetutorial.net/sqlite-nodejs/