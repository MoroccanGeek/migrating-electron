import { DeleteApiKeyComponent } from './../../components/api-keys-crud/delete-api-key/delete-api-key.component';
import { UpdateApiKeyComponent } from './../../components/api-keys-crud/update-api-key/update-api-key.component';
import { AddNewApiKeyComponent } from './../../components/api-keys-crud/add-new-api-key/add-new-api-key.component';
import { Component, OnInit } from '@angular/core';
import { ApikeyService } from '@core/services/repository/apikey.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Apikey } from '@assets/models/apikey.entity';
import { AccountService } from '@core/services';
import { ConfigErrorModalComponent } from '@shared/components/error-modals/config-error-modal/config-error-modal.component';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-api-keys-management',
  templateUrl: './api-keys-management.page.html',
  styleUrls: ['./api-keys-management.page.css']
})
export class ApiKeysManagementPage implements OnInit {
  
  apiKeyList: Apikey[];
  returnedApiKeyList: Apikey[];
  bsModalRef: BsModalRef;
  itemsPerPage = 10;
  currentPage = 1;

  constructor(private accountService: AccountService, private apikeyService: ApikeyService, private bsModalService: BsModalService) { }

  async ngOnInit() {

    this.apiKeyList = await this.apikeyService.getApiKeys().toPromise<Apikey[]>();

    this.returnedApiKeyList = this.apiKeyList.slice(0,this.itemsPerPage);
  }

  addNewApiKey(): void {

    this.accountService.accountsExists().subscribe(response => {
      if(!response){
        const initialState = {
          message: 'No project was found. Try again after a project is added.'
        }
        this.bsModalRef = this.bsModalService.show(ConfigErrorModalComponent, {initialState});
      }
      else{
        const initialState = { class: "modal-lg" };
    
        this.bsModalRef = this.bsModalService.show(AddNewApiKeyComponent, initialState);
        this.bsModalRef.content.event.subscribe(result => {
          if (result.response == 'OK') {
            this.apiKeyList = result.data;

            // This is to stay on the same page after addition
            const startItem = (this.currentPage - 1) * this.itemsPerPage;
            const endItem = this.currentPage * this.itemsPerPage;
            this.returnedApiKeyList = this.apiKeyList.slice(startItem,endItem);
          }
        });
      }
    });
  }

  updateApiKey(apikeyId: number): void {

    this.apikeyService.getApikeyById(apikeyId).subscribe((apikey :Apikey) => {

      const modalOptions: ModalOptions = {
        initialState: {
          tempApikey: apikey
        },
        class: "modal-lg"
      }

      this.bsModalRef = this.bsModalService.show(UpdateApiKeyComponent, modalOptions);
      this.bsModalRef.content.event.subscribe(result => {
        if (result.response == 'OK') {
          this.apiKeyList = result.data;

          // This is to stay on the same page after addition
          const startItem = (this.currentPage - 1) * this.itemsPerPage;
          const endItem = this.currentPage * this.itemsPerPage;
          this.returnedApiKeyList = this.apiKeyList.slice(startItem,endItem);
        }
      });
    });

  }

  deleteApiKey(apikeyId: number): void {

    const initialState = {
      apikey_id: apikeyId
    };

    this.bsModalRef = this.bsModalService.show(DeleteApiKeyComponent, {initialState});
      this.bsModalRef.content.event.subscribe(result => {
        if (result.response == 'OK') {
          this.apiKeyList = result.data;

          if(this.currentPage != 1){
            const numOfItems = this.apiKeyList.length;
            const previousPageNumOfItems = (this.currentPage-1) * this.itemsPerPage;
  
            if(numOfItems === previousPageNumOfItems){
              this.currentPage -= 1;
            }
          }
          
          const startItem = (this.currentPage - 1) * this.itemsPerPage;
          const endItem = this.currentPage * this.itemsPerPage;
          this.returnedApiKeyList = this.apiKeyList.slice(startItem,endItem);
        }
      });

  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;

    this.returnedApiKeyList = this.apiKeyList.slice(startItem, endItem);
  }

}
