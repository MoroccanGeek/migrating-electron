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
  itemsPerPage = 10;
  currentPage = 1;

  constructor(private accountService: AccountService, private bsModalService: BsModalService) {}

  async ngOnInit() {
    this.accountList = await this.accountService.getAccounts().toPromise<Account[]>();

    this.returnedAccountList = this.accountList.slice(0,this.itemsPerPage);
  }

  addNewAccount(){

    this.bsModalRef = this.bsModalService.show(AddNewAccountComponent);
    this.bsModalRef.content.event.subscribe(result => {
      if (result.response == 'OK') {
        this.accountList = result.data;

        // This is to stay on the same page after addition
        const startItem = (this.currentPage - 1) * this.itemsPerPage;
        const endItem = this.currentPage * this.itemsPerPage;
        this.returnedAccountList = this.accountList.slice(startItem,endItem);
      }
    });
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

            // This is to stay on the same page after addition
            const startItem = (this.currentPage - 1) * this.itemsPerPage;
            const endItem = this.currentPage * this.itemsPerPage;
            this.returnedAccountList = this.accountList.slice(startItem,endItem);
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

          if(this.currentPage != 1){
            const numOfItems = this.accountList.length;
            const previousPageNumOfItems = (this.currentPage-1) * this.itemsPerPage;

            if(numOfItems === previousPageNumOfItems){
              this.currentPage -= 1;
            }
          }
          
          const startItem = (this.currentPage - 1) * this.itemsPerPage;
          const endItem = this.currentPage * this.itemsPerPage;
          this.returnedAccountList = this.accountList.slice(startItem,endItem);
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
