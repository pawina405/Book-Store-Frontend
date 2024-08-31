import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditPaymentComponent } from './edit-payment/edit-payment.component';
import { PaymentServiceService } from '../../../service/payment-service.service';

@Component({
  selector: 'app-admin-manage-payment',
  templateUrl: './admin-manage-payment.component.html',
  styleUrl: './admin-manage-payment.component.css',
})
export class AdminManagePaymentComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private getAllPayment: PaymentServiceService
  ) {}

  getAllPayments: any;
  editPayments: any;
  image: any = [];

  ngOnInit() {
    this.getAllPayment.getAllPayments().subscribe((data) => {
      if (data) {
        this.getAllPayments = data;
      }
    });
    this.getAllPayment.getAllPayments().subscribe((data) => {
      if (data) {
        this.getAllPayments = data;
        console.log(data);
      }
    });
  }

  onEditPayment(id: any) {
    this.getAllPayment.getPaymentById(id).subscribe((data) => {
      if (data) {
        this.dialog.open(EditPaymentComponent, {
          data: data,
        });
      }
    });
  }
}
