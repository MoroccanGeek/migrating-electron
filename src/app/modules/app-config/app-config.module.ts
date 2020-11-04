import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppConfigRoutingModule } from './app-config-routing.module';

import { AccountManagementPage } from './pages/account-management/account-management.page';
import { SharedModule } from '../../shared/shared.module';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AppConfigPage } from './pages/app-config/app-config.page';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AddNewItemComponent } from './components/account-crud/add-new-account/add-new-account.component';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'app/app-routing.module';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { DeleteAccountComponent } from './components/account-crud/delete-account/delete-account.component';
import { UpdateAccountComponent } from './components/account-crud/update-account/update-account.component';

@NgModule({
  declarations: [
    AccountManagementPage,
    AppConfigPage,
    SidebarComponent,
    AddNewItemComponent,
    DeleteAccountComponent,
    UpdateAccountComponent
  ],
  imports: [
    CommonModule,
    AppConfigRoutingModule,
    SharedModule,
    CollapseModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ModalModule.forRoot()
  ],
  providers: [BsModalService],
})
export class AppConfigModule { }
