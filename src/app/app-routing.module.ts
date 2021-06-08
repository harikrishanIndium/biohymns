import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LoginComponent } from './login/login.component';
import { ManualComponent } from './manual/manual.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { VairaManualComponent } from './vaira-manual/vaira-manual.component';

const routes: Routes = [
  {
    path: '',
    component: VairaManualComponent
  },
  {
    path: 'login',
    component: LoginComponent
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
        path: 'projects',
        component: ProjectsComponent
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
