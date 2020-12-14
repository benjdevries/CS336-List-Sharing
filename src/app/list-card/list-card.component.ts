import { Component, Input, OnInit } from '@angular/core';
import { DataService, List } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss']
})
export class ListCardComponent implements OnInit {
  @Input() creator_name: string;
  @Input() list_timestamp: any;
  @Input() todo_list_name: string;


  constructor(private ds: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {

  }

}

