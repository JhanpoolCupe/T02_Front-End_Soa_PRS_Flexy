import { TestBed } from '@angular/core/testing';

import { TransaccionalService } from './transaccional.service';

describe('TransaccionalService', () => {
  let service: TransaccionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransaccionalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
