import { Component, OnInit } from '@angular/core';
import { DataService, List } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  allLists: List[] = [];

  constructor(private ds: DataService) {
    this.ds.allListsBS.subscribe(al => this.allLists = al);
  }

  ngOnInit(): void {
  }


}
