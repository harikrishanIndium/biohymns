import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[DashboardComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule { }
