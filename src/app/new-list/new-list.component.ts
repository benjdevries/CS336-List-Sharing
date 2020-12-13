import { Component, OnInit } from '@angular/core';
import { DataService, List, ToDo } from '../data.service';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  public creatorName: string;
  public todoListName: string;
  public itemName: string;
  public toDoItems: ToDo[] = [];

  constructor(private ds: DataService) { }

  ngOnInit(): void {
  }


  /*
  *   When "add item" button clicked, add a todo list item to todo-items collection
  */
  // currently cannot tell between items that are in this ToDo List and those
  // that are not
  // add some error message if todo_list_name not yet declared
  addItem(): void {
    const newToDo = {
      todo_list_name: this.todoListName,
      is_complete: false,
      item_name: this.itemName,
      item_timestamp: new Date()
    }
    this.ds.addToDoItem(newToDo);
  }
  /*
  *   When "create" button clicked, add a todo list to all-lists collection
  */
  // functional
  addList(): void {
    const newList = {
      creator_name: this.creatorName,
      list_timestamp: new Date(),
      todo_list_name: this.todoListName
    };
    this.ds.addToDoList(newList);
  }

}