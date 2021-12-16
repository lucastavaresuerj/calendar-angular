import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ApiService, UtilService } from 'src/app/services';

@Component({
  selector: '[app-event]',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  @Input() event!: dateEvent;
  @Input() dayOfEvent!: Date;

  modalAlert!: NgbModalRef;

  constructor(
    private util: UtilService,
    private api: ApiService,
    private modalService: NgbModal
  ) {}

  getEventFormatTime() {
    // Gambiarra: o TypeScript não aceita todos as opções de data que o JavaScript
    // options TypeScript: https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_es5_d_.intl.datetimeformatoptions.html
    // options JavaScript: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
    // Ao colocar pelo menos um campo que o TypeScript aceita, é possível colocar outros campos que ele não aceita que vai rodar do mesmo jeito que o JavaScript
    // por isso que o hour12 está na constante dateStyle...

    const dateOptions = {
      timeStyle: 'short',
      hour12: true,
    };
    const dateStyle = { dateStyle: 'short', hour12: true };

    const toCompareAmPm = /(.*)(am|pm)(.*)(am|pm)/gi;

    if (this.util.dateDiffDay(this.event.begin, this.event.end) == 0) {
      return `${this.event.begin.toLocaleTimeString(
        'pt-BR',
        dateOptions
      )} até ${this.event.end.toLocaleTimeString(
        'pt-BR',
        dateOptions
      )}`.replace(toCompareAmPm, (match, p1, p2, p3, p4) => {
        return p1 + (p2 == p4 ? '' : p2) + p3 + p4;
      });
    } else {
      if (this.util.dateDiffDay(this.dayOfEvent, this.event.begin) == 0) {
        return `${this.event.begin.toLocaleTimeString(
          'pt-br',
          dateOptions
        )} até ${this.event.end.toLocaleString('pt-br', dateStyle)}`;
      }
      return `${this.event.begin.toLocaleString(
        'pt-br',
        dateStyle
      )} até ${this.event.end.toLocaleTimeString('pt-br', dateOptions)}`;
    }
  }

  get actions(): { name: string }[] {
    return this.event.guests?.map(({ user: { name } }) => ({ name })) || [];
  }

  ngOnInit(): void {}

  editEvent(event: any) {
    this.api.editEvent(event);
    console.log(event);
  }

  deleteEvent() {
    this.api.deleteEvent(this.event);
    this.modalAlert.close();
  }

  openModalDelete(content: any) {
    this.modalAlert = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }
}
