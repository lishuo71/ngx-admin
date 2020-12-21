/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { NbAuthService } from '@nebular/auth';
import { StocksApi } from '../api/stocks.api';
import { UsersApi } from '../api/users.api';
import { User, UserData } from '../interface/users';

@Injectable()
export class UserService extends UserData {

  constructor(private api: UsersApi, private authService: NbAuthService) {
    super();
  }

  get gridDataSource(): DataSource {
    return this.api.usersDataSource;
  }

  get(id: number): Observable<User> {
    return this.api.get(id);
  }
  
  list(pageNumber: number = 1, pageSize: number = 10): Observable<User[]> {
    return this.api.list(pageNumber, pageSize);
  }

  update(user: User): Observable<User> {
    return this.api.update(user);
  }

  create(user: User): Observable<User> {
    console.log('create');
    return this.api.add(user);
  }

  delete(id: number): Observable<any> {
    return this.api.delete(id);
  }

}
