import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ProductServiceService } from '../../../service/product-service.service';
import { ProductTypeServiceService } from '../../../service/product-type-service.service';
import { ProductImgeService } from '../../../service/product-imge.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-product-detail',
  templateUrl: './user-product-detail.component.html',
  styleUrls: ['./user-product-detail.component.css'],
})
export class UserProductDetailComponent implements OnInit {
  constructor(
    private getProductDetail: ProductServiceService,
    private dialog: MatDialog,
    private productTypeService: ProductTypeServiceService,
    private producImgService: ProductImgeService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  carts: any = [];
  productImg: any[] = [];
  DataProduct: any;
  generation: any;

  ngOnInit(): void {
    if (this.data) {
      this.DataProduct = this.data.data;
      this.producImgService
        .getProductImgByProductId(this.DataProduct.id)
        .subscribe((data) => {
          if (data) {
            for (let img of data) {
              this.productImg.push(img.productImgData);
              console.log(data);
            }
          }
        });
    }
  }
}
