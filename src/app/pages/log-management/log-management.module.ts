import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LogManagementComponent } from './log-management.component';
@NgModule({
  declarations: [
    LogManagementComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    NgbModule
  ],
  exports:[LogManagementComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class LogManagementModule { }