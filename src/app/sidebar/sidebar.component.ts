import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',

  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  logout() {
    Swal.fire({
      icon: 'question',
      title: 'ต้องการออกจากระบบใช่หรือไม่?',
      showCancelButton: true,
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ไม่ใช่',
    }).then((result) => {
      if (result.isConfirmed) {
        if (typeof window.sessionStorage !== 'undefined') {
          sessionStorage.clear();
          this.router.navigate(['home']).then(() => {
            window.location.reload();
          });
        }
      }
    });
  }
}
