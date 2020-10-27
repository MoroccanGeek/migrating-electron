import * as path from 'path';
import { remote } from 'electron';
import { AppConfig } from '../../src/environments/environment';
import { app } from 'electron';

export class Settings {

    public static dbFolder: string;
    public static dbPath: string;
    public static appPath: string;
    private static dataSubFolder: string;
    private static dbName = 'database.sqlite';

    public static initialize(): void {
        Settings.setPaths();
    }

    private static setPaths() {
        // console.log('>>>>> Application Path is: ',app.getAppPath())
        // console.log('>>>>> Application Path after production is: ',app.getPath('userData'))

        if(AppConfig.production){
            this.dataSubFolder = '/';
            Settings.appPath = app.getPath('userData');
        } else {
            // return folder where app is running
            this.dataSubFolder = 'dist/assets/data';
            Settings.appPath = app.getAppPath();
        }

        Settings.dbFolder = path.join(Settings.appPath, Settings.dataSubFolder);
        
        // Settings.dbFolder = path.join(__dirname, '../../dist/assets/data')
        Settings.dbPath = path.join(Settings.dbFolder, this.dbName)
    }
}