const electron = require('electron');

const address = 'localhost';
const port = '80';
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function minimizeWindow() {
  mainWindow.setFullScreen(false);
}

function createWindow() {
  app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

  var electronOptions = {
    width: 800,
    height: 600,
    x: 0,
    y: 0,
    darkTheme: true,
    fullscreen: true,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
    },
    backgroundColor: '#000000',
  };

  // Create the browser window.
  mainWindow = new BrowserWindow(electronOptions);

  mainWindow.loadURL(`http://${address}:${port}`);

  // Open the DevTools if run with "npm start dev"
  if (process.argv.includes('dev')) {
    mainWindow.webContents.openDevTools();
  }

  // Set responders for window events.
  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  mainWindow.on('blur', function() {
    mainWindow.focus();
  });
}

app.on('ready', function() {
  console.log('Launching Onyx Electron');
  const ret = electron.globalShortcut.register('Escape', function() {
    console.log('Escape is pressed');
    minimizeWindow();
  });
  createWindow();
});

app.on('will-quit', function(){

  electron.globalShortcut.unregister('Escape');

  electron.globalShortcut.unregisterAll();
});

app.on('activate', function() {
  if (mainWindow === null) {
    createWindow();
  }
});
