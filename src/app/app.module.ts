import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NewListComponent } from './new-list/new-list.component';
import { EditListComponent } from './edit-list/edit-list.component';
import { ViewListComponent } from './view-list/view-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { ListCardComponent } from './list-card/list-card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ListItemComponent } from './list-item/list-item.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDVSbiGFIQK_z8RDuQ0Pm-_sC46BPvSMOc",
  authDomain: "cs336-list-sharing.firebaseapp.com",
  databaseURL: "https://cs336-list-sharing.firebaseio.com",
  projectId: "cs336-list-sharing",
  storageBucket: "cs336-list-sharing.appspot.com",
  messagingSenderId: "1027025953362",
  appId: "1:1027025953362:web:a164176e3146a3d6b5358b",
  measurementId: "G-5YM5G5C5TZ"
};


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewListComponent,
    EditListComponent,
    ViewListComponent,
    ListCardComponent,
    ListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
