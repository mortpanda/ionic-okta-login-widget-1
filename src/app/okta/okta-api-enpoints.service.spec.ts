import { TestBed } from '@angular/core/testing';

import { OktaApiEnpointsService } from './okta-api-enpoints.service';

describe('OktaApiEnpointsService', () => {
  let service: OktaApiEnpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OktaApiEnpointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
