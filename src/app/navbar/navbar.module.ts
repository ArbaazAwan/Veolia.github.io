import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    DropdownModule
  ],
  exports:[
    NavbarComponent
  ]
})
export class NavbarModule { }
