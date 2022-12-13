import { TestBed } from '@angular/core/testing';

import { SummaryCalculationsService } from './summary-calculations.service';

describe('SummaryCalculationsService', () => {
  let service: SummaryCalculationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SummaryCalculationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
