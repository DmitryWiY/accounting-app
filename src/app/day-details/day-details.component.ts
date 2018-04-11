import {Component,} from '@angular/core';
import {RecordsService} from "../services/records.service";
import {IRecord} from "../interfaces/interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-day-details',
  templateUrl: './day-details.component.html',
  styleUrls: ['./day-details.component.scss']
})
export class DayDetailsComponent {
  recordForm: FormGroup = new FormGroup(
    {
      income: new FormControl(null, {
        validators: Validators.required,
        updateOn: 'change'
      }),
      outcome: new FormControl(null, {
        validators: Validators.required,
        updateOn: 'change'
      })
    }
  );
  records: IRecord [];
  date: string;

  constructor(private route: ActivatedRoute, private recordsService: RecordsService) {
  }


  ngOnInit() {
    this.route.params.subscribe(params => this.date = params.date);
    this.getRecords();
  }

  addRecord(): void {

    if (this.recordForm.valid) {

      let record: IRecord = {date: this.date, ...this.recordForm.value};
      record.pureIncome = record.income - record.outcome;
      record.taxes = record.pureIncome * 0.15;


      this.recordsService.setRecord(record);
      this.recordForm.reset();
    }

  }

  deleteRecord(guid: string): void {

    this.recordsService.deleteRecord(this.date, guid);
  }

  getRecords(): void {
    this.recordsService.getRecords(this.date).subscribe(records => {
      this.records = records;
    });
  }
}
