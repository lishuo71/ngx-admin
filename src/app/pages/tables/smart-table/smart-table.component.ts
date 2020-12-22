import { Component } from '@angular/core';
import { ProductData } from 'app/@core/interface/products';
import { LocalDataSource, ServerDataSource } from 'ng2-smart-table';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';

import { SmartTableData } from '../../../@core/data/smart-table';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent {

  markets = [
    {value: 0, title: 'A股'},
    {value: 1, title: '港股'},
    {value: 2, title: '美股'},
    {value: 3, title: 'A股股指'},
    {value: 4, title: '港股股指'},
    {value: 5, title: '美股股指'}
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
        type: 'number',
        editable: false,
        filter: false
      },
      name: {
        title: '名称',
        type: 'string',
        filter: false
      },
      price: {
        title: '价格(元)',
        type: 'number',
        filter: false
      },
      listprice: {
        title: '原价(元)',
        type: 'number',
        filter: false
      },
      period: {
        title: '有效期(天)',
        type: 'number',
        filter: false
      },
      limit: {
        title: '订阅数(个)',
        type: 'number',
        filter: false
      },
      description: {
        title: '描述',
        type: 'string',
        filter: false,
        editor: {
          type: 'textarea',
        }
      },
      memo: {
        title: '副标题',
        type: 'string',
        filter: false
      },
      market: {
        title: '市场',
        type: 'number',
        filter: false,
        editor: {
          type: 'list',
          config: {
            list: this.markets
          }
        },
        valuePrepareFunction: (market) => {
          return this.getMarketName(market);
        }
      },
    },
    actions: {
      columnTitle: '操作'
    },
    pager: {
      perPage: 50
    }
  };

  source: DataSource ;

  constructor(private service: ProductData) {
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

  getMarketName(market: number) {
    //console.log("market:" + market);
    if (market == null) {
      return;
    }
    let m = this.markets.find(element => element.value==market );
    if (m) {
      return m.title;
    } else {
      return market;
    }
  }
}
