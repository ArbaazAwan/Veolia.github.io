import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown.component';
import { DropdownTableComponent } from './dropdowntable/dropdown-table.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DropdownComponent,
    DropdownTableComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    DropdownComponent,
    DropdownTableComponent
  ]
})
export class DropdownModule { }
