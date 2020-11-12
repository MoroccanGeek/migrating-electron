import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Account } from '@assets/models/account.entity';
import { AccountService } from '@core/services';
import { InputValidator } from '@shared/custom-form-validators';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {
  
  editAccountForm: FormGroup;
  event: EventEmitter<any> = new EventEmitter();
  tempAccount: Account;
  submitted = false;

  constructor(private builder: FormBuilder, private accountService: AccountService, private bsModalRef: BsModalRef) { }

  ngOnInit(): void {

    this.editAccountForm = this.builder.group({
      account_name: new FormControl(this.tempAccount.name, [Validators.required,InputValidator.noFullWhiteSpace]),
    });
  }

  onAccountEditFormSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.editAccountForm.invalid) {
        return;
    }

    let tempAccount = new Account();
    tempAccount.id = this.tempAccount.id;
    tempAccount.name = this.editAccountForm.get('account_name').value;
    tempAccount.in_use = this.tempAccount.in_use;

    this.accountService.updateAccount(tempAccount).subscribe( accounts => {
      
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
