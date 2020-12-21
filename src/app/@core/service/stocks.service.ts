/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Stock, StockData } from '../interface/stocks';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { NbAuthService } from '@nebular/auth';
import { StocksApi } from '../api/stocks.api';

@Injectable()
export class StockService extends StockData {

  constructor(private api: StocksApi, private authService: NbAuthService) {
    super();
  }

  get gridDataSource(): DataSource {
    return this.api.stocksDataSource;
  }

  list(pageNumber: number = 1, pageSize: number = 10): Observable<Stock[]> {
    return this.api.list(pageNumber, pageSize);
  }

  update(stock: Stock): Observable<Stock> {
    return this.api.update(stock);
  }

  create(stock: Stock): Observable<Stock> {
    console.log('create');
    return this.api.add(stock);
  }

  delete(code: string): Observable<any> {
    return this.api.delete(code);
  }

}
