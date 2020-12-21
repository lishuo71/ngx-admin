import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { OrderData } from 'app/@core/interface/orders';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';

import { SmartTableData } from '../../../@core/data/smart-table';

@Component({
  selector: 'ngx-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrderComponent {

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
    /*
    `tradeno` char(32) CHARACTER SET latin1 NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL DEFAULT '0',
  `payment` timestamp NULL DEFAULT NULL,
  `payamount` int(11) DEFAULT NULL,
  `transactionid` varchar(32) DEFAULT NULL,
  `expiretime` timestamp NULL DEFAULT NULL,
  `pay_start_time` timestamp NULL DEFAULT NULL,
  `wx_result` varchar(1024) DEFAULT NULL,
  `pay_method` varchar(10) DEFAULT NULL,
  `product_name` varchar(128) DEFAULT NULL,
  `period` int(1) DEFAULT NULL,
  `limits` int(1) DEFAULT NULL,
  */
    columns: {
      tradeno: {
        title: '订单号',
        editable: false,
        filter: false
      },
      login: {
        title: '用户',
        editable: false,
        filter: false,
        valuePrepareFunction: (user: any) => { 
          return user? user.realName :""; 
        }
      },
      product: {
        title: '服务名称',
        editable: false,
        filter: false,
        valuePrepareFunction: (product: any) => { 
          return product? product.name :""; 
        }
      },
      payment: {
        title: '支付时间',
        editable: false,
        filter: false,
        valuePrepareFunction: (payTime: any) => { 
          return payTime? new DatePipe('en-US').transform(payTime, 'yyyy-MM-dd HH:mm:ss') :""; 
        }
      },
      payamount: {
        title: '支付金额(元)',
        editable: false,
        filter: false,
        valuePrepareFunction: (amount: any) => { 
          return amount? amount/100 :"0"; 
        }
      },
      transactionId: {
        title: '微信支付交易号',
        editable: false,
        filter: false,
      },
      expire: {
        title: '订单到期时间',
        editable: false,
        filter: false,
        valuePrepareFunction: (time: any) => { 
          return time? new DatePipe('en-US').transform(time, 'yyyy-MM-dd HH:mm:ss') :""; 
        }
      },
      payMethod: {
        title: '支付方式',
        editable: false,
        filter: false,
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

  constructor(private service: OrderData) {
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
