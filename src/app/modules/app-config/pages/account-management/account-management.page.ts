import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Account } from '@assets/models/account.entity';
import { AccountService, ElectronService } from '@core/services';
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
export class AccountManagementPage implements OnInit, AfterViewInit{

  accountList: Account[];
  returnedAccountList: Account[];
  bsModalRef: BsModalRef;
  itemsPerPage = 10;
  currentPage = 1;
  push_notif=false;

  constructor(
    private electronService: ElectronService,
    private accountService: AccountService, 
    private bsModalService: BsModalService,
    private elem: ElementRef) {}

  async ngOnInit() {
    this.accountList = await this.accountService.getAccounts().toPromise<Account[]>();

    this.returnedAccountList = this.accountList.slice(0,this.itemsPerPage);
  }

  ngAfterViewInit(){
    // Get all DOM elements with class == '.navlink'
    const elements = this.elem.nativeElement.querySelectorAll('.account_status');

    console.log(elements);
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

  async updateAccountStatus(account_id: number, checkedElement) {
    const checkedElement_Value = checkedElement.srcElement.checked;

    const result = await this.electronService.ipcRenderer.invoke('update-account-status', account_id);

    if(result) {
      // Get all DOM elements with class == '.navlink'
      const elements = this.elem.nativeElement.querySelectorAll('.account_status');

      // Uncheck all check-boxes
      elements.forEach( e => {
        e.checked = false;
      });

      checkedElement.srcElement.checked = checkedElement_Value;
      this.pushNotification();
    }
  }

  pushNotification() {
    this.push_notif = true;
  }

  closeNotification() {
    this.push_notif = false;
  }


}