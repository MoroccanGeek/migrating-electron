import { Injectable } from '@angular/core';
import { ElectronService } from '@core/services';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private electronService: ElectronService) { }

  sendTestLog(log: string) {
    this.electronService.ipcRenderer.invoke('test-log',log).then((value) => console.log(value));
  }

  runScripts() {
    this.electronService.ipcRenderer.invoke('py-scripts-channel').then((value) => console.log('Data is: '+value));
  }
}
