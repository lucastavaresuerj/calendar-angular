import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.scss'],
})
export class ListGroupComponent implements OnInit {
  @Input() list!: string[];
  @Input() removable: boolean = false;
  @Output() onRemove: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  remove(index: number) {
    this.onRemove.emit(index);
  }
}
