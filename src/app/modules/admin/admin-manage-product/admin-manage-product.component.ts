import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductServiceService } from '../../../service/product-service.service';
import { ProductImgeService } from '../../../service/product-imge.service';
import { ProductTypeServiceService } from '../../../service/product-type-service.service';
import { AddProductComponent } from './add-product/add-product.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-manage-product',
  templateUrl: './admin-manage-product.component.html',
  styleUrls: ['./admin-manage-product.component.css'],
})
export class AdminManageProductComponent implements OnInit {
  constructor(
    private productService: ProductServiceService,
    private productImgService: ProductImgeService,
    private productTypeservice: ProductTypeServiceService,
    private dialog: MatDialog
  ) {}

  getAllProducts: any;
  getAllProductPictures: any;
  getAllProductTypes: any;
  editProduct: any;
  image: any = [];

  ngOnInit() {
    this.productService.getAllProduct().subscribe((data) => {
      if (data) {
        this.getAllProducts = data.data.map((product: any) => ({
          ...product,
          img: [],
        }));

        this.getAllProducts.forEach((items: any) => {
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

    this.productImgService.getAllProductImg().subscribe((data) => {
      if (data) {
        this.getAllProductPictures = data;
        console.log(data);
      }
    });
    this.productTypeservice.getAllProductType().subscribe((data) => {
      if (data) {
        this.getAllProductTypes = data.data;
      }
    });
  }

  onAddProduct() {
    this.dialog.open(AddProductComponent, {
      data: {},
      height: '885px',
    });
  }

  loadAllProducts() {
    this.productService.getAllProduct().subscribe((data) => {
      this.getAllProducts = data;
    });
  }

  onDeleteProduct(id: number) {
    Swal.fire({
      title: 'ต้องการลบข้อมูลใช่หรือไม่?',
      showCancelButton: true,
      confirmButtonText: 'ลบ',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(id).subscribe(
          (res) => {
            if (res) {
              Swal.fire('ลบสำเร็จ!', '', 'success');
              this.loadAllProducts(); // โหลดข้อมูลใหม่หลังจากลบสำเร็จ
            }
          },
          (error) => {
            Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถลบผลิตภัณฑ์ได้', 'error');
          }
        );
      }
    });
  }

  onEditProduct(id: any) {
    this.productService.getProductById(id).subscribe((data) => {
      if (data) {
        this.dialog.open(EditProductComponent, {
          height: '885px',
          data: data,
        });
      }
    });
  }
}
