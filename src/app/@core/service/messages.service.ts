/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { NbAuthService } from '@nebular/auth';
import { Message, MessageData } from '../interface/messages';
import { MessagesApi } from '../api/messages.api';

@Injectable()
export class MessageService extends MessageData {

  constructor(private api: MessagesApi, private authService: NbAuthService) {
    super();
  }

  get gridDataSource(): DataSource {
    return this.api.messagesDataSource;
  }

  list(pageNumber: number = 1, pageSize: number = 10): Observable<Message[]> {
    return this.api.list(pageNumber, pageSize);
  }

  update(message: Message): Observable<Message> {
    return this.api.update(message);
  }

  create(message: Message): Observable<Message> {
    console.log('create');
    return this.api.add(message);
  }

  delete(id: number): Observable<any> {
    return this.api.delete(id);
  }

}
