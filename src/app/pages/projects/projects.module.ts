import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { FileModule } from '../file/file.module';
import { FileUploadsModule } from '../file-upload/file-upload.module'

@NgModule({
  declarations: [
    ProjectsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FileUploadModule,
    FileModule,
    FileUploadsModule
  ],
  exports:[ProjectsComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectsModule { }
