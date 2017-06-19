import { TestBed, inject } from '@angular/core/testing';

import { GeneratorRequestService } from './generator-request.service';

describe('GeneratorRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeneratorRequestService]
    });
  });

  it('should be created', inject([GeneratorRequestService], (service: GeneratorRequestService) => {
    expect(service).toBeTruthy();
  }));
});
