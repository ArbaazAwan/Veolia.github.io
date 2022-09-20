import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterComponent } from './master.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { NavbarModule } from '../navbar/navbar.module';
import { SidenavModule } from '../sidenav/sidenav.module';
import { FooterModule } from '../footer/footer.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MasterComponent
  ],
  imports: [
    CommonModule,
    NavbarModule,
    SidenavModule,
    FooterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  
  exports:[
    MasterComponent
  ]
})
export class MasterModule { }
