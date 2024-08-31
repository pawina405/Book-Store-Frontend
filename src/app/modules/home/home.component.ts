import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductServiceService } from '../../service/product-service.service';
import { ProductImgeService } from '../../service/product-imge.service';
import { ProductTypeServiceService } from '../../service/product-type-service.service';
import { UserProductDetailComponent } from '../user/user-product-detail/user-product-detail.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  img: any = [];
  carts: any = [];
  cart1: any = [];
  products: any;
  productImg: any;
  isLoggedIn: boolean = false; // สมมุติว่าคุณมีตัวแปรนี้เพื่อเก็บสถานะการเข้าสู่ระบบ

  constructor(
    private dialog: MatDialog,
    private productService: ProductServiceService,
    private productImgService: ProductImgeService,
    private productTypeService: ProductTypeServiceService
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

  addToCart(product: any) {
    if (!this.isLoggedIn) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณาเข้าสู่ระบบ',
        text: 'กรุณาเข้าสู่ระบบหรือสมัครสมาชิกก่อนทำรายการ',
        confirmButtonText: 'ตกลง',
      });
      return;
    }

    if (typeof window !== 'undefined') {
      if (!this.carts) {
        this.carts = [];
      }
      this.carts.push(product);
      sessionStorage.setItem('carts', JSON.stringify(this.carts));
    }
  }

  onProduct() {
    this.dialog.open(UserProductDetailComponent, { height: '500px' });
  }
}
