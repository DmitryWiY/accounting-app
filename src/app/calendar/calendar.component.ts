import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {Moment} from "moment";
import {Router} from "@angular/router";
import {RecordsService} from "../services/records.service";
import {IRecord} from "../interfaces/interface";
import JsonToCsv from "../utils/json_to_csv";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  selectedMonth: Moment = moment();
  monthRecords: Map<string, IRecord[]>;

  constructor(private router: Router, private recordsService: RecordsService, private jsonToCsv: JsonToCsv) {
  }


  navigateToDayDetails(day): void {
    let dateForNavigation = this.selectedMonth.clone();
    dateForNavigation.date(day);
    this.router.navigate(['/day-details', dateForNavigation.format('DD-MM-YYYY')]);
  }

  getDaysInMonth(): number {
    return this.selectedMonth.daysInMonth();
  }

  getMonth(adjustmentCriteria: number): void {
    let month: number = this.selectedMonth.month();
    let year: number = this.selectedMonth.year();
    let dateToUpdate = moment();

    dateToUpdate.year(year).month(month + adjustmentCriteria);

    // had to do this because angular pipe will not update
    this.selectedMonth = dateToUpdate;

    this.getRecordsForMonth();
  }

  getRecordsForMonth(): void {
    let startDate = this.selectedMonth.startOf('month').format('DD-MM-YYYY');
    let endDate = this.selectedMonth.endOf('month').format('DD-MM-YYYY');
    this.recordsService.getRecordsForMonth(startDate, endDate).subscribe(monthRecords => {
      console.log('triggered');
      this.monthRecords = monthRecords;
    });
  }

  checkDay(day: number) {
    let copySelectedMonth = this.selectedMonth.clone().date(day);
    let dateString = copySelectedMonth.format('DD-MM-YYYY');
    let recordsFound = this.monthRecords.get(dateString) || [];

    return recordsFound.length;
  }

  getDayStats(day: number) {
    let copySelectedMonth = this.selectedMonth.clone().date(day);
    let dateString = copySelectedMonth.format('DD-MM-YYYY');
    let recordsForDay = this.monthRecords.get(dateString) || [];

    if (recordsForDay.length && recordsForDay.length) {

      return recordsForDay.reduce((memo, el,) => {
        memo.income += el.income;
        memo.outcome += el.outcome;
        memo.taxes += el.taxes;
        return memo;
      }, {income: 0, outcome: 0, taxes: 0});

    }
    return null;
  }

  toCsv() {
    let monthRecords = [].concat.apply([], Array.from(this.monthRecords.values()));
    console.log(monthRecords);
    this.jsonToCsv.parse(monthRecords, this.selectedMonth.format("MMMM-YYYY"))
  }

  ngOnInit() {
    this.getRecordsForMonth();
  }


}
