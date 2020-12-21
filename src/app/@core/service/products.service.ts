/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Product, ProductData } from '../interface/products';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { ProductsApi } from '../api/products.api';
import { NbAuthService } from '@nebular/auth';

@Injectable()
export class ProductService extends ProductData {

  constructor(private api: ProductsApi, private authService: NbAuthService) {
    super();
  }

  get gridDataSource(): DataSource {
    return this.api.productsDataSource;
  }

  list(pageNumber: number = 1, pageSize: number = 10): Observable<Product[]> {
    return this.api.list(pageNumber, pageSize);
  }

  get(id: number): Observable<Product> {
    return this.api.get(id);
  }

  update(product: Product): Observable<Product> {
    return this.api.update(product);
  }

  create(product: Product): Observable<Product> {
    console.log('create');
    return this.api.add(product);
  }

  delete(id: number): Observable<any> {
    return this.api.delete(id);
  }
}
