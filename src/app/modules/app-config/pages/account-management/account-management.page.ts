import { Component, OnInit } from '@angular/core';
import { Account } from '@assets/models/account.entity';
import { AccountService } from '@core/services';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { AddNewAccountComponent } from '../../components/account-crud/add-new-account/add-new-account.component';
import { DeleteAccountComponent } from '../../components/account-crud/delete-account/delete-account.component';
import { EditAccountComponent } from '../../components/account-crud/edit-account/edit-account.component';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.page.html',
  styleUrls: ['./account-management.page.css']
})
export class AccountManagementPage implements OnInit {

  accountList: Account[];
  returnedAccountList: Account[];
  bsModalRef: BsModalRef;

  constructor(private accountService: AccountService, private bsModalService: BsModalService) {}

  ngOnInit(): void {
    console.log('component initialized');
    this.accountService.getAccounts().subscribe((accounts: any) => {
      this.accountList = accounts;
      this.returnedAccountList = this.accountList.slice(0,10);
    });
  }

  addNewAccount(){
    this.bsModalRef = this.bsModalService.show(AddNewAccountComponent);
    this.bsModalRef.content.event.subscribe(result => {
      if (result.response == 'OK') {
        this.accountList = result.data;
        this.returnedAccountList = this.accountList.slice(0,10);
      }
    });
  }

  runScript() {
    // this.appservice.runScripts();
  }

  editAccount(accountId: number) {

    this.accountService.getAccountById(accountId).subscribe(account => {
        const initialState = {
          tempAccount: account
        };

        this.bsModalRef = this.bsModalService.show(EditAccountComponent, {initialState});
        this.bsModalRef.content.event.subscribe(result => {
          if (result.response == 'OK') {
            this.accountList = result.data;
          }
        });

      });
  }

  deleteAccount(accountId: number) {

    this.accountService.getAccountById(accountId).subscribe(account => {
      const initialState = {
        tempAccount: account
      };

      this.bsModalRef = this.bsModalService.show(DeleteAccountComponent, {initialState});
      this.bsModalRef.content.event.subscribe(result => {
        if (result.response == 'OK') {
          this.accountList = result.data;
          this.returnedAccountList = this.accountList.slice(0,10);
        }
      });

    })
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;

    this.returnedAccountList = this.accountList.slice(startItem, endItem);
  }

}
