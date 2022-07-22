//#region Definitions
let { ipcRenderer, app } = require("electron");


let applist;
let allCardElements;
let selectedApplist = [];

const selectedAppListSection = document.getElementById("selectedAppListEl");
const btnInstall = document.getElementById("btnInstall");
const btnClear = document.getElementById("btnClear");


//#endregion

//#region Listeners
document.querySelector("#searchBar").addEventListener("keyup", e => searchApp(e));

btnClear.addEventListener("click", () => clearBtn());
btnInstall.addEventListener("click", () => installSelectedAppList());
//#endregion

//#region Methods
const invoke = async () => {

    enableLoader();

    checkSelectedAppListEmpty();

    await ipcRenderer.invoke("CALLAPPLIST");

    ipcRenderer.on('GETAPPLIST', (event, result) => {
        applist = result;
        createAppCard(result);
    });
}

const createAppCard = (data) => {
    const appListSectionEl = document.getElementById("app-list-section");

    let appEl = "";
    data.forEach(item => {
        appEl = appEl + `
                <div class="col-sm-12 col-xxl-6 app-card-wrapper" data-app-id="${item}">
                    <div class="app-card ccard">
                        <div class="app-image">
                            <img src="./assets/img/unk.png" alt="">
                        </div>
                        <div class="app-name">
                            ${item}
                        </div>
                        <button onclick="addList('${item}')" class="btn btn-success">Add List</button>
                    </div>
                </div>
            `;

    });
    appListSectionEl.innerHTML = appEl;
    allCardElements = document.querySelectorAll(".app-card-wrapper");

    disbleLoader();
}

const searchApp = e => {
    let appName = e.target.value.toLowerCase();

    if (appName.length != 0) {

        allCardElements.forEach(element => {
            element.style.display = "none";
        });

        let founded = applist.filter(p => {
            return p.toLowerCase().includes(appName)
        });

        founded.forEach(element => {
            document.querySelector(`[data-app-id='${element}']`).style.display = "block";
        });


    } else {
        allCardElements.forEach(element => {
            element.style.display = "block";
        });
    }
}

const checkSelectedAppListEmpty = () => {
    if (selectedApplist.length === 0) {
        selectedAppListSection.innerHTML = "<li style='text-align: center;'>Empty</li>";

        btnInstall.disabled = true;
        btnClear.disabled = true;
    }
}

const clearBtn = () => {
    selectedApplist.length = 0;

    selectedAppListSection.innerHTML = "<li style='text-align: center;'>Empty</li>";

    btnInstall.disabled = true;
    btnClear.disabled = true;
}

const installSelectedAppList = () => {
    enableLoader();

    ipcRenderer.invoke("CALLAPPINSTALLER", selectedApplist);

    ipcRenderer.on('CALLAPPINSTALLERRESPONSE', (event, result) => {
        disbleLoader();

        if (result) {
            Swal.fire(
                'Success!',
                'Application installation complete.',
                'success'
            )
        } else {
            Swal.fire(
                'Error!',
                'An error has been encountered.',
                'error'
            )
        }
    });
}

const addList = appName => {

    if (selectedApplist.length === 0) {
        selectedAppListSection.innerHTML = "";
        btnInstall.disabled = false;
        btnClear.disabled = false;
    }

    selectedApplist.push(appName);

    let element = document.getElementById("selectedAppListEl");

    const node = document.createElement("li");
    node.classList = 'd-flex justify-content-between align-items-center m-1';
    const textnode = document.createTextNode(appName);
    node.appendChild(textnode);

    const buttonNode = document.createElement("button");
    buttonNode.classList = "btn btn-danger";
    const buttonTextNode = document.createTextNode("Remove");
    buttonNode.setAttribute("onclick", `removeAppOfSelectedList(this)`)
    buttonNode.appendChild(buttonTextNode);

    node.appendChild(buttonNode);

    element.appendChild(node);
}

const removeAppOfSelectedList = (e) => {
    selectedApplist = selectedApplist.filter(p => p != e.parentNode.innerText.slice(0, -4));
    e.parentNode.remove();
    checkSelectedAppListEmpty();
}

//#endregion