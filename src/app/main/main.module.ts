import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { SidenavModule } from '../sidenav/sidenav.module';
import { NavbarModule } from '../navbar/navbar.module';
import { FooterModule } from '../footer/footer.module';
import { RouterModule } from '@angular/router';
import { MasterModule } from '../master/master.module';
import { SitesModule } from '../sites/sites.module';
import { UsersModule } from '../users/users.module';
import { ModelModule } from '../model/model.module';
import { DropdownModule } from 'primeng/dropdown';
import { UnitModule } from '../unit/unit.module';
import { SummaryModule } from '../summary/summary.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { PermissionModule } from '../permission/permission.module';
import { ProfileModule } from '../profile/profile.module';
import { ClientsModule } from '../clients/clients.module';



@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    SidenavModule,
    NavbarModule,
    FooterModule,
    RouterModule,
    MasterModule,
    SitesModule,
    UsersModule,
    DashboardModule,
    ModelModule,
    DropdownModule,
    UnitModule,
    PermissionModule,
    SummaryModule,
    ProfileModule,
    ClientsModule
  ]
})
export class MainModule { }
