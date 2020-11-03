import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AccountManagementPage } from './pages/account-management/account-management.page';
import { AppConfigPage } from './pages/app-config/app-config.page';

const routes: Routes = [
  {
    path: 'config-page',
    component: AppConfigPage,
    children: [
      {
        path: 'accounts-management',
        component: AccountManagementPage
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
