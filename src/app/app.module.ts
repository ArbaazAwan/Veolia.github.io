import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { FormsModule } from '@angular/forms';

import { AuthModule } from './auth/auth.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { Error404Component } from './errors/404.component';
import { ModelTableComponent } from './model-table/model-table.component';
import { ModelTableModule } from './model-table/model-table.module';

@NgModule({
  declarations: [
    AppComponent,
    Error404Component,
  ],
  imports: [
    AuthModule,
    DashboardModule,
    ModelTableModule,

    BrowserModule,
    RouterModule.forRoot([
      { path: 'login', component:LoginComponent },
      { path: 'registration', component:RegistrationComponent },
      { path: 'dashboard', component:DashboardComponent },
      { path: 'modeltable', component: ModelTableComponent },
      { path: '', redirectTo:'login', pathMatch:'full' },
      { path: '**', component: Error404Component }
    ]),
    NgbModule,
    FormsModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
