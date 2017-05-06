import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcloudComponent } from './pcloud.component';

describe('PcloudComponent', () => {
  let component: PcloudComponent;
  let fixture: ComponentFixture<PcloudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcloudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
