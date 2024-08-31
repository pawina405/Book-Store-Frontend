import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-navbar',

  templateUrl: './user-navbar.component.html',
  styleUrl: './user-navbar.component.css',
})
export class UserNavbarComponent implements OnInit {
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

  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('#menu-button') && !target.closest('.dropdown-menu')) {
      this.isDropdownOpen = false;
    }
  }
}
