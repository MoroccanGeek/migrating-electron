import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AccountManagementPage } from './pages/account-management/account-management.page';
import { AppConfigPage } from './pages/app-config/app-config.page';
import { ApiKeysManagementPage } from './pages/api-keys-management/api-keys-management.page';

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
