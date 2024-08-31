import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { OrderServiceService } from '../../../service/order-service.service';
import { ProductImgeService } from '../../../service/product-imge.service';

@Component({
  selector: 'app-admin-manage-order',
  templateUrl: './admin-manage-order.component.html',
  styleUrls: ['./admin-manage-order.component.css'],
})
export class AdminManageOrderComponent implements OnInit {
  getAllOrder: any;
  visibleOrderDetails: { [key: number]: boolean } = {};

  constructor(
    private orderService: OrderServiceService,
    private dialog: MatDialog,
    private ImgService: ProductImgeService
  ) {}

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(): void {
    this.orderService.getAllOrders().subscribe(
      (data) => {
        this.getAllOrder = data;
        this.getAllOrder.forEach((order: any) => {
          if (order && order.orderDetails) {
            order.orderDetails.forEach((detail: any) => {
              if (detail && detail.productId) {
                this.ImgService.getProductImgByProductId(
                  detail.productId
                ).subscribe((res) => {
                  if (res) {
                    detail.img = res.map((item: any) => item.productImgData);
                  }
                });
              }
            });
          }
        });
      },
      (error) => {
        console.error('Error fetching orders', error);
      }
    );
  }

  toggleOrderDetails(orderId: number): void {
    this.visibleOrderDetails[orderId] = !this.visibleOrderDetails[orderId];
  }

  isOrderDetailsVisible(orderId: number): boolean {
    return this.visibleOrderDetails[orderId];
  }

  onEditOrder(id: any) {
    this.orderService.getById(id).subscribe((data) => {
      if (data) {
        this.dialog.open(EditOrderComponent, {
          data: data,
          height: '500px',
        });
      }
    });
  }

  onDeleteOrder(id: number): void {
    const confirmation = window.confirm('คุณต้องการลบออเดอร์นี้ใช่ไหม?');
    if (confirmation) {
      this.orderService.deleteOrder(id).subscribe(
        (response) => {
          console.log('Order deleted successfully');
        },
        (error) => {
          console.error('Error deleting order', error);
        }
      );
    }
  }
}
