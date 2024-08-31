import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../service/user-service.service';
import { MatDialog } from '@angular/material/dialog';

import { UserEditProfileComponent } from '../user-edit-profile/user-edit-profile.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  constructor(
    private userService: UserServiceService,
    private dialog: MatDialog
  ) {}

  user: any;

  ngOnInit() {
    if (typeof window !== 'undefined') {
      let id = sessionStorage.getItem('userId') as any;
      this.userService.getUserById(id).subscribe((data) => {
        if (data) {
          this.user = data;
        }
        console.log(this.user);
      });
    }
  }
  onEditUser() {
    this.dialog.open(UserEditProfileComponent, {
      data: this.user,
    });
  }
}
