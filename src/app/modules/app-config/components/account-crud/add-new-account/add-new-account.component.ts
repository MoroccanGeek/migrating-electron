import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Account } from '@assets/models/account.entity';
import { AccountService } from '@core/services';
import { AppService } from '@core/services/app.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-new-account',
  templateUrl: './add-new-account.component.html',
  styleUrls: ['./add-new-account.component.css']
})
export class AddNewAccountComponent implements OnInit {

  addNewAccountForm: FormGroup;
  event: EventEmitter<any>=new EventEmitter();

  constructor(private builder: FormBuilder, private accountService: AccountService, private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.addNewAccountForm = this.builder.group({
      account_name: new FormControl('', []),
      in_use: new FormControl(0, [])
    });
  }

  onAccountFormSubmit(){

    let account_temp = new Account();
    account_temp.name = this.addNewAccountForm.get('account_name').value;
    account_temp.in_use = this.addNewAccountForm.get('in_use').value;

    this.accountService.addAccount(account_temp).subscribe((accounts) => {
      
      if(accounts!=null && accounts.length>0){
        let response = {
          'response': 'OK',
          'data': accounts
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
