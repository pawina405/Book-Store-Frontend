import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { UserCartComponent } from './user-cart/user-cart.component';
import { UserEditProfileComponent } from './user-edit-profile/user-edit-profile.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserPaymentComponent } from './user-payment/user-payment.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserNavbarComponent } from './user-navbar/user-navbar.component';
import { UserProductDetailComponent } from './user-product-detail/user-product-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { UserOrderComponent } from './user-order/user-order.component';
import { Module } from 'module';
import { CancelOrderComponent } from './cancel-order/cancel-order.component';
import { FooterComponent } from '../../footer/footer.component';

@NgModule({
  declarations: [
    UserComponent,
    UserNavbarComponent,
    UserHomeComponent,
    UserCartComponent,
    UserEditProfileComponent,
    UserPaymentComponent,
    UserProductDetailComponent,
    UserProfileComponent,
    UserOrderComponent,
    CancelOrderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: UserComponent },
      { path: 'userCart', component: UserCartComponent },
      { path: 'userEditProfile', component: UserEditProfileComponent },
      { path: 'userHome', component: UserHomeComponent },
      { path: 'userPayment', component: UserPaymentComponent },
      { path: 'userProfile', component: UserProfileComponent },
      { path: 'userProduct', component: UserProductDetailComponent },
      { path: 'userOrder', component: UserOrderComponent },
      { path: 'cancelOrder', component: CancelOrderComponent },
    ]),
    ReactiveFormsModule,
    MatDialogModule,
    SweetAlert2Module,
    FormsModule,
  ],
})
export class UserModule {}
