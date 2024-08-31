import { Component, Inject, OnInit } from '@angular/core';
import { PaymentServiceService } from '../../../../service/payment-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-payment',

  templateUrl: './edit-payment.component.html',
  styleUrl: './edit-payment.component.css',
})
export class EditPaymentComponent implements OnInit {
  constructor(
    private paymentService: PaymentServiceService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    private activeModal: MatDialogRef<EditPaymentComponent>
  ) {}
  payment: any;

  ngOnInit() {
    if (this.data) {
      this.payment = this.data;
      this.dataForEdit(this.payment);
      console.log('there', this.payment);
    }
  }

  formEditPayment = this.formBuilder.group({
    id: [''],
    paymentAmount: [''],
    paymentMethod: [''],
    status: [''],
    slip: [''],
    approvedBy: [''],
    orderId: '',
  });

  dataForEdit(data: any) {
    this.formEditPayment.patchValue({
      id: data.id,
      paymentAmount: data.paymentAmount,
      paymentMethod: data.paymentMethod,
      status: data.status,
      slip: data.slip,
      approvedBy: data.approvedBy,
      orderId: data.orderId,
    });
  }

  onSubmit() {
    const userDto = this.formEditPayment.value;
    if (this.formEditPayment.invalid) {
      Swal.fire({
        icon: 'question',
        title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        timer: 1000,
      });
    } else {
      Swal.fire({
        icon: 'question',
        title: 'ต้องการแก้ไขข้อมูลใช่หรือไม่',
        showCancelButton: true,
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก',
      }).then((result) => {
        if (result.isConfirmed) {
          this.paymentService
            .updatePayment(this.payment.id, userDto)
            .subscribe((data) => {
              if (data) {
                Swal.fire({
                  icon: 'success',
                  title: 'แก้ไขข้อมูลสําเร็จ',
                  timer: 1000,
                }).then(() => {
                  window.location.reload();
                });
              }
            });
        }
      });
    }
  }

  onCloseModal(): void {
    this.activeModal.close();
  }
}
