import { TestBed, inject } from '@angular/core/testing';

import { IdtokenService } from './idtoken.service';

describe('IdtokenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IdtokenService]
    });
  });

  it('should be created', inject([IdtokenService], (service: IdtokenService) => {
    expect(service).toBeTruthy();
  }));
});
