/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Observable } from 'rxjs';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';

export interface Order {
  tradeno: string;
  payment: number;
  payamount: number;
  transactionid: string;
  expiretime: number;
  pay_method: string;
}

export abstract class OrderData {
  abstract get gridDataSource(): DataSource;
  abstract list(pageNumber: number, pageSize: number): Observable<Order[]>;
  abstract update(order: Order): Observable<Order>;
  abstract create(order: Order): Observable<Order>;
  abstract delete(tradeno: string): Observable<any>;
}
