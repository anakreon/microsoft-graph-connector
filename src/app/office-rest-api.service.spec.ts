import { TestBed, inject } from '@angular/core/testing';

import { OfficeRestApiService } from './office-rest-api.service';

describe('OfficeRestApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OfficeRestApiService]
    });
  });

  it('should be created', inject([OfficeRestApiService], (service: OfficeRestApiService) => {
    expect(service).toBeTruthy();
  }));
});
