/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { ServerDataSource } from 'ng2-smart-table';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class HttpService {

  get apiUrl(): string {
    return environment.host;
  }

  constructor(private http: HttpClient) {}

  getServerDataSource(uri: string): DataSource {
    return new ServerDataSource(this.http,
      {
        endPoint: uri,
        totalKey: 'totalElements',
        dataKey: 'content',
        pagerPageKey: 'pageNumber',
        pagerLimitKey: 'pageSize',
        filterFieldKey: 'filterBy#field#',
        sortFieldKey: 'sortBy',
        sortDirKey: 'orderBy',
      });
  }

  get(endpoint: string, options?): Observable<any> {
    return this.http.get(`${this.apiUrl}/${endpoint}`, options);
  }

  post(endpoint: string, data, options?): Observable<any> {
    console.log("do post:" + `${this.apiUrl}/${endpoint}`);
    return this.http.post(`${this.apiUrl}/${endpoint}`, data, options).pipe(
      catchError(err => {
        console.log("post error: " + err);
        return throwError(err);
      })
    );
    
  }

  put(endpoint: string, data, options?): Observable<any> {
    return this.http.put(`${this.apiUrl}/${endpoint}`, data, options);
  }

  delete(endpoint: string, options?): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${endpoint}`, options);
  }
}
