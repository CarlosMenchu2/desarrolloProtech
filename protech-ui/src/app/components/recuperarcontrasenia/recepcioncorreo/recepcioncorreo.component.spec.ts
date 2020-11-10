import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcioncorreoComponent } from './recepcioncorreo.component';

describe('RecepcioncorreoComponent', () => {
  let component: RecepcioncorreoComponent;
  let fixture: ComponentFixture<RecepcioncorreoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecepcioncorreoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepcioncorreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
