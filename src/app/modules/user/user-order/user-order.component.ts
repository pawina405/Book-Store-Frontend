import { Component, OnInit } from '@angular/core';
import { OrderServiceService } from '../../../service/order-service.service';
import { ProductImgeService } from '../../../service/product-imge.service';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css'],
})
export class UserOrderComponent implements OnInit {
  Order: any;
  selectedOrderId: number | null = null;

  constructor(
    private orderService: OrderServiceService,
    private ImgService: ProductImgeService
  ) {}

  ngOnInit() {
    if (typeof window !== 'undefined') {
      const userId = sessionStorage.getItem('userId') as any;
      this.orderService.getordersByUserId(userId).subscribe((data) => {
        if (data) {
          this.Order = data;

          // Ensure Order data is ready before fetching images
          this.Order.forEach((order: any) => {
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
        }
        console.log(this.Order);
      });
    }
  }

  toggleDetails(orderId: number) {
    this.selectedOrderId = this.selectedOrderId === orderId ? null : orderId;
  }
}
