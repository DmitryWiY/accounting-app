import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CalendarComponent} from './calendar/calendar.component';
import {DayDetailsComponent} from './day-details/day-details.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {IncomeOutcomeListComponent} from "./day-details/income-outcome-list/income-outcome-list.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/calendar',
    pathMatch: 'full'
  },
  {
    path: 'calendar',
    component: CalendarComponent,
  },
  {
    path: 'day-details/:date',
    component: DayDetailsComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

export const routingComponents = [DayDetailsComponent, CalendarComponent, PageNotFoundComponent,IncomeOutcomeListComponent];
