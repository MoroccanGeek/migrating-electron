import { app, BrowserWindow, ipcMain, screen } from 'electron';
import * as path from 'path';
import * as url from 'url';
import { createConnection } from 'typeorm';
// import { Item } from './src/assets/model/item.schema';
import {Item} from './dist/assets/models/item.schema';
import * as child from 'child_process';
import { once } from 'events';
import {DatabaseService} from './renderers/database/db-services'
import {Settings} from './renderers/database/db-settings'

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
    entities: [ Item ],
  });

  const itemRepo = connection.getRepository(Item);

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

  ipcMain.handle('get-items', async (e, args) => {
    return await db.getItems(connection);
  })

  ipcMain.on('add-item', async (event: any, _item: Item) => {
      event.returnValue = await db.addItem(connection, _item)
  });

  ipcMain.on('delete-item', async (event: any, _item: Item) => {
    event.returnValue = await db.deleteItem(connection, _item);
  });

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
