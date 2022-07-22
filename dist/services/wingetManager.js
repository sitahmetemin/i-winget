"use strict";
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
exports.__esModule = true;
var PowerShell = require("powershell");
var WingetManager = /** @class */ (function () {
    function WingetManager() {
    }
    WingetManager.prototype.getAllApp = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, ps;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ps = new PowerShell("winget search");
                        // Handle process errors (e.g. powershell not found)
                        ps.on("error", function (err) {
                            console.error("ERR", err.toString());
                            console.error("ERR - end");
                        });
                        // Stderr
                        ps.on("error-output", function (data) {
                            console.error("ERR OUT", data.toString());
                            console.error("ERR OUT - end");
                        });
                        // End
                        ps.on("end", function (code) {
                        });
                        console.log("command Before", result);
                        // Stdout
                        return [4 /*yield*/, ps.on("output", function (data) {
                                result = _this.prsString(data.toString());
                            })];
                    case 1:
                        // Stdout
                        _a.sent();
                        console.log("result", result);
                        console.log("command after", result);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    WingetManager.prototype.prsString = function (datas) {
        var catchDot = [];
        var strRemovedManyWhiteSpaces = datas.replace(/ +(?= )/g, '');
        var lines = strRemovedManyWhiteSpaces.split(/\r?\n/);
        lines.forEach(function (element) {
            var removedWhiteSpace = element.split(" ");
            var found = removedWhiteSpace.find(function (element) {
                return element.includes(".");
            });
            catchDot.push(found);
        });
        return catchDot;
    };
    WingetManager.prototype.searchApp = function () {
        throw new Error("Method not implemented.");
    };
    WingetManager.prototype.installApp = function () {
        throw new Error("Method not implemented.");
    };
    WingetManager.prototype.uninstallApp = function () {
        throw new Error("Method not implemented.");
    };
    return WingetManager;
}());
exports["default"] = WingetManager;
//# sourceMappingURL=wingetManager.js.map