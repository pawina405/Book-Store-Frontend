import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserPaymentComponent } from '../user-payment/user-payment.component';
import { ProductServiceService } from '../../../service/product-service.service';
import { UserOrderComponent } from '../user-order/user-order.component';
import { ProductImgeService } from '../../../service/product-imge.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css'],
})
export class UserCartComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private product: ProductServiceService,
    private ImgService: ProductImgeService
  ) {}

  quantity: number = 1;
  setCart: any;
  totalAmount = 0;
  Calculate: any;
  vatAmount: any;
  productImg: any[] = [];

  ngOnInit(): void {
    this.onCart();
  }

  removeItemFromCart(_t13: any) {
    throw new Error('Method not implemented.');
  }
  cartsItem: any;
  totalPrice = 0;

  onCart() {
    if (typeof window !== 'undefined') {
      let cart = sessionStorage.getItem('carts') as any;
      if (cart) {
        let cartData = JSON.parse(cart);
        this.setCart = cartData.map((product: any) => ({
          ...product,
          img: [],
        }));
      }
      this.setCart.forEach((product: any) => {
        if (product) {
          this.ImgService.getProductImgByProductId(product.id).subscribe(
            (res) => {
              if (res) {
                res.forEach((item: any) => {
                  product.img.push(item.productImgData);
                });
              }
            }
          );
          product.formatPrice = Number(product.price).toLocaleString('en-US');
        }
      });
      this.onCalculateTotal(this.setCart);
    }
  }

  plusQty(id: number) {
    let oldProduct = this.setCart.find((item: any) => item.id === id);
    if (oldProduct && oldProduct.qty < 10) {
      oldProduct.qty += 1;
      sessionStorage.setItem('carts', JSON.stringify(this.setCart));
    }
    this.onCalculateTotal(this.setCart);
  }

  minusQty(id: number) {
    let oldProduct = this.setCart.find((item: any) => item.id === id);
    if (oldProduct && oldProduct.qty > 1) {
      oldProduct.qty -= 1;
      sessionStorage.setItem('carts', JSON.stringify(this.setCart));
    }
    this.onCalculateTotal(this.setCart);
  }

  onRemove(id: number) {
    Swal.fire({
      title: 'คุณต้องการลบสินค้าใช่หรือไม่ ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ไม่',
    }).then((result) => {
      if (result.isConfirmed) {
        this.setCart = this.setCart.filter((item: any) => item.id !== id);
        sessionStorage.setItem('carts', JSON.stringify(this.setCart));
        Swal.fire('ลบสินค้าเรียบร้อย', '', 'success');
        this.onCalculateTotal(this.setCart); // Recalculate total after item removal
      }
    });
  }

  onPayment() {
    this.dialog.open(UserPaymentComponent, { height: '900px' });
  }

  onCalculateTotal(CalculateTotal: any) {
    if (CalculateTotal) {
      let total = 0;
      CalculateTotal.forEach((item: any) => {
        total += item.price * item.qty;
      });
      this.totalAmount = total;
      this.Calculate = total.toLocaleString('en-US');
    }
  }
}
