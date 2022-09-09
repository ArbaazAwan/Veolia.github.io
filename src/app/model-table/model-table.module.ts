import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelTableComponent } from './model-table.component';



@NgModule({
  declarations: [
    ModelTableComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ModelTableComponent
  ]
})
export class ModelTableModule { }
