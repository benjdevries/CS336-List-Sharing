import { Component, OnInit } from '@angular/core';
import { DataService, List, ToDo } from '../data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.scss']
})
export class ViewListComponent implements OnInit {

  selectedList: List;
  todoItems: ToDo[];
  itemName: string;

  constructor(public ds: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const listId = this.route.snapshot.paramMap.get('listId');
    const listObs = this.ds.getListObsById(listId);
    const todoObs = this.ds.getTodoObsById(listId);
    listObs.subscribe(list => this.selectedList = list);
    todoObs.subscribe(todos => this.todoItems = todos);
  }

  // Add a singular item to the todo list
  addItem(): void {
    const newToDo: ToDo = {
      is_complete: false,
      item_name: this.itemName,
      item_timestamp: new Date()
    }
    this.ds.addToDoItem(this.selectedList.id, newToDo);
    this.itemName = "";
  }

  // Toggle the completion of a todo item
  completeItem(itemId: string, completed: boolean) {
    this.ds.toggleItemCompletion(this.selectedList.id, itemId, completed);
  }
}
