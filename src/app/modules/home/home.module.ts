import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomePage } from './pages/home/home.page';
import { SharedModule } from '../../shared/shared.module';
import { AnimatedAppNameComponent } from './components/animated-app-name/animated-app-name.component';
import { AnimatedTwitterBirdComponent } from './components/animated-twitter-bird/animated-twitter-bird.component';

@NgModule({
  declarations: [HomePage, AnimatedAppNameComponent, AnimatedTwitterBirdComponent],
  imports: [CommonModule, SharedModule, HomeRoutingModule]
})
export class HomeModule { }
