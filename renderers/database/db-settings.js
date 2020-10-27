"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var Settings = /** @class */ (function () {
    function Settings() {
    }
    Settings.initialize = function () {
        Settings.setPaths();
    };
    Settings.setPaths = function () {
        // if(AppConfig.production){
        //     this.dataSubFolder = '/';
        //     Settings.appPath = remote.app.getPath('userData');
        // } else {
        //     // return folder where app is running
        //     this.dataSubFolder = 'dist/assets/data';
        //     Settings.appPath = remote.app.getAppPath();
        // }
        // Settings.dbFolder = path.join(Settings.appPath, Settings.dataSubFolder);
        Settings.dbFolder = path.join(__dirname, '../../dist/assets/data');
        Settings.dbPath = path.join(Settings.dbFolder, this.dbName);
    };
    Settings.dbName = 'database.sqlite';
    return Settings;
}());
exports.Settings = Settings;
//# sourceMappingURL=db-settings.js.map