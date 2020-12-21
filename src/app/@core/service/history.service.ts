/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { NbAuthService } from '@nebular/auth';
import { History,HistoryData } from '../interface/history';
import { HistoryApi } from '../api/history.api';

@Injectable()
export class HistoryService extends HistoryData {

  constructor(private api: HistoryApi, private authService: NbAuthService) {
    super();
  }

  get gridDataSource(): DataSource {
    return this.api.historyDataSource;
  }

  list(pageNumber: number = 1, pageSize: number = 10): Observable<History[]> {
    return this.api.list(pageNumber, pageSize);
  }

  update(history: History): Observable<History> {
    return this.api.update(history);
  }

  create(history: History): Observable<History> {
    console.log('create');
    return this.api.add(history);
  }

  delete(id: number): Observable<any> {
    return this.api.delete(id);
  }

}
