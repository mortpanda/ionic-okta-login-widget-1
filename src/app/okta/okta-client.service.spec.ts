import { TestBed } from '@angular/core/testing';

import { OktaClientService } from './okta-client.service';

describe('OktaClientService', () => {
  let service: OktaClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OktaClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
