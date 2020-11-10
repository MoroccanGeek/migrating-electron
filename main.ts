import { Account } from './src/assets/models/account.entity';
import { Apikey } from './src/assets/models/apikey.entity';
import { Project } from './src/assets/models/project.entity';
import { app, BrowserWindow, ipcMain, screen } from 'electron';
import * as path from 'path';
import * as url from 'url';
import { createConnection } from 'typeorm';

import * as child from 'child_process';
import { once } from 'events';
import {DatabaseService} from './src/renderers/database/db-services'
import {Settings} from './src/renderers/database/db-settings'

let win: BrowserWindow = null;
const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');

async function createWindow(): Promise<BrowserWindow> {
  
  const db = new DatabaseService()

  const connection = await createConnection({
    type: 'sqlite',
    synchronize: true,
    logging: true,
    logger: 'simple-console',
    database: Settings.dbPath,
    entities: [ Account, Apikey, Project ],
  });

  const accountRepo = connection.getRepository(Account);

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve) ? true : false,
    },
  });

  if (serve) {

    win.webContents.openDevTools();

    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');

  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  ipcMain.handle('test-log', (e, log) => {
    console.log('Logger: '+log);
    return 'Done...'
  })

// For Accounts CRUD
  ipcMain.handle('get-accounts', async (e, args) => {
    return await db.getAccounts(connection);
  })

  ipcMain.handle('get-account-by-id', async (e, args) => {
    return await db.getAccountById(connection, args);
  })

  ipcMain.handle('update-account', async (e, _account: Account) =>{
    return await db.updateAccount(connection, _account);
  })

  ipcMain.handle('delete-account-by-id', async (e, account_id: number) =>{
    return await db.deleteAccountById(connection, account_id);
  }) 

  ipcMain.handle('add-account', async (e, _account: Account) => {
      return await db.addAccount(connection, _account);
  });

// For API Keys CRUD
  ipcMain.handle('get-apikeys', async (e, args) => {
    return await db.getApikeys(connection);
  })

  ipcMain.handle('get-apikey-by-id', async (e, args) => {
    return await db.getApikeyById(connection, args);
  })

  ipcMain.handle('add-apikey', async(e, _apikey: Apikey) => {
    return await db.addApikey(connection, _apikey);
  })

  ipcMain.handle('update-apikey', async(e, _apikey: Apikey) => {
    return await db.updateApikey(connection, _apikey);
  })

  ipcMain.handle('delete-apikey-by-id', async (e, apikey_id: number) => {
    return await db.deleteApikeyById(connection, apikey_id);
  })

// For Projects CRUD
ipcMain.handle('get-projects', async (e, args) => {
  return await db.getProjects(connection);
})

ipcMain.handle('get-projects-by-account-id', async (e, accountId: number) => {
  return await db.getProjectsByAccountId(connection, accountId);
})

ipcMain.handle('get-project-by-id', async (e, args) => {
  return await db.getProjectById(connection, args);
})

ipcMain.handle('add-project', async(e, _project: Project) => {
  return await db.addProject(connection, _project);
})

ipcMain.handle('update-project', async(e, _project: Project) => {
  return await db.updateProject(connection, _project);
})

ipcMain.handle('delete-project-by-id', async (e, project_id: number) => {
  return await db.deleteProjectById(connection, project_id);
})


  ipcMain.handle('py-scripts-channel', async (e: any) => {
    let python = child.spawn('python', ['./src/assets/pyscripts/calc.py', '1 + 1']);

    var xdata = '';

    python.stdout.on('data', (data) =>{

      xdata += data.toString();
    })

    await once(python, 'close');

    return xdata;

    /* Version 2 ==> shorturl.at/jFI06 */
    // return new Promise((res, rej) => {
    //   python.stdout.on('data', async (data) =>{

    //       // "return" is probably wrong, what should be done instead?
    //       res(data.toString());
    //   })
    // });
  });

  return win;
}

try {

  app.allowRendererProcessReuse = true;

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
  app.on('ready', () => setTimeout(createWindow, 400));

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
