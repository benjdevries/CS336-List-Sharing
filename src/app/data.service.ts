/*
*   There are two collections within CS336-list-sharing: all-lists and todo-items.
*   all-lists has documents for each added list with fields creator_name (string),
*     list_timestamp (timestamp), and todo_list_name (string).
*   todo-items has documents for each added todo-item for any list document with
*     fields todo_list_name (string) that identifies its list from all-lists, is_complete
*     (boolean), item_name (string), and item_timestamp (timestamp).
*/

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';

import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  public allLists: List[];
  public allListsBS: BehaviorSubject<List[]> = new BehaviorSubject<List[]>(null);
  public allToDos: ToDo[] = [];
  public listData: Observable<any[]>;
  public listCollection: any;
  public creator_name;
  public list_timestamp;
  public todo_list_name;

  private listCollectionName: string = 'all-lists';

  constructor(private fs: AngularFirestore) {
    fs.collection<List>('all-lists', ref => ref.orderBy('list_timestamp')).valueChanges().subscribe(lists => {
      this.allLists = lists
    });


    fs.collection<ToDo>('todo-items', ref => ref.orderBy('item_timestamp')).valueChanges({ whichList: 'todo_list_name' }).subscribe(
      toDos => {
        this.allToDos = toDos;
      });
  }

  addToDoList(list: List): void {
    this.fs.collection<List>('all-lists').add(list);
  }

  // editToDoList(list: List) {
  //   return this.fs.collection(this.listCollectionName).doc(list.todo_list_name).update(list);
  // }

  // deleteToDoList(list: List) {
  //   this.fs.doc('all-lists/' + ).
  // }

  getLists() {
    return this.allLists;
  }

  addToDoItem(item: ToDo): void {
    this.fs.collection<ToDo>('todo-items').add(item);
  }

  getToDoItemsForList(todo_list_name: string): ToDo[] {
    return this.allToDos.filter(list => list.todo_list_name === todo_list_name);
  }

  // still working on this
  markItemComplete(item: ToDo): void {
    this.fs.collection('allToDos').doc<ToDo>('${item.todo_list_name}').update({
      is_complete: item.is_complete,
    })
  }
}

export interface List { creator_name: string; list_timestamp: any; todo_list_name: string }

export interface ToDo { todo_list_name?: string; is_complete: boolean; item_name: string; item_timestamp: any }

