import { Injectable } from '@angular/core';

import { from, Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ElectronService } from '@core/services';
import { Apikey } from '@assets/models/apikey.entity';

@Injectable({
  providedIn: 'root'
})
export class ApikeyService {

  constructor(private electronService: ElectronService) { }

  getApiKeys() {
    const result = this.electronService.ipcRenderer.invoke('get-apikeys');
    return from(result).pipe(catchError((error: any) => throwError(error.json)));
  }

  getApikeyById(apikeyId: number) {
    const result = this.electronService.ipcRenderer.invoke('get-apikey-by-id', apikeyId);
    return from(result).pipe(catchError((error: any) => throwError(error.json)));
  }

  addApiKey(apikey: Apikey) {
    const result  = this.electronService.ipcRenderer.invoke('add-apikey',apikey);
    return from(result).pipe(catchError((error: any) => throwError(error.json)));
  }

  updateApikey(apikey: Apikey) {
    const result = this.electronService.ipcRenderer.invoke('update-apikey', apikey);
    return from(result).pipe(catchError((error: any) => throwError(error.json)));
  }

  deleteApikey(apikey_id: number) {
    const result = this.electronService.ipcRenderer.invoke('delete-apikey-by-id', apikey_id);
    return from(result).pipe(catchError((error: any) => throwError(error.json)));
  }
}
