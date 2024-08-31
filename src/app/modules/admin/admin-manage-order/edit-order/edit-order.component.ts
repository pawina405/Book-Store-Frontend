import { Component, Inject, OnInit } from '@angular/core';
import { OrderServiceService } from '../../../../service/order-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css'],
})
export class EditOrderComponent implements OnInit {
  constructor(
    private orderService: OrderServiceService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    private activeModal: MatDialogRef<EditOrderComponent>
  ) {}
  order: any;

  ngOnInit() {
    if (this.data) {
      this.order = this.data;
      this.dataForEdit(this.order);
      console.log('there', this.order);
    }
  }

  formEditOrder = this.formBuilder.group({
    id: [''],
    total: [''],
    status: [''],
    userId: '',
  });

  dataForEdit(data: any) {
    this.formEditOrder.patchValue({
      id: data.id,
      total: data.total,
      status: data.status,
      userId: data.userId,
    });
  }

  onSubmit() {
    const userDto = this.formEditOrder.value;
    if (this.formEditOrder.invalid) {
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
          this.orderService.update(this.order.id, userDto).subscribe((data) => {
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
