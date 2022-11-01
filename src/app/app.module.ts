import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { AuthModule } from './auth/auth.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Error404Component } from './errors/404.component';
import { ModelComponent } from './model/model.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { UnitComponent } from './unit/unit.component';
import { SummaryComponent } from './summary/summary.component';
import { MasterComponent } from './master/master.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './profile/profile.component';
import { PermissionComponent } from './permission/permission.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientsListComponent } from './clients/clients-list/clients-list.component';
import { UsersComponent } from './users/users.component';
import { SitesComponent } from './sites/sites.component';
import { MainComponent } from './main/main.component';
import { MainModule } from './main/main.module';
import { IsAuthenticatedGuard } from './auth/is-authenticated.guard';

@NgModule({
  declarations: [
    AppComponent,
    Error404Component,
  ],
  imports: [
    AuthModule,
    MainModule,

    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: 'login', component:LoginComponent },
      { path: 'registration', component:RegistrationComponent },
      { path: 'clientslist', component:ClientsListComponent, canActivate:[IsAuthenticatedGuard] },
      { path: '', redirectTo:'login', pathMatch:'full' },
      { path:'', component:MainComponent,children:[
          { path: 'clients', component:ClientsComponent },
          { path: 'sites', component:SitesComponent },
          { path: 'users', component:UsersComponent },
          { path: 'profile',component:ProfileComponent },
          { path: 'dashboard', component:DashboardComponent },
          { path: 'master', component:MasterComponent },
          { path: 'model', component:ModelComponent },
          { path:'dropdown',component:DropdownComponent },
          { path: 'unit', component:UnitComponent },
          { path: 'summary', component:SummaryComponent },
          { path: 'permission',component:PermissionComponent },
      ],canActivate:[IsAuthenticatedGuard]},
      { path: '**', component:Error404Component }
    ]),
    NgbModule,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
