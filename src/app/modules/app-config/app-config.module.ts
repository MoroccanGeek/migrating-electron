import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppConfigRoutingModule } from './app-config-routing.module';
import { SharedModule } from '@shared/shared.module';
import { AppRoutingModule } from 'app/app-routing.module';

import { AppConfigPage } from './pages/app-config/app-config.page';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';

import { AddNewAccountComponent } from './components/account-crud/add-new-account/add-new-account.component';
import { AccountManagementPage } from './pages/account-management/account-management.page';
import { DeleteAccountComponent } from './components/account-crud/delete-account/delete-account.component';
import { EditAccountComponent } from './components/account-crud/edit-account/edit-account.component';

import { ApiKeysManagementPage } from './pages/api-keys-management/api-keys-management.page';
import { AddNewApiKeyComponent } from './components/api-keys-crud/add-new-api-key/add-new-api-key.component';
import { DeleteApiKeyComponent } from './components/api-keys-crud/delete-api-key/delete-api-key.component';
import { UpdateApiKeyComponent } from './components/api-keys-crud/update-api-key/update-api-key.component';

import { ProjectManagementPage } from './pages/project-management/project-management.page';
import { AddNewProjectComponent } from './components/projects-crud/add-new-project/add-new-project.component';
import { UpdateProjectComponent } from './components/projects-crud/update-project/update-project.component';
import { DeleteProjectComponent } from './components/projects-crud/delete-project/delete-project.component';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AlertModule } from 'ngx-bootstrap/alert';
import { DownloadLocationPage } from './pages/download-location/download-location.page';

@NgModule({
  declarations: [
    AccountManagementPage,
    AppConfigPage,
    SidebarComponent,
    AddNewAccountComponent,
    EditAccountComponent,
    DeleteAccountComponent,
    ApiKeysManagementPage,
    AddNewApiKeyComponent,
    DeleteApiKeyComponent,
    UpdateApiKeyComponent,
    ProjectManagementPage,
    AddNewProjectComponent,
    UpdateProjectComponent,
    DeleteProjectComponent,
    DownloadLocationPage
  ],
  imports: [
    CommonModule,
    AppConfigRoutingModule,
    SharedModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    PaginationModule.forRoot(),
    AlertModule.forRoot()
  ],
  providers: [BsModalService],
})
export class AppConfigModule { }
