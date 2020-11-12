import { ConfigValidModalComponent } from './../../../../../shared/components/valid-modals/config-valid-modal/config-valid-modal.component';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Account } from '@assets/models/account.entity';
import { AccountService } from '@core/services';
import { AppService } from '@core/services/app.service';
import { InputValidator } from '@shared/custom-form-validators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-new-account',
  templateUrl: './add-new-account.component.html',
  styleUrls: ['./add-new-account.component.css']
})
export class AddNewAccountComponent implements OnInit {

  addNewAccountForm: FormGroup;
  event: EventEmitter<any>=new EventEmitter();
  submitted = false;

  constructor(private builder: FormBuilder, private accountService: AccountService, private bsModalRef: BsModalRef, private bsModalService: BsModalService) { }

  ngOnInit(): void {
    this.addNewAccountForm = this.builder.group({
      account_name: new FormControl('', [Validators.required,InputValidator.noFullWhiteSpace]),
      in_use: new FormControl(0, [])
    });
  }

  onAccountFormSubmit(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.addNewAccountForm.invalid) {
        return;
    }

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

        const modalOptions = {
          initialState:
            {
              message: "Your account has been created successfully."
            }
        }
        this.bsModalRef = this.bsModalService.show(ConfigValidModalComponent, modalOptions);
      }
    
    });
  }

  onClose(){
    this.bsModalRef.hide();
  }

}
