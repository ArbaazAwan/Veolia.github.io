import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryComponent } from './summary.component';
import { FooterModule } from '../footer/footer.module';
import { SidenavModule } from '../sidenav/sidenav.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarModule } from '../navbar/navbar.module';
import { SummarytableComponent } from './summarytable/summarytable.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { PipesModule } from '../pipes/pipes.module';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    SummaryComponent,
    SummarytableComponent,
  ],
  imports: [
    CommonModule,
    FooterModule,
    SidenavModule,
    FormsModule,
    ReactiveFormsModule,
    NavbarModule,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    NgbModule,
    PipesModule
  ]
})
export class SummaryModule { }
