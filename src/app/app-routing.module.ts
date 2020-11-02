import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '@shared/components';

import { HomeRoutingModule } from './modules/home/home-routing.module';
import { NotesRoutingModule } from './notes/notes-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HomeRoutingModule,
    NotesRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
