import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AccountManagementPage } from './pages/account-management/account-management.page';
import { AppConfigPage } from './pages/app-config/app-config.page';
import { ApiKeysManagementPage } from './pages/api-keys-management/api-keys-management.page';
import { ProjectManagementPage } from './pages/project-management/project-management.page';
import { DownloadLocationPage } from './pages/download-location/download-location.page';

const routes: Routes = [
  {
    path: 'config-page',
    component: AppConfigPage,
    children: [
      {
        path: 'accounts-management',
        component: AccountManagementPage
      },
      {
        path: 'api-keys-management',
        component: ApiKeysManagementPage
      },
      {
        path: 'projects-management',
        component: ProjectManagementPage
      },
      {
        path: 'download-location',
        component: DownloadLocationPage
      }
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppConfigRoutingModule { }
