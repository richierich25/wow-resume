import { TestBed } from '@angular/core/testing';

import { GeneratePdfService } from './generate-pdf.service';

describe('GeneratePdfService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeneratePdfService = TestBed.get(GeneratePdfService);
    expect(service).toBeTruthy();
  });
});
