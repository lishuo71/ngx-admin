/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';

@Injectable()
export class StocksApi {
  private readonly apiController: string = 'admin/stock';

  constructor(private api: HttpService) {}

  get stocksDataSource(): DataSource {
    return this.api.getServerDataSource(`${this.api.apiUrl}/${this.apiController}`);
  }

  list(pageNumber: number = 1, pageSize: number = 10): Observable<any[]> {
    const params = new HttpParams()
      .set('page', `${pageNumber}`)
      .set('size', `${pageSize}`);

    return this.api.get(this.apiController, { params });
  }

  delete(code: string): Observable<any> {
    return this.api.delete(`${this.apiController}/delete/${code}`);
  }

  add(item: any): Observable<any> {
    return this.api.post(`${this.apiController}/add`, item);
  }

  updateCurrent(item: any): Observable<any> {
    return this.api.put(`${this.apiController}/current`, item);
  }

  update(item: any): Observable<any> {
    return this.api.put(`${this.apiController}/update/${item.code}`, item);
  }
}
