import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterComponent } from './master.component';
import { NavbarModule } from '../navbar/navbar.module';
import { SidenavModule } from '../sidenav/sidenav.module';
import { FooterModule } from '../footer/footer.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import { ViewMasterTableComponent } from './view-master-table/view-master-table.component';

@NgModule({
  declarations: [
    MasterComponent,
    ViewMasterTableComponent,
  ],
  imports: [
    CommonModule,
    NavbarModule,
    SidenavModule,
    FooterModule,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule,
    MatSelectModule
  ],
  exports:[
    MasterComponent,
    ViewMasterTableComponent
  ]
})
export class MasterModule { }
