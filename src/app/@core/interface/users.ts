/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Observable } from 'rxjs';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';

export interface User {
  id: number;
  name: string;
  password: string;
  realName: string;
  lastLogin: string;
  headimgurl: string;
  phone: string;
}

export abstract class UserData {
  abstract get gridDataSource(): DataSource;
  abstract list(pageNumber: number, pageSize: number): Observable<User[]>;
  abstract get(id: number): Observable<User>;
  abstract update(user: User): Observable<User>;
  abstract create(user: User): Observable<User>;
  abstract delete(id: number): Observable<any>;
}
