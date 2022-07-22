import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
const PowerShell = require("powershell");


if (require('electron-squirrel-startup')) {
    app.quit();
}

const createWindow = (): void => {

    const mainWindow = new BrowserWindow({
        height: 800,
        width: 1024,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    mainWindow.loadFile(path.join(__dirname, '../src/index.html'));

    ipcMain.handle("CALLAPPLIST", (event) => {
        let ps = new PowerShell("winget search");

        ps.on("output", data => {
            let res = prsString(data.toString());
            event.sender.send('GETAPPLIST', res);
        });

    });

    ipcMain.handle("CALLAPPINSTALLER", (event, data) => {

        let installString = "";
        data.forEach(element => {
            installString = installString + `winget install ${element} -e;`
        });

        let ps = new PowerShell(installString);

        ps.on("output", data => {
            event.sender.send('CALLAPPINSTALLERRESPONSE', true);
        });

    });
};



app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

const prsString = (datas) => {
    let catchDot = [];
    let removeUndefined = [];

    let strRemovedManyWhiteSpaces = datas.replace(/ +(?= )/g, '');
    let lines = strRemovedManyWhiteSpaces.split(/\r?\n/);
    lines.forEach((element, indx) => {
        if (indx < 2) {
            return;
        }

        let removedWhiteSpace = element.split(" ");

        var found = removedWhiteSpace.find(function (element) {
            return element.includes(".");
        });

        if (found !== undefined) {
            catchDot.push(found);
        }

    });

    return catchDot;
}