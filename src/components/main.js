const shell = require('electron').shell;

const enableLoader = () => {
    document.querySelector(".loader-wrapper").style.display = 'flex'
}

const disbleLoader = () => {
    document.querySelector(".loader-wrapper").style.display = 'none'
}

const openExternalBrowser = url => {
    shell.openExternal(url);
}