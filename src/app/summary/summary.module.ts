import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryComponent } from './summary.component';
import { FooterModule } from '../footer/footer.module';
import { SidenavModule } from '../sidenav/sidenav.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarModule } from '../navbar/navbar.module';
import { SummarytableComponent } from './summarytable/summarytable.component';



@NgModule({
  declarations: [
    SummaryComponent,
    SummarytableComponent
  ],
  imports: [
    CommonModule,
    FooterModule,
    SidenavModule,
    FormsModule,
    ReactiveFormsModule,
    NavbarModule
  ]
})
export class SummaryModule { }
