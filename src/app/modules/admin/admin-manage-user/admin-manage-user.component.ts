import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserServiceService } from '../../../service/user-service.service';
import Swal from 'sweetalert2';
import { AddUserComponent } from './add-user/add-user.component';

@Component({
  selector: 'app-admin-manage-user',
  templateUrl: './admin-manage-user.component.html',
  styleUrl: './admin-manage-user.component.css',
})
export class AdminManageUserComponent implements OnInit {
  constructor(
    private getAllUsers: UserServiceService,
    private dialog: MatDialog
  ) {}

  getAllUser: any;
  editUser: any;

  ngOnInit() {
    this.getAllUsers.getAllUsers().subscribe((data) => {
      this.getAllUser = data;
    });
  }
  onEditUser(id: any) {
    this.getAllUsers.getUserById(id).subscribe((data) => {
      if (data) {
        console.log(data);
        this.dialog.open(EditUserComponent, {
          data: data,
        });
      }
    });
  }

  loadAllProducts() {
    this.getAllUsers.getAllUsers().subscribe((data) => {
      this.getAllUser = data;
    });
  }

  onDeleteUser(id: number) {
    Swal.fire({
      title: 'ต้องการลบข้อมูลใช่หรือไม่?',
      showCancelButton: true,
      confirmButtonText: 'ลบ',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        this.getAllUsers.deleteUser(id).subscribe(
          (res) => {
            if (res) {
              Swal.fire('ลบสำเร็จ!', '', 'success');
              this.loadAllProducts(); // โหลดข้อมูลใหม่หลังจากลบสำเร็จ
            }
          },
          (error) => {
            Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถลบได้', 'error');
          }
        );
      }
    });
  }
  onAddUser() {
    this.dialog.open(AddUserComponent, {
      data: {},
      height: '470px',
    });
  }
}
