import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLogsComponent } from '../user-logs/user-logs.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserLogsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  exports:[UserLogsComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectModule { }
