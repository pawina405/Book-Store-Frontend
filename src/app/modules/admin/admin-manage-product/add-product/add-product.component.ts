import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../../../service/product-service.service';
import { ProductImgeService } from '../../../../service/product-imge.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProductTypeServiceService } from '../../../../service/product-type-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',

  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent implements OnInit {
  constructor(
    private productService: ProductServiceService,
    private productImgService: ProductImgeService,
    private productTypeService: ProductTypeServiceService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {}

  addProductForm = this.formBuilder.group({
    productName: '',
    productDesc: '',
    price: '',
    quantity: '',
    status: '',
    productTypeId: '',
  });

  productImgs: any;
  file: any;
  productTypes: any;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      // ตรวจสอบว่าเป็นไฟล์รูปภาพหรือไม่
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (e: any) => {
        this.productImgs = e.target.result;
        // แสดงรูปภาพในหน้าเว็บ
        this.file = file;
      };
    }
  }
  addProduct() {
    const product = this.addProductForm.value;
    Swal.fire({
      title: 'ต้องการบันทึกข้อมูลใช่หรือไม่?',
      showCancelButton: true,
      confirmButtonText: 'บันทึก',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.saveProduct(product).subscribe((res) => {
          if (res) {
            const img = new FormData();
            img.append('file', this.file);
            this.productService
              .addImgByProductImgId(res.data, img)
              .subscribe((res) => {
                if (res) {
                  Swal.fire({
                    icon: 'success',
                    title: 'บันทึกข้อมูลสำเร็จ',
                    timer: 1000,
                  }).then(() => {});
                }
              });
          }
        });
      }
    });
  }

  ngOnInit() {
    this.productTypeService.getAllProductType().subscribe((res) => {
      if (res) {
        this.productTypes = res.data;
      }
    });
  }
}
