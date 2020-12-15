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

  // READ all todo lists
  lists$: Observable<List[]> = this.fs.collection<List>('all-lists').snapshotChanges().pipe(
    map(actions => {
      return actions.map(p => {
        const list = p.payload.doc;
        const id = list.id;
        return { id, ...list.data() as List };
      });
    })
  )

  // READ todo list from listId
  getListObsById(listId: string): Observable<List> {
    return this.fs.collection<List>('all-lists').doc(listId).snapshotChanges().pipe(
      map(p => {
        const list = p.payload;
        const id = list.id;
        return { id, ...list.data() as List };
      })
    )
  }

  getTodoObsById(listId: string): Observable<ToDo[]> {
    return this.fs.collection<List>('all-lists').doc(listId).collection('todo-items').snapshotChanges().pipe(
      map(actions => {
        return actions.map(p => {
          const todos = p.payload.doc;
          const id = todos.id;
          return { id, ...todos.data() as ToDo };
        });
      })
    )
  }

  // UPDATE anme and author of a todo list
  updateNameAndAuthor(docId: string, newName: string, newAuthor: string,): void {
    this.fs.collection("all-lists").doc(docId).update({
      todo_list_name: newName,
      creator_name: newAuthor,
    });
  }

  // DELETE todo list by id
  delete(docId: string): void {
    this.fs.doc(docId).delete();
  }

  // CREATE todo list
  addToDoList(list: List): void {
    this.fs.collection<List>('all-lists').add(list);
  }

  // UPDATE item completeion
  toggleItemCompletion(listId: string, itemId: string, completed: boolean): void {
    this.fs.doc(`all-lists/${listId}/todo-items/${itemId}`).update({
      is_complete: completed
    })
  }


  addToDoItem(listId: string, item: ToDo): void {
    this.fs.collection('all-lists').doc(listId).collection('todo-items').add(item);
  }

  getToDoItemsForList(todo_list_name: string): ToDo[] {
    return this.allToDos.filter(list => list.todo_list_name === todo_list_name);
  }

  //   // still working on this
  //   markItemComplete(item: ToDo): void {
  //     console.log(`${item.item_name}`);
  //     this.fs.collection<ToDo>('allToDos').where("item_name", "").update({
  //       is_complete: item.is_complete,
  //     })
  //   }
}

export interface List { id?: string, creator_name: string; list_timestamp: any; todo_list_name: string }

export interface ToDo { id?: string, todo_list_name?: string; is_complete: boolean; item_name: string; item_timestamp: any }

