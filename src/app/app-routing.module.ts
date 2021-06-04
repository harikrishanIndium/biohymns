import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LoginComponent } from './login/login.component';
import { ManualComponent } from './manual/manual.component';
import { VairaManualComponent } from './vaira-manual/vaira-manual.component';

const routes: Routes = [
  {
    path: '',
    component: VairaManualComponent
  },
  {
    path:'',
    component: MainLayoutComponent,
    children:[
      {
        path: 'manual',
        component: ManualComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      }

    ]
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
