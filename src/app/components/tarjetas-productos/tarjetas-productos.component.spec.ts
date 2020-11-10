import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetasProductosComponent } from './tarjetas-productos.component';

describe('TarjetasProductosComponent', () => {
  let component: TarjetasProductosComponent;
  let fixture: ComponentFixture<TarjetasProductosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarjetasProductosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetasProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
