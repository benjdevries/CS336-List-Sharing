import { Component, OnInit, Input } from '@angular/core';
import { DataService, List, ToDo } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {
  public creatorName: string;
  public todoListName: string;
  public todoListNameNew: string;
  public itemName: string;

  constructor(public ds: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.todoListName = this.route.snapshot.paramMap.get('todo-list-name');
  }

  addItem(): void {
    const newToDo = {
      // todo_list_name: this.todoListName,
      todo_list_name: "Groceries",
      is_complete: false,
      item_name: this.itemName,
      item_timestamp: new Date()
    }
    this.ds.addToDoItem(newToDo);
  }

}

