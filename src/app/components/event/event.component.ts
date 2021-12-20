import { Component, Input, OnInit } from '@angular/core';
import { fieldNameFromStoreName } from '@apollo/client/cache';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {
  ApiService,
  EventsService,
  TokenStorageService,
  UtilService,
} from 'src/app/services';

@Component({
  selector: '[app-event]',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  @Input() event!: dateEvent;
  @Input() dayOfEvent!: Date;

  isOwner!: boolean;
  invitationResponse!: confirmation | undefined;
  invitationCategory!: color;
  invitationButtonText!: string;
  guesResponseActions!: { name: string; click: Function }[];
  modalAlert!: NgbModalRef;
  eventActions!: { name: string }[];

  constructor(
    private util: UtilService,
    private api: ApiService,
    private tokenService: TokenStorageService,
    private modalService: NgbModal,
    private eventService: EventsService
  ) {}

  get eventFormatTime() {
    // Gambiarra: o TypeScript não aceita todos as opções de data que o JavaScript
    // options TypeScript: https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_es5_d_.intl.datetimeformatoptions.html
    // options JavaScript: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
    // Ao colocar pelo menos um campo que o TypeScript aceita, é possível colocar outros campos que ele não aceita que vai rodar do mesmo jeito que o JavaScript
    // por isso que o hour12 está na constante dateStyle...

    const dateOptions = {
      timeStyle: 'short',
      hour12: true,
    };
    const { begin, end } = this.event;
    const dateStyle = { dateStyle: 'short', hour12: true };
    const toCompareAmPm = /(.*)(am|pm)(.*)(am|pm)/gi;

    if (this.util.dateDiffDay(begin, end) == 0) {
      return `${begin.toLocaleTimeString(
        'pt-BR',
        dateOptions
      )} até ${end.toLocaleTimeString('pt-BR', dateOptions)}`.replace(
        toCompareAmPm,
        (match, p1, p2, p3, p4) => {
          return p1 + (p2 == p4 ? '' : p2) + p3 + p4;
        }
      );
    } else {
      if (this.util.dateDiffDay(this.dayOfEvent, begin) == 0) {
        return `${begin.toLocaleTimeString(
          'pt-br',
          dateOptions
        )} até ${end.toLocaleString('pt-br', dateStyle)}`;
      }
      return `${begin.toLocaleString(
        'pt-br',
        dateStyle
      )} até ${end.toLocaleTimeString('pt-br', dateOptions)}`;
    }
  }

  handleSubscribe() {
    return { next: () => this.eventService.refresh() };
  }

  ngOnInit(): void {
    const userId = this.tokenService.getUserId();
    this.isOwner = userId === this.event.owner.id;

    if (!this.isOwner) {
      this.invitationResponse = this.event.guests?.find(
        ({ user: { id } }) => id == userId
      )?.confirmation;

      this.invitationCategory =
        this.invitationResponse == 'awaiting'
          ? 'primary'
          : this.invitationResponse == true
          ? 'success'
          : 'warning';

      this.invitationButtonText =
        this.invitationResponse == 'awaiting'
          ? 'Sem resposta'
          : this.invitationResponse == true
          ? 'Comparecer'
          : 'Faltar';
    }

    this.eventActions =
      this.event.guests?.map(({ user: { name } }) => ({ name })) || [];

    this.guesResponseActions = [
      {
        name: 'Comparecer',
        click: () =>
          this.api
            .changeGuestResponse(this.event.id, true)
            .subscribe(this.handleSubscribe()),
      },
      {
        name: 'Faltar',
        click: () =>
          this.api
            .changeGuestResponse(this.event.id, false)
            .subscribe(this.handleSubscribe()),
      },
    ];
  }

  editEvent(fields: any) {
    this.api.editEvent(this.event.id, fields).subscribe(this.handleSubscribe());
  }

  deleteEvent() {
    this.api.deleteEvent(this.event.id).subscribe(this.handleSubscribe());
    this.modalAlert.close();
  }

  openModalDelete(content: any) {
    this.modalAlert = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }
}
