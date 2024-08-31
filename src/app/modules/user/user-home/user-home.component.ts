import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserProductDetailComponent } from '../user-product-detail/user-product-detail.component';
import { ProductServiceService } from '../../../service/product-service.service';
import { ProductTypeServiceService } from '../../../service/product-type-service.service';
import { ProductImgeService } from '../../../service/product-imge.service';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserCartComponent } from '../user-cart/user-cart.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
})
export class UserHomeComponent implements OnInit {
  img: any = [];
  carts: any[] = [];

  cart1: any = [];
  products: any;
  productImg: any;
  quantity: number = 1;

  constructor(
    private dialog: MatDialog,
    private productService: ProductServiceService,
    private productImgService: ProductImgeService,
    private productTypeService: ProductTypeServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productService.getAllProduct().subscribe((data) => {
      if (data) {
        this.products = data.data.map((product: any) => ({
          ...product,
          img: [],
        }));

        this.products.forEach((items: any) => {
          this.productImgService
            .getProductImgByProductId(items.id)
            .subscribe((res) => {
              if (res) {
                res.forEach((item: any) => {
                  items.img.push(item.productImgData);
                });
              }
            });
        });
      }
    });

    if (typeof window !== 'undefined') {
      this.carts = JSON.parse(sessionStorage.getItem('carts') as any) || [];
    }
  }

  onAddToCart(product: any) {
    if (typeof window !== 'undefined') {
      let cart = sessionStorage.getItem('carts') as any;
      this.carts = JSON.parse(cart);
      this.carts.map((item: any) => ({
        ...item,
        qty: 0,
      }));

      let oldProduct = this.carts.find((item: any) => item.id === product.id);
      console.log(oldProduct);
      if (oldProduct) {
        oldProduct.qty += this.quantity;
      } else {
        product.qty = this.quantity;
        this.carts.push(product);
      }

      sessionStorage.setItem('carts', JSON.stringify(this.carts));
      Swal.fire({
        icon: 'success',
        title: 'สำเร็จ!',
        text: 'เพิ่มสินค้าในตะกร้าสำเร็จ',
        showConfirmButton: false,
      });
    }
  }

  plusQty() {
    console.log(this.quantity);
    if (this.quantity < 10) {
      this.quantity += 1;
    } else {
      return;
    }
  }

  minusQty() {
    if (this.quantity > 1) {
      this.quantity -= 1;
    } else {
      return;
    }
  }

  onProductDetail(id: number) {
    this.productService.getProductById(id).subscribe((res) => {
      if (res) {
        this.dialog.open(UserProductDetailComponent, { data: res });
      } else {
      }
    });
  }

  setCart: any;
  totalAmount = 0;
  Calculate: any;

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
