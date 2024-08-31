import { Component, Inject, OnInit } from '@angular/core';
import { UserServiceService } from '../../../service/user-service.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-edit-profile',
  templateUrl: './user-edit-profile.component.html',
  styleUrls: ['./user-edit-profile.component.css'],
})
export class UserEditProfileComponent implements OnInit {
  constructor(
    private userService: UserServiceService,
    private router: Router,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private activeModal: MatDialogRef<UserEditProfileComponent>
  ) {}

  user: any;

  ngOnInit() {
    if (this.data) {
      this.user = this.data;
      this.dataForEdit(this.user);
      console.log('there', this.user);
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

  dataForEdit(data: any) {
    this.editUserForm.patchValue({
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
    const userDto = this.editUserForm.value;
    if (this.editUserForm.invalid) {
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
