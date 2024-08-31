import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServiceService } from '../../../../service/product-service.service';
import { ProductImgeService } from '../../../../service/product-imge.service';
import { ProductTypeServiceService } from '../../../../service/product-type-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',

  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductServiceService,
    private productImgService: ProductImgeService,
    private productTypeService: ProductTypeServiceService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}
  imageUrl: any;
  selectProduct: any;
  productTypes: any[] = [];

  ngOnInit(): void {
    if (this.data) {
      this.selectProduct = this.data;
      this.dataEdit(this.data.data);
      console.log(this.data);
    }
    this.productTypeService.getAllProductType().subscribe((res) => {
      if (res) {
        this.productTypes = res.data;
      }
    });
  }

  productForm = this.formBuilder.group({
    productTypeId: [0, Validators.required],
    productName: '',
    productDesc: [0, Validators.required],
    price: [0, Validators.required],
    quantity: [0, Validators.required],
    status: '',
    createBy: 'AdminB',
    updateBy: 'AdminA',
  });

  dataEdit(data: any) {
    console.log(data);
    this.productForm.patchValue({
      productTypeId: data.productTypeId,
      productName: data.productName,
      productDesc: data.productDesc,
      price: data.price,
      quantity: data.quantity,
      status: data.status,
      createBy: data.createBy,
      updateBy: data.updateBy,
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      // ตรวจสอบว่าเป็นไฟล์รูปภาพหรือไม่
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
        // แสดงรูปภาพในหน้าเว็บ
      };
    }
  }

  onsubmit() {
    const productDto = this.productForm.value as any;
    Swal.fire({
      icon: 'question',
      title: 'คุณต้องการเเก้ไขใช่หรือไหม',
      showConfirmButton: true,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService
          .updateProduct(productDto, this.data.data.id)
          .subscribe(
            (res) => {
              if (res) {
                Swal.fire({
                  icon: 'success',
                  title: 'เเก้ไขสำเร็จ',
                  showConfirmButton: false,
                  timer: 1500,
                }).then(() => {
                  window.location.reload();
                });
              }
            },
            (error) => {
              Swal.fire({
                icon: 'error',
                title: 'เเก้ไขไม่สำเร็จ',
              });
            }
          );
      }
    });
  }
}
