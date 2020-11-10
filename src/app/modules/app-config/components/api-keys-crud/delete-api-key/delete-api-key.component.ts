import { Component, EventEmitter, OnInit } from '@angular/core';
import { ApikeyService } from '@core/services/repository/apikey.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-delete-api-key',
  templateUrl: './delete-api-key.component.html',
  styleUrls: ['./delete-api-key.component.css']
})
export class DeleteApiKeyComponent implements OnInit {
  
  apikey_id: number;
  event: EventEmitter<any> = new EventEmitter();

  constructor(private bsModalRef: BsModalRef, private apikeyService: ApikeyService) { }

  ngOnInit(): void {
  }

  deleteApikey() {
    this.apikeyService.deleteApikeyById(this.apikey_id).subscribe( remaining_apikeys => {
      if(remaining_apikeys!=null){
        let response = {
          'response': 'OK',
          'data': remaining_apikeys
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
