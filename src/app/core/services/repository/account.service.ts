import { Injectable } from '@angular/core';

import { from, Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Account } from '@assets/models/account.entity';
import { ElectronService } from '@core/services';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private electronService: ElectronService) { }

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
  }

  accountsExists() {
    const result = this.electronService.ipcRenderer.invoke('account-exists');

    return from(result).pipe(
      catchError((error: any) => throwError(error.json))
    );
  }
}
