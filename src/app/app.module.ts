import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './contacts/create/create.component';
import { ViewComponent } from './contacts/view/view.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ListComponent } from './contacts/list/list.component';
import { UpdateComponent } from './contacts/update/update.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    ViewComponent,
    DashboardComponent,
    ListComponent,
    UpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
