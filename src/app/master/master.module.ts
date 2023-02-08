import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterComponent } from './master.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { ViewMasterTableComponent } from './view-master-table/view-master-table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSortModule } from '@angular/material/sort';
import { TreeTableModule } from 'primeng/treetable';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from '../pipes/pipes.module';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MasterTableComponent } from './master-table/master-table.component';
import { CreateMasterFormComponent } from './create-master-form/create-master-form.component';
import { ImportExcelComponent } from './import-excel/import-excel.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ApproveMasterTableComponent } from './approve-master-table/approve-master-table.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ViewApproveMasterComponent } from './approve-master-table/view-approve-master/view-approve-master.component';


@NgModule({
  declarations: [
    MasterComponent,
    ViewMasterTableComponent,
    MasterTableComponent,
    CreateMasterFormComponent,
    ImportExcelComponent,
    ApproveMasterTableComponent,
    ViewApproveMasterComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule,
    MatSelectModule,
    MatSortModule,
    MatInputModule,
    MatIconModule,
    NgbModule,
    TreeTableModule,
    HttpClientModule,
    PipesModule,
    NgxPaginationModule,
    MatBadgeModule,
    MatButtonModule,
    MatTableModule
  ],
  exports: [
    MasterComponent,
    ViewMasterTableComponent,
  ]
})
export class MasterModule { }
