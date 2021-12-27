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
  NgbCalendar,
  NgbDateStruct,
  NgbDate,
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
  public model!: user;

  name: string = '';
  begin!: NgbDate | null;
  end!: NgbDate | null;
  timeBegin!: NgbTimeStruct;
  timeEnd!: NgbTimeStruct;
  guests: guest[] = [];
  allUsers!: user[];

  submitted = false;
  modal!: NgbActiveModal;

  @Input() title!: string;
  @Input() event!: dateEvent;
  @Output() onSave: EventEmitter<any> = new EventEmitter();

  form: FormGroup = new FormGroup(
    {
      name: new FormControl(this.name, [Validators.required]),
      begin: new FormControl(this.begin, [Validators.required]),
      end: new FormControl(this.end, [Validators.required]),
      timeBegin: new FormControl(this.timeBegin, [Validators.required]),
      timeEnd: new FormControl(this.timeEnd, [Validators.required]),
      typeahead: new FormControl(''),
    },
    [this.dayValidator, this.timeValidator]
  );

  dayValidator(group: AbstractControl): ValidationErrors | null {
    const begin = group.get('begin')?.value;
    const end = group.get('end')?.value;

    let error: ValidationErrors | null = null;

    if (
      new Date(begin?.year, begin?.month, begin?.day).getTime() >
      new Date(end?.year, end?.month, end?.day).getTime()
    ) {
      error = { day: 'Begin date is greater than end date' };
    }

    return error;
  }

  timeValidator(group: AbstractControl): ValidationErrors | null {
    if (!group.errors?.day) {
      return null;
    }
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
  ) {}

  get formControl() {
    return this.form.controls;
  }

  get guestsList() {
    return this.guests.map(({ user: { name } }) => name);
  }

  ngOnInit(): void {
    this.api.getUsers().subscribe({
      next: ({ data: { users } }) => {
        this.allUsers = users;
      },
    });
  }

  addGuest() {
    this.guests.push({ user: this.model });
  }

  onRemoveGuest(index: number) {
    this.guests.splice(index, 1);
  }

  save() {
    this.submitted = true;
    if (this.form.valid) {
      this.modal.close();
      const { begin, end, timeBegin, timeEnd, name, id } = this.form.value;
      this.onSave.emit({
        id,
        name,
        begin: this.util.createDateFromAtts({
          ...begin,
          month: begin.month - 1,
          ...timeBegin,
        }),
        end: this.util.createDateFromAtts({
          ...end,
          month: end.month - 1,
          ...timeEnd,
        }),
        guests: this.guests.map(({ user: { id }, confirmation }) => ({
          user: { id },
          confirmation,
        })),
      });
    }
  }

  createEvent() {
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

  fill() {
    const { name, begin, end, guests } = this.event;
    this.guests = guests ? [...guests] : [];

    console.log(this.event);

    this.form.get('name')?.setValue(name);

    const beginAtts = this.util.getDateAtt(begin);
    this.begin = NgbDate.from({
      year: beginAtts.year,
      month: beginAtts.month + 1,
      day: beginAtts.date,
    } as NgbDateStruct);
    this.timeBegin = {
      hour: beginAtts.hours,
      minute: beginAtts.minutes,
      second: beginAtts.seconds,
    };

    const endAtts = this.util.getDateAtt(end);
    this.end = NgbDate.from({
      year: endAtts.year,
      month: endAtts.month + 1,
      day: endAtts.date,
    } as NgbDateStruct);
    this.timeEnd = {
      hour: endAtts.hours,
      minute: endAtts.minutes,
      second: endAtts.seconds,
    };
  }

  initFields() {
    if (this.event) {
      this.fill();
    } else {
      this.createEvent();
    }
  }

  open(content: any) {
    this.form.reset();
    this.initFields();
    this.submitted = false;
    this.modalService.dismissAll();
    this.modal = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }

  formatter({ name }) {
    return name;
  }

  search: OperatorFunction<string, readonly { name: string }[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term === ''
          ? []
          : this.allUsers.filter(
              (v) => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1
            )
      )
    );
}
