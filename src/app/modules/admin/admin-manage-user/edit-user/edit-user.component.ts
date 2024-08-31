import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { UserServiceService } from '../../../../service/user-service.service';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { create } from 'domain';

@Component({
  selector: 'app-edit-user',

  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
})
export class EditUserComponent implements OnInit {
  constructor(
    private userService: UserServiceService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    private activeModal: MatDialogRef<EditUserComponent>
  ) {}
  user: any;

  ngOnInit() {
    if (this.data) {
      this.user = this.data;
      this.dataForEdit(this.user);
      console.log('there', this.user);
    }
  }

  formEditUser = this.formBuilder.group({
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

  dataForEdit(data: any) {
    this.formEditUser.patchValue({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      userName: data.userName,
      password: data.password,
      email: data.email,
      address: data.address,
      roleId: data.roleId,
    });
  }

  onSubmit() {
    const userDto = this.formEditUser.value;
    if (this.formEditUser.invalid) {
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
          this.userService.updateUser(userDto).subscribe((data) => {
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
