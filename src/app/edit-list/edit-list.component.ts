import { Component, OnInit, Input } from '@angular/core';
import { DataService, List, ToDo } from '../data.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {
  // selected todo list and its items
  selectedList: List;
  todoItems: ToDo[];

  // new values for name and auther from the ngForm, before clicking save
  editedName: string;
  editedAuthor: string;

  constructor(public ds: DataService, private route: ActivatedRoute, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    const listId = this.route.snapshot.paramMap.get('listId');
    const listObs = this.ds.getListObsById(listId);
    const todoObs = this.ds.getTodoObsById(listId);

    //Observables for the todo lists and their itesms
    listObs.subscribe(list => this.selectedList = list);
    todoObs.subscribe(todos => this.todoItems = todos);
  }

  // Delete a singular item from the todo list
  deleteItem(itemId: string): void {
    this.ds.delete(`/all-lists/${this.selectedList.id}/todo-items/${itemId}`);
  }

  // Apply changes to author and name
  saveChanges(): void {
    if (this.editedName) this.ds.updateName(this.selectedList.id, this.editedName);
    if (this.editedAuthor) this.ds.updateAuthor(this.selectedList.id, this.editedAuthor);
  }

  // Delete whole todo list
  deleteList(): void {
    this.ds.delete(`/all-lists/${this.selectedList.id}`);
    this.router.navigate(['/home'])
  }

  // Open a dialog box to confirm deletion. Uses Material Design API
  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: "Confirm Delete",
      selectedList: this.selectedList.todo_list_name
    }
    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data === 'delete') {
          this.deleteList();
        }
      }
    )
  }

}

