import { TestBed, inject } from '@angular/core/testing';

import { GraphApiService } from './graph-api.service';

describe('GraphApiService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GraphApiService]
        });
    });

    it('should be created', inject([GraphApiService], (service: GraphApiService) => {
        expect(service).toBeTruthy();
    }));
});
