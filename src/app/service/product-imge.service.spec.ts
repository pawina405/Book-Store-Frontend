import { TestBed } from '@angular/core/testing';

import { ProductImgeService } from './product-imge.service';

describe('ProductImgeService', () => {
  let service: ProductImgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductImgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
