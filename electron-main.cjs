// This file has been renamed to electron-main.cjs for CommonJS compatibility.
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
    resizable: false,
  });

  // Always load Vite dev server in development
  if (!app.isPackaged) {
    const devUrl = 'http://localhost:5173';
    win.loadURL(devUrl).catch(() => {
      win.loadURL('data:text/html,<h2>Vite dev server not running on port 5173.</h2><p>Start it with <code>npm run dev</code>.</p>');
    });
  } else {
    win.loadFile(path.join(__dirname, 'dist/index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
}); 