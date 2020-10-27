"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var environment_1 = require("../../src/environments/environment");
var electron_1 = require("electron");
var Settings = /** @class */ (function () {
    function Settings() {
    }
    Settings.initialize = function () {
        Settings.setPaths();
    };
    Settings.setPaths = function () {
        // console.log('>>>>> Application Path is: ',app.getAppPath())
        // console.log('>>>>> Application Path after production is: ',app.getPath('userData'))
        if (environment_1.AppConfig.production) {
            this.dataSubFolder = '/';
            Settings.appPath = electron_1.app.getPath('userData');
        }
        else {
            // return folder where app is running
            this.dataSubFolder = 'dist/assets/data';
            Settings.appPath = electron_1.app.getAppPath();
        }
        Settings.dbFolder = path.join(Settings.appPath, Settings.dataSubFolder);
        // Settings.dbFolder = path.join(__dirname, '../../dist/assets/data')
        Settings.dbPath = path.join(Settings.dbFolder, this.dbName);
    };
    Settings.dbName = 'database.sqlite';
    return Settings;
}());
exports.Settings = Settings;
//# sourceMappingURL=db-settings.js.map