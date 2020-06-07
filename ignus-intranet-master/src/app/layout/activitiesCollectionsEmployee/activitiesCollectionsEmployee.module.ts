import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from "angularx-flatpickr"
import { ActivitiesCollectionsEmployeeRoutingModule } from './activitiesCollectionsEmployee-routing.module';
import { ActivitiesCollectionsEmployeeComponent } from './activitiesCollectionsEmployee.component';
import { PageHeaderModule } from '../../shared';
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';



@NgModule({
  imports: [
    CommonModule,
    ActivitiesCollectionsEmployeeRoutingModule, NgbModule.forRoot(),
      FormsModule,PageHeaderModule, ReactiveFormsModule,
      FlatpickrModule.forRoot(),
      ModalModule.forRoot(),
      CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory
      })
    ],

  declarations: [ActivitiesCollectionsEmployeeComponent],
    providers: [
    NgbActiveModal,
  ]
})
export class ActivitiesCollectionsEmployeeModule { }
