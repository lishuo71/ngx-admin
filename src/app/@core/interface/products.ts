/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Observable } from 'rxjs';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';

export interface Product {
  id: number;
  name: string;
  price: number;
  period: number;
  limit: number;
  description: string;
  memo: string;
  market: string;
  listprice: number;
}

export abstract class ProductData {
  abstract get gridDataSource(): DataSource;
  abstract list(pageNumber: number, pageSize: number): Observable<Product[]>;
  abstract get(id: number): Observable<Product>;
  abstract update(product: Product): Observable<Product>;
  abstract create(product: Product): Observable<Product>;
  abstract delete(id: number): Observable<any>;
}
