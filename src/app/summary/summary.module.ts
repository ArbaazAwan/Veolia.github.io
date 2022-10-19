import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryComponent } from './summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SummarytableComponent } from './summarytable/summarytable.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { PipesModule } from '../pipes/pipes.module';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CreateSummaryFormComponent } from './create-summary-form/create-summary-form.component';
import { SummaryViewdetailsTableComponent } from './summary-viewdetails-table/summary-viewdetails-table.component';



@NgModule({
  declarations: [
    SummaryComponent,
    SummarytableComponent,
    CreateSummaryFormComponent,
    SummaryViewdetailsTableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    NgbModule,
    PipesModule
  ]
})
export class SummaryModule { }
