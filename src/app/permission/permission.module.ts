import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsTableComponent } from './permissions-table.component';
import { FooterModule } from '../footer/footer.module';
import { NavbarModule } from '../navbar/navbar.module';
import { SidenavModule } from '../sidenav/sidenav.module';



@NgModule({
  declarations: [
    PermissionsTableComponent
  ],
  imports: [
    CommonModule,
    NavbarModule,
    FooterModule,
    SidenavModule
  ],
  exports: [
    PermissionsTableComponent
  ]
})
export class PermissionModule { }
