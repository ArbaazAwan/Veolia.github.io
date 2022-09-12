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



    BrowserModule,
    RouterModule.forRoot([
      { path: 'login', component:LoginComponent },
      { path: 'registration', component:RegistrationComponent },
      { path: 'dashboard', component:DashboardComponent },
      { path: 'model', component:ModelComponent},
      { path:'dropdown',component:DropdownComponent },
      { path: 'unit', component:UnitComponent },
      { path: '', redirectTo:'login', pathMatch:'full' },
      { path: '**', redirectTo:'login', pathMatch: 'full' }
    ]),
    NgbModule,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
