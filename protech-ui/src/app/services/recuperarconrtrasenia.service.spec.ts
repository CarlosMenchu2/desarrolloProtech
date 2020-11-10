import { TestBed } from '@angular/core/testing';

import { RecuperarconrtraseniaService } from './recuperarconrtrasenia.service';

describe('RecuperarconrtraseniaService', () => {
  let service: RecuperarconrtraseniaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecuperarconrtraseniaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
