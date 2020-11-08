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

    return from(result).pipe(
          catchError((error: any) => throwError(error.json))
        );
  }

  addApiKey(apikey: Apikey) {
    const result  = this.electronService.ipcRenderer.invoke('add-apikey',apikey);
    return from(result).pipe(catchError((error: any) => throwError(error.json)));
  }
}
