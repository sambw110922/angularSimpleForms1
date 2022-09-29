import { TestBed } from '@angular/core/testing';

import { TaxCalculatorServiceService } from './tax-calculator-service.service';

describe('TaxCalculatorServiceService', () => {
  let service: TaxCalculatorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxCalculatorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
