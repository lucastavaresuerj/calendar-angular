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
  eventActions!: {
    name: string;
    context: { confirmation: confirmation };
  }[];

  constructor(
    private util: UtilService,
    private api: ApiService,
    private tokenService: TokenStorageService,
    private modalService: NgbModal,
    private eventService: EventsService
  ) {}

  get eventFormatTime() {
    const dateOptions: Intl.DateTimeFormatOptions = {
      timeStyle: 'short',
      hour12: true,
    };
    const dateStyle: Intl.DateTimeFormatOptions = {
      dateStyle: 'short',
    };

    const { begin, end } = this.event;

    const toCompareAmPm = /(.*)(am|pm)(.*)(am|pm)/gi;

    if (this.util.dateDiffDay(end, begin) == 0) {
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

    this.eventActions =
      this.event.guests?.map(({ user: { name }, confirmation }) => ({
        name,
        context: { confirmation: confirmation || false },
      })) || [];

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

    if (!this.isOwner) {
      this.invitationResponse = this.event.guests?.find(
        ({ user: { id } }) => id == userId
      )?.confirmation;

      switch (this.invitationResponse) {
        case 'awaiting':
          this.invitationCategory = 'primary';
          this.invitationButtonText = 'Sem resposta';
          break;
        case true:
          this.invitationCategory = 'success';
          this.invitationButtonText = 'Comparecer';
          break;
        case false:
          this.invitationCategory = 'warning';
          this.invitationButtonText = 'Faltar';
          break;
        default:
          throw new Error(
            "Don't was possible to determine the status of invitation"
          );
          break;
      }
    }
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
