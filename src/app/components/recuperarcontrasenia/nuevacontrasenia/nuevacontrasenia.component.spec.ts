import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevacontraseniaComponent } from './nuevacontrasenia.component';

describe('NuevacontraseniaComponent', () => {
  let component: NuevacontraseniaComponent;
  let fixture: ComponentFixture<NuevacontraseniaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevacontraseniaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevacontraseniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
