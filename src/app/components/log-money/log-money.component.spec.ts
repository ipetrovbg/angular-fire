import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogMoneyComponent } from './log-money.component';

describe('LogMoneyComponent', () => {
  let component: LogMoneyComponent;
  let fixture: ComponentFixture<LogMoneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogMoneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
