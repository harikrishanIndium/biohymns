import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManualModule } from './manual/manual.module';
import { VairaManualModule } from './vaira-manual/vaira-manual.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    VairaManualModule,
    ManualModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
