/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';

@Injectable()
export class ProductsApi {
  private readonly apiController: string = 'admin/product';

  constructor(private api: HttpService) {}

  get productsDataSource(): DataSource {
    return this.api.getServerDataSource(`${this.api.apiUrl}/${this.apiController}`);
  }

  list(pageNumber: number = 1, pageSize: number = 10): Observable<any[]> {
    const params = new HttpParams()
      .set('page', `${pageNumber}`)
      .set('size', `${pageSize}`);

    return this.api.get(this.apiController, { params });
  }

  getCurrent(): Observable<any> {
    return this.api.get(`${this.apiController}/current`);
  }

  get(id: number): Observable<any> {
    return this.api.get(`${this.apiController}/${id}`)
      .pipe(map(data => {
        const picture = `${this.api.apiUrl}/${this.apiController}/${data.id}/photo`;
        return { ...data, picture };
      }));
  }

  delete(id: number): Observable<any> {
    return this.api.delete(`${this.apiController}/delete/${id}`);
  }

  add(item: any): Observable<any> {
    return this.api.post(`${this.apiController}/add`, item);
  }

  updateCurrent(item: any): Observable<any> {
    return this.api.put(`${this.apiController}/current`, item);
  }

  update(item: any): Observable<any> {
    return this.api.put(`${this.apiController}/update/${item.id}`, item);
  }
}
