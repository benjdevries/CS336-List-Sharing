import { Component, OnInit } from '@angular/core';
import { DataService, List } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  // this should be injected as private, but its a workaround until the data service is serving better data
  constructor(public ds: DataService) {

  }

  ngOnInit(): void {
  }


}
