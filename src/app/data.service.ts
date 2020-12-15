/**
 * This data service handles calls to Google Firestore.
 * All todo lists are stored in a collection called 'all-lists'.
 * Whithin each list is a collection called 'todo-items' that holds all the items. 
 */


import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private fs: AngularFirestore) { }

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

  // READ todo items from a list by list id
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

  // UPDATE name and author of a todo list
  updateNameAndAuthor(docId: string, newName: string, newAuthor: string,): void {
    this.fs.collection("all-lists").doc(docId).update({
      todo_list_name: newName,
      creator_name: newAuthor,
    });
  }

  // DELETE document by complete path
  delete(docId: string): void {
    this.fs.doc(docId).delete();
  }

  // CREATE todo list
  addToDoList(list: List): void {
    this.fs.collection<List>('all-lists').add(list);
  }

  // UPDATE item completion
  toggleItemCompletion(listId: string, itemId: string, completed: boolean): void {
    this.fs.doc(`all-lists/${listId}/todo-items/${itemId}`).update({
      is_complete: completed
    })
  }

  // UPDATE todo list with new item
  addToDoItem(listId: string, item: ToDo): void {
    this.fs.collection('all-lists').doc(listId).collection('todo-items').add(item);
  }

}

export interface List { id?: string, creator_name: string; list_timestamp: any; todo_list_name: string }

export interface ToDo { id?: string, todo_list_name?: string; is_complete: boolean; item_name: string; item_timestamp: any }

