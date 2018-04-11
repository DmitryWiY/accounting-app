import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IRecord} from "../../interfaces/interface";

@Component({
  selector: 'app-income-outcome-list',
  templateUrl: './income-outcome-list.component.html',
  styleUrls: ['./income-outcome-list.component.scss']
})
export class IncomeOutcomeListComponent {
  @Input() records: IRecord [];
  @Output() deleteRecord = new EventEmitter();


  deleteRow(guid: string): void {
    this.deleteRecord.emit(guid);
  }

  constructor() {
  }

}
