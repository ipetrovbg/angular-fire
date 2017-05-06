import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PclodLoginComponent } from './pclod-login.component';

describe('PclodLoginComponent', () => {
  let component: PclodLoginComponent;
  let fixture: ComponentFixture<PclodLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PclodLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PclodLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
