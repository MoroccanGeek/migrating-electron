import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-config',
  templateUrl: './app-config.page.html',
  styleUrls: ['./app-config.page.css']
})
export class AppConfigPage implements OnInit {

  expansion: any;
  shrink: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.router);
  }

  doShrink(value: any){
    this.shrink = value;
  }

}
