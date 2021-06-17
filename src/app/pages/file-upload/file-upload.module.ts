import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FileUploadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  exports:[FileUploadComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class FileUploadsModule { }
