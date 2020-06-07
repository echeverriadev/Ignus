import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from "angularx-flatpickr"
import { CollectionRoutingModule } from './collection-routing.module';
import { CollectionComponent } from './collection.component';
import { PageHeaderModule } from '../../shared';
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CollectionFilterPipe } from './collection-filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    CollectionRoutingModule, NgbModule.forRoot(),
      FormsModule,PageHeaderModule, ReactiveFormsModule,
      FlatpickrModule.forRoot(),
      CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory
      })
    ], 

  declarations: [CollectionComponent,CollectionFilterPipe],
    providers: [
    NgbActiveModal,
  ]
})
export class CollectionModule { }
