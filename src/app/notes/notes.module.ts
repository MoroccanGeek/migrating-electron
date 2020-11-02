import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';

import { NotesComponent } from './notes.component';
import { SharedModule } from '@shared/shared.module';

import { CollapseModule } from 'ngx-bootstrap/collapse';

@NgModule({
  declarations: [NotesComponent],
  imports: [CommonModule,NotesRoutingModule,SharedModule,CollapseModule,
  ]
})
export class NotesModule { }
