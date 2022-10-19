import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsTableComponent } from './permissions-table/permissions-table.component';
import { PermissionComponent } from './permission.component';



@NgModule({
  declarations: [
    PermissionsTableComponent,
    PermissionComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    PermissionsTableComponent,
    PermissionComponent
  ]
})
export class PermissionModule { }
