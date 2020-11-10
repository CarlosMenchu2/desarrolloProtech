import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowbuyComponent } from './howbuy.component';

describe('HowbuyComponent', () => {
  let component: HowbuyComponent;
  let fixture: ComponentFixture<HowbuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowbuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowbuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
