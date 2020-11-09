import { AppService } from '@core/services/app.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Apikey } from '@assets/models/apikey.entity';
import { Account } from '@assets/models/account.entity';
import { ApikeyService } from '@core/services/repository/apikey.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-update-api-key',
  templateUrl: './update-api-key.component.html',
  styleUrls: ['./update-api-key.component.css']
})
export class UpdateApiKeyComponent implements OnInit {

  editApiKeyForm: FormGroup;
  event: EventEmitter<any> = new EventEmitter();
  accountsList: Account[];
  tempApikey: Apikey[];

  constructor(private builder: FormBuilder, private appService: AppService ,private apikeyService: ApikeyService, private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.editApiKeyForm = this.builder.group({
      accounts: new FormControl(null),
      key: new FormControl(this.tempApikey[0].key, []),
      secret_key: new FormControl(this.tempApikey[0].secret_key, []),
      access_token: new FormControl(this.tempApikey[0].access_token, []),
      access_secret: new FormControl(this.tempApikey[0].access_secret, []),
      bearer_token: new FormControl(this.tempApikey[0].bearer_token, []),
    });

    this.appService.getAccounts().subscribe((accounts: any) => {
      this.accountsList = accounts;
    });

    // this is to dynamically select the Account of the given API key
    this.editApiKeyForm.controls['accounts'].setValue(this.tempApikey[0].account.id,{onlySelf: true});
  }

  onApiKeyEditFormSubmit() {
    let tempApikey = new Apikey();

    tempApikey.key = this.editApiKeyForm.get('key').value;
    tempApikey.secret_key = this.editApiKeyForm.get('secret_key').value;
    tempApikey.access_token = this.editApiKeyForm.get('access_secret').value;
    tempApikey.bearer_token = this.editApiKeyForm.get('bearer_token').value;

    this.appService.getAccountById(this.editApiKeyForm.get('accounts').value).subscribe(account => {
      tempApikey.account = account[0];

      this.apikeyService.updateApikey(tempApikey).subscribe( apikeys => {
      
        if(apikeys!=null && apikeys.length>0){
          let response = {
            'response': 'OK',
            'data': apikeys
          }
          this.event.emit(response);
          this.bsModalRef.hide();
        }
      });
      
    });
  }

  onClose(){
    this.bsModalRef.hide();
  }

}
