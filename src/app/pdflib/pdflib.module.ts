import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdflibComponent } from './pdflib.component';
import { MaterialModule } from '../shared/material.module';



@NgModule({
  declarations: [
    PdflibComponent
  ],
  imports: [
    CommonModule,
    MaterialModule  
  ]
})
export class PdflibModule { }
