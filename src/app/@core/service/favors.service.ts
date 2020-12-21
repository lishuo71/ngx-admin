/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { NbAuthService } from '@nebular/auth';
import { Favor, FavorData } from '../interface/favors';
import { FavorsApi } from '../api/favors.api';

@Injectable()
export class FavorService extends FavorData {

  constructor(private api: FavorsApi, private authService: NbAuthService) {
    super();
  }

  get gridDataSource(): DataSource {
    return this.api.favorsDataSource;
  }

  list(pageNumber: number = 1, pageSize: number = 10): Observable<Favor[]> {
    return this.api.list(pageNumber, pageSize);
  }

  update(favor: Favor): Observable<Favor> {
    return this.api.update(favor);
  }

  create(favor: Favor): Observable<Favor> {
    console.log('create');
    return this.api.add(favor);
  }

  delete(id: number): Observable<any> {
    return this.api.delete(id);
  }

}
