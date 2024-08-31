import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaymentServiceService } from '../../../service/payment-service.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { OrderServiceService } from '../../../service/order-service.service';
import { OrderDetailServiceService } from '../../../service/order-detail-service.service';
import { ProductImgeService } from '../../../service/product-imge.service';
import { Router } from '@angular/router';
import { UserServiceService } from '../../../service/user-service.service';

@Component({
  selector: 'app-user-payment',
  templateUrl: './user-payment.component.html',
  styleUrl: './user-payment.component.css',
})
export class UserPaymentComponent {
  constructor(
    private dialog: MatDialog,
    private paymentService: PaymentServiceService,
    private orderService: OrderServiceService,
    private orderDetailService: OrderDetailServiceService,
    private formBuilder: FormBuilder,
    private ImgService: ProductImgeService,
    private router: Router,
    private userService: UserServiceService
  ) {}
  setCart: any;
  qrcodelink = '';
  promptpay = '1469900583781';
  total = 0;
  userId: any;
  paymentMethods: any;
  bankNumber: number = 4460559544;
  user: any;

  ngOnInit(): void {
    let userId = sessionStorage.getItem('userId') as any;
    this.userId = userId;
    console.log(userId);
    this.onCart();
    this.userService.getUserById(userId).subscribe((data) => {
      if (data) {
        this.user = data;
      }
      console.log(this.user);
    });
  }

  onQrCode(total: any) {
    this.qrcodelink = `https://promptpay.io/${this.promptpay}/${total}.png`;
  }

  removeItemFromCart(_t13: any) {
    throw new Error('Method not implemented.');
  }
  cartsItem: any;
  totalAmount = 0;
  Calculate: any;
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

  onCalculateTotal(CalculateTotal: any) {
    if (CalculateTotal) {
      let total = 0;
      CalculateTotal.forEach((item: any) => {
        total += item.price * item.qty;
      });
      this.totalAmount = total;
      this.Calculate = total.toLocaleString('en-US');
      this.onQrCode(total);
      this.total = total;
    }
  }

  productImgs: any;
  file: any;

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

  editUserForm = this.formBuilder.group({
    id: [''],
    firstName: [''],
    lastName: [''],
    userName: [''],
    password: [''],
    confirmPassword: [''],
    email: [''],
    address: [''],
    roleId: '',
  });

  orderForm = this.formBuilder.group({
    userId: '',
    total: [0, Validators.required],
    status: '',
    createDate: '',
  });

  paymentForm = this.formBuilder.group({
    orderId: '',
    paymentAmount: '',
    paymentMethod: '',
    status: '',
    approvedBy: '',
    createDate: '',
    file: '',
  });

  onSubmit() {
    const orderDto = this.orderForm.value as any;
    orderDto.userId = this.userId;
    orderDto.total = this.total;
    orderDto.status = 'ชำระเงินแล้ว';
    console.log(orderDto);
    Swal.fire({
      icon: 'question',
      title: 'คุณต้องการจ่ายเงินใช่หรือไหม',
      showCancelButton: true,
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.saveOrder(orderDto).subscribe((res) => {
          if (res) {
            this.setCart.forEach((item: any) => {
              const orderDetailDto = {
                orderId: res.id,
                productId: item.id, // ตรวจสอบว่าใช้ productId ตามที่เซิร์ฟเวอร์คาดหวัง
                quantity: item.qty, // จำนวนสินค้าที่ต้องการ
                unitPrice: item.price, // ราคาต่อหน่วย
              };
              this.orderDetailService
                .saveOrderDetail(orderDetailDto)
                .subscribe({
                  next: (resDetail) => {
                    console.log(resDetail);
                  },
                  error: (err) => {
                    console.error('Error saving order detail:', err);
                  },
                });
            });
            const paymentDto = new FormData();
            paymentDto.append('orderId', res.id);
            paymentDto.append('paymentAmount', this.total as any);
            paymentDto.append('paymentMethod', this.paymentMethods);
            paymentDto.append('status', 'ยืนยันแล้ว');
            paymentDto.append('approvedBy', 'ปวีณา');
            paymentDto.append('file', this.file);
            this.paymentService.registerPayment(paymentDto).subscribe((res) => {
              if (res) {
                Swal.fire({
                  icon: 'success',
                  title: 'บันทึกข้อมูลสำเร็จ',
                  timer: 1000,
                }).then(() => {
                  sessionStorage.setItem('carts', '[]');

                  this.router.navigate(['user/userHome']);
                });
              }
            });
          }
        });
      }
    });
  }
}
