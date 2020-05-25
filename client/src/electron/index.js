const { app, BrowserWindow, Menu, Tray } = require('electron')

const path = require('path');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win, appTray, trayMenuTemplate;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 600
    })

    trayMenuTemplate = [
        {
            label: '退出',
            click: () => {
                appTray.destroy()
                app.exit();
            }
        }
    ];
    const startUrl = ('http://localhost:3000/');
    win.loadURL(startUrl);
    Menu.setApplicationMenu(null);

    const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);

    appTray = new Tray(path.join(__dirname, 'window-icon.jpg'));
    appTray.setToolTip('This is my application.');
    appTray.setContextMenu(contextMenu);

    appTray.on('double-click', () => {
        win.show()
        win.focus()
    })
    // Emitted when the window is closed.
    win.on('closed', () => {
        win = null;
    })
    win.on('close', (event) => {
        event.preventDefault();
        win.hide();
    })
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})