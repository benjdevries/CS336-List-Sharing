import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

export interface FirestoreRec {
  is_complete: boolean,
  item_name: string,
  item_timestamp: firebase.default.firestore.Timestamp
}

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  // initialize fields from to-do items document in collection todo-items
  isComplete: boolean

  constructor() { }

  ngOnInit(): void {
  }

}

