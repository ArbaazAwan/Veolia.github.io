import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterComponent } from './master.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import { ViewMasterTableComponent } from './view-master-table/view-master-table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatSortModule} from '@angular/material/sort';
import {TreeTableModule} from 'primeng/treetable';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from '../pipes/pipes.module';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MasterTableComponent } from './master-table/master-table.component';
import { CreateMasterFormComponent } from './create-master-form/create-master-form.component';

@NgModule({
  declarations: [
    MasterComponent,
    ViewMasterTableComponent,
    MasterTableComponent,
    CreateMasterFormComponent,
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
    PipesModule
  ],
  exports:[
    MasterComponent,
    ViewMasterTableComponent,
  ]
})
export class MasterModule { }
