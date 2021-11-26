import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent implements OnInit {
  timeBegin = { hour: 13, minute: 30 };
  timeEnd = { hour: 14, minute: 0 };

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    begin: new FormControl(new Date()),
    timeBegin: new FormControl(this.timeBegin),
    end: new FormControl(new Date()),
    timeEnd: new FormControl(this.timeEnd),
    guests: new FormControl([]),
  });

  closeResult = '';
  modal!: NgbActiveModal;
  begin!: NgbDateStruct;
  end!: NgbDateStruct;

  @Input() title!: string;
  @Output() onSave: EventEmitter<any> = new EventEmitter();

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  save() {
    this.modal.close();
    this.onSave.emit('saved');
  }

  open(content: any) {
    this.modal = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }

  onSubmit() {
    console.log('submited');
  }
}
