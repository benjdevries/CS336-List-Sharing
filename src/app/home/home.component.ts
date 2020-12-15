import { Component, OnInit } from '@angular/core';
import { DataService, List } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  todoLists: List[];

  constructor(public ds: DataService) { }

  // Subscribe to the collection of todo lists on component load
  ngOnInit(): void {
    this.ds.getAllLists().subscribe(lists => this.todoLists = lists);

  }


}
