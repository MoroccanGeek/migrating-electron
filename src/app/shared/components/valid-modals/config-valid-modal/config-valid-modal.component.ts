import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-config-valid-modal',
  templateUrl: './config-valid-modal.component.html',
  styleUrls: ['./config-valid-modal.component.css']
})
export class ConfigValidModalComponent implements OnInit {

  message: string;

  constructor(private bsModalService: BsModalService,private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  onClose() {
    this.bsModalRef.hide()
  }

}
