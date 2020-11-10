import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Apikey } from '@assets/models/apikey.entity';
import { Account } from '@assets/models/account.entity';
import { ApikeyService } from '@core/services/repository/apikey.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AccountService } from '@core/services';

@Component({
  selector: 'app-add-new-api-key',
  templateUrl: './add-new-api-key.component.html',
  styleUrls: ['./add-new-api-key.component.css']
})
export class AddNewApiKeyComponent implements OnInit {

  addNewApiKeyForm: FormGroup;
  event: EventEmitter<any>=new EventEmitter();
  accountsList: Account[];

  constructor(private builder: FormBuilder, private accountService:AccountService, private apikeyService: ApikeyService, private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.addNewApiKeyForm = this.builder.group({
      accounts: new FormControl('', []),
      key: new FormControl('', []),
      secret_key: new FormControl('', []),
      access_token: new FormControl('', []),
      access_secret: new FormControl('', []),
      bearer_token: new FormControl('', []),
    });
    

    this.accountService.getAccounts().subscribe((accounts: any) => {
      this.accountsList = accounts;

      this.addNewApiKeyForm.controls['accounts'].setValue(this.accountsList[0].id,{onlySelf: true});
    
    });

  }

  onApiKeyFormSubmit() {

    let temp_apikey = new Apikey();

    temp_apikey.key = this.addNewApiKeyForm.get('key').value;
    temp_apikey.secret_key = this.addNewApiKeyForm.get('secret_key').value;
    temp_apikey.access_token = this.addNewApiKeyForm.get('access_token').value;
    temp_apikey.access_secret = this.addNewApiKeyForm.get('access_secret').value;
    temp_apikey.bearer_token = this.addNewApiKeyForm.get('bearer_token').value;
    temp_apikey.in_use = 0;
    temp_apikey.account = this.addNewApiKeyForm.get('accounts').value;

    this.apikeyService.addApiKey(temp_apikey).subscribe( apikeys => {
      
      if(apikeys!=null && apikeys.length>0){
        let response = {
          'response': 'OK',
          'data': apikeys
        }
        this.event.emit(response);
        this.bsModalRef.hide();
      }
    
    });

  }

  onClose(){
    this.bsModalRef.hide();
  }

}
