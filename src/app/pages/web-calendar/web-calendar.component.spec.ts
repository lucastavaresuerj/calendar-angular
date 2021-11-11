import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebCalendarComponent } from './web-calendar.component';

describe('WebCalendarComponent', () => {
  let component: WebCalendarComponent;
  let fixture: ComponentFixture<WebCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
