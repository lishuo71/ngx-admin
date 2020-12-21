/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Observable } from 'rxjs';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';

export interface Message {
  id: number;
  code: string;
  stock: object;
  time: number;
  date: number;
  action: string;
  price: number;
}

export abstract class MessageData {
  abstract get gridDataSource(): DataSource;
  abstract list(pageNumber: number, pageSize: number): Observable<Message[]>;
  abstract update(message: Message): Observable<Message>;
  abstract create(message: Message): Observable<Message>;
  abstract delete(id: number): Observable<any>;
}
