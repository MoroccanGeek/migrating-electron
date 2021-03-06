import { Component, OnInit, EventEmitter } from '@angular/core';
import { AppService } from '@core/services/app.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Account } from '@assets/models/account.entity';
import { AccountService } from '@core/services';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent implements OnInit {

  event: EventEmitter<any> = new EventEmitter();
  tempAccount: Account;

  constructor(private accountService: AccountService, private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  deleteAccount() {
    this.accountService.deleteAccountById(this.tempAccount.id).subscribe( accounts => {

      if(accounts!=null){
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
