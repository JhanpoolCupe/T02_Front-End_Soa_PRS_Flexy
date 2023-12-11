import { TestBed } from '@angular/core/testing';

import { DocumentoModalService } from './documento-modal.service';

describe('DocumentoModalService', () => {
  let service: DocumentoModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentoModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
