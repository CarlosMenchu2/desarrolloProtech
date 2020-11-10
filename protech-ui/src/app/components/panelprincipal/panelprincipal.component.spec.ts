import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelprincipalComponent } from './panelprincipal.component';

describe('PanelprincipalComponent', () => {
  let component: PanelprincipalComponent;
  let fixture: ComponentFixture<PanelprincipalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelprincipalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelprincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
