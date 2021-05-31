import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ManualComponent } from './manual/manual.component';
import { VairaManualComponent } from './vaira-manual/vaira-manual.component';

const routes: Routes = [
  {
    path: '',
    component: VairaManualComponent
  },
  {
    path: 'manual',
    component: ManualComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
