import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NewListComponent } from './new-list/new-list.component';
import { EditListComponent } from './edit-list/edit-list.component';
import { ViewListComponent } from './view-list/view-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'edit-list/:listId', component: EditListComponent },
  { path: 'new-list', component: NewListComponent },
  { path: 'list/:listId', component: ViewListComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
