import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { UserData } from 'app/@core/interface/users';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';

import { SmartTableData } from '../../../@core/data/smart-table';

@Component({
  selector: 'ngx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UserComponent {

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
        type: 'number',
        editable: false,
        filter: false
      },
      userName: {
        title: '登录名',
        type: 'string',
        filter: false
      },
      realName: {
        title: '实名/昵称',
        type: 'string',
        filter: false
      },
      lastLogin: {
        title: '最后登录时间',
        type: 'string',
        filter: false,
        valuePrepareFunction: (lastLoginTime: any) => { 
          return lastLoginTime? new DatePipe('en-US').transform(lastLoginTime, 'yyyy-MM-dd HH:mm:ss') :""; 
        }
      },
      headimgurl: {
        title: '头像',
        filter: false,
        type: 'html',
        valuePrepareFunction: (images) => {
          return `<img class='table-thumbnail-img' src="${images}"/>`
        }
      },
      phone: {
        title: '手机',
        type: 'string',
        filter: false
      },
    },
    actions: {
      columnTitle: '操作',
      add: true,
      edit: false,
      delete: false,
    }
  };

  source: DataSource ;

  constructor(private service: UserData) {
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
