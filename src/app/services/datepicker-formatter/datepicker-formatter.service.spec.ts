import { TestBed } from '@angular/core/testing';

import { DatepickerFormatterService } from './datepicker-formatter.service';

describe('DatepickerFormatterService', () => {
  let service: DatepickerFormatterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatepickerFormatterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
