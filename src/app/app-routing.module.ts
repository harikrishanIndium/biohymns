import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LoginComponent } from './login/login.component';
import { ManualComponent } from './manual/manual.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { PdflibComponent } from './pdflib/pdflib.component';
import { VairaManualComponent } from './vaira-manual/vaira-manual.component';
import { FileUploadComponent } from './pages/file-upload/file-upload.component';
import { FileComponent } from './pages/file/file.component';
import { ProjectComponent } from './super-admin/project/project.component';
import { UserComponent } from './super-admin/user/user.component';
import { UserLogsComponent } from './super-admin/user-logs/user-logs.component';
const routes: Routes = [
  {
    path: 'old',
    component: VairaManualComponent
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'manual',
        component: ManualComponent
      },

      {
        path: 'projects',
        component: ProjectsComponent
      },
      {
        path: 'files',
        component: ProjectsComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: "sample",
        component: PdflibComponent
      },
      {
        path: "file-upload",
        component: FileUploadComponent
      },
      {
        path: "redact-file/:id",
        component: FileComponent
      },
      //super-admin start
      {
        path: "project/:id",
        component: ProjectComponent
      },
      // {
      //   path: "superadmin/user",
      //   component: UserComponent
      // },
      // {
      //   path: "superadmin/userlogs",
      //   component: UserLogsComponent
      // }
      //super-admin end
    ]
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
