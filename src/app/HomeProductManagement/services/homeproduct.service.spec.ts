import { TestBed } from '@angular/core/testing';

import { HomeproductService } from './homeproduct.service';

describe('HomeproductService', () => {
  let service: HomeproductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeproductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
