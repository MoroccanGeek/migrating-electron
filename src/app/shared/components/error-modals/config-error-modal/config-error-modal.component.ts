import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-config-error-modal',
  templateUrl: './config-error-modal.component.html',
  styleUrls: ['./config-error-modal.component.css']
})
export class ConfigErrorModalComponent implements OnInit {

  message: string;

  constructor(private bsModalService: BsModalService,private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  onClose() {
    this.bsModalRef.hide()
  }

}
