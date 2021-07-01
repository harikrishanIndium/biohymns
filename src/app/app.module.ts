import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { RepositoryService } from './service/repository.service';
import { AppComponent } from './app.component';
import { ManualModule } from './manual/manual.module';
import { VairaManualModule } from './vaira-manual/vaira-manual.module';
import { LoginModule } from './login/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DashboardModule } from './dashboard/dashboard.module';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { ProjectsModule } from './pages/projects/projects.module';
import { MaterialModule } from './shared/material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { PdflibModule } from './pdflib/pdflib.module';
import { HttpClientModule } from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MainLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule, 
    MaterialModule,
    MatDialogModule,
    /* user modules */

    VairaManualModule,
    ManualModule,
    LoginModule,
    DashboardModule,
    PdflibModule,
    ProjectsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
   
    ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
