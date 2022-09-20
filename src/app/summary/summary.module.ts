import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryComponent } from './summary.component';
import { FooterModule } from '../footer/footer.module';
import { SidenavModule } from '../sidenav/sidenav.module';
import { FormsModule } from '@angular/forms';
import { NavbarModule } from '../navbar/navbar.module';



@NgModule({
  declarations: [
    SummaryComponent
  ],
  imports: [
    CommonModule,
    FooterModule,
    SidenavModule,
    FormsModule,
    NavbarModule
  ]
})
export class SummaryModule { }
