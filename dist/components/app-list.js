var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
//#region Definitions
var _a = require("electron"), ipcRenderer = _a.ipcRenderer, app = _a.app;
var applist;
var allCardElements;
var selectedApplist = [];
var selectedAppListSection = document.getElementById("selectedAppListEl");
var btnInstall = document.getElementById("btnInstall");
var btnClear = document.getElementById("btnClear");
//#endregion
//#region Listeners
document.querySelector("#searchBar").addEventListener("keyup", function (e) { return searchApp(e); });
btnClear.addEventListener("click", function () { return clearBtn(); });
btnInstall.addEventListener("click", function () { return installSelectedAppList(); });
//#endregion
//#region Methods
var invoke = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                enableLoader();
                checkSelectedAppListEmpty();
                return [4 /*yield*/, ipcRenderer.invoke("CALLAPPLIST")];
            case 1:
                _a.sent();
                ipcRenderer.on('GETAPPLIST', function (event, result) {
                    applist = result;
                    createAppCard(result);
                });
                return [2 /*return*/];
        }
    });
}); };
var createAppCard = function (data) {
    var appListSectionEl = document.getElementById("app-list-section");
    var appEl = "";
    data.forEach(function (item) {
        appEl = appEl + "\n                <div class=\"col-sm-12 col-xxl-6 app-card-wrapper\" data-app-id=\"".concat(item, "\">\n                    <div class=\"app-card ccard\">\n                        <div class=\"app-image\">\n                            <img src=\"./assets/img/unk.png\" alt=\"\">\n                        </div>\n                        <div class=\"app-name\">\n                            ").concat(item, "\n                        </div>\n                        <button onclick=\"addList('").concat(item, "')\" class=\"btn btn-success\">Add List</button>\n                    </div>\n                </div>\n            ");
    });
    appListSectionEl.innerHTML = appEl;
    allCardElements = document.querySelectorAll(".app-card-wrapper");
    disbleLoader();
};
var searchApp = function (e) {
    var appName = e.target.value.toLowerCase();
    if (appName.length != 0) {
        allCardElements.forEach(function (element) {
            element.style.display = "none";
        });
        var founded = applist.filter(function (p) {
            return p.toLowerCase().includes(appName);
        });
        founded.forEach(function (element) {
            document.querySelector("[data-app-id='".concat(element, "']")).style.display = "block";
        });
    }
    else {
        allCardElements.forEach(function (element) {
            element.style.display = "block";
        });
    }
};
var checkSelectedAppListEmpty = function () {
    if (selectedApplist.length === 0) {
        selectedAppListSection.innerHTML = "<li style='text-align: center;'>Empty</li>";
        btnInstall.disabled = true;
        btnClear.disabled = true;
    }
};
var clearBtn = function () {
    selectedApplist.length = 0;
    selectedAppListSection.innerHTML = "<li style='text-align: center;'>Empty</li>";
    btnInstall.disabled = true;
    btnClear.disabled = true;
};
var installSelectedAppList = function () {
    enableLoader();
    ipcRenderer.invoke("CALLAPPINSTALLER", selectedApplist);
    ipcRenderer.on('CALLAPPINSTALLERRESPONSE', function (event, result) {
        disbleLoader();
        if (result) {
            Swal.fire('Success!', 'Application installation complete.', 'success');
        }
        else {
            Swal.fire('Error!', 'An error has been encountered.', 'error');
        }
    });
};
var addList = function (appName) {
    if (selectedApplist.length === 0) {
        selectedAppListSection.innerHTML = "";
        btnInstall.disabled = false;
        btnClear.disabled = false;
    }
    selectedApplist.push(appName);
    var element = document.getElementById("selectedAppListEl");
    var node = document.createElement("li");
    node.classList = 'd-flex justify-content-between align-items-center m-1';
    var textnode = document.createTextNode(appName);
    node.appendChild(textnode);
    var buttonNode = document.createElement("button");
    buttonNode.classList = "btn btn-danger";
    var buttonTextNode = document.createTextNode("Sil");
    buttonNode.setAttribute("onclick", "removeAppOfSelectedList(this)");
    buttonNode.appendChild(buttonTextNode);
    node.appendChild(buttonNode);
    element.appendChild(node);
};
var removeAppOfSelectedList = function (e) {
    selectedApplist = selectedApplist.filter(function (p) { return p != e.parentNode.innerText.slice(0, -4); });
    e.parentNode.remove();
    checkSelectedAppListEmpty();
};
//#endregion
//# sourceMappingURL=app-list.js.map