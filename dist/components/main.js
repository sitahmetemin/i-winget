var shell = require('electron').shell;
var enableLoader = function () {
    document.querySelector(".loader-wrapper").style.display = 'flex';
};
var disbleLoader = function () {
    document.querySelector(".loader-wrapper").style.display = 'none';
};
var openExternalBrowser = function (url) {
    shell.openExternal(url);
};
//# sourceMappingURL=main.js.map