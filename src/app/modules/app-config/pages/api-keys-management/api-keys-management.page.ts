import { AddNewApiKeyComponent } from './../../components/api-keys-crud/add-new-api-key/add-new-api-key.component';
import { Component, OnInit } from '@angular/core';
import { ApikeyService } from '@core/services/repository/apikey.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Apikey } from '@assets/models/apikey.entity';

@Component({
  selector: 'app-api-keys-management',
  templateUrl: './api-keys-management.page.html',
  styleUrls: ['./api-keys-management.page.css']
})
export class ApiKeysManagementPage implements OnInit {
  
  apiKeyList: Apikey[];
  bsModalRef: BsModalRef;

  constructor(private apikeyService: ApikeyService, private bsModalService: BsModalService) { }

  ngOnInit(): void {
    this.apikeyService.getApiKeys().subscribe((apikeys: any) => (this.apiKeyList = apikeys));
  }

  addNewApiKey(): void {
    const initialState = { class: "modal-lg" };
    
    this.bsModalRef = this.bsModalService.show(AddNewApiKeyComponent, initialState);
    this.bsModalRef.content.event.subscribe(result => {
      if (result.response == 'OK') {
        this.apiKeyList = result.data;
      }
    });
  }

  updateApiKey(apikeyId: number): void {

  }

  deleteApiKey(apikeyId: number): void {

  }

}
