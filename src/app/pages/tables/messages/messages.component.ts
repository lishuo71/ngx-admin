import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MessageData } from 'app/@core/interface/messages';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';

import { SmartTableData } from '../../../@core/data/smart-table';

@Component({
  selector: 'ngx-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        editable: false,
        filter: false
      },
      stock: {
        title: '名称',
        editable: false,
        filter: false,
        valuePrepareFunction: (stock: any) => { 
          return stock? stock.code + " " + stock.name :""; 
        }
      },
      date: {
        title: '日期',
        editable: false,
        filter: false,
        valuePrepareFunction: (date: any) => { 
          return date? new DatePipe('en-US').transform(date, 'yyyy-MM-dd') :""; 
        }
      },
      time: {
        title: '时间',
        editable: false,
        filter: false,
      },
      action: {
        title: '提示',
        editable: false,
        filter: false,
      },
      price: {
        title: '价格',
        editable: false,
        filter: false,
      },
    },
    actions: {
      columnTitle: '操作',
      add: true,
      edit: true,
      delete: true,
    }
  };

  source: DataSource ;

  constructor(private service: MessageData) {
    this.source = service.gridDataSource;
  }

  onDeleteConfirm(event): void {
    if (window.confirm('确定要删除本条数据吗？')) {
      this.service.delete(event.data.id).subscribe((result)=>{
        console.log("delete result: " + JSON.stringify(result));
        if (result.code != 0) {
          alert("删除失败：" + result.message);
        }
        event.confirm.resolve();
      });
      
    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event) {
    if (window.confirm('确定要修改本条数据吗？')) {
      
      this.service.update(event.newData).subscribe((result)=>{
        console.log("update result: " + JSON.stringify(result));
      });

      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event) {
    if (window.confirm('确定要增加本条数据吗？')) {
      console.log("event:" + JSON.stringify(event.newData));
      this.service.create(event.newData).subscribe((result)=>{
        console.log("add result: " + JSON.stringify(result));
      });
      
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }
}
