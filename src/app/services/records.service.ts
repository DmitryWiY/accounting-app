import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import {IRecord} from "../interfaces/interface";
import * as moment from 'moment';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import 'rxjs/add/operator/map'


// Date is not the best index, but in real project this data would be stored on the backend under a uuid
// each data change would be done through the backend
// each search would be done through backend


@Injectable()
export class RecordsService {
  private sub$: BehaviorSubject<Map<string, IRecord[]>> = new BehaviorSubject(undefined);

  constructor() {
    let records: Map<string, IRecord[]> = new Map<string, IRecord[]>();

    records.set("02-04-2018", [
        {date: '02-04-2018', income: 20, outcome: 10, pureIncome: 10, taxes: 2, guid: "23e4324cs"},
        {date: '02-04-2018', income: 100, outcome: 14, pureIncome: 12, taxes: 20, guid: "2309324cs"}
      ]
    );

    records.set("04-04-2018", [
        {date: '02-04-2018', income: 9, outcome: 1, pureIncome: 8, taxes: 2, guid: "4234332"},
        {date: '02-04-2018', income: 100, outcome: 14, pureIncome: 12, taxes: 20, guid: "7987423"}
      ]
    );
    records.set("09-04-2018", [
        {date: '02-04-2018', income: 40, outcome: 14, pureIncome: 36, taxes: 2, guid: "23e4324cs"},
        {date: '02-04-2018', income: 8, outcome: 1, pureIncome: 7, taxes: 20, guid: "23024cs"},
        {date: '02-04-2018', income: 1, outcome: 0, pureIncome: 1, taxes: 20, guid: "230932431s"},
        {date: '02-04-2018', income: 1, outcome: 0, pureIncome: 2, taxes: 20, guid: "634342"}
      ]
    );
    records.set("11-04-2018", [
        {date: '02-04-2018', income: 20, outcome: 10, pureIncome: 10, taxes: 2, guid: "879879877"},
        {date: '02-04-2018', income: 100, outcome: 14, pureIncome: 12, taxes: 20, guid: "4324"}
      ]
    );
    records.set("16-04-2018", [
        {date: '02-04-2018', income: 20, outcome: 10, pureIncome: 10, taxes: 2, guid: "434635342"},
        {date: '02-04-2018', income: 100, outcome: 14, pureIncome: 12, taxes: 20, guid: "r243t3554634"}
      ]
    );
    records.set("19-04-2018", [
        {date: '02-04-2018', income: 20, outcome: 10, pureIncome: 10, taxes: 2, guid: "6t34r236453"},
        {date: '02-04-2018', income: 100, outcome: 14, pureIncome: 12, taxes: 20, guid: "t34656452523"}
      ]
    );

    records.set("20-04-2018", [
        {date: '02-04-2018', income: 20, outcome: 10, pureIncome: 10, taxes: 2, guid: "53465324"},
        {date: '02-04-2018', income: 100, outcome: 14, pureIncome: 12, taxes: 20, guid: "123133213"}
      ]
    );

    records.set("21-04-2018", [
        {date: '02-04-2018', income: 20, outcome: 10, pureIncome: 10, taxes: 2, guid: "890756098"},
        {date: '02-04-2018', income: 100, outcome: 14, pureIncome: 12, taxes: 20, guid: "43324234389890"}
      ]
    );

    records.set("27-04-2018", [
        {date: '02-04-2018', income: 20, outcome: 10, pureIncome: 10, taxes: 2, guid: "43254398"},
        {date: '02-04-2018', income: 100, outcome: 14, pureIncome: 12, taxes: 20, guid: "984823432098"}
      ]
    );


    this.sub$.next(records);
  }

  private _guid() {
    return Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
  }

  private _getDayRecords(date: string): IRecord[] {
    return this.sub$.getValue().get(date);
  }


  deleteRecord(date: string, guid: string): void {
    let data = this._getDayRecords(date);
    let updatedData = data.filter(el => el.guid !== guid);
    const mapdata = this.sub$.getValue();
    mapdata.set(date, updatedData);
    this.sub$.next(mapdata);
  }


  setRecord(record: IRecord): void {
    let data = this._getDayRecords(record.date) || [];
    record.guid = this._guid();
    data.push(record);
    const mapdata = this.sub$.getValue();
    mapdata.set(record.date, data);
    this.sub$.next(mapdata);
  }

  getRecordsForMonth(startDate: string, endDate: string): Observable<any> {
    let rangeStart = moment(startDate, "DD-MM-YYYY",);
    let rangeEnd = moment(endDate, "DD-MM-YYYY",);
    let recordsForMonth: Map<string, IRecord[]> = new Map<string, IRecord[]>();

    // the aim is to return a map of records for month
    // did not want to clone the 'records' map since it will be speed consuming

    this.sub$.getValue().forEach((record, key) => {
      let elDate = moment(key, "DD-MM-YYYY",);

      if (elDate >= rangeStart && elDate <= rangeEnd) {
        recordsForMonth.set(key, record);
      }

    });

    return of(recordsForMonth);
  }

  getRecords(date): Observable<IRecord []> {
    return this.sub$.asObservable()
      .map((res) => res.get(date));
  }

}
