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

  selectedList: List;
  editedName: string;
  editedAuthor: string;
  todoItems: ToDo[];


  constructor(public ds: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const listId = this.route.snapshot.paramMap.get('listId');
    const listObs = this.ds.getListObsById(listId);
    const todoObs = this.ds.getTodoObsById(listId);
    listObs.subscribe(list => this.selectedList = list);
    todoObs.subscribe(todos => this.todoItems = todos);
    this.editedAuthor = this.selectedList.creator_name;
    this.editedName = this.selectedList.todo_list_name;
  }

  deleteItem(itemId: string): void {
    console.log("attepmt delete item")
    this.ds.delete(`/all-lists/${this.selectedList.id}/todo-items/${itemId}`);
  }

  saveChanges(): void {
    this.ds.updateNameAndAuthor(this.selectedList.id, this.editedName, this.editedAuthor);
  }

  deleteList(): void {
    this.ds.delete(`/all-lists/${this.selectedList.id}`)
  }

}

