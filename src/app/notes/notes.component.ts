import { Component, OnInit } from '@angular/core';
import { Item } from '../../assets/model/item.schema';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  public readonly title = 'my app';
  itemList: Item[];

  constructor(private appservice: AppService) {}

  ngOnInit(): void {
    console.log('component initialized');
    this.appservice.getItems().subscribe((items) => (this.itemList = items));
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

}
