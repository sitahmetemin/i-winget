"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var path = require("path");
var PowerShell = require("powershell");
if (require('electron-squirrel-startup')) {
    electron_1.app.quit();
}
var createWindow = function () {
    var mainWindow = new electron_1.BrowserWindow({
        height: 800,
        width: 1024,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        }
    });
    mainWindow.loadFile(path.join(__dirname, '../src/index.html'));
    electron_1.ipcMain.handle("CALLAPPLIST", function (event) {
        var ps = new PowerShell("winget search");
        ps.on("output", function (data) {
            var res = prsString(data.toString());
            event.sender.send('GETAPPLIST', res);
        });
    });
    electron_1.ipcMain.handle("CALLAPPINSTALLER", function (event, data) {
        var installString = "";
        data.forEach(function (element) {
            installString = installString + "winget install ".concat(element, " -e;");
        });
        var ps = new PowerShell(installString);
        ps.on("output", function (data) {
            event.sender.send('CALLAPPINSTALLERRESPONSE', true);
        });
    });
};
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
var prsString = function (datas) {
    var catchDot = [];
    var removeUndefined = [];
    var strRemovedManyWhiteSpaces = datas.replace(/ +(?= )/g, '');
    var lines = strRemovedManyWhiteSpaces.split(/\r?\n/);
    lines.forEach(function (element, indx) {
        if (indx < 2) {
            return;
        }
        var removedWhiteSpace = element.split(" ");
        var found = removedWhiteSpace.find(function (element) {
            return element.includes(".");
        });
        if (found !== undefined) {
            catchDot.push(found);
        }
    });
    return catchDot;
};
//# sourceMappingURL=index.js.map