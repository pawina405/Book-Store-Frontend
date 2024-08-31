import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminManageOrderComponent } from './admin-manage-order/admin-manage-order.component';
import { AdminManagePaymentComponent } from './admin-manage-payment/admin-manage-payment.component';
import { AdminManageProductComponent } from './admin-manage-product/admin-manage-product.component';
import { AdminManageUserComponent } from './admin-manage-user/admin-manage-user.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { EditProductComponent } from './admin-manage-product/edit-product/edit-product.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { EditUserComponent } from './admin-manage-user/edit-user/edit-user.component';
import { EditOrderComponent } from './admin-manage-order/edit-order/edit-order.component';
import { EditPaymentComponent } from './admin-manage-payment/edit-payment/edit-payment.component';
import { AddOrderComponent } from './admin-manage-order/add-order/add-order.component';
import { AddPaymentComponent } from './admin-manage-payment/add-payment/add-payment.component';
import { AddProductComponent } from './admin-manage-product/add-product/add-product.component';
import { AddUserComponent } from './admin-manage-user/add-user/add-user.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    SidebarComponent,
    AdminManageOrderComponent,
    AdminManagePaymentComponent,
    AdminManageProductComponent,
    AdminManageUserComponent,
    EditProductComponent,
    EditUserComponent,
    EditOrderComponent,
    EditPaymentComponent,
    AddOrderComponent,
    AddPaymentComponent,
    AddProductComponent,
    AddUserComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminComponent,
        children: [
          { path: 'adminDashboard', component: AdminDashboardComponent },
          { path: 'adminManageOrder', component: AdminManageOrderComponent },
          {
            path: 'adminManagePayment',
            component: AdminManagePaymentComponent,
          },
          {
            path: 'adminManageProduct',
            component: AdminManageProductComponent,
          },
          { path: 'adminManageUser', component: AdminManageUserComponent },
          { path: 'adminEditProduct', component: EditProductComponent },
        ],
      },
    ]),
    MatDialogModule,
    ReactiveFormsModule,
    SweetAlert2Module,
  ],
})
export class AdminModule {}
