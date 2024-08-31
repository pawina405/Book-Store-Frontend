import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManagePaymentComponent } from './admin-manage-payment.component';

describe('AdminManagePaymentComponent', () => {
  let component: AdminManagePaymentComponent;
  let fixture: ComponentFixture<AdminManagePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminManagePaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminManagePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
