import { Component, OnInit } from '@angular/core';
import { Item } from '../../../../../assets/models/item.schema';
import { AppService } from '../../../../core/services';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.page.html',
  styleUrls: ['./account-management.page.css']
})
export class AccountManagementPage implements OnInit {

  public readonly title = 'my app';
  itemList: Item[];
  isCollapsed = true;

  constructor(private appservice: AppService) {}

  ngOnInit(): void {
    console.log('component initialized');
    this.appservice.getItems().subscribe((items: any) => (this.itemList = items));
    // this.appservice.getItems().then(value => value.subscribe((items) => (this.itemList = items)));
    this.appservice.sendTestLog('Honka Honka');
  }

  addItem(): void {
    let item = new Item();
    item.name = 'Item ' + this.itemList.length;
    this.appservice.addItem(item).subscribe((items) => (this.itemList = items));
  }

  deleteItem(): void {
    const item = this.itemList[this.itemList.length - 1];
    this.appservice.deleteItem(item).subscribe((items) => (this.itemList = items));
  }

  runScript() {
    this.appservice.runScripts();
  }

  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
    console.log(this.isCollapsed);
  }

}
