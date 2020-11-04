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

  public readonly title = 'my app';
  accountList: Account[];
  isCollapsed = true;
  bsModalRef: BsModalRef;

  constructor(private appservice: AppService, private bsModalService: BsModalService) {}

  ngOnInit(): void {
    console.log('component initialized');
    this.appservice.getAccounts().subscribe((accounts: any) => (this.accountList = accounts));
    // this.appservice.getItems().then(value => value.subscribe((items) => (this.accountList = items)));
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

  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
    console.log(this.isCollapsed);
  }

  editAccount(accountId: number) {

    this.bsModalRef = this.bsModalService.show(EditAccountComponent);
    this.bsModalRef.content.event.subscribe(result => {
      if (result == 'OK') {
        setTimeout(() => {
          this.appservice.getAccounts().subscribe((accounts: any) => (this.accountList = accounts));
        }, 5000);
      }
    });
  }

  deleteAccount(accountId: number, title: string) {
    this.bsModalRef = this.bsModalService.show(DeleteAccountComponent);
    this.bsModalRef.content.accountId = accountId;
    this.bsModalRef.content.title = title;
    this.bsModalRef.content.event.subscribe(result => {
      console.log("deleted", result);
      if (result == 'OK') {
        setTimeout(() => {
          const account = this.accountList[this.accountList.length - 1];
          this.appservice.deleteAccount(account).subscribe((accounts) => (this.accountList = accounts));
        }, 5000);
      }
    });
  }

}
