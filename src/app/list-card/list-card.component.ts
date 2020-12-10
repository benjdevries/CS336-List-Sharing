import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

export interface FirestoreRec {
  creator_name: string,
  list_timestamp: firebase.default.firestore.Timestamp,
  todo_list_name: string
}

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss']
})
export class ListCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

