import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  NgbModal,
  NgbActiveModal,
  NgbTimeStruct,
  NgbDate,
  NgbCalendar,
} from '@ng-bootstrap/ng-bootstrap';
import { OperatorFunction, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { ApiService, UtilService } from 'src/app/services';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent implements OnInit {
  public model!: { id: number; name: string };

  begin!: NgbDate;
  end!: NgbDate;
  timeBegin!: NgbTimeStruct;
  timeEnd!: NgbTimeStruct;
  guests: { id: number; name: string }[] = [];
  allGuests!: { id: number; name: string }[];

  submitted = false;
  modal!: NgbActiveModal;

  @Input() title!: string;
  @Output() onSave: EventEmitter<any> = new EventEmitter();

  form: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      begin: new FormControl(this.begin, [Validators.required]),
      end: new FormControl(this.end, [Validators.required]),
      timeBegin: new FormControl(this.timeBegin, [Validators.required]),
      timeEnd: new FormControl(this.timeEnd, [Validators.required]),
      typeahead: new FormControl(''),
    },
    [this.dateValidator, this.timeValidator]
  );

  dateValidator(group: AbstractControl): ValidationErrors | null {
    const begin = group.get('begin')?.value;
    const end = group.get('end')?.value;

    let error: ValidationErrors | null = null;

    if (
      new Date(begin?.year, begin?.month, begin?.day).getTime() >
      new Date(end?.year, end?.month, end?.day).getTime()
    ) {
      error = { date: 'Begin date is greater than end date' };
    }

    return error;
  }

  timeValidator(group: AbstractControl): ValidationErrors | null {
    const timeBegin = group.get('timeBegin')?.value;
    const timeEnd = group.get('timeEnd')?.value;

    let error: ValidationErrors | null = null;

    if (
      timeBegin?.hour > timeEnd?.hour ||
      (timeBegin?.hour == timeEnd?.hour && timeBegin?.minute > timeEnd?.minute)
    ) {
      error = { time: 'Begin hour is greater than end hour' };
    }

    return error;
  }

  constructor(
    private modalService: NgbModal,
    private util: UtilService,
    private api: ApiService,
    private calendar: NgbCalendar
  ) {
    this.initFields();
    this.allGuests = api.getUsers();
  }

  get formControl() {
    return this.form.controls;
  }

  get guestsList() {
    return this.guests.map(({ name }) => name);
  }

  ngOnInit(): void {}

  initFields() {
    this.begin = this.calendar.getToday();
    this.end = this.begin;

    const now = this.util.getDateAtt(new Date());
    this.timeBegin = { hour: now.hours, minute: now.minutes, second: 0 };

    const nowPlus30 = this.util.getDateAtt(
      new Date(new Date().setMinutes(this.timeBegin.minute + 30))
    );
    this.timeEnd = {
      hour: nowPlus30.hours,
      minute: nowPlus30.minutes,
      second: 0,
    };
  }

  addGuest() {
    this.guests.push(this.model);
  }

  onRemoveGuest(index: number) {
    this.guests.splice(index, 1);
    console.log(this.guests);
  }

  save() {
    this.submitted = true;
    if (this.form.valid) {
      this.modal.close();
      const { typeahead, ...values } = this.form.value;
      this.onSave.emit({ ...values, guests: this.guests });
    }
  }

  open(content: any) {
    this.form.reset();
    this.initFields();
    this.submitted = false;
    this.modal = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }

  formatter({ name }) {
    return name;
  }

  search: OperatorFunction<string, readonly { id: number; name: string }[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term === ''
          ? []
          : this.allGuests.filter(
              (v) => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1
            )
      )
    );
}
