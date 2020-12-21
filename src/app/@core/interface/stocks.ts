/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Observable } from 'rxjs';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';

export interface Stock {
  code: string;
  name: string;
  market: string;
  valid: boolean;
}

export abstract class StockData {
  abstract get gridDataSource(): DataSource;
  abstract list(pageNumber: number, pageSize: number): Observable<Stock[]>;
  abstract update(stock: Stock): Observable<Stock>;
  abstract create(stock: Stock): Observable<Stock>;
  abstract delete(code: string): Observable<any>;
}
