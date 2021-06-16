import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManualComponent } from './manual.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ManualComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[ManualComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]

})
export class ManualModule { }
