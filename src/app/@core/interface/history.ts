/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Observable } from 'rxjs';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';

export interface History {
  id: number;
  message: object;
  userId: number;
  sendTime: number;
}

export abstract class HistoryData {
  abstract get gridDataSource(): DataSource;
  abstract list(pageNumber: number, pageSize: number): Observable<History[]>;
  abstract update(history: History): Observable<History>;
  abstract create(history: History): Observable<History>;
  abstract delete(id: number): Observable<any>;
}
