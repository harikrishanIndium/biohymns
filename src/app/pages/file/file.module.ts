import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileComponent, RedactionTypeComponent } from './file.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    FileComponent,
    RedactionTypeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    NgbModule
  ],
  exports:[FileComponent,RedactionTypeComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class FileModule { }
