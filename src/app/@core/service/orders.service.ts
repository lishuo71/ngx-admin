/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { NbAuthService } from '@nebular/auth';
import { Order, OrderData } from '../interface/orders';
import { OrdersApi } from '../api/orders.api';

@Injectable()
export class OrderService extends OrderData {

  constructor(private api: OrdersApi, private authService: NbAuthService) {
    super();
  }

  get gridDataSource(): DataSource {
    return this.api.ordersDataSource;
  }

  list(pageNumber: number = 1, pageSize: number = 10): Observable<Order[]> {
    return this.api.list(pageNumber, pageSize);
  }

  update(order: Order): Observable<Order> {
    return this.api.update(order);
  }

  create(order: Order): Observable<Order> {
    console.log('create');
    return this.api.add(order);
  }

  delete(tradeno: string): Observable<any> {
    return this.api.delete(tradeno);
  }

}
