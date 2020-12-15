import { Component, OnInit } from '@angular/core';
import { DataService, List, ToDo } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.scss']
})
export class ViewListComponent implements OnInit {
  public creatorName: string;
  public todoListName: string;
  public todoListNameNew: string;
  public itemName: string;

  constructor(public ds: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  // completeItem() {

  // }
}
