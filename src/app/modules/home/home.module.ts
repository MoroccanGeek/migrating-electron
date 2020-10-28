import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomePage } from './pages/home/home.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [HomePage],
  imports: [CommonModule, SharedModule, HomeRoutingModule]
})
export class HomeModule { }
