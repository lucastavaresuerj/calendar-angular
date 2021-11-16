import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftPainelComponent } from './left-painel.component';

describe('LeftPainelComponent', () => {
  let component: LeftPainelComponent;
  let fixture: ComponentFixture<LeftPainelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftPainelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftPainelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
