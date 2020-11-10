import { TestBed } from '@angular/core/testing';

import { CarritoUsuarioService } from './carrito-usuario.service';

describe('CarritoUsuarioService', () => {
  let service: CarritoUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarritoUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
