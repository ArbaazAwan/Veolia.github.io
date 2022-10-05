import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsTableComponent } from './permissions-table/permissions-table.component';
import { FooterModule } from '../footer/footer.module';
import { NavbarModule } from '../navbar/navbar.module';
import { SidenavModule } from '../sidenav/sidenav.module';
import { PermissionComponent } from './permission.component';



@NgModule({
  declarations: [
    PermissionsTableComponent,
    PermissionComponent
  ],
  imports: [
    CommonModule,
    NavbarModule,
    FooterModule,
    SidenavModule
  ],
  exports: [
    PermissionsTableComponent,
    PermissionComponent
  ]
})
export class PermissionModule { }
