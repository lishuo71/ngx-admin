import { Component } from '@angular/core';
import { StockData } from 'app/@core/interface/stocks';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';

@Component({
  selector: 'ngx-codes',
  templateUrl: './codes.component.html',
  styleUrls: ['./codes.component.scss'],
})
export class CodesComponent {

  markets = [
    {value: 0, title: 'A股'},
    {value: 1, title: '港股'},
    {value: 2, title: '美股'},
    {value: 3, title: 'A股股指'},
    {value: 4, title: '港股股指'},
    {value: 5, title: '美股股指'}
  ];

  valids = [
    {value: 0, title: '有效'},
    {value: -1, title: '无效'},
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
      code: {
        title: '代码',
        type: 'string',
        editable: false
      },
      name: {
        title: '名称',
        type: 'string',
      },
      market: {
        title: '市场',
        type: 'number',
        filter: {
          type: 'list',
          config: {
            selectText: '选择一个...',
            list: this.markets,
          }
        },
        editor: {
          type: 'list',
          config: {
            list: this.markets,
          }
        },
        valuePrepareFunction: (market) => {
          return this.getMarketName(market);
        }
      },
      valid: {
        title: '有效？',
        type: 'number',
        filter: {
          type: 'checkbox',
          config: {
            true: '0',
            false: '-1',
            resetText: '取消选择',
          },
        },
        editor: {
          type: 'list',
          config: {
            list: this.valids
          }
        },
        valuePrepareFunction: (valid) => {
          return this.getValidName(valid);
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

  constructor(private service: StockData) {
    this.source = service.gridDataSource;
  }

  onDeleteConfirm(event): void {
    if (window.confirm('确定要删除本条数据吗？')) {
      this.service.delete(event.data.code).subscribe((result)=>{
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

  getValidName(valid: number){
    if (valid == 0) {
      return "有效";
    } else {
      return "无效";
    }
  }
}
