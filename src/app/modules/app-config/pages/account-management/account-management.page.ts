import { Component, OnInit } from '@angular/core';
import { Account } from '../../../../../assets/models/account.entity';
import { AppService } from '../../../../core/services';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { AddNewItemComponent } from '../../components/account-crud/add-new-account/add-new-account.component';
import { DeleteAccountComponent } from '../../components/account-crud/delete-account/delete-account.component';
import { EditAccountComponent } from '../../components/account-crud/edit-account/edit-account.component';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.page.html',
  styleUrls: ['./account-management.page.css']
})
export class AccountManagementPage implements OnInit {

  accountList: Account[];
  bsModalRef: BsModalRef;

  constructor(private appservice: AppService, private bsModalService: BsModalService) {}

  ngOnInit(): void {
    console.log('component initialized');
    this.appservice.getAccounts().subscribe((accounts: any) => (this.accountList = accounts));
    this.appservice.sendTestLog('Honka Honka');
  }

  addNewAccount(){
    this.bsModalRef = this.bsModalService.show(AddNewItemComponent);
    this.bsModalRef.content.event.subscribe(result => {
      if (result.response == 'OK') {
        this.accountList = result.data;
      }
    });
  }

  runScript() {
    this.appservice.runScripts();
  }

  editAccount(accountId: number) {

    this.appservice.getAccountById(accountId).subscribe(account => {
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

    this.appservice.getAccountById(accountId).subscribe(account => {
      const initialState = {
        tempAccount: account
      };

      this.bsModalRef = this.bsModalService.show(DeleteAccountComponent, {initialState});
      this.bsModalRef.content.event.subscribe(result => {
        if (result.response == 'OK') {
          this.accountList = result.data;
        }
      });

    })
  }

}
