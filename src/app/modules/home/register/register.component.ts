import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../../../service/user-service.service';
import { RoleserviceService } from '../../../service/role-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',

  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  constructor(
    private userService: UserServiceService,
    private roleService: RoleserviceService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activated: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  registerForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    address: ['', Validators.required],
    userName: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    roleId: 2,
  });

  onSubmit() {
    const registerDto = new FormData();
    if (this.registerForm.invalid) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    } else {
      registerDto.append('firstName', this.registerForm.value.firstName as any);
      registerDto.append('lastName', this.registerForm.value.lastName as any);
      registerDto.append('email', this.registerForm.value.email as any);
      registerDto.append('address', this.registerForm.value.address as any);
      registerDto.append('userName', this.registerForm.value.userName as any);
      registerDto.append('password', this.registerForm.value.password as any);
      registerDto.append(
        'confirmPassword',
        this.registerForm.value.confirmPassword as any
      );
      this.userService.register(this.registerForm.value).subscribe(
        (res) => {
          console.log(res);
          if (res.data) {
            alert('สมัครสมาชิกสําเร็จ');
            this.router.navigate(['/home/login']);
          }
        },
        (errors) => {
          alert('สมัครสมาชิกไม่สําเร็จ');
        }
      );
    }
  }
}
