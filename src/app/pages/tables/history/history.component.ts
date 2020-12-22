import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { HistoryData } from 'app/@core/interface/history';
import { MessageData } from 'app/@core/interface/messages';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';

import { SmartTableData } from '../../../@core/data/smart-table';

@Component({
  selector: 'ngx-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent {

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
        filter: false,
        valuePrepareFunction: (cell,row) => { 
          return row.message.id; 
        }
      },
      stock: {
        title: '名称',
        editable: false,
        filter: true,
        valuePrepareFunction: (cell,row) => { 
          return row.message.stock.code + " " + row.message.stock.name; 
        }
      },
      date: {
        title: '日期',
        editable: false,
        filter: false,
        valuePrepareFunction: (cell,row) => { 
          return new DatePipe('en-US').transform(row.message.date, 'yyyy-MM-dd'); 
        }
      },
      time: {
        title: '时间',
        editable: false,
        filter: false,
        valuePrepareFunction: (cell,row) => { 
          return row.message.time; 
        }
      },
      action: {
        title: '提示',
        editable: false,
        filter: false,
        valuePrepareFunction: (cell,row) => { 
          return row.message.action; 
        }
      },
      price: {
        title: '价格',
        editable: false,
        filter: false,
        valuePrepareFunction: (cell,row) => { 
          return row.message.price; 
        }
      },
      userId: {
        title: '用户',
        editable: false,
        filter: true,
        valuePrepareFunction: (cell,row) => { 
          return row.login.realName; 
        }
      },
      sendTime: {
        title: '发送时间',
        editable: false,
        filter: false,
        valuePrepareFunction: (time: any) => { 
          return time? new DatePipe('en-US').transform(time, 'yyyy-MM-dd HH:mm:ss') :""; 
        }
      },
    },
    actions: {
      columnTitle: '操作',
      add: false,
      edit: false,
      delete: false,
    },
    pager: {
      perPage: 50
    }
  };

  source: DataSource ;

  constructor(private service: HistoryData) {
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
