import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownComponent } from './dropdown.component';
import { NavbarModule } from '../navbar/navbar.module';
import { SidenavModule } from '../sidenav/sidenav.module';
import {  ReactiveFormsModule } from '@angular/forms';
import { FooterModule } from '../footer/footer.module';



@NgModule({
  declarations: [
    DropdownComponent
  ],
  imports: [
    CommonModule,

    NavbarModule,
    SidenavModule,
    ReactiveFormsModule,
    FooterModule
  ],
  exports:[
    DropdownComponent
  ]
})
export class DropdownModule { }
