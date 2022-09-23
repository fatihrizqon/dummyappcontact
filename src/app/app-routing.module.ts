import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './contacts/create/create.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './contacts/list/list.component';
import { ViewComponent } from './contacts/view/view.component';
import { UpdateComponent } from './contacts/update/update.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'create', component: CreateComponent },
  { path: 'view/:id', component: ViewComponent },
  { path: 'update/:id', component: UpdateComponent },
  { path: 'list', component: ListComponent },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
