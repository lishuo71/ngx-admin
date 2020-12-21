/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Observable } from 'rxjs';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';

export interface Favor {
  id: number;
  code: string;
  isValid: number;
  userId: number;
  subscribeTime: number;
}

export abstract class FavorData {
  abstract get gridDataSource(): DataSource;
  abstract list(pageNumber: number, pageSize: number): Observable<Favor[]>;
  abstract update(favor: Favor): Observable<Favor>;
  abstract create(favor: Favor): Observable<Favor>;
  abstract delete(id: number): Observable<any>;
}
