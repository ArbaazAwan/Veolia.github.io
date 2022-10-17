import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { AuthModule } from './auth/auth.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { Error404Component } from './errors/404.component';
import { ModelComponent } from './model/model.component';
import { ModelModule } from './model/model.module';
import { NavbarModule } from './navbar/navbar.module';
import { SidenavModule } from './sidenav/sidenav.module';
import { FooterModule } from './footer/footer.module';
import { DropdownComponent } from './dropdown/dropdown.component';
import { DropdownModule } from './dropdown/dropdown.module';
import { UnitModule } from './unit/unit.module';
import { UnitComponent } from './unit/unit.component';
import { PermissionModule } from './permission/permission.module';
import { SummaryModule } from './summary/summary.module';
import { SummaryComponent } from './summary/summary.component';
import { MasterModule } from './master/master.module';
import { MasterComponent } from './master/master.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileModule } from './profile/profile.module';
import { ProfileComponent } from './profile/profile.component';
import { PermissionComponent } from './permission/permission.component';
import { ClientsModule } from './clients/clients.module';
import { ClientsComponent } from './clients/clients.component';
import { SitesModule } from './sites/sites.module';
import { NodeService } from './master/view-master-table/node.service';
import { UsersModule } from './users/users.module';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    Error404Component,
  ],
  imports: [
    AuthModule,
    DashboardModule,
    ModelModule,
    NavbarModule,
    SidenavModule,
    FooterModule,
    DropdownModule,
    UnitModule,
    PermissionModule,
    SummaryModule,
    MasterModule,
    ProfileModule,
    ClientsModule,
    SitesModule,
    UsersModule,


    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: 'login', component:LoginComponent },
      { path: 'registration', component:RegistrationComponent },
      { path: 'clients', component:ClientsComponent },
      { path: 'profile',component:ProfileComponent },
      { path: 'dashboard', component:DashboardComponent },
      { path: 'master', component:MasterComponent },
      { path: 'model', component:ModelComponent },
      { path:'dropdown',component:DropdownComponent },
      { path: 'unit', component:UnitComponent },
      { path: 'summary', component:SummaryComponent },
      { path: 'permission',component:PermissionComponent },
      { path: 'users',component:UsersComponent },
      { path: '', redirectTo:'login', pathMatch:'full' },
      { path: '**', component:Error404Component }
    ]),
    NgbModule,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
