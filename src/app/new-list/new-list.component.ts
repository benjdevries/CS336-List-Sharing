import { Component, OnInit } from '@angular/core';
import { DataService, List, ToDo } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  // values for name and author from ngForm
  public creatorName: string;
  public todoListName: string;

  constructor(private ds: DataService, private router: Router) { }

  ngOnInit(): void {
  }


  /*
  *   When "create" button clicked, add a todo list to all-lists collection
  */
  // functional
  addList(): void {
    const newList: List = {
      creator_name: this.creatorName,
      list_timestamp: new Date(),
      todo_list_name: this.todoListName
    };
    this.ds.addToDoList(newList);
    this.router.navigate(['/home']);
  }

}