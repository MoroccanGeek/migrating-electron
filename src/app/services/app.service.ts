import { Injectable } from '@angular/core';

import { from, Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Item } from '../../assets/model/item.schema';
import { ElectronService } from '../core/services';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private electronService: ElectronService) { }

  sendTestLog(log: string) {
    this.electronService.ipcRenderer.invoke('test-log',log).then((value) => console.log(value));
  }

  getItems(){

    const result = this.electronService.ipcRenderer.invoke('get-items');

    return from(result).pipe(
          catchError((error: any) => throwError(error.json))
        );
  }

  // getItems(): Observable<Item[]> {

  //   return of(this.electronService.ipcRenderer.sendSync('get-items')).pipe(
  //     catchError((error: any) => throwError(error.json))
  //   );
  // }

  addItem(item: Item): Observable<Item[]> {
    return of(
      this.electronService.ipcRenderer.sendSync('add-item', item)
    ).pipe(catchError((error: any) => throwError(error.json)));
  }

  deleteItem(item: Item): Observable<Item[]> {
    return of(
      this.electronService.ipcRenderer.sendSync('delete-item', item)
    ).pipe(catchError((error: any) => throwError(error.json)));
  }
}
