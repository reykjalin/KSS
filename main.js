const {app, BrowserWindow} = require('electron')
const path                 = require('path')
const url                  = require('url')

// Global reference of window object
let win

function createWindow() {
  // Create browser window
  win = new BrowserWindow({width: 800, height: 600})

  // Load index.html
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, 'app/index.html'),
      protocol: 'file',
      slashes:  true
    })
  )

  // Open DevTools
  win.webContents.openDevTools()

  // Emit signal when window is closed
  win.on('closed', () => {
    // Dereference window object
    win = null
  })
}

// Method called when initialization is done
app.on('ready', createWindow)

// Quit when all windows are closed
app.on('window-all-closed', () => {
  // On macOS applications stay active until CMD + Q
  if (process.platform !== 'darwin')
    app.quit()
})

app.on('activate', () => {
  // macOS re-activate window when closed w/o CMD + Q
  if (win == null)
    createWindow()
})
