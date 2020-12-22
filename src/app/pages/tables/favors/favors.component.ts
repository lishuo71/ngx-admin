import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FavorData } from 'app/@core/interface/favors';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';

import { SmartTableData } from '../../../@core/data/smart-table';

@Component({
  selector: 'ngx-favors',
  templateUrl: './favors.component.html',
  styleUrls: ['./favors.component.scss'],
})
export class FavorComponent {
  valids = [
    {value: true, title: '有效'},
    {value: false, title: '无效'},
  ];

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
          return row.favors.id; 
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
      stock: {
        title: '服务名称',
        editable: false,
        filter: true,
        valuePrepareFunction: (cell,row) => { 
          return row.favors.stock.code + " "+ row.favors.stock.name; 
        }
      },
      subscribeTime: {
        title: '订阅时间',
        editable: false,
        filter: false,
        valuePrepareFunction: (cell,row) => { 
          return row.favors.subscribeTime? new DatePipe('en-US').transform(row.favors.subscribeTime, 'yyyy-MM-dd HH:mm:ss') :""; 
        }
      },
      valid: {
        title: '是否有效',
        editable: false,
        filter: {
          type: 'checkbox',
          config: {
            true: '1',
            false: '0',
            resetText: '取消选择',
          },
        },
        editor: {
          type: 'list',
          config: {
            list: this.valids
          }
        },
        valuePrepareFunction: (cell,row) => {
          return this.getValidName(row.favors.valid);
        }
      },
    },
    actions: {
      columnTitle: '操作',
      add: false,
      edit: false,
      delete: true,
    },
    pager: {
      perPage: 50
    }
  };

  source: DataSource ;

  constructor(private service: FavorData) {
    this.source = service.gridDataSource;
  }

  onDeleteConfirm(event): void {
    if (window.confirm('确定要删除本条数据吗？')) {
      this.service.delete(event.data.favors.id).subscribe((result)=>{
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

  getValidName(valid: boolean){
    if (valid) {
      return "有效";
    } else {
      return "无效";
    }
  }
}
