import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManualComponent } from './manual.component';


@NgModule({
  declarations: [
    ManualComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[ManualComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]

})
export class ManualModule { }
