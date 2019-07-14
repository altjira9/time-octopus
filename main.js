const { app, BrowserWindow } = require('electron'),
    path = require('path'),
    url = require('url')


    let win;

    function createWindow() {
      win = new BrowserWindow({ width: 800, height: 600 });
    
      // load the dist folder from Angular
      if (process.env.DEBUG) {
        require('electron-reload')(__dirname, {
          electron: require(`${__dirname}/node_modules/electron`)
        });
        win.loadURL('http://localhost:4200');
        win.webContents.openDevTools();
      } else {
        win.loadURL(url.format({
          pathname: path.join(__dirname, `frontend/dist/time-octopus/index.html`),
          protocol: 'file:',
          slashes: true
        }));
      }
    
      // The following is optional and will open the DevTools:
      // win.webContents.openDevTools()
    
      win.on("closed", () => {
        win = null;
      });
    }
    
    app.on("ready", createWindow);
    
    // on macOS, closing the window doesn't quit the app
    app.on("window-all-closed", () => {
      if (process.platform !== "darwin") {
        app.quit();
      }
    });
    
    // initialize the app's main window
    app.on("activate", () => {
      if (win === null) {
        createWindow();
      }
    });