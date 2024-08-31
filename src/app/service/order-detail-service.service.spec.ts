import { TestBed } from '@angular/core/testing';

import { OrderDetailServiceService } from './order-detail-service.service';

describe('OrderDetailServiceService', () => {
  let service: OrderDetailServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderDetailServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
