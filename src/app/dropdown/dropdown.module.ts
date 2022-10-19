import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { DropdownTableComponent } from './dropdowntable/dropdown-table.component';

@NgModule({
  declarations: [
    DropdownComponent,
    DropdownTableComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports:[
    DropdownComponent
  ]
})
export class DropdownModule { }
