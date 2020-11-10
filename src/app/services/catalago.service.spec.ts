import { TestBed } from '@angular/core/testing';

import { CatalagoService } from './catalago.service';

describe('CatalagoService', () => {
  let service: CatalagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
