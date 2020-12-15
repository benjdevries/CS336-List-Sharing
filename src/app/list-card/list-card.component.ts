import { Component, Input, OnInit } from '@angular/core';
import { DataService, List } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatRipple } from '@angular/material/core';


@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss']
})
export class ListCardComponent implements OnInit {
  @Input() creator_name: string;
  @Input() list_timestamp: any;
  @Input() todo_list_name: string;
  @Input() listId: string;

  constructor(private ds: DataService, private route: ActivatedRoute, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void { }

  // Delete the entire todo list
  deleteList(listId: string): void {
    this.ds.delete(`/all-lists/${listId}`);
    this.router.navigate(['/home'])
  }

  // Configure and open the delete confirmation box. Uses the Material Design API.
  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: "Confirm Delete",
      selectedList: this.todo_list_name
    }
    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data === 'delete') {
          this.deleteList(this.listId);
        }
      }
    )
  }
}

