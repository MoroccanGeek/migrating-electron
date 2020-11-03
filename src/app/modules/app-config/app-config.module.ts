import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppConfigRoutingModule } from './app-config-routing.module';

import { AccountManagementPage } from './pages/account-management/account-management.page';
import { SharedModule } from '../../shared/shared.module';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AppConfigPage } from './pages/app-config/app-config.page';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [AccountManagementPage, AppConfigPage, SidebarComponent],
  imports: [
    CommonModule,
    AppConfigRoutingModule,
    SharedModule,
    CollapseModule,
  ]
})
export class AppConfigModule { }
