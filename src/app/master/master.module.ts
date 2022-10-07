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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchPipe } from '../pipes/search.pipe';
import {MatSortModule} from '@angular/material/sort';

@NgModule({
  declarations: [
    MasterComponent,
    ViewMasterTableComponent,
    SearchPipe,
  ],
  imports: [
    CommonModule,
    NavbarModule,
    SidenavModule,
    FooterModule,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule,
    MatSelectModule,
    MatSortModule,
    NgbModule,
  ],
  exports:[
    MasterComponent,
    ViewMasterTableComponent,
    SearchPipe
  ]
})
export class MasterModule { }
