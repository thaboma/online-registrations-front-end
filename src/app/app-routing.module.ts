import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { FormSubmitComponent } from './components/form-submit/form-submit.component';
import { ViewReportComponent } from './components/view-report/view-report.component';


const routes: Routes = [
  {path: '', redirectTo: 'register-form', pathMatch: 'full'},
  {path: 'register-form', component: FormSubmitComponent},
  {path: 'view-report', component: ViewReportComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
