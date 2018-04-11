import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule, routingComponents} from './app-routing.module';
import {AppComponent} from './app.component';
import {MonthIterablePipe} from './pipes/month-iterable.pipe';
import {IncomeOutcomeListComponent} from "./day-details/income-outcome-list/income-outcome-list.component";
import {RecordsService} from "./services/records.service";
import {ReactiveFormsModule} from '@angular/forms';
import JsonToCsv from "./utils/json_to_csv";

@NgModule({
  declarations: [
    AppComponent,
    IncomeOutcomeListComponent,
    routingComponents,
    MonthIterablePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    JsonToCsv,
    RecordsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
