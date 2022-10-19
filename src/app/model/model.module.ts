import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelComponent } from './model.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModelTableComponent } from './model-table/model-table.component';



@NgModule({
  declarations: [
    ModelComponent,
    ModelTableComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports:[
    ModelComponent,


  ]
})
export class ModelModule { }
