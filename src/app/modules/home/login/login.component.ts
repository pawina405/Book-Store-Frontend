import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../service/user-service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserServiceService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {}

  loginForm = this.formBuilder.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {
    const loginDto = this.loginForm.value as any;
    if (this.loginForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        showConfirmButton: true,
      });
      return;
    } else {
      this.userService.login(loginDto.userName, loginDto.password).subscribe(
        (res) => {
          if (res.data) {
            console.log(res);
            if (res.data.roleId === 1) {
              sessionStorage.setItem('userId', res.data.id);
              sessionStorage.setItem('userRole', 'Admin');
              this.router.navigate(['/admin/adminDashboard']);
            } else {
              sessionStorage.setItem('carts', '[]');
              sessionStorage.setItem('userId', res.data.id);
              sessionStorage.setItem('userRole', 'Customer');
              this.router.navigate(['/user/userHome']);
            }
            Swal.fire({
              icon: 'success',
              title: 'เข้าสู่ระบบสําเร็จ',
              showConfirmButton: true,
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'เข้าสู่ระบบไม่สําเร็จ',
              showConfirmButton: true,
            });
          }
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'เข้าสู่ระบบไม่สําเร็จ',
            showConfirmButton: true,
          });
        }
      );
    }
  }

  clearSession() {
    sessionStorage.clear();
  }
}
