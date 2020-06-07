import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule } from '../../../shared';

import { SugerenciasRoutingModule } from './sugerencias-routing.module';
import { SugerenciasComponent } from './sugerencias.component';

@NgModule({
  imports: [
    CommonModule,
    SugerenciasRoutingModule,
    PageHeaderModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [SugerenciasComponent]
})
export class SugerenciasModule { }


