import { Component, OnInit } from '@angular/core';
import { OrderServiceService } from '../../../service/order-service.service';
import { ProductImgeService } from '../../../service/product-imge.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cancel-order',
  templateUrl: './cancel-order.component.html',
  styleUrl: './cancel-order.component.css',
})
export class CancelOrderComponent implements OnInit {
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

  cancelOrder(orderId: number) {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.orderService.cancelOrder(orderId, parseInt(userId)).subscribe(
        (response) => {
          Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: 'ไม่สามารถยกเลิกคำสั่งซื้อได้',
            confirmButtonText: 'ตกลง',
          }).then(() => {
            this.ngOnInit(); // Reload orders to reflect changes
          });
        },
        (error) => {
          Swal.fire({
            icon: 'success',
            title: 'สำเร็จ',
            text: 'คำสั่งซื้อถูกยกเลิกแล้ว',
            confirmButtonText: 'ตกลง',
          });
        }
      );
    }
  }
}
