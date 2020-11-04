import { Component, OnInit, EventEmitter, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Account } from '@assets/models/account.entity';
import { AppService } from '@core/services/app.service';
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

  constructor(private builder: FormBuilder, private appservice: AppService, private bsModalRef: BsModalRef) { }

  ngOnInit(): void {

    this.editAccountForm = this.builder.group({
      account_name: new FormControl(this.tempAccount[0].name, []),
    });
  }

  onAccountEditFormSubmit() {

  }

  onClose(){
    this.bsModalRef.hide();
  }

}
