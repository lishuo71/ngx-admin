import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables.component';
import { SmartTableComponent } from './smart-table/smart-table.component';
import { TreeGridComponent } from './tree-grid/tree-grid.component';
import { CodesComponent } from './codes/codes.component';
import { UserComponent } from './users/users.component';
import { OrderComponent } from './orders/orders.component';
import { FavorComponent } from './favors/favors.component';
import { MessagesComponent } from './messages/messages.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [{
  path: '',
  component: TablesComponent,
  children: [
    {
      path: 'products',
      component: SmartTableComponent,
    },
    {
      path: 'codes',
      component: CodesComponent,
    },
    {
      path: 'users',
      component: UserComponent,
    },
    {
      path: 'orders',
      component: OrderComponent,
    },
    {
      path: 'favors',
      component: FavorComponent,
    },
    {
      path: 'messages',
      component: MessagesComponent,
    },
    {
      path: 'history',
      component: HistoryComponent,
    },
    {
      path: 'tree-grid',
      component: TreeGridComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule { }

export const routedComponents = [
  TablesComponent,
  SmartTableComponent,
  CodesComponent,
  UserComponent,
  OrderComponent,
  FavorComponent,
  MessagesComponent,
  HistoryComponent,
  TreeGridComponent,
];
