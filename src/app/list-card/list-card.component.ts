import { Component, OnInit } from '@angular/core';
import { DataService, List } from '../data.service';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss']
})
export class ListCardComponent implements OnInit {

  constructor(private ds: DataService) { }

  ngOnInit(): void {
  }

}

