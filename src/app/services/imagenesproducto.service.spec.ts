import { TestBed } from '@angular/core/testing';

import { ImagenesproductoService } from './imagenesproducto.service';

describe('ImagenesproductoService', () => {
  let service: ImagenesproductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagenesproductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
