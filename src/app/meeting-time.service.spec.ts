import { TestBed, inject } from '@angular/core/testing';

import { MeetingTimeService } from './meeting-time.service';

describe('MeetingTimeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeetingTimeService]
    });
  });

  it('should be created', inject([MeetingTimeService], (service: MeetingTimeService) => {
    expect(service).toBeTruthy();
  }));
});
