import { Injectable } from '@angular/core';

import { from, Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Account } from '@assets/models/account.entity';
import { ElectronService } from '@core/services';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private electronService: ElectronService) { }

  sendTestLog(log: string) {
    this.electronService.ipcRenderer.invoke('test-log',log).then((value) => console.log(value));
  }

  getAccounts(){

    const result = this.electronService.ipcRenderer.invoke('get-accounts');

    return from(result).pipe(
          catchError((error: any) => throwError(error.json))
        );
  }

  getAccountById(accountId: number){
    const result = this.electronService.ipcRenderer.invoke('get-account-by-id', accountId);
    return from(result).pipe(
      catchError((error: any) => throwError(error.json))
    );
  }

<<<<<<< HEAD
  addAccount(account: Account): Observable<Account[]> {
    return of(
      this.electronService.ipcRenderer.sendSync('add-account', account)
    ).pipe(catchError((error: any) => throwError(error.json)));
  }

  updateAccount(account: Account) {
    
  }

  deleteAccount(account: Account): Observable<Account[]> {
    return of(
      this.electronService.ipcRenderer.sendSync('delete-account', account)
    ).pipe(catchError((error: any) => throwError(error.json)));
=======
  addAccount(account: Account) {
    const result = this.electronService.ipcRenderer.invoke('add-account', account);

    return from(result).pipe(catchError((error: any) => throwError(error.json)));
  }

  updateAccount(account: Account) {
    const result = this.electronService.ipcRenderer.invoke('update-account',account);

    return from(result).pipe(
      catchError((error: any) => throwError(error.json))
    );
  }

  deleteAccountById(account_id: number){
    const result = this.electronService.ipcRenderer.invoke('delete-account-by-id',account_id);

    return from(result).pipe(
      catchError((error: any) => throwError(error.json))
    );
>>>>>>> jasper
  }

  runScripts() {
    this.electronService.ipcRenderer.invoke('py-scripts-channel').then((value) => console.log('Data is: '+value));
  }
}
